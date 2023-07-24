const Joi = require('joi');

const addScheduleSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    week: Joi.number().integer().required(),
    meals: Joi.array().items(Joi.object({
        idDbMeal: Joi.number().integer().min(1).required(),
        schedule_id: Joi.number().integer().required(),
        name: Joi.string().required(),
        image: Joi.string().required(),
        position: Joi.number().integer().min(1).optional(),
    })).required()
})
module.exports = addScheduleSchema
