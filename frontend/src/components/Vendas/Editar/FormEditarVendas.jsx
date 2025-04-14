'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useUserToken } from "@/utils/useUserToken";

const FormEditarVendas = ({ cliCpf }) => {
  const router = useRouter();
  const { token } = useUserToken();
  const [input, setInputs] = useState({
    data: "",
    entrega: "",
    lentes: "",
    armacao: "",
    preco: "",
    sinal: "",
    a_pagar: "",
    obs: "",
    alturaPupilar: "",
    clienteCpf: "",
    usuarioId: ""
  });

  const [vendaData, setVendaData] = useState(null);

  const [statusRequest, setStatusRequest] = useState('');

  useEffect(() => {
    const fetchVenda = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar?cpf=${cliCpf}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const venda = res.data.vendas[0];
        if (venda) {
          setInputs(venda);
          setVendaData(venda);
        }

      } catch (error) {
        console.error("Erro ao buscar venda:", error);
      }
    };
    if (cliCpf) fetchVenda();
  }, [cliCpf, token]);

  const inputChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleEditar = async () => {

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/editar-ultima?cpf=${vendaData.clienteCpf}`,
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setStatusRequest(true);
      router.push("/vendas");
    } catch (error) {
      console.error("Erro ao editar venda:", error);
      setStatusRequest(false);
    }
  };
  

  return (
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <h3 className="text-neutral-800 text-xl font-medium">
        {input?.cliente?.nome}
      </h3>

      <div className="flex flex-wrap mt-5 mb-7">
        {/* Lentes */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Lentes</label>
          <input
            onChange={inputChange}
            value={input.lentes}
            name="lentes"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Armação */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Armação</label>
          <input
            onChange={inputChange}
            value={input.armacao}
            name="armacao"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Preço */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Preço</label>
          <input
            onChange={inputChange}
            value={input.preco}
            name="preco"
            type="number"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Sinal */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Sinal</label>
          <input
            onChange={inputChange}
            value={input.sinal}
            name="sinal"
            type="number"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* A pagar */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">A Pagar</label>
          <input
            onChange={inputChange}
            value={input.a_pagar}
            name="a_pagar"
            type="number"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Data da Venda */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Data da Venda</label>
          <input
            onChange={inputChange}
            value={input.data?.split("T")[0]}
            name="data"
            type="date"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Data de Entrega */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Data de Entrega</label>
          <input
            onChange={inputChange}
            value={input.entrega?.split("T")[0]}
            name="entrega"
            type="date"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Altura Pupilar */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Altura Pupilar</label>
          <input
            onChange={inputChange}
            value={input.alturaPupilar}
            name="alturaPupilar"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Observações */}
        <div className="w-full md:w-full mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Observações</label>
          <input
            onChange={inputChange}
            value={input.obs}
            name="obs"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="w-full px-3 my-4">
          <BtnActions title="Salvar Alterações" onClick={handleEditar} color="ativado" />
        </div>
      </div>

      {statusRequest === true && (
        <SuccessNotification message="Venda editada com sucesso!" />
      )}
      {statusRequest === false && (
        <ErrorNotification message="Erro ao editar a venda!" />
      )}
    </div>
  );
};

export default FormEditarVendas;
