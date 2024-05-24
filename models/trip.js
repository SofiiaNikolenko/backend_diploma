const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const tripSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "Set title for trip"],
    },
    description: {
      type: String,
    },
    categories: [
      {
        nameCategory: {
          type: String,
          required: true,
        },
        todoList: [
          {
            todo: {
              type: String,
              required: true,
            },
          },
        ],
        publicList: {
          type: Boolean,
          default: false,
        },
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        cdnUrl: {
          type: String,
          required: true,
        },
        uuid: {
          type: String,
          required: true,
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

tripSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "title must be a string",
    "string.empty": "title cannot be empty",
    "any.required": "title is a required field",
  }),
  description: Joi.string(),
  categories: Joi.array().items(
    Joi.object({
      nameCategory: Joi.string().required(),
      todoList: Joi.array().items(
        Joi.object({
          todo: Joi.string().required(),
        })
      ),
      publicList: Joi.boolean(),
    })
  ),
  isPublic: Joi.boolean(),
  photos: Joi.array().items(
    Joi.object({
      cdnUrl: Joi.string().uri().required(),
      uuid: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required(),
    })
  ),
});

const schemas = {
  addSchema,
};

const Trip = model("trip", tripSchema);

module.exports = { Trip, schemas };