const { Router } = require("express");
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
  authService.register,
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty(), validateRequest],
  authService.login,
);


router.post("/logout", authService.logout);

router.post("/refresh", authService.refresh);

router.get("/check", authMiddleware, async (req: any, res: any) => {
  if (req.user) {
          res.json(req.user)
      }
});

module.exports = router;
