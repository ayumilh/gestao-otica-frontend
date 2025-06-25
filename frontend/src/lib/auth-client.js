'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: `https://e287-2804-1b1-fd80-bfa-bd80-eaf4-1339-ee77.ngrok-free.app/api/auth`,  // ✅ URL do backend
  fetchOptions: {
    credentials: 'include',  // ✅ ESSENCIAL para envio e recebimento de cookies
  },
});
