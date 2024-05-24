const express = require("express");
const { validateBody, authenticake } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  ctrlRegister,
  ctrlLogin,
  ctrlGetCurrent,
  ctrlLogout,
  ctrlVerifyEmail,
  ctrlResendVerifyEmail,
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrlRegister);

router.get("/verify/:verificationToken", ctrlVerifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrlResendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrlLogin);

router.get("/current", authenticake, ctrlGetCurrent);

router.post("/logout", authenticake, ctrlLogout);

module.exports = router;
