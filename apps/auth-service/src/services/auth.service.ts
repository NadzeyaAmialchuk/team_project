const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  saveRefreshTokenToRedis,
} = require("../utils/jwt");
const { redisClient } = require("../config/redis.config");
const prisma = require("../config/prisma.config");
const { setAuthCookies } = require("../utils/authCookies");


const register = async (req: any, res: any, next: any) => {
  try {
    const { username, email, password, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password + salt, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        password_salt: salt,
        phone,
      },
    });

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    await saveRefreshTokenToRedis(redisClient, user.id, refreshToken);
    setAuthCookies(res, accessToken, refreshToken);

    res.send("Register successfully");
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};

const login = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password || !user.password_salt) {
      const error: any = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const isValid = bcrypt.compareSync(
      password + user.password_salt,
      user.password,
    );
    if (!isValid) {
      const error: any = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    await saveRefreshTokenToRedis(redisClient, user.id, refreshToken);
    setAuthCookies(res, accessToken, refreshToken);

    res.send("login successfully");

  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const refresh = async (req: any, res: any, next: any) => {
  try {
    const refresh_token = req.cookies['refresh_token']

    if (!refresh_token) {
      const error: any = new Error("Refresh token is required");
      error.statusCode = 401;
      return next(error);
    }

    const decoded = verifyRefreshToken(refresh_token);
    const userId = decoded.sub;

    const storedRefreshToken = await redisClient.get(`refreshToken:${userId}`);

    if (storedRefreshToken !== refresh_token) {
      const error: any = new Error("Invalid refresh token");
      error.statusCode = 401;
      return next(error);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const newAccessToken = generateAccessToken(user.id, user.email);
    const newRefreshToken = generateRefreshToken(user.id);

    await saveRefreshTokenToRedis(redisClient, user.id, newRefreshToken);
    setAuthCookies(res, newAccessToken, newRefreshToken);
    res.json('new tokens are generated')

  } catch (error) {
    console.error("Refresh token error:", error);
    next(error);
  }
};

const logout = async (req: any, res: any, next: any) => {
  try {
    const userId = req.body.id;
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    await redisClient.del(`refreshToken:${userId}`);
    res.json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};


module.exports = {
  register,
  login,
  refresh,
  logout,
};

export {};
