const { contactsModel } = require('../../model')

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
