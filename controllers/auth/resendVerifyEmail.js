const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Resend Verification Email",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <p>Привіт!</p>
        <p>Ми помітили, що ви ще не верифікували свою електронну пошту. Будь ласка, натисніть кнопку нижче, щоб повторно надіслати лист для верифікації:</p>
        <a style="background-color: #8dd3bb; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;" 
          href="${BASE_URL}/users/resend-verification/${user.verificationToken}" target="_blank">Повторно надіслати лист для верифікації</a>
        <p>Якщо кнопка вище не працює, ви також можете скопіювати та вставити наступне посилання у свій браузер:</p>
        <p><a href="${BASE_URL}/users/resend-verification/${user.verificationToken}" target="_blank">${BASE_URL}/users/resend-verification/${user.verificationToken}</a></p>
      </div>
    `,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
