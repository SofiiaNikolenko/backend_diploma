const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken }).exec();
  console.log(user);

  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  const htmlFilePath = path.join(__dirname, "verification-successful.html");
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

  res.status(200).send(htmlContent);

  // res.status(200).json({
  //   message: "Verification successful",
  // });
};

module.exports = verifyEmail;
