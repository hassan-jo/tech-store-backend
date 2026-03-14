const Joi = require("joi");

const validatePagination = (req, res, next) => {

  try {

    const schema = Joi.object({

      page: Joi.number()
        .integer()
        .min(1)
        .max(1000)
        .optional(),

      limit: Joi.number()
        .integer()
        .min(1)
        .max(1000)
        .optional(),

      search: Joi.string()
        .allow("")
        .optional(),

      sort: Joi.string()
        .optional(),

      category: Joi.string()
        .hex()
        .length(24)
        .optional()

    });

    const { error } = schema.validate(req.query, {
      allowUnknown: true
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

module.exports = validatePagination;