const Joi = require('joi');

const deleteScheduleSchema = Joi.object({
    meal_id: Joi.number().integer().required(),
})
module.exports = deleteScheduleSchema