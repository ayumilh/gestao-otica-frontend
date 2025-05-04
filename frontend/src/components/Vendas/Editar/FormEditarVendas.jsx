'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Ui/Button/BtnActions";
import InputMoeda from "@/components/Ui/Input/InputMoeda";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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

  const [showLentesArmacao, setShowLentesArmacao] = useState(true);

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
        console.log("grausData", grausData);

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
              className="flex items-center justify-center hover:bg-segundaria-700 text-neutral-700 hover:text-neutral-800 dark:hover:bg-transparent dark:text-gray-300 dark:hover:text-gray-100 transition duration-200"
              title="Gerar Comprovante"
              aria-label="Gerar Comprovante"
            >
              <MdPrint className="text-[28px]" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-md border border-gray-200 bg-white shadow-md z-50 dark:bg-zinc-800 dark:border-black/20">
                <ul className="py-1 text-sm text-primaria-900 dark:text-gray-200">
                  <li>
                    <button
                      onClick={async () => {
                        await gerarComprovante();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-segundaria-700 hover:text-primaria-900 transition-colors rounded-md dark:hover:bg-zinc-700"
                    >
                      Emitir Comprovante
                    </button>
                  </li>
                  {/* <li>
            <a
              href={comprovante.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-segundaria-700 hover:text-primaria-900 transition-colors rounded-md dark:hover:bg-zinc-700"
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
            className="text-red-600 hover:text-red-800 transition-colors dark:text-red-500 dark:hover:text-red-600"
            title="Deletar venda"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>

      </div>


      <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
        <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
          Status do Pagamento
        </label>
        <select
          name="statusPagamento"
          value={input.statusPagamento || ""}
          onChange={inputChange}
          className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
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
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">Data da Venda <span className="text-red-600 dark:text-red-600">*</span></label>
          <input
            onChange={inputChange}
            value={input.data?.split("T")[0]}
            name="data"
            required
            type="date"
            className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
          />
        </div>

        {/* Data de Entrega */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">Data de Entrega</label>
          <input
            onChange={inputChange}
            value={input.entrega?.split("T")[0]}
            name="entrega"
            type="date"
            className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
          />
        </div>

        <div
          className="w-full flex mt-5 mb-7 border-t pt-6 cursor-pointer"
          onClick={() => setShowLentesArmacao(!showLentesArmacao)}
        >
          <span className="text-neutral-800 dark:text-gray-200 text-xl font-medium">Lentes e Armação</span>
          {showLentesArmacao ? (
            <KeyboardArrowUpIcon className="text-neutral-600 dark:text-gray-200" />
          ) : (
            <KeyboardArrowDownIcon className="text-neutral-600 dark:text-gray-200" />
          )}
        </div>
        {showLentesArmacao && (
          <>

            {/* Lentes */}
            <div className="w-full mt-3 mb-4 px-3">
              <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">Lentes <span className="text-red-600 dark:text-red-600">*</span></label>
              <input
                onChange={inputChange}
                value={input.lentes || ""}
                name="lentes"
                required
                maxLength={100}
                type="text"
                className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
              />
            </div>

            {/* Armação */}
            <div className="w-full  mt-3 mb-4 px-3">
              <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">Armação <span className="text-red-600 dark:text-red-600">*</span></label>
              <input
                onChange={inputChange}
                value={input.armacao || ""}
                name="armacao"
                type="text"
                required
                maxLength={100}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
              />
            </div>

            <div className="w-full flex flex-wrap mt-5 mb-7">
              <div className="w-full rounded-lg shadow-lg p-6 relative overflow-auto">
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-gray-200">
                  Informações Oftalmológicas
                </h2>
                <div className="mb-6 overflow-x-auto">
                  <table className="min-w-full border text-sm text-left text-neutral-800 dark:text-gray-200">
                    <thead className="bg-gray-200 dark:bg-zinc-900 dark:border-black/10">
                      <tr>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">Lente</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">Olho</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">Esférico</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">Cilíndrico</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">Eixo</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">ADD</th>
                        <th className="px-4 py-2 border dark:border-black/20 text-neutral-800 dark:text-gray-200">DP / DNP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { lente: 'Longe', olho: 'OD' },
                        { lente: 'Longe', olho: 'OE' },
                        { lente: 'Perto', olho: 'OD' },
                        { lente: 'Perto', olho: 'OE' },
                      ].map((item, i) => (
                        <tr key={i} className="bg-white dark:bg-zinc-800 dark:border-black/20 dark:text-gray-200">
                          <td className="px-2 py-1 border dark:border-black/20">{item.lente}</td>
                          <td className="px-2 py-1 border dark:border-black/20">{item.olho}</td>

                          {['esferico', 'cilindrico', 'eixo', 'add', 'dp'].map((campo) => (
                            <td key={campo} className="px-2 py-1 border dark:border-black/20">
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
                                className="w-full px-2 py-1 border rounded dark:text-gray-200 dark:bg-zinc-800 dark:border-black/10"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Linha de Altura Pupilar */}
                      <tr className="bg-white border dark:text-gray-200 dark:bg-zinc-800 dark:border-black/10">
                        <td className="px-4 py-1 border bg-neutral-100 dark:text-gray-200 dark:bg-zinc-900 dark:border-black/20 whitespace-nowrap" colSpan={1}>
                          Alt Pupilar:
                        </td>
                        <td className="px-2 py-1 border dark:border-black/20 dark:bg-zinc-800">
                          <input
                            type="text"
                            name="alturaPupilar"
                            value={input.alturaPupilar || ""}
                            onChange={inputChange}
                            className="w-full px-2 py-1 border rounded bg-neutral-100 dark:text-gray-200 dark:bg-zinc-900 dark:border-black/20"
                          />
                        </td>
                        <td className="px-4 py-1 border bg-neutral-100 dark:text-gray-200 dark:bg-zinc-900 dark:border-black/20 whitespace-nowrap" colSpan={5}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}


        <hr className="w-full my-6 border-t border-neutral-200" />

        <span className="text-neutral-800 text-xl font-medium dark:text-gray-200">Detalhes de venda</span>

        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
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

          {/* Observações */}
          <div className="w-full md:w-full mt-3 mb-4 px-3">
            <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">Observações</label>
            <input
              onChange={inputChange}
              value={input.obs || ""}
              name="obs"
              type="text"
              maxLength={255}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-zinc-800 dark:text-gray-200 dark:border-black/20"
            />
          </div>
        </div>

        <div className="w-full px-3 my-4">
          <BtnActions title="Salvar Alterações" onClick={handleEditar} color="ativado" />
        </div>
      </div>
    </div >
  );
};

export default FormEditarVendas;
