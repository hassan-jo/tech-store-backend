const sanitizeHtml = require("sanitize-html");

const sanitizeMiddleware = (req, res, next) => {

  const options = {
    allowedTags: [],
    allowedAttributes: {},
  };

  const clean = (input) => {
    if (typeof input !== "string") return input;
    return sanitizeHtml(input, options).trim();
  };

  if (req.body && typeof req.body === "object") {

    Object.keys(req.body).forEach(key => {

      if (typeof req.body[key] === "string") {
        req.body[key] = clean(req.body[key]);
      }

    });

  }

  req.cleanQuery = {};

  if (req.query) {

    Object.keys(req.query).forEach(key => {
      req.cleanQuery[key] = clean(req.query[key]);
    });

  }

  req.cleanParams = {};

  if (req.params) {

    Object.keys(req.params).forEach(key => {
      req.cleanParams[key] = clean(req.params[key]);
    });

  }

  next();
};

module.exports = sanitizeMiddleware;