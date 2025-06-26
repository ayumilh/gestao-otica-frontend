'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: `http://localhost:4000/api/auth`,  // ✅ URL do backend
  fetchOptions: {
    credentials: 'include',  // ✅ ESSENCIAL para envio e recebimento de cookies
  },
});
