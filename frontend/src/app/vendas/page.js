import { checkSession } from '@/utils/checkSession';

import NavbarContent from "@/components/Navbar/NavbarContent";
import VendasContent from "@/components/Vendas/VendasContent";


export default async function Vendas() {
  await checkSession();

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <VendasContent />
    </main>
  );
}