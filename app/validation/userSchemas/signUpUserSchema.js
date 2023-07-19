const Joi = require('joi');
const validator = require('../validator')

const signUpSchema = Joi.object({
})
module.exports = validator(signUpSchema)