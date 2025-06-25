'use client'

import { useCheckSessionClient } from '@/utils/checkSessionClient'
import NavbarContent from "@/components/Navbar/NavbarContent";
import InicioContent from "@/components/Inicio/InicioContent";

export default function InicioPage() {
  // const loading = useCheckSessionClient()

  // if (loading) {
  //   return <p>🔄 Verificando sessão...</p>
  // }
  
  return (
    <main className="flex max-w-full h-screen">
      <NavbarContent />
      <InicioContent />
    </main>
  )
}
