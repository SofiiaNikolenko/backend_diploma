const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "name must be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name must be at least 2 characters",
    "string.max": "name cannot be more than 50 characters",
    "any.required": "name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "email must be a string",
    "string.empty": "email cannot be empty",
    "string.email": "email must be a valid email",
    "any.required": "email is a required field",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.base": "phone must be a string",
      "string.empty": "phone cannot be empty",
      "string.pattern.base": "phone must be in the format (111) 111-1111",
      "any.required": "phone is a required field",
    }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
