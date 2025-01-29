import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import BtnAtivado from '@/components/Geral/Button/BtnAtivado'
import TitlePage from '../Geral/TitlePage';
import LucrosTable from "./LucrosTable";

const LucrosContent = () => {
  return (
    <div className="w-full px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center">
      <div className="w-full lg:w-[800px] xl:w-[1270px] flex justify-between items-center h-12 pt-5">
        <div className="flex items-center">
          <NavbarMobile />
          <TitlePage title='Lucros'/>
        </div>
        <div>
          <BtnAtivado title='Novo Lucro' onClick="/lucros/criar" page="/lucros/criar" size="sm"/>
        </div>
      </div>
      <div className="w-full flex flex-col items-center" style={{height: '850px'}}>
        <LucrosTable />
      </div>
    </div>
  );
};

export default LucrosContent;
