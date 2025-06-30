const { Router } = require("express");
import type { Request, Response, NextFunction } from "express";
const { body } = require("express-validator");
const authService = require("../services/auth.service");
const validateRequest =
  require("../middlewares/error.middleware").validateRequest;
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("phone").optional().isMobilePhone("any"),
    validateRequest,
  ],
  (req: Request, res: Response, next: NextFunction) => authService.register(req, res, next),
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty(), validateRequest],
  (req: Request, res: Response, next: NextFunction) => authService.login(req, res, next),
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => authService.logout(req, res, next));

router.post("/refresh", (req: Request, res: Response, next: NextFunction) => authService.refresh(req, res, next));

router.post("/check", authMiddleware, async (req: any, res: any) => {
  if (req.user) {
          res.json(req.user)
      }
});

module.exports = router;
