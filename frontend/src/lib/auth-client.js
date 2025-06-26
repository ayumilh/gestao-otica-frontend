'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,  // ✅ Agora é dinâmico por ambiente
  fetchOptions: {
    credentials: 'include',  // ✅ Continua obrigatório pros cookies
  },
});
