import { Router } from "express";
import { apiEndpoints } from "../../../shared/constants/api/endpoint/auth";
import { emailValidator } from "../../../shared/validation/common/email";
import { passwordValidator } from "../../../shared/validation/common/password";
import { loginController } from "../../../controller/auth/login";

const router = Router();

router.post(
  apiEndpoints.AUTH.LOGIN,
  emailValidator,
  passwordValidator,
  loginController
);

export { router };
