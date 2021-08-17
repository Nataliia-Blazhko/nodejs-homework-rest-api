const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    return parsedData
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
