import { checkSession } from '@/utils/checkSession';

import BtnBackPage from '@/components/Ui/Button/BtnBackPage';
import FormCriarOs from '@/components/Os/FormCriarOs';
import NavbarMobile from '@/components/Navbar/Mobile/NavbarMobile';
import NavbarContent from "@/components/Navbar/NavbarContent";


export default async function Os() {
  const session = await checkSession();


  return (        
    <div className="w-full flex flex-col lg:flex-row px-4 mt-4">
      <div className="flex items-center">
        <NavbarMobile />
        <NavbarContent />
      </div>
      
      <div className='w-full flex flex-col justify-center lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8'>
        <BtnBackPage title="Criar uma Ordem de Serviço" />
        <div className="w-full flex flex-col items-center mt-6 md:mt-10">
          <FormCriarOs />
        </div>
      </div>
    </div>
  );
}