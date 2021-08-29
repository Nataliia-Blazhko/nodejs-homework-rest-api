const { Contact } = require('../../models')

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = getContact
