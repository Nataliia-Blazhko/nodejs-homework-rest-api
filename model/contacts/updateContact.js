const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const index = contacts.findIndex(contact => contact.id == contactId)
    if (index === -1) {
      return null
    }
    contacts[index] = { ...contacts[index], ...body }
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[index]
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateContact
