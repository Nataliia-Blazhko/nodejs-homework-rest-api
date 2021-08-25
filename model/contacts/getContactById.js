const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find(contact => contact.id == contactId)
    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = getContactById
