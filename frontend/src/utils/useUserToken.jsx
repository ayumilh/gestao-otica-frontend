'use client';
import { useSession } from 'next-auth/react';

export function useUserToken() {
  const { data: session } = useSession();
  const token = session?.user?.token || null;

  return { token };
}
