const { Trip } = require("../../models/trip");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allTrips = await Trip.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(allTrips);
};

module.exports = getAll;
