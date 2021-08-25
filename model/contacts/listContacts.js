const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error)
  }
}

module.exports = listContacts
