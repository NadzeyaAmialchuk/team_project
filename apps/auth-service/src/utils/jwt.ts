const jwt = require('jsonwebtoken');

const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign({ sub: userId, email }, process.env.JWT_SECRET!, {
    expiresIn: process.env.ACCESS_EXPIRE
  });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_EXPIRE
  });
};

const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};

const saveRefreshTokenToRedis = async (redisClient: any, userId: string, refreshToken: string) => {
  await redisClient.set(`refreshToken:${userId}`, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days
  });
};

module.exports= {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  saveRefreshTokenToRedis
};

export {};
