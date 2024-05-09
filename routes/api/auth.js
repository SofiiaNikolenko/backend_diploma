const express = require("express");
const { validateBody, authenticake, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  ctrlRegister,
  ctrlLogin,
  ctrlGetCurrent,
  ctrlLogout,
  ctrlUpdateAvatar,
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

router.patch(
  "/avatars",
  authenticake,
  upload.single("avatar"),
  ctrlUpdateAvatar
);

module.exports = router;
