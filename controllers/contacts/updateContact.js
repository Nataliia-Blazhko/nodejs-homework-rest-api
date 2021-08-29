const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
      },
    )
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
