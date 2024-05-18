const { Trip } = require("../../models/trip");

const getTripsWithLikes = async (req, res, next) => {
  try {
    const trips = await Trip.find({ likes: { $gt: 0 } }).sort({ likes: -1 });
    res.status(200).json({ success: true, trips });
  } catch (err) {
    console.error("Error fetching trips with likes:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch trips with likes" });
  }
};

module.exports = getTripsWithLikes;
