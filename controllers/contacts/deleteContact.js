const { Contact } = require('../../models')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deletedContact = await Contact.findByIdAndDelete(contactId)
    if (deletedContact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { deletedContact },
        message: 'contact deleted',
      })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
