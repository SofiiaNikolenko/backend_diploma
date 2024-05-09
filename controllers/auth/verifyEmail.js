const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

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

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
