const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')
const { v4 } = require('uuid')

const addContact = async body => {
  try {
    const newContact = { id: v4(), ...body }
    const contacts = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(contacts)
    parsedContacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts))
    return newContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact
