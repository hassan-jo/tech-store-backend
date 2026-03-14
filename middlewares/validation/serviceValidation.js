const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

/* =========================
   Helper
========================= */

const sanitizeInput = (input) => {

  if (typeof input !== "string") return "";

  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();

};

/* =========================
   Create Service
========================= */

const validateCreateService = (req, res, next) => {

  try {

    if (req.body.name)
      req.body.name = sanitizeInput(req.body.name);

    if (req.body.description)
      req.body.description = sanitizeInput(req.body.description);

    const schema = Joi.object({

      name: Joi.string()
        .min(3)
        .max(100)
        .required(),

      description: Joi.string()
        .min(3)
        .required(),

      price: Joi.number()
        .min(0)
        .required(),

      category: Joi.string()
        .hex()
        .length(24)
        .required(),

      stock: Joi.number()
        .min(0)
        .optional(),

      images: Joi.array()
        .items(Joi.string().uri({ scheme: [/https?/] }))
        .optional(),

      filterid: Joi.number()
        .valid(1, 2)
        .required()

    }).unknown(false);

    const { error } = schema.validate(req.body, {
      convert: false
    });

    if (error) {

      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });

    }

    next();

  } catch (err) {
    next(err);
  }

};

/* =========================
   Update Service
========================= */

const validateUpdateService = (req, res, next) => {

  try {

    if (req.body.name)
      req.body.name = sanitizeInput(req.body.name);

    if (req.body.description)
      req.body.description = sanitizeInput(req.body.description);

    const schema = Joi.object({

      name: Joi.string()
        .min(3)
        .max(100)
        .optional(),

      description: Joi.string()
        .min(3)
        .optional(),

      price: Joi.number()
        .min(0)
        .optional(),

      category: Joi.string()
        .hex()
        .length(24)
        .optional(),

      stock: Joi.number()
        .min(0)
        .optional(),

      images: Joi.array()
        .items(Joi.string().uri({ scheme: [/https?/] }))
        .optional(),

      filterid: Joi.number()
        .valid(1, 2)
        .optional()

    })
    .min(1)
    .unknown(false);

    const { error } = schema.validate(req.body, {
      convert: false
    });

    if (error) {

      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });

    }

    next();

  } catch (err) {
    next(err);
  }

};

module.exports = {
  validateCreateService,
  validateUpdateService
};