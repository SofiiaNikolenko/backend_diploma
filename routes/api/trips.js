const express = require("express");
const { validateBody, isValidId, authenticake } = require("../../middlewares");
const { schemas } = require("../../models/trip");
const {
  ctrlGetAll,
  ctrlGetById,
  ctrlAddTrip,
  ctrlDeleteTrip,
  ctrlUpdateTrip,
  ctrlUpdateFavorite,
} = require("../../controllers");
const getAllPublic = require("../../controllers/trips/getAllPublic");

const router = express.Router();

router.get("/allpublic", getAllPublic);

router.get("/", authenticake, ctrlGetAll);

router.get("/:tripId", authenticake, isValidId, ctrlGetById);

router.post("/", authenticake, validateBody(schemas.addSchema), ctrlAddTrip);

router.delete("/:tripId", authenticake, isValidId, ctrlDeleteTrip);

router.put(
  "/:tripId",
  authenticake,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlUpdateTrip
);

router.patch(
  "/:tripId/favorite",
  authenticake,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlUpdateFavorite
);

module.exports = router;
