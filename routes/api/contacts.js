const express = require('express')
const { joiContactSchema } = require('../../models')
const { validation } = require('../../middlewares')

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()

const { contactsController } = require('../../controllers')

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getContact)

router.post('/', validationMiddleware, contactsController.addContact)

router.delete('/:contactId', contactsController.deleteContact)

router.put(
  '/:contactId',
  validationMiddleware,
  contactsController.updateContact,
)

router.patch(
  '/:contactId/favorite',
  validationMiddleware,
  contactsController.updateFavoriteContact,
)

module.exports = router
