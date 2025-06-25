import BtnBackPage from '@/components/Ui/Button/BtnBackPage';
import FormCriarProduto from '@/components/Produtos/Criar/FormCriarProduto';
import NavbarContent from "@/components/Navbar/NavbarContent";
import NavbarMobile from '@/components/Navbar/Mobile/NavbarMobile';


export default async function Criar() {
  return (
    <div className="w-full flex flex-col lg:flex-row px-4 mt-4">
      <div className="flex items-center">
        <NavbarMobile />
        <NavbarContent />
      </div>

      <div className='w-full flex flex-col justify-center lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8'>
        <BtnBackPage title="Voltar" />
        <div className="w-full flex flex-col items-center mt-6 md:mt-10">
          <FormCriarProduto />
        </div>
      </div>
    </div>
  );
}