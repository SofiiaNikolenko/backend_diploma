const { Trip } = require("../../models/trip");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { tripId } = req.params;
  const tripById = await Trip.findById(tripId);
  if (!tripById) {
    throw HttpError(404, "Not found");
  }
  res.json(tripById);
};

module.exports = getById;
