import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import PedidosContent from "@/components/Pedidos/PedidosContent";


export default async function Pedidos() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly lg:justify-between"> 
      <NavbarContent />
      <PedidosContent />
    </main>
  );
}