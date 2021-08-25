const { contactsModel } = require('../../model')
const { contactSchema } = require('../../validation')

const addContact = async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
    const newContact = await contactsModel.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { newContact } })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
