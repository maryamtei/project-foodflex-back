const Joi = require('joi');

const addFavoriteSchema = Joi.object({
    id: Joi.number().integer().min(0).required(),
    idDbMeal: Joi.string().min(1).required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    position: Joi.number().required(),
})
module.exports = addFavoriteSchema;