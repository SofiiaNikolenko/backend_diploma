const { ctrlWrapper } = require("../helpers");

const ctrlGetAll = require("./trips/getAll");
const ctrlGetById = require("./trips/getById");
const ctrlAddTrip = require("./trips/addTrip");
const ctrlDeleteTrip = require("./trips/deleteTrip");
const ctrlUpdateTrip = require("./trips/updateTrip");
const ctrlUpdateFavorite = require("./trips/updateFavorite");

const ctrlRegister = require("./auth/register");
const ctrlLogin = require("./auth/login");
const ctrlGetCurrent = require("./auth/getCurrent");
const ctrlLogout = require("./auth/logout");
const ctrlUpdateAvatar = require("./auth/updateAvatar");
const ctrlVerifyEmail = require("./auth/verifyEmail");
const ctrlResendVerifyEmail = require("./auth/resendVerifyEmail");

module.exports = {
  ctrlGetAll: ctrlWrapper(ctrlGetAll),
  ctrlGetById: ctrlWrapper(ctrlGetById),
  ctrlAddTrip: ctrlWrapper(ctrlAddTrip),
  ctrlDeleteTrip: ctrlWrapper(ctrlDeleteTrip),
  ctrlUpdateTrip: ctrlWrapper(ctrlUpdateTrip),
  ctrlUpdateFavorite: ctrlWrapper(ctrlUpdateFavorite),

  ctrlRegister: ctrlWrapper(ctrlRegister),
  ctrlLogin: ctrlWrapper(ctrlLogin),
  ctrlGetCurrent: ctrlWrapper(ctrlGetCurrent),
  ctrlLogout: ctrlWrapper(ctrlLogout),
  ctrlUpdateAvatar: ctrlWrapper(ctrlUpdateAvatar),
  ctrlVerifyEmail: ctrlWrapper(ctrlVerifyEmail),
  ctrlResendVerifyEmail: ctrlWrapper(ctrlResendVerifyEmail),
};
