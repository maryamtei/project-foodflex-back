const apiError = require('../errors/apiErrors');

const validator = (source, schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req[source]);
      return next();
    } catch (err) {
      throw new apiError('Internal error ', { statusCode: 401 })
    }
  };
module.exports = validator
