const Joi = require('joi');

const modifyUserSchema = Joi.object({
    firstName: Joi.string().max(64).required(),
    lastName: Joi.string().max(64).required(),
    email: Joi.string().required(),
})

module.exports = modifyUserSchema
