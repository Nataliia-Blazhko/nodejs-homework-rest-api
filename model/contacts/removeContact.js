const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find(contact => contact.id == contactId)
    const filteredData = parsedData.filter(contact => contact.id != contactId)
    await fs.writeFile(contactsPath, JSON.stringify(filteredData))
    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact
