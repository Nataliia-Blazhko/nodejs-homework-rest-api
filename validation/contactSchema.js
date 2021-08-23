const Joi = require('joi')

const phoneRegEx = '^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$'

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().pattern(new RegExp(phoneRegEx)).required(),
})

module.exports = joiContactSchema
