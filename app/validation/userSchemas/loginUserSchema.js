const Joi = require('joi');
const validator = require('../validator')

const loginSchema = Joi.object({
})
module.exports = validator(loginSchema)