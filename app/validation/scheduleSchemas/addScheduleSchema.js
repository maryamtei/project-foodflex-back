const Joi = require('joi');

const addScheduleSchema = Joi.object({
    week: Joi.number().integer().required(),
    meals: Joi.object({
        idDbMeal: Joi.string().min(1).required(),
        name: Joi.string().required(),
        image: Joi.string().required(),
        position: Joi.number().integer().min(0).optional(),
    }).required()
})
module.exports = addScheduleSchema
