const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }

    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })
    if (!user) {
      throw new Unauthorized('Not authorized')
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json(error)
  }
}

module.exports = authenticate
