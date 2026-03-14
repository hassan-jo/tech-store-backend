const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (input) => {

  if (typeof input !== "string") return "";

  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();

};

const validateRegister = (req, res, next) => {

  req.body.username = sanitizeInput(req.body.username);
  req.body.email = sanitizeInput(req.body.email);

  const schema = Joi.object({

    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(8)
      .required()

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

const validateLogin = (req, res, next) => {

  req.body.email = sanitizeInput(req.body.email);

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
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
  validateRegister,
  validateLogin
};