const Joi = require('joi');

const deleteFavoriteSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
})
module.exports = deleteFavoriteSchema