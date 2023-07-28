const Joi = require("joi");

const validator = (source, schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req[source]);
      return next();
    } catch (err) {

      return res.status(400).json({ message: err.details[0].message });
    }
  };
module.exports = validator
