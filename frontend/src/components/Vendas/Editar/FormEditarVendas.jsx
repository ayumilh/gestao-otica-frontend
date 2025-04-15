'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useUserToken } from "@/utils/useUserToken";

const FormEditarVendas = ({ cliId }) => {
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
  const [grauData, setGrauData] = useState({});

  const [statusRequest, setStatusRequest] = useState('');

  useEffect(() => {
    const fetchClienteEVenda = async () => {
      try {
        // CLIENTE
        const resCliente = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar?id=${cliId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const cliente = resCliente.data.cliente;
        if (!cliente) return;

        // setCliente se quiser armazenar separado
        setInputs((prev) => ({
          ...prev,
          clienteCpf: cliente.cpf,
          clienteId: cliente.id,
          clienteNome: cliente.nome,
        }));

        // VENDA
        const resVenda = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/filter?id=${cliente.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const venda = resVenda.data.vendas[0];
        if (venda) {
          setInputs((prev) => ({
            ...prev,
            data: venda.data,
            entrega: venda.entrega,
            lentes: venda.lentes,
            armacao: venda.armacao,
            preco: venda.preco,
            sinal: venda.sinal,
            a_pagar: venda.a_pagar,
            obs: venda.obs,
            alturaPupilar: venda.alturaPupilar,
          }));
        }
    

        // GRAU
        const resGrau = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graus/listar?id=${cliId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const grausData = resGrau.data;

        if (grausData?.length > 0) {
          const mapped = grausData.flatMap((item) =>
            item.graus.map((grau) => ({
              [`esferico_${grau.lente}_${grau.olho}`]: grau.esferico || '',
              [`cilindrico_${grau.lente}_${grau.olho}`]: grau.cilindrico || '',
              [`eixo_${grau.lente}_${grau.olho}`]: grau.eixo || '',
              [`add_${grau.lente}_${grau.olho}`]: grau.add || '',
              [`dp_${grau.lente}_${grau.olho}`]: grau.dp || ''
            }))
          );

          const grauFinal = Object.assign({}, ...mapped);
          setGrauData(grauFinal);
        } else {
          setGrauData({});
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    if (cliId) fetchClienteEVenda();
  }, [cliId, token]);

  const inputChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleEditar = async () => {

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/editar-ultima?clienteId=${input.clienteId}`,
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
        {input.clienteNome || ""}
      </h3>

      <div className="flex flex-wrap mt-5 mb-7">
        {/* Lentes */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">Lentes</label>
          <input
            onChange={inputChange}
            value={input.lentes || ""}
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
            value={input.armacao || ""}
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
            value={input.preco || ""}
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
            value={input.sinal || ""}
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
            value={input.a_pagar || ""}
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
            value={input.alturaPupilar || ""}
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
            value={input.obs || ""}
            name="obs"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="w-full flex flex-wrap mt-5 mb-7">
          <div className="w-full rounded-lg shadow-lg p-6 relative overflow-auto">

            <h2 className="text-xl font-semibold mb-4 text-neutral-800">Informações Oftalmológicas</h2>
            <div className="mb-6">
              <p className="text-sm text-neutral-700"><strong>Lentes:</strong> {input.lentes || '-'}</p>
              <p className="text-sm text-neutral-700"><strong>Armação:</strong> {input.armacao || '-'}</p>
              <p className="text-sm text-neutral-700 mb-2"><strong>Altura Pupilar:</strong> {input.alturaPupilar || 'N/A'}</p>

              <table className="min-w-full border text-sm text-left text-neutral-800 mt-2">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-2 py-1 border">Lente</th>
                    <th className="px-2 py-1 border">Olho</th>
                    <th className="px-2 py-1 border">Esférico</th>
                    <th className="px-2 py-1 border">Cilíndrico</th>
                    <th className="px-2 py-1 border">Eixo</th>
                    <th className="px-2 py-1 border">ADD</th>
                    <th className="px-2 py-1 border">DP / DNP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { lente: 'Longe', olho: 'OD' },
                    { lente: 'Longe', olho: 'OE' },
                    { lente: 'Perto', olho: 'OD' },
                    { lente: 'Perto', olho: 'OE' },
                  ].map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="px-2 py-1 border">{item.lente}</td>
                      <td className="px-2 py-1 border">{item.olho}</td>

                      {['esferico', 'cilindrico', 'eixo', 'add', 'dp'].map((campo) => (
                        <td key={campo} className="px-2 py-1 border">
                          <input
                            type="text"
                            name={`${campo}_${item.lente}_${item.olho}`}
                            value={grauData[`${campo}_${item.lente}_${item.olho}`] || ""}
                            onChange={(e) =>
                              setGrauData((prev) => ({
                                ...prev,
                                [`${campo}_${item.lente}_${item.olho}`]: e.target.value,
                              }))
                            }
                            className="w-full border px-1 py-0.5"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
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
