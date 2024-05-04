import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/AuthService'

type Props = {
  children: React.ReactNode
}

export interface AuthData {
  email: string
  password: string
  token: string
}

interface AuthContextData {
  authData?: AuthData
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFromStorage()
  }, [])

  async function loadFromStorage() {
    setLoading(false)
  }

  async function signIn(email: string, password: string) {
    try {
      const auth = await authService.signIn(email, password)

      setAuth(auth)
    } catch (error) {
      console.log('Tente novamente')
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined)

    return
  }

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be user within an AuthProvider')
  }

  return context
}
