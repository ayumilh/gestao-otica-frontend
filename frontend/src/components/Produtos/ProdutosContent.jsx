import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import ProdutosTable from "./ProdutosTable";
import TitlePage from '../Geral/TitlePage';
import BtnAtivado from '@/components/Geral/Button/BtnAtivado'

const ProdutosContent = () => {
    return (
        <div className="w-full px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center">
            <div className="w-full lg:w-[800px] xl:w-[1270px] flex justify-between items-center h-12 pt-5">
                <div className="flex items-center">
                    <NavbarMobile />
                    <TitlePage title='Produtos' />
                </div>
                <div>
                    <BtnAtivado title='Novo produto' onClick="/produtos/criar" page="/produtos/criar" size="sm" />
                </div>
            </div>
            <div className="w-full flex flex-col items-center" style={{ height: '850px' }}>
                <ProdutosTable />
            </div>
        </div>
    );
};

export default ProdutosContent;
