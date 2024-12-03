'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const PdvCloseCashForm = ({ setStatusRequestClosePdv }) => {
  const [input, setInput] = useState({
    caixa_saldo_atual: 0,
    caixa_saldo_abertura: 0,
    caixa_sangria: 0,
    caixa_diferenca_fechamento: 0,
    caixa_lucro: 0,
    caixa_dinheiro: 0,
    caixa_pix: 0,
    caixa_credito_aprazo: 0,
    caixa_credito_avista: 0,
    caixa_outro_pagamento: 0,
    caixa_observacoes: '',
    func_id: null,
    caixa_codigo: null,
    caixa_nome: '',
    func_id_fechou: null,
  });


  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "caixa_saldo_atual" && name === "caixa_saldo_abertura" && name === "caixa_sangria" && name === "caixa_diferenca_fechamento" && name === "caixa_lucro" && name === "caixa_dinheiro" && name === "caixa_pix" && name === "caixa_credito_aprazo" && name === "caixa_credito_avista" && name === "caixa_outro_pagamento") {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (regex.test(value)) {
        setInput(prevState => ({
          ...prevState,
          [name]: value
        }));
      } else {
        console.log("Valor inválido.");
      }
    } else {
      setInput(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const caixa_codigo = localStorage.getItem('caixa_codigo');
  useEffect(() => {
    if (!caixa_codigo) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pos-backend-six.vercel.app/api/caixa/get/conferencia/${caixa_codigo}`);
        setInput((prevState) => ({
          ...prevState,
          caixa_saldo_atual: response.data.caixa.caixa_saldo_atual,
          caixa_saldo_abertura: response.data.caixa.caixa_saldo_abertura,
          caixa_sangria: response.data.caixa.caixa_sangria,
          caixa_diferenca_fechamento: response.data.caixa.caixa_diferenca_fechamento,
          caixa_lucro: response.data.caixa.caixa_lucro,
          caixa_dinheiro: response.data.caixa.caixa_dinheiro,
          caixa_pix: response.data.caixa.caixa_pix,
          caixa_credito_aprazo: response.data.caixa.caixa_credito_aprazo,
          caixa_credito_avista: response.data.caixa.caixa_credito_avista,
          caixa_outro_pagamento: response.data.caixa.caixa_outro_pagamento,
          caixa_observacoes: response.data.caixa.caixa_observacoes,
          func_id: response.data.caixa.func_id,
          caixa_codigo: response.data.caixa.caixa_codigo,
          caixa_nome: response.data.caixa.caixa_nome,
          func_id_fechou: response.data.caixa.func_id
        }));
      } catch (error) {
        setStatusRequestClosePdv(true);
      }
    }

    if (caixa_codigo) {
      fetchData();
    }

  }, [caixa_codigo, setStatusRequestClosePdv]);

  const closeCashRegister = async () => {
    try {
      const response = await axios.put('https://pos-backend-six.vercel.app/api/caixa/fechar', input);
      if (response.data) {;
        router.push('/inicio');
      } else {
        setStatusRequestClosePdv(true)
      }
    } catch (error) {
      setStatusRequestClosePdv(true);
    }

  }

  return (
    <div className="max-w-md px-3 pt-7">
      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa saldo atual: <span className='text-red-500'>*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_saldo_atual || ""}
          name="caixa_saldo_atual"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa saldo abertura:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_saldo_abertura || ""}
          name="caixa_saldo_abertura"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa sangria:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_sangria || ""}
          name="caixa_sangria"
          required
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa diferença fechamento:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_diferenca_fechamento || ""}
          name="caixa_diferenca_fechamento"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa lucro:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_lucro || ""}
          name="caixa_lucro"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa dinheiro:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_dinheiro || ""}
          name="caixa_dinheiro"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa pix:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_pix || ""}
          name="caixa_pix"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa crédito a prazo:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_credito_aprazo || ""}
          name="caixa_credito_aprazo"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa crédito a vista:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_credito_avista || ""}
          name="caixa_credito_avista"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa outro pagamento:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_outro_pagamento || ""}
          name="caixa_outro_pagamento"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center">
          Caixa observações:
        </label>
        <input
          onChange={handleChange}
          type="text"
          value={input.caixa_observacoes || ""}
          name="caixa_observacoes"
          className="w-full rounded-lg border border-blue-gray-200 bg-transparent px-3 py-2 text-neutral-600 font-medium outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-0"
        />
      </div>

      <div className="w-full flex gap-3 mb-4">
        <label
          htmlFor="funcionario"
          className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center"
        >
          Funcionário que fechou:
        </label>
        <select
          name="func_id"
          required
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          onChange={handleChange}
        >
          <option value="1">Luana</option>
          <option value="2">Luigi</option>
          <option value="3">Leila</option>
        </select>
      </div>


      <div className="flex items-center justify-end pt-3">
        <button
          type="button"
          onClick={closeCashRegister}
          className="bg-orange-400 hover:bg-segundaria-900 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-500 ease-in-out"
        >
          Fechar caixa
        </button>
      </div>
    </div>
  );
};
