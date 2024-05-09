const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const crypto = require("node:crypto");

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <p>Hello!</p>
      <p>Please click the button below to verify your email:</p>
      <a style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;" 
         href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Verify Email</a>
      <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
      <p><a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">${BASE_URL}/users/verify/${verificationToken}</a></p>
    </div>
  `,
  };

  await sendEmail(verifyEmail);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const response = {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  };

  res.status(201).json(response);
};

module.exports = register;
