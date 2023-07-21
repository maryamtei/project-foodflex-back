const Joi = require('joi');

const deleteUserSchema = Joi.object({
    user_id: Joi.number().integer().required(),
})
module.exports = deleteUserSchema