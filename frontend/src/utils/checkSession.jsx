'use server'

import { getSession } from '@/lib/auth-api'   // Esse é seu backend-side BetterAuth instance
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const checkSession = async () => {
  try {
    const result = await getSession({
      headers: headers(),
    })

    if (!result?.user) {
      console.warn('Usuário não autenticado, redirecionando...')
      redirect('/login')
    }

    return result.user

  } catch (err) {
    console.error('Erro ao buscar sessão no servidor:', err)
    redirect('/login')
  }
}
