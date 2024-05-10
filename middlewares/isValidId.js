const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { tripId } = req.params;
  if (!isValidObjectId(tripId)) {
    next(HttpError(400, `${tripId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
