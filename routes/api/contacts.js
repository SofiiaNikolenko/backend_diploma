const express = require("express");
const { validateBody, isValidId, authenticake } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const {
  ctrlGetAll,
  ctrlGetById,
  ctrlAddContact,
  ctrlDeleteContact,
  ctrlUpdateContact,
  ctrlUpdateFavorite,
} = require("../../controllers");

const router = express.Router();

router.get("/", authenticake, ctrlGetAll);

router.get("/:contactId", authenticake, isValidId, ctrlGetById);

router.post("/", authenticake, validateBody(schemas.addSchema), ctrlAddContact);

router.delete("/:contactId", authenticake, isValidId, ctrlDeleteContact);

router.put(
  "/:contactId",
  authenticake,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlUpdateContact
);

router.patch(
  "/:contactId/favorite",
  authenticake,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlUpdateFavorite
);

module.exports = router;
