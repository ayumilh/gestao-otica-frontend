'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import TitlePage from '../Ui/TitlePage';
import LucrosTable from "./LucrosTable";
import { useUserToken } from '@/utils/useUserToken';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';

const LucrosContent = () => {
  const { token } = useUserToken();
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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


      <div className="w-full flex flex-col items-center min-h-[600px]">
        <div className="w-full max-w-[1270px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
          {[
            {
              label: 'Valor Recebido',
              value: resumo.totalRecebido,
              color: 'text-green-400',
              barColor: 'bg-green-500',
            },
            {
              label: 'A Receber',
              value: resumo.totalAPagar,
              color: 'text-yellow-400',
              barColor: 'bg-yellow-500',
            },
            {
              label: 'Total de Vendas',
              value: resumo.totalVendas,
              color: 'text-blue-400',
              barColor: 'bg-blue-500',
            },
            {
              label: 'Pagas Completas',
              value: resumo.pagasTotais,
              color: 'text-emerald-400',
              barColor: 'bg-emerald-500',
            },
            {
              label: 'Aguardando Entrega',
              value: resumo.aguardandoEntrega,
              color: 'text-orange-400',
              barColor: 'bg-orange-500',
            },
            {
              label: 'Canceladas',
              value: resumo.canceladas,
              color: 'text-red-400',
              barColor: 'bg-red-500',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-row w-full h-full bg-segundaria-700 dark:bg-dark-primaria-800 border border-gray-100 dark:border-black/10 rounded-2xl shadow-sm"
            >
              {/* Barra lateral */}
              <div className={`w-2 rounded-l-2xl ${item.barColor}`} />

              {/* Conteúdo */}
              <div className="flex flex-col p-4 justify-center flex-1">
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {item.label}
                </div>
                <p className={`text-xl font-bold mt-1 ${item.color} dark:${item.color}`}>
                  R$ {parseFloat(item.value).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LucrosContent;
