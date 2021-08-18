const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const parsedData = JSON.parse(data)
    return parsedData
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find((contact) => contact.id === +contactId)
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const contact = parsedData.find((contact) => contact.id === contactId)
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    const filteredData = parsedData.filter(
      (contact) => contact.id !== contactId
    )
    await fs.writeFile(contactsPath, JSON.stringify(filteredData))
    console.table(filteredData)
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const id =
      parsedData.reduce(
        (accum, item) => (accum > item.id ? accum : item.id),
        0
      ) + 1
    parsedData.push({ id, name, email, phone })
    await fs.writeFile(contactsPath, JSON.stringify(parsedData))
    console.table(parsedData)
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
