const Joi = require('joi');
const validator = require('../validator')

const addFavoriteSchema = Joi.object({
    user_id: Joi.number().integer().min(1).required(),
    idMeal: Joi.string().min(1).required(),
    name: Joi.string().required(),
    imageUrl: Joi.string().required(),
    position: Joi.number().integer().optional(),
})
module.exports = addFavoriteSchema;