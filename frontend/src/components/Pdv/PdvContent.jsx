'use client'
import { useState } from "react";
import PdvMenuHeader from "./Actions/PdvMenuHeader";
import { PdvTable } from "./PdvTable";
import { PdvSessoes } from "./PdvSessoes";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PdvCloseCashModal from "./Actions/CloseCashModal/PdvCloseCashModal";


const PdvContent = () => {
  const [produtos, setProdutos] = useState([]);;
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const adicionarProduto = (novoProduto) => {
    setProdutos((prevState) => [...prevState, novoProduto]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full px-5 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-7 xl:flex xl:flex-col xl:items-center gap-10">
      <div className="w-full bg-segundaria-900 shadow-md rounded-lg flex justify-between items-center px-5 py-2">
        <h2 className="text-xl text-white font-semibold">Venda</h2>
        <div className="flex items-center justify-center">
          <PdvMenuHeader />
          <button type='button' onClick={handleOpenModal} className="hover:bg-opacity-15 bg-gray-500 bg-opacity-0 rounded-full p-2 transition duration-500 ease-in-out">
            <ExitToAppIcon className='text-white'/>
          </button>
          {setIsModalOpen && (
            <PdvCloseCashModal isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-start px-3 xl:px-20">
        <div className="bg-gray-200 w-full shadow-sm rounded-lg px-5 py-6 mt-8 xl:mt-0 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-3">
              <span className="text-orange-400 font-medium text-lg xl:text-2xl">
                {produtos.length > 0 ? `${produtos[produtos.length - 1].quantidade} X` : '0 X'}
              </span>
              <span className="text-orange-400 font-medium text-lg xl:text-2xl">CARVÃO ECOLÓGICO 4KG</span>
            </div>

            <div className="flex justity-between md:gap-10 xl:gap-40 mt-2">
              {/* Quantidade */}
              <div>
                <div className="px-3 flex items-center justify-center">
                  <span className="font-medium text-neutral-700 text-lg">Quantidade</span>
                </div>
                <div className="w-full px-3 flex items-center justify-center">
                  <span className="text-xl font-sans text-neutral-800 font-medium">{produtos.length > 0 ? `${produtos[produtos.length - 1].quantidade}` : '0'}</span>
                </div>
              </div>
              <span className="text-xl text-neutral-800 font-medium">X</span>
              {/* preço Unitario */}
              <div>
                <div className="px-3 flex items-center justify-center">
                  <span className="font-medium text-neutral-700 text-lg">Preço unitário</span>
                </div>
                <div className="w-full px-3 flex items-center justify-center">
                  <span className="text-xl font-sans text-neutral-800 font-medium">{produtos.length > 0 ? `R$ ${produtos[produtos.length - 1].preco_unitario}` : 'R$ 0'}</span>
                </div>
              </div>
              <span className="text-xl text-neutral-800 font-medium">=</span>
              {/* preço total */}
              <div>
                <div className="px-3 flex items-center justify-center">
                  <span className="font-medium text-neutral-700 text-lg">Preço total</span>
                </div>
                <div className="w-full px-3 flex items-center justify-center">
                  <span className="text-xl font-sans text-neutral-800 font-medium"> R$ {produtos.length > 0 ? (produtos[produtos.length - 1].quantidade * produtos[produtos.length - 1].preco_unitario).toFixed(2) : '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row gap-10 items-start mt-12">
          <PdvTable produto={produtos}  />
          <PdvSessoes adicionarProduto={adicionarProduto} />
        </div>
      </div>

    </div>
  );
};

export default PdvContent;
