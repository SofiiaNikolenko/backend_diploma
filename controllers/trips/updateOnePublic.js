const { Trip } = require("../../models/trip");

const updateOnePublic = async (req, res, next) => {
  const { tripId } = req.params;

  try {
    await Trip.findByIdAndUpdate({ _id: tripId }, { $inc: { likes: 1 } });
    res
      .status(200)
      .json({ success: true, message: "Likes updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update likes" });
  }
};

module.exports = updateOnePublic;
