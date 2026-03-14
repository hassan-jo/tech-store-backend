const sanitize = (req, res, next) => {

  req.sanitizedQuery = req.query || {};

  req.sanitizedParams = req.params || {};

  next();

};

module.exports = sanitize;