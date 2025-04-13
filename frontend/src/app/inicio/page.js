import { checkSession } from '@/utils/checkSession';
import NavbarContent from "@/components/Navbar/NavbarContent";
import InicioContent from "@/components/Inicio/InicioContent";

export default async function Inicio() {
  const session = await checkSession();

  return (
    <main className="flex max-w-full h-screen"> 
      <NavbarContent />
      <InicioContent />
    </main>
  );
}