const { Trip } = require("../../models/trip");
const { HttpError } = require("../../helpers");

const deleteTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const tripForRemove = await Trip.findByIdAndRemove(tripId);
  if (!tripForRemove) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Trip deleted" });
};

module.exports = deleteTrip;
