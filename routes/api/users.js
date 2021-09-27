const express = require('express')
const { joiSchema } = require('../../models/user')
const { usersController } = require('../../controllers')
const { authenticate, validation, upload } = require('../../middlewares')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, usersController.signup)

router.post('/login', userValidation, usersController.login)

router.post('/logout', authenticate, usersController.logout)
router.get('/current', authenticate, usersController.current)
router.patch(
  '/avatars',
  [authenticate, upload.single('avatar')],
  usersController.updateAvatar,
)

router.get('/verify/:verificationToken', usersController.verify)
router.post('/verify', usersController.resendEmail)

module.exports = router
