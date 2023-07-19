const Joi = require('joi');
const validator = require('../validator')

const deleteUserSchema = Joi.object({
})
module.exports = validator(deleteUserSchema)