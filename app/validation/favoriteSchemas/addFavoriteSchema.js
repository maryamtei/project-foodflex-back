const Joi = require('joi');

const addFavoriteSchema = Joi.object({
    //user_id: Joi.number().integer().min(1).required(),
    id: Joi.number().integer().min(0).optional(),
    idDbMeal: Joi.string().min(1).required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    position: Joi.number().required(),
})
module.exports = addFavoriteSchema;