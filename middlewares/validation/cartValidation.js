const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
};

const validateAddToCart = (req, res, next) => {

  req.body.serviceId = sanitizeInput(req.body.serviceId);

  if (typeof req.body.serviceId !== "string" || typeof req.body.quantity !== "number") {
    return res.status(400).json({
      success: false,
      message: "Invalid input type"
    });
  }

  const schema = Joi.object({

    serviceId: Joi.string()
      .hex()
      .length(24)
      .required(),

    quantity: Joi.number()
      .valid(1, -1)
      .required(),

  });

  const { error } = schema.validate(req.body);

  if (error) {

    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });

  }

  next();
};

module.exports = {
  validateAddToCart
};