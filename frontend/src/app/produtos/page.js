import { checkSession } from '@/utils/checkSession';

import NavbarContent from "@/components/Navbar/NavbarContent";
import ProdutosContent from "@/components/Produtos/ProdutosContent";


export default async function Produtos() {
  const session = await checkSession();

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <ProdutosContent />
    </main>
  );
}