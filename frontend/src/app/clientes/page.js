import { checkSession } from '@/utils/checkSession';
import NavbarContent from "@/components/Navbar/NavbarContent";
import ClientesContent from "@/components/Clientes/ClientesContent";


export default async function Clientes() {
  await checkSession();

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <ClientesContent />
    </main>
  );
}