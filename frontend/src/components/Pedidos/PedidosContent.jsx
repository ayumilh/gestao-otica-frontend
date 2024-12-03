'use client'
import { useState } from 'react'
import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import ModalContentPedidos from "./Modal/ModalContentPedidos";
import TitlePage from '../Geral/TitlePage';
import BtnAtivado from '../Geral/Button/BtnAtivado';
import PdvOpenCaixaModal from '../Pdv/Actions/OpenCashModal/PdvOpenCashModal';

const PedidosContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="w-full h-screen mt-4 lg:mt-6 lg:px-8 px-5">
            <div className="w-full xl:max-w-[1264px] flex justify-center items-center h-12 mx-auto mb-14">
                <div className="flex items-center">
                    <NavbarMobile />
                </div>
                <div>
                    <TitlePage title='Pedidos' />
                </div>
                <div className='w-full flex justify-end gap-4 items-end mb-4'>
                    <BtnAtivado title='Frente de caixa' onClick={handleOpenModal} size="sm" rounded="full" />
                    {isModalOpen && (
                        <PdvOpenCaixaModal isOpen={isModalOpen} onClose={handleCloseModal} />
                    )}
                    <ModalContentPedidos />
                </div>
            </div>

            <div className="mx-auto flex flex-col md:flex-row md:flex-wrap gap-4 justify-center" style={{ height: '850px' }}></div>
        </div>
    );
};

export default PedidosContent;
