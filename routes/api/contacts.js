const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require('../../model')

router.get('/', async (req, res, next) => {
  // // res.json({ message: 'template message' })
  // console.log(await listContacts())
  res.json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  // res.json(req)
  // console.log(await req)
  res.json(await getContactById(req.params.contactId))
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
