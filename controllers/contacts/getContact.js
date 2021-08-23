const { contactsModel } = require('../../model')

const getContact = async (req, res, next) => {
  try {
    const contact = await contactsModel.getContactById(req.params.contactId)
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
