import { checkSession } from '@/utils/checkSession';


import NavbarContent from "@/components/Navbar/NavbarContent";
import LucrosContent from "@/components/Lucros/LucrosContent";


export default async function Lucros() {
  const session = await checkSession();

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <LucrosContent />
    </main>
  );
}