const express = require('express')
const router = express.Router()

const { contactsController } = require('../../controllers')

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getContact)

router.post('/', contactsController.addContact)

router.delete('/:contactId', contactsController.deleteContact)

router.put('/:contactId', contactsController.updateContact)

module.exports = router
