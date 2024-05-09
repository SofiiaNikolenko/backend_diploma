const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (req.method === "PUT" && Object.keys(req.body).length === 0) {
      return next(HttpError(400, "missing fields"));
    }

    if (req.method === "PATCH" && Object.keys(req.body).length === 0) {
      return next(HttpError(400, "missing field favorite"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      const errorMessage = `missing required ${missingField} field`;
      return next(HttpError(400, errorMessage));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
