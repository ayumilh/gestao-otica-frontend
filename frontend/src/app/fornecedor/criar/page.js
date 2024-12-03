import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import { FormCriarFornecedor } from '@/components/Fornecedor/Criar/FormCriarFornecedor';
import NavbarMobile from '@/components/Navbar/Mobile/NavbarMobile';
import NavbarContent from "@/components/Navbar/NavbarContent";

export default async function Editar() {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <div className="w-full flex flex-col lg:flex-row px-4 mt-4">
      <div className="flex items-center">
        <NavbarMobile />
        <NavbarContent />
      </div>

      <div className='w-full flex flex-col justify-center lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8'>
        <BtnBackPage title="Voltar" />
        <div className="w-full flex flex-col items-center mt-6 md:mt-10">
          <FormCriarFornecedor />
        </div>
      </div>
    </div>
  );
}