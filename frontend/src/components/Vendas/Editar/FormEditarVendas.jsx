'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Ui/Button/BtnActions";
import InputMoeda from "@/components/Ui/Input/InputMoeda";
import { useUserToken } from "@/utils/useUserToken";
import { FaTrash } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { toast } from "react-toastify";

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

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [grauData, setGrauData] = useState({});

  const formatarMoeda = (valor) => {
    if (valor === null || valor === undefined) return '';
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).replace('R$', '').trim();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
            preco: formatarMoeda(venda.preco),
            sinal: formatarMoeda(venda.sinal),
            a_pagar: formatarMoeda(venda.a_pagar),
            obs: venda.obs,
            alturaPupilar: venda.alturaPupilar,
            statusPagamento: venda.StatusPagamento
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

  const handleEditar = async () => {
    if (!input.clienteId) {
      toast.info("Selecione um cliente.");
      return;
    }
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

      toast.success("Venda editada com sucesso!");
      setTimeout(() => {
        router.push("/vendas");
      }, 2000);
    } catch (error) {
      console.error("Erro ao editar venda:", error);
      toast.error("Erro ao editar venda.");
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

      if (response.status === 200) {
        toast.success("Venda deletada com sucesso!");
        setTimeout(() => {
          router.push("/vendas");
        }, 2000);;
      } else {
        toast.error("Erro ao deletar venda.");
      }
    } catch {
      toast.error("Erro ao deletar venda.");
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };


  const gerarComprovante = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/gerar-comprovante/${clienteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const blob = response.data;
      const nomeSanitizado = input.clienteNome.replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, '');
      const nomeFinal = `comprovante-${nomeSanitizado}-venda-${clienteId}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nomeFinal;
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error('Erro ao gerar e baixar o comprovante:', error);
    }
  };


  return (
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <div className="w-full flex justify-between items-center py-6">
        <h3 className="text-neutral-800 text-xl font-medium">
          {input.clienteNome || ""}
        </h3>

        <div className="flex gap-4">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center hover:bg-segundaria-700 text-neutral-700 hover:text-neutral-800 transition duration-200"
              title="Gerar Comprovante"
              aria-label="Gerar Comprovante"
            >
              <MdPrint className="text-[28px]" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-md border border-gray-200 bg-white shadow-md z-50">
                <ul className="py-1 text-sm text-primaria-900">
                  <li>
                    <button
                      onClick={async () => {
                        await gerarComprovante();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-segundaria-700 hover:text-primaria-900 transition-colors rounded-md"
                    >
                      Emitir Comprovante
                    </button>
                  </li>
                  {/* <li>
                    <a
                      href={comprovante.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-segundaria-700 hover:text-primaria-900 transition-colors rounded-md"
                    >
                      Enviar via WhatsApp
                    </a>
                  </li> */}
                </ul>
              </div>
            )}
          </div>

          {/* deletar venda */}
          <button
            onClick={handleDeleteVenda}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Deletar venda"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>


      <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
        <label className="block font-medium text-sm text-neutral-700">Status do Pagamento</label>
        <select
          name="statusPagamento"
          value={input.statusPagamento || ""}
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
          <InputMoeda
            label="Preço"
            name="vendaPreco"
            value={input.preco}
            onChange={(formatted, raw) => {
              setInputs((prev) => ({ ...prev, preco: formatted }));
            }}
            required
          />

          {/* Sinal */}
          <InputMoeda
            label="Sinal"
            name="vendaSinal"
            value={input.sinal}
            onChange={(formatted, raw) => {
              setInputs((prev) => ({ ...prev, sinal: formatted }));
            }}
          />

          {/* A pagar */}
          <InputMoeda
            label="Apagar"
            name="vendaApagar"
            value={input.a_pagar}
            onChange={(formatted, raw) => {
              setInputs((prev) => ({ ...prev, a_pagar: formatted }));
            }}

          />
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
    </div>
  );
};

export default FormEditarVendas;
