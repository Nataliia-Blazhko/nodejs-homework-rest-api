const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
} = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next()
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next()
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.contactId)
    if (deleteContact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { deleteContact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next()
  }
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
