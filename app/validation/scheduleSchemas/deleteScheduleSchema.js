const Joi = require('joi');

const deleteScheduleSchema = Joi.object({
    id: Joi.number().integer().required(),
})
module.exports = deleteScheduleSchema