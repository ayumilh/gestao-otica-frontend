import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import NavbarContent from "@/components/Navbar/NavbarContent";
import NFContent from "@/components/NF/NFContent";


export default async function NF() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly lg:justify-between"> 
      <NavbarContent />
      <NFContent />
    </main>
  );
}