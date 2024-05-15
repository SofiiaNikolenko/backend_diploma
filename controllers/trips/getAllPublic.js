const { Trip } = require("../../models/trip");

const getAllPublic = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const countPromise = Trip.countDocuments({ public: true });
    const tripsPromise = Trip.find({ public: true }, "-createdAt -updatedAt")
      .skip(skip)
      .limit(limit);

    const [count, trips] = await Promise.all([countPromise, tripsPromise]);

    res.json({
      totalTrips: count,
      trips,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPublic;
