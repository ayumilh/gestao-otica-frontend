import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from './nextAuthOptions';

export const checkSession = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login'); // Redireciona se não estiver logado
  }

  return session;
};
