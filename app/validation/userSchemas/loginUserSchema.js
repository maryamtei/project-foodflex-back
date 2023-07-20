const Joi = require('joi');
const validator = require('../validator')

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(1).max(64).required(),
})
module.exports = validator(loginSchema)