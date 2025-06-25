'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/auth-api'

export const useCheckSessionClient = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession()

        if (!session || !session.user) {
          console.warn('⚠️ Sessão inválida ou expirada. Redirecionando para login...')
          router.replace('/login')
        } else {
          console.log('✅ Sessão válida:', session)
        }
      } catch (error) {
        console.error('❌ Erro ao verificar sessão:', error)
        router.replace('/login')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  return loading
}
