const express = require("express");
const { validateBody, isValidId, authenticake } = require("../../middlewares");
const { schemas } = require("../../models/trip");
const {
  ctrlGetAll,
  ctrlGetById,
  ctrlAddTrip,
  ctrlDeleteTrip,
  ctrlUpdateTrip,
} = require("../../controllers");
const getAllPublic = require("../../controllers/trips/getAllPublic");
const updateOnePublic = require("../../controllers/trips/updateOnePublic");
const getTripsWithLikes = require("../../controllers/trips/getTripsWithLikes");
const getKeys = require("../../controllers/trips/getKeys");

const router = express.Router();

router.get("/keys", authenticake, getKeys);

router.get("/allpublic", getAllPublic);

router.patch("/:tripId/likes", isValidId, updateOnePublic);

router.get("/trips-with-likes", getTripsWithLikes);

router.get("/", authenticake, ctrlGetAll);

router.get("/:tripId", authenticake, isValidId, ctrlGetById);

router.post("/", authenticake, validateBody(schemas.addSchema), ctrlAddTrip);

router.delete("/:tripId", authenticake, isValidId, ctrlDeleteTrip);

router.patch(
  "/:tripId",
  authenticake,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlUpdateTrip
);

module.exports = router;
