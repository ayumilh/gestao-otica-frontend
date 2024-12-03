'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IoClose } from "react-icons/io5";
import ErrorNotification from '../../../Geral/Notification/ErrorNotification';
import { IoAdd } from "react-icons/io5";
import { PdvOpenCashForm } from './PdvOpenCashForm';

const PdvOpenCaixaModal = ({ isOpen, onClose }) => {
  const [statusRequestOpenPdv, setStatusRequestOpenPdv] = useState(null);
  const [caixas, setCaixas] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCaixas = async () => {
      try {
        const response = await axios.get('https://pos-backend-six.vercel.app/api/caixa/get/caixas');
        setCaixas(response.data.caixas);
      } catch (error) {
        console.error("Erro ao buscar caixas:", error);
      }
    };
  
    fetchCaixas();
  }, []);

  const [showForm, setShowForm] = useState(false);

  const handleContinuarVendendo = async (caixaCodigo) => {
    const caixa_codigo = caixaCodigo;
    try {
      const response = await axios.get(`https://pos-backend-six.vercel.app/api/caixa/get/conferencia/${caixa_codigo}`);
      localStorage.setItem('caixa_codigo', caixa_codigo);
      router.push(`/pdv`);
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
    }
  };

  const handleClick = () => {
    setShowForm(true);
  };

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="max-w-screen-sm bg-white rounded-lg px-4 lg:px-7 pt-4 lg:pt-7 pb-6 lg:pb-10 mx-3 xl:mx-0 flex justify-end flex-col items-center">
        <div className='w-full flex justify-between gap-20'>
          <div>
            <h2 className='text-orange-400 font-bold text-lg lg:text-2xl'>Bem vindo ao frente de caixa!</h2>
          </div>  
          <div> 
            <button type="button" onClick={onClose}>
              <IoClose className='text-3xl text-neutral-700 hover:text-black cursor-pointer active:scale-105 transition duration-500 ease-in-out'/> 
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <button          
            className="mt-3 transition duration-1000 ease-in-out"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
          >
            <IoAdd className='text-segundaria-900 text-3xl'/>
          </button>
          <div 
            className={`absolute whitespace-nowrap top-full px-2 py-1 bg-gray-200 text-neutral-700 font-medium text-sm rounded transition-opacity duration-500 ease-in-out ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
          >
            Criar novo caixa
          </div>
          {showForm ? (
            <PdvOpenCashForm setStatusRequestOpenPdv={setStatusRequestOpenPdv}/>
          ) : (
            <div className="w-full flex flex-wrap overflow-y-auto mt-2" style={{ maxHeight: "400px" }}>
              {caixas.map((caixa) => (
                <div key={caixa.caixa_codigo} className="h-max w-full md:w-2/4 xl:w-full px-2 my-1 py-2">
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:scale-105 transition duration-1000 ease-in-out">
                    <div className='w-full'>
                      <h3 className='text-neutral-800 font-semibold'>{caixa.caixa_nome}</h3>
                    </div>
                    <div className='px-1 mt-1'>
                      <p className={`text-neutral-700 font-medium ${caixa.caixa_aberto ? 'text-green-500' : 'text-red-500'}`}>
                        {caixa.caixa_aberto ? 'Caixa aberto' : 'Caixa fechado'}
                      </p>
                      <p className='text-neutral-700 font-medium'>Funcionário: {caixa.func_nome}</p>
                    </div>
                    <div className='flex justify-end items-center pt-4'>
                      <button          
                        className="gap-1 rounded-md text-white text-sm font-medium bg-orange-400 hover:bg-segundaria-900 active:scale-90 active:bg-segundaria-900 active:ring active:ring-orange-400 py-2 px-3 transition duration-500 ease-in-out"
                        onClick={() => handleContinuarVendendo(caixa.caixa_codigo)}
                      >
                        Continuar vendendo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {statusRequestOpenPdv && <ErrorNotification onClose={() => setStatusRequestOpenPdv(false)} message="Erro ao abrir o caixa, verifique os campos e tente novamente" />}
    </div>
  );
};

export default PdvOpenCaixaModal;