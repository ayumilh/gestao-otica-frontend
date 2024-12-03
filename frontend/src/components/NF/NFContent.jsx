import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import TitlePage from '../Geral/TitlePage';
import BtnAtivado from '@/components/Geral/Button/BtnAtivado'

const NFContent = () => {
  return (
    <div className="w-full h-screen mt-4 lg:mt-6 lg:px-8 px-5">
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 mx-auto mb-14">
        <div className="flex items-center">
          <NavbarMobile />
          <TitlePage title='Notas Fiscais'/>
        </div>
        <div>
          <BtnAtivado title='Emitir NF' onClick="/clientes/criar" page="/nf/criar" size="sm"/>
        </div>
      </div>

      <div className="mx-auto flex flex-col md:flex-row md:flex-wrap gap-4 justify-center"  style={{height: '850px'}}></div>
    </div>
  );
};

export default NFContent;
