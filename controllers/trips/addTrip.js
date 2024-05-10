const { Trip } = require("../../models/trip");

const addTrip = async (req, res, next) => {
  const { _id: owner } = req.user;
  const addTrip = await Trip.create({ ...req.body, owner });
  res.status(201).json(addTrip);
};

module.exports = addTrip;
