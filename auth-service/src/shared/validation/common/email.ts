import { body } from "express-validator";

export const emailValidator = body("email")
  .exists({ checkFalsy: true })
  .bail()
  .isString()
  .bail()
  .isEmail()
  .bail()
  .normalizeEmail();
