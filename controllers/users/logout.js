const { User } = require('../../models')

const logout = async (req, res, next) => {
  try {
    const { user } = req
    console.log('')
    await User.updateOne({ _id: user._id }, { token: null })
    res.status(204).json({
      message: 'Logout success',
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = logout
