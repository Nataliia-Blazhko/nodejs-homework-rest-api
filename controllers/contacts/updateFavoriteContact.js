const { Contact } = require('../../models')

const updateFavoriteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    if (favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }
    const updatedFavoriteContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    )
    if (!updatedFavoriteContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    res.status(200).json({
      contact: updatedFavoriteContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateFavoriteContact
