import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import VendasContent from "@/components/Vendas/VendasContent";


export default async function Vendas() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <VendasContent />
    </main>
  );
}