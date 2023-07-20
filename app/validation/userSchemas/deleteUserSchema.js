const Joi = require('joi');
const validator = require('../validator')

const deleteUserSchema = Joi.object({
    user_id: Joi.number().integer().required(),
})
module.exports = validator(deleteUserSchema)