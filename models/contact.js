const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const phoneRegExp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegExp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true, retainKeyOrder: true },
)

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegExp),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema }
