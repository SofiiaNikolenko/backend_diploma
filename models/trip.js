const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// const tripSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Set name for trip"],
//     },
//     email: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     favorite: {
//       type: Boolean,
//       default: false,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

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

// const addSchema = Joi.object({
//   name: Joi.string().min(2).max(50).required().messages({
//     "string.base": "name must be a string",
//     "string.empty": "name cannot be empty",
//     "string.min": "name must be at least 2 characters",
//     "string.max": "name cannot be more than 50 characters",
//     "any.required": "name is a required field",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.base": "email must be a string",
//     "string.empty": "email cannot be empty",
//     "string.email": "email must be a valid email",
//     "any.required": "email is a required field",
//   }),
//   phone: Joi.string()
//     .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
//     .required()
//     .messages({
//       "string.base": "phone must be a string",
//       "string.empty": "phone cannot be empty",
//       "string.pattern.base": "phone must be in the format (111) 111-1111",
//       "any.required": "phone is a required field",
//     }),
//   favorite: Joi.boolean(),
// });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Trip = model("trip", tripSchema);

module.exports = { Trip, schemas };
