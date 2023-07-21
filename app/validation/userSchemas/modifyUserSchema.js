/*
const Joi = require('joi');
const validator = require('../validator')

const modifyUserSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    firstName: Joi.string().max(64).required(),
    lastName: Joi.string().max(64).required(),
    email: Joi.string().required(),
    password: Joi.string().min(1).max(64).required(),
})
module.exports = validator(modifyUserSchema)
*/