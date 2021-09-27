const gravatar = require('gravatar')
const { Conflict } = require('http-errors')
const { v4 } = require('uuid')
const sgMail = require('@sendgrid/mail')

const { User } = require('../../models')

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Email in use')
    }

    const avatarURL = gravatar.url(email)
    const verifyToken = v4()

    const newUser = new User({ email, subscription, avatarURL, verifyToken })
    newUser.setPassword(password)
    await newUser.save()

    sgMail.setApiKey(process.env.EMAIL_TOKEN)

    const verifyLink = `${process.env.HOST}/users/verify/${verifyToken}`

    const msg = {
      to: newUser.email,
      from: 'blazhko.natasha91@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      html: `<strong> Hello New user! </strong><p> Your verification link <a href='${verifyLink}'> go here </a></p>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch(error => {
        console.error(error)
      })

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (error) {
    res.status(409).json(error)
  }
}

module.exports = signup
