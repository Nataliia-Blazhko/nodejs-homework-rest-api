const { BadRequest, NotFound } = require('http-errors')
const { User } = require('../../models')
const sgMail = require('@sendgrid/mail')

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      throw new BadRequest('missing required field email')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFound('Sorry, User with this credentials not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }

    sgMail.setApiKey(process.env.EMAIL_TOKEN)

    const msg = {
      to: user.email,
      from: 'blazhko.natasha91@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      html: `<strong> Hello New user! </strong><p> Your verification link <a href='http:localhost:3000/users/verify/${user.verifyToken}'> go here </a></p>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch(error => {
        console.error(error)
      })

    res.status(200).json({
      message: 'Verification email sent',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = resendEmail
