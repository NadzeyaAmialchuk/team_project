import { NextFunction, Response } from "express";
import { IAuthRequest } from "../interfaces/authRequest.interface";

const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authCookie = req.cookies["access_token"];
  if (!authCookie) {
    return res.status(401).json({ error: "Authorization cookie missing" });
  }

  try {
    const decoded = verifyAccessToken(authCookie);
    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
export {};
