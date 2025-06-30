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

module.exports= {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};

export {};
