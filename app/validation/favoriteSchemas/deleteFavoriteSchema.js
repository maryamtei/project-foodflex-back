const Joi = require('joi');
const validator = require('../validator');

const deleteFavoriteSchema = Joi.object({
    meal_id: Joi.number().integer().min(1).required(),
    user_id: Joi.number().integer().min(1).required(),
})
module.exports = validator(deleteFavoriteSchema)