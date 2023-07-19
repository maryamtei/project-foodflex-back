const Joi = require('joi');

const validator = require('../validator')
const addFavoriteSchema = Joi.object({
})
module.exports = validator(addFavoriteSchema)