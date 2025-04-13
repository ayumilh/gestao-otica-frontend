'use client';
import { useSession } from "next-auth/react";

export const searchUserId = () => {
  const { data: session } = useSession();

  try {
    const token = session?.user?.token || null;
    return token;
  } catch (error) {
    console.error("Erro ao buscar o token do usuário via NextAuth:", error);
    return null;
  }
};
