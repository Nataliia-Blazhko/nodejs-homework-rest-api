const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
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

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find((contact) => contact.id === +contactId)
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find((contact) => contact.id === +contactId)
    const filteredData = parsedData.filter(
      (contact) => contact.id !== +contactId
    )
    await fs.writeFile(contactsPath, JSON.stringify(filteredData))
    return contact
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const newContact = { ...body, id: v4() }
    const contacts = await fs.readFile(contactsPath)
    const parsedContacts = JSON.parse(contacts)
    parsedContacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts))
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
