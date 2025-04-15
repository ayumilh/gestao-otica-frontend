import { redirect } from 'next/navigation';
import FormEditarClientes from '@/components/Clientes/Editar/FormEditarClientes';

import { checkSession } from '@/utils/checkSession';

import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import NavbarMobile from '@/components/Navbar/Mobile/NavbarMobile';
import NavbarContent from "@/components/Navbar/NavbarContent";
import FormEditarVendas from '@/components/Vendas/Editar/FormEditarVendas';

export default async function Editar({ searchParams }) {
  const session = await checkSession();

  const cliId = searchParams?.id;

  if (!cliId) {
    redirect('/vendas');
  }

  return (
    <div className="w-full flex flex-col lg:flex-row px-4 mt-4">
      <div className="flex items-center">
        <NavbarMobile />
        <NavbarContent />
      </div>

      <div className='w-full flex flex-col justify-center lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8'>
        <BtnBackPage title="Editar Venda" />
        <div className="w-full flex flex-col items-center mt-6 md:mt-10">

          <FormEditarVendas cliId={cliId} />
        </div>
      </div>
    </div>
  );
}