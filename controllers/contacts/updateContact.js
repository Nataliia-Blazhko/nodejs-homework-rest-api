const { contactsModel } = require('../../model')
const { contactSchema } = require('../../validation')

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
    const updatedContact = await contactsModel.updateContact(
      req.params.contactId,
      req.body,
    )
    console.log(updatedContact)
    if (!updatedContact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { updatedContact } })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
