import { body } from "express-validator";

export const passwordValidator = body("password")
  .exists({ checkFalsy: true })
  .bail()
  .isString();
