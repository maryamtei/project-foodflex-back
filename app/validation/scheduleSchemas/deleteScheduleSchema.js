const Joi = require('joi');
const validator = require('../validator')

const deleteScheduleSchema = Joi.object({
})
module.exports = validator(deleteScheduleSchema)