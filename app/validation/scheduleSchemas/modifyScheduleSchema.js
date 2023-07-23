const Joi = require('joi');

const modifyScheduleSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    schedule_id: Joi.number().integer().required(),
    meals: Joi.object({

        idDbMeal: Joi.number().integer().min(1).required(),
        name: Joi.string().required(),
        imageUrl: Joi.string().required(),
        position: Joi.number().integer().min(1).required(),
    }).required()
})
module.exports = modifyScheduleSchema