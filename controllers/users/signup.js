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

    console.log(process.env.EMAIL_TOKEN)
    sgMail.setApiKey(process.env.EMAIL_TOKEN)

    const msg = {
      to: newUser.email, // Change to your recipient
      from: 'blazhko.natasha91@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      html: `<strong>Hello Bitch!</strong><p>Your ferification link <a href='http:localhost:3000/users/verify/${verifyToken}'>go here motherfucker</a></p>`,
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
