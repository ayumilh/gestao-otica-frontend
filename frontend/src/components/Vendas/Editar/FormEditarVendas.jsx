'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Ui/Button/BtnActions";
import BtnAtivado from "@/components/Ui/Button/BtnAtivado";
import SuccessNotification from "@/components/Ui/Notification/SuccessNotification";
import ErrorNotification from "@/components/Ui/Notification/ErrorNotification";
import { useUserToken } from "@/utils/useUserToken";
import { FaTrash } from "react-icons/fa";
import { MdPrint } from "react-icons/md";

const FormEditarVendas = ({ clienteId, vendaId }) => {
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
    usuarioId: "",
    statusPagamento: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [comprovante, setComprovante] = useState(null);

  const [grauData, setGrauData] = useState({});

  const [statusRequest, setStatusRequest] = useState('');

  useEffect(() => {
    const fetchClienteEVenda = async () => {
      try {
        // CLIENTE
        const resCliente = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar?id=${clienteId}`,
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
            statusPagamento: venda.statusPagamento
          }));
        }


        // GRAU
        const resGrau = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graus/listar?id=${clienteId}`,
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

    if (clienteId) fetchClienteEVenda();
  }, [clienteId, token]);

  const inputChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const gerarComprovante = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/gerar-comprovante/${clienteId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setComprovante(res.data);
    } catch (error) {
      console.error("Erro ao gerar comprovante:", error);
      setComprovante({ erro: true });
    }
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

  const handleDeleteVenda = async () => {
    const confirmar = confirm("Tem certeza que deseja deletar esta venda?");
    if (!confirmar) return;

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/deletar/${vendaId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.status === 200) {
        setStatusRequest(true);
        router.push("/vendas");
      } else {
        console.error("Erro:", data.message);
        setStatusRequest(false);
      }
    } catch {
      setStatusRequest(false);
    }

    setTimeout(() => setStatusRequest(null), 3000);
  };

  return (
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <div className="w-full flex justify-between items-center py-6">
        <h3 className="text-neutral-800 text-xl font-medium">
          {input.clienteNome || ""}
        </h3>

        <div className="flex gap-4">
          <button
            onClick={gerarComprovante}
            className="text-orange-600 hover:text-orange-800 transition-colors"
            title="Gerar Comprovante"
          >
            <MdPrint className="text-3xl" />
          </button>

          <button
            onClick={handleDeleteVenda}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Deletar venda"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>

      {comprovante && !comprovante.erro && (
        <div className="w-full px-3 mt-3 space-y-2">
          <p className="text-green-700 font-medium">✅ {comprovante.mensagem}</p>
          <a
            href={comprovante.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            📄 Ver PDF do Comprovante
          </a>
          <a
            href={comprovante.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            📲 Enviar via WhatsApp
          </a>
        </div>
      )}

      {comprovante?.erro && (
        <p className="text-red-600 px-3">❌ Erro ao gerar o comprovante.</p>
      )}


      <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
        <label className="block font-medium text-sm text-neutral-700">Status do Pagamento</label>
        <select
          name="statusPagamento"
          value={input.statusPagamento}
          onChange={inputChange}
          className="w-full border rounded px-3 py-2 bg-white"
        >
          <option value="PENDENTE">Pendente</option>
          <option value="PAGO_TOTAL">Pago Total</option>
          <option value="AGUARDANDO_ENTREGA">Aguardando Entrega</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>

      <div className="flex flex-wrap mt-5 mb-7">
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

        <div className="flex w-full">
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
        </div>

        <div className="w-full flex flex-wrap mt-5 mb-7">
          <div className="w-full rounded-lg shadow-lg p-6 relative overflow-auto">

            <h2 className="text-xl font-semibold mb-4 text-neutral-800">Informações Oftalmológicas</h2>
            <div className="mb-6">
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

                  {/* Linha de Altura Pupilar */}
                  <tr className="bg-white">
                    <td className="px-2 py-1 border whitespace-nowrap" colSpan={1}>
                      Alt Pupilar:
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="alturaPupilar"
                        value={input.alturaPupilar || ""}
                        onChange={inputChange}
                        className="w-full border px-1 py-0.5"
                      />
                    </td>
                  </tr>

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
