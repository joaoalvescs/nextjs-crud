// pages/api/auth/google.js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'

const database = firebase.database()

export default async (req, res) => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user // Acesso ao usuário autenticado
    const token = await user.getIdToken() // Obtenha o token de acesso usando getIdToken()
    res.status(200).json({ token })
  } catch (error) {
    console.error('Error signing in with Google:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
