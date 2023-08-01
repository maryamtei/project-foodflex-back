const Joi = require("joi");
/**
 * @param {string} source - The request property that contains data (e.g., 'query', 'body', 'params').
 * @param {import('joi').Schema} schema - The Joi schema used for validation.
 * @returns {Function} - Express middleware function.
 */
const validator = (source, schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req[source]);
      return next();
    } catch (err) {

      return res.status(400).json({ message: err.details[0].message });
    }
  };
module.exports = validator
