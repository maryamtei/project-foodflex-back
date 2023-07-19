const Joi = require('joi');
const validator = require('../validator')

const modifyUserSchema = Joi.object({
})
module.exports = validator(modifyUserSchema)