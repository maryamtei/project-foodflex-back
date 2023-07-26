const Joi = require('joi');

const submitFormSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string().required(),
    message: Joi.string().min(1).required(),
})
module.exports = submitFormSchema