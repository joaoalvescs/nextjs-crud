'use client'

import { FormEvent, useState } from 'react'
import { database } from '@/services/firebase'
import Sidebar from '@/components/layout/SideBar'
import 'firebase/firestore'

export default function User() {
  const [name, setName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function saveContact(event: FormEvent) {
    event.preventDefault()

    const contactsRef = database.ref('contacts')

    await contactsRef.push({
      name,
      telephone,
      email,
      message,
    })

    setName('')
    setTelephone('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="flex">
      <Sidebar />
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={saveContact}
      >
        <h1 className="text-2xl font-bold mb-4">Adicionar Contato</h1>
        <div className="w-80">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-indigo-500"
              placeholder="Digite seu telefone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  )
}
