const { contactsModel } = require('../../model')

const deleteContact = async (req, res, next) => {
  try {
    const deleteContact = await contactsModel.removeContact(
      req.params.contactId,
    )
    if (deleteContact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { deleteContact },
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
