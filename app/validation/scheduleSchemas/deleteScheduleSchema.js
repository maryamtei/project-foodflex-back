const Joi = require('joi');
const validator = require('../validator')

const deleteScheduleSchema = Joi.object({
    meal_id: Joi.number().integer().required(),
})
module.exports = validator(deleteScheduleSchema)