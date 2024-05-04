import { AuthData } from '../contexts/Auth'

function signIn(email: string, password: string): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === '123@email.com' && password === '123') {
        resolve({
          token: 'kdkdkddk',
          email: '1001',
          password: 'joao1234',
        })
      } else {
        reject(new Error('credenciais inválidas!'))
      }
    }, 500)
  })
}

export const authService = { signIn }
