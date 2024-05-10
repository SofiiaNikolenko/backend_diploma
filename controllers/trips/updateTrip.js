const { Trip } = require("../../models/trip");
const { HttpError } = require("../../helpers");

const updateTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const updateTrip = await Trip.findByIdAndUpdate(tripId, req.body, {
    new: true,
  });
  if (!updateTrip) {
    throw HttpError(404, "Not found");
  }
  res.json(updateTrip);
};

module.exports = updateTrip;
