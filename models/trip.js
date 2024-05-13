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
        name: {
          type: String,
          required: true,
        },
        todoList: [
          {
            todo: {
              type: String,
              required: true,
            },
            publicTodo: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
    // reactions: [
    //   {
    //     userId: {
    //       type: Schema.Types.ObjectId,
    //       required: true,
    //     },
    //     reaction: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { versionKey: false, timestamps: true }
);

tripSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  owner: Joi.string().required(),
  title: Joi.string().required().messages({
    "string.base": "title must be a string",
    "string.empty": "title cannot be empty",
    "any.required": "title is a required field",
  }),
  description: Joi.string(),
  categories: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      todoList: Joi.array().items(
        Joi.object({
          todo: Joi.string().required(),
          publicTodo: Joi.boolean(),
        })
      ),
    })
  ),
  public: Joi.boolean(),
  // reactions: Joi.array().items(
  //   Joi.object({
  //     userId: Joi.string().required(),
  //     reaction: Joi.string().required(),
  //   })
  // ),
});


const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Trip = model("trip", tripSchema);

module.exports = { Trip, schemas };
