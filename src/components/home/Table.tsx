'use client'
import { useEffect, useState } from 'react'
import { database } from '@/services/firebase'
import { MdDelete, MdCreate, MdSave } from 'react-icons/md'

interface Contact {
  id: string
  name: string
  email: string
  telephone: string
  message: string
  selected: boolean
}

export default function Table() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [editingContactId, setEditingContactId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState<string>('')
  const [editedEmail, setEditedEmail] = useState<string>('')
  const [editedTelephone, setEditedTelephone] = useState<string>('')
  const [editedMessage, setEditedMessage] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([])
  const [showPopup, setShowPopup] = useState<boolean>(false)

  useEffect(() => {
    const contactsRef = database.ref('contacts')

    const handleData = (snapshot: any) => {
      const contactsData = snapshot.val()
      const contactsList: Contact[] = []

      for (let id in contactsData) {
        contactsList.push({ id, ...contactsData[id], selected: false })
      }

      setContacts(contactsList)
    }

    contactsRef.on('value', handleData)

    return () => {
      contactsRef.off('value', handleData)
    }
  }, [])

  const deleteContact = (id: string) => {
    const contactRef = database.ref(`contacts/${id}`)
    contactRef.remove()
  }

  const editContact = (contact: Contact) => {
    setEditingContactId(contact.id)
    setEditedName(contact.name)
    setEditedEmail(contact.email)
    setEditedTelephone(contact.telephone)
    setEditedMessage(contact.message)
    setIsEditing(true)
  }

  const saveEditedContact = () => {
    if (editingContactId) {
      const contactRef = database.ref(`contacts/${editingContactId}`)
      contactRef.update({
        name: editedName,
        email: editedEmail,
        telephone: editedTelephone,
        message: editedMessage,
      })

      setEditingContactId(null)
      setIsEditing(false)
    }
  }

  const toggleSelectContact = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, selected: !contact.selected }
          : contact,
      ),
    )
  }

  useEffect(() => {
    setSelectedContacts(contacts.filter((contact) => contact.selected))
    if (selectedContacts.length === 4) {
      setShowPopup(true)
    } else {
      setShowPopup(false)
    }
  }, [contacts])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  async function notificarCliente() {
    try {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/send`, {
        body: JSON.stringify('joaoalves.cs@gmail.com'),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendMessage = () => {
    notificarCliente()
    setShowPopup(false)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-mail
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Celular
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mensagem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isEditing ? 'Salvar' : 'Editar'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apagar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Selecionar
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    value={editedTelephone}
                    onChange={(e) => setEditedTelephone(e.target.value)}
                  />
                ) : (
                  contact.telephone
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingContactId === contact.id ? (
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                ) : (
                  contact.message
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingContactId === contact.id ? (
                  <MdSave size={24} onClick={saveEditedContact} />
                ) : (
                  <MdCreate size={24} onClick={() => editContact(contact)} />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <MdDelete size={24} onClick={() => deleteContact(contact.id)} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={contact.selected}
                  onChange={() => toggleSelectContact(contact.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Enviar mensagem para os contatos selecionados
            </h2>
            <p className="mb-4">
              Você selecionou 5 contatos. Deseja enviar uma mensagem para eles?
            </p>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
                placeholder="Digite sua mensagem"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
                onClick={handleSendMessage}
              >
                Enviar
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                onClick={handleClosePopup}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
