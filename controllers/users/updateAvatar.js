const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  try {
    const id = req.user._id
    const { path: tempPath, originalname } = req.file
    const newName = `${Date.now()}_${id.toString()}_${originalname}`
    const uploadPath = path.join(avatarDir, newName)

    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)
    await fs.rename(tempPath, uploadPath)

    const avatarURL = `/avatars/${newName}`

    await User.findByIdAndUpdate(id, { avatarURL })
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateAvatar
