'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import BtnAtivado from '@/components/Ui/Button/BtnAtivado'
import TitlePage from '../Ui/TitlePage';
import LucrosTable from "./LucrosTable";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';

const LucrosContent = () => {
  const [lucros, setLucros] = useState([]);
  const [resumo, setResumo] = useState({
    totalVendas: 0,
    totalRecebido: 0,
    totalAPagar: 0,
    aguardandoEntrega: 0,
    pagasTotais: 0,
    canceladas: 0
  });

  useEffect(() => {
    const fetchLucros = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`);
        setLucros(response.data.vendas || []);
        setResumo(response.data.resumo || {});
      } catch (error) {
        console.error("Erro ao buscar lucros:", error);
      }
    };

    fetchLucros();
  }, []);


  return (
    <div className="w-full px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center">
      <div className="w-full lg:w-[800px] xl:w-[1270px] flex justify-between items-center h-12 pt-5">
        <div className="flex items-center">
          <NavbarMobile />
          <TitlePage title='Lucros' />
        </div>
      </div>


      <div className="w-full flex flex-col items-center" style={{ height: '850px' }}>
        {/* Totais com novo design */}
        <div className="w-full max-w-[1270px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {/* Valor Recebido */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <AttachMoneyIcon className="text-green-600 dark:text-green-400" fontSize="small" />
              Valor Recebido
            </div>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">R$ {parseFloat(resumo.totalRecebido).toFixed(2)}</p>
          </div>

          {/* A Receber */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <MonetizationOnIcon className="text-yellow-500 dark:text-yellow-400" fontSize="small" />
              A Receber
            </div>
            <p className="text-2xl font-semibold text-yellow-500 dark:text-yellow-400">R$ {parseFloat(resumo.totalAPagar).toFixed(2)}</p>
          </div>

          {/* Total de Vendas */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <PaymentsIcon className="text-blue-600 dark:text-blue-400" fontSize="small" />
              Total de Vendas
            </div>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">R$ {parseFloat(resumo.totalVendas).toFixed(2)}</p>
          </div>

          {/* Pagas Completas */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <CheckCircleIcon className="text-emerald-600 dark:text-emerald-400" fontSize="small" />
              Pagas Completas
            </div>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">R$ {parseFloat(resumo.pagasTotais).toFixed(2)}</p>
          </div>

          {/* Aguardando Entrega */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <LocalShippingIcon className="text-orange-600 dark:text-orange-400" fontSize="small" />
              Aguardando Entrega
            </div>
            <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400">R$ {parseFloat(resumo.aguardandoEntrega).toFixed(2)}</p>
          </div>

          {/* Canceladas */}
          <div className="bg-segundaria-700 dark:bg-zinc-900 p-5 rounded-xl shadow border border-gray-200 dark:border-zinc-500">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              <CancelIcon className="text-red-600 dark:text-red-400" fontSize="small" />
              Canceladas
            </div>
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400">R$ {parseFloat(resumo.canceladas).toFixed(2)}</p>
          </div>
        </div>


        <LucrosTable />
      </div>
    </div>
  );
};

export default LucrosContent;
