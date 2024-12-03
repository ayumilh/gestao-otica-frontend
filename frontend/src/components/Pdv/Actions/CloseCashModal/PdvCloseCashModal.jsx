'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { IoClose } from "react-icons/io5";
import ErrorNotification from '../../../Geral/Notification/ErrorNotification';
import { IoAdd } from "react-icons/io5";
import { PdvCloseCashForm } from './PdvCloseCashForm';

const PdvCloseCashModal = ({ isOpen, onClose }) => {
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


  const handleClick = () => {
    setShowForm(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
          <PdvCloseCashForm setStatusRequestClosePdv={setStatusRequestOpenPdv}/>
        </div>
      </div>
      {statusRequestOpenPdv && <ErrorNotification onClose={() => setStatusRequestOpenPdv(false)} message="Erro ao abrir o caixa, verifique os campos e tente novamente" />}
    </div>
  );
};

export default PdvCloseCashModal;