const { ctrlWrapper } = require("../helpers");

const ctrlGetAll = require("./contacts/getAll");
const ctrlGetById = require("./contacts/getById");
const ctrlAddContact = require("./contacts/addContact");
const ctrlDeleteContact = require("./contacts/deleteContact");
const ctrlUpdateContact = require("./contacts/updateContact");
const ctrlUpdateFavorite = require("./contacts/updateFavorite");

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
  ctrlAddContact: ctrlWrapper(ctrlAddContact),
  ctrlDeleteContact: ctrlWrapper(ctrlDeleteContact),
  ctrlUpdateContact: ctrlWrapper(ctrlUpdateContact),
  ctrlUpdateFavorite: ctrlWrapper(ctrlUpdateFavorite),

  ctrlRegister: ctrlWrapper(ctrlRegister),
  ctrlLogin: ctrlWrapper(ctrlLogin),
  ctrlGetCurrent: ctrlWrapper(ctrlGetCurrent),
  ctrlLogout: ctrlWrapper(ctrlLogout),
  ctrlUpdateAvatar: ctrlWrapper(ctrlUpdateAvatar),
  ctrlVerifyEmail: ctrlWrapper(ctrlVerifyEmail),
  ctrlResendVerifyEmail: ctrlWrapper(ctrlResendVerifyEmail),
};
