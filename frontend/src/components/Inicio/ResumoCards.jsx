import { useState } from "react";

const ResumoCards = ({ resumo }) => {
  const cards = [
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
  ];

  return (
    <div className="w-full max-w-[1270px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
      {cards.map((item, index) => (
        <div
          key={index}
          className="flex flex-row w-full h-full bg-segundaria-700 dark:bg-dark-primaria-800 border border-gray-100 dark:border-black/10 rounded-2xl shadow-sm overflow-hidden transition-all"
        >
          {/* Barra lateral */}
          <div className={`w-2 rounded-l-2xl ${item.barColor}`} />

          {/* Conteúdo */}
          <div className="flex flex-col p-4 justify-center flex-1">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {item.label}
              </div>
            </div>

            {/* Texto principal */}
            <p className={`text-xl font-bold mt-1 ${item.color} dark:${item.color}`}>
              R$ {parseFloat(item.value).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumoCards;
