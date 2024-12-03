import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import PdvContent from "@/components/Pdv/PdvContent";

export default async function Pdv() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex max-w-full h-screen mx-auto"> 
      <PdvContent />
    </main>
  );
}