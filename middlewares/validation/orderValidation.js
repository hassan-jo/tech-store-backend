const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
};

const validateCheckout = (req, res, next) => {

  if (req.body.note) req.body.note = sanitizeInput(req.body.note);

  const schema = Joi.object({
    note: Joi.string().max(500).optional()
  });

  const { error } = schema.validate(req.body, { convert: false });

  if (error) {

    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });

  }

  next();
};

const validateOrderUpdate = (req, res, next) => {

  if (req.body.status) req.body.status = sanitizeInput(req.body.status);

  const schema = Joi.object({

    status: Joi.string()
      .valid("pending", "paid", "completed", "cancelled")
      .required()

  });

  const { error } = schema.validate(req.body, { convert: false });

  if (error) {

    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });

  }

  next();
};

module.exports = {
  validateCheckout,
  validateOrderUpdate
};