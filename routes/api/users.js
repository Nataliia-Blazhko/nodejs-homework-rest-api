const express = require('express')
const { joiSchema } = require('../../models/user')
const { usersController } = require('../../controllers')
const { authenticate, validation } = require('../../middlewares')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, usersController.signup)

router.post('/login', userValidation, usersController.login)

router.post('/logout', authenticate, usersController.logout)
router.get('/current', authenticate, usersController.current)
module.exports = router
