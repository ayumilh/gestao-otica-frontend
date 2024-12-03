import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import ClientesContent from "@/components/Clientes/ClientesContent";


export default async function Clientes() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <ClientesContent />
    </main>
  );
}