const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

module.exports = getById;
