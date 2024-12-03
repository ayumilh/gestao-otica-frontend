'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const PdvOpenCashForm = ({ setStatusRequestOpenPdv }) => {
  const [caixa_nome, setCaixaNome] = useState('');
  const [caixa_saldo_abertura, setCaixaSaldoAbertura] = useState(0);
  const [caixa_saldo_atual, setCaixaSaldoAtual] = useState(0);
  const [caixa_troco, setCaixaTroco] = useState(0);
  const [caixa_observacoes, setCaixaObservacoes] = useState('');
  const [func_id, setFuncId] = useState(null);

  const formData = {
    caixa_nome,
    caixa_saldo_abertura,
    caixa_saldo_atual,
    caixa_troco,
    caixa_observacoes,
    func_id,
  };

  const router = useRouter();
  
  const openCashRegister = async () => {
    if (Object.keys(formData).length === 0) {
      return; 
    }

    try {
      const response = await axios.post('https://pos-backend-six.vercel.app/api/caixa/abrir', formData);
      if (response.data) { // fazer um efeito ao redirecionar para outras paginas
        // onClose();
        router.push('/pdv');
      } else {
        setStatusRequestOpenPdv(true)
      }
    } catch (error) {
      setStatusRequestOpenPdv(true);
    }
  };
  return (
    <div className="max-w-md px-3 pt-7">
      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Nome do Caixa:
        </label>
        <input
          onChange={(e) => setCaixaNome(e.target.value)}
          type="text"
          value={caixa_nome || ""}
          name="caixa_nome"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label
          htmlFor="funcionario"
          className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center"
        >
          Funcionário
        </label>
        <select
          name="funcionario"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          onChange={(e) => setFuncId(e.target.value)}
        >
          <option value="1">Luana</option>
          <option value="2">Luigi</option>
          <option value="3">Leila</option>
        </select>
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Saldo na abertura:
        </label>
        <input
          onChange={(e) => {
            const valor = e.target.value;
            const padrao = /^\d*(\.\d{0,2})?$/;
            if (padrao.test(valor) || valor === "") {
              setCaixaSaldoAbertura(valor);
            }
          }}
          type="text"
          value={caixa_saldo_abertura || ""}
          name="caixa_saldo_abertura"
          placeholder="0,00"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Saldo atual:
        </label>
        <input
          onChange={(e) => {
            const valor = e.target.value;
            const padrao = /^\d*(\.\d{0,2})?$/;
            if (padrao.test(valor) || valor === "") {
              setCaixaSaldoAtual(valor);
            }
          }}
          type="text"
          value={caixa_saldo_atual || ""}
          name="caixa_saldo_atual"
          placeholder="0,00"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Troco:
        </label>
        <input
          onChange={(e) => {
            const valor = e.target.value;
            const padrao = /^\d*(\.\d{0,2})?$/;
            if (padrao.test(valor) || valor === "") {
              setCaixaTroco(valor);
            }
          }}
          type="text"
          value={caixa_troco || ""}
          name="caixa_troco"
          placeholder="0,00"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Observação:
        </label>
        <textarea
          onChange={(e) => setCaixaObservacoes(e.target.value)}
          name="caixa_observacoes"
          value={caixa_observacoes || ""}
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="flex items-center justify-end pt-3">
        <button
          type="button"
          onClick={openCashRegister}
          className="bg-orange-400 hover:bg-segundaria-900 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-500 ease-in-out"
        >
          Abrir caixa
        </button>
      </div>
    </div>
  );
};
