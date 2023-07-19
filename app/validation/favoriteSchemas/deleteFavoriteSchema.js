const Joi = require('joi');
const validator = require('../validator');

const deleteFavoriteSchema = Joi.object({
})
module.exports = validator(deleteFavoriteSchema)