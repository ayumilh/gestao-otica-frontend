'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useUserToken } from "@/utils/useUserToken";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from "next/navigation";

const FormCriarVendas = () => {
  const { token } = useUserToken();
  const router = useRouter();
  const [vendaData, setVendaData] = useState(null);
  const [vendaEntrega, setVendaEntrega] = useState(null);
  const [vendaNome, setVendaNome] = useState('');
  const [vendaCPF, setVendaCPF] = useState('');
  const [vendaTelefone, setVendaTelefone] = useState('');
  const [vendaEndereco, setVendaEndereco] = useState('');
  const [vendaComplemento, setVendaComplemento] = useState('');
  const [vendaLentes, setVendaLentes] = useState('');
  const [vendaArmacao, setVendaArmacao] = useState('');
  const [vendaPreco, setVendaPreco] = useState(0.00);
  const [vendaSinal, setVendaSinal] = useState(0.00);
  const [vendaApagar, setVendaApagar] = useState(0.00);
  const [vendaObs, setVendaObs] = useState('');
  const [vendaId, setVendaId] = useState(null);

  const [alturaPupilar, setAlturaPupilar] = useState("");

  // busca do cliente
  const [isLoading, setIsLoading] = useState(false);
  const [openFilterCpf, setOpenFilterCpf] = useState(false);
  const [cliente, setCliente] = useState({});
  const [clienteId, setClienteId] = useState(null);

  const [campoBusca, setCampoBusca] = useState('cpf'); // ou 'nome'
  const [filtros, setFiltros] = useState({ campo: 'cpf', valor: '' });

  const [showLentesArmacao, setShowLentesArmacao] = useState(false);


  const venda = {
    data: vendaData,
    entrega: vendaEntrega,
    clienteId: clienteId,
    cpf: vendaCPF,
    lentes: vendaLentes,
    armacao: vendaArmacao,
    preco: parseFloat(vendaPreco),
    sinal: vendaSinal ? parseFloat(vendaSinal) : null,
    a_pagar: parseFloat(vendaApagar),
    obs: vendaObs,
  };

  const [isInvalidoVendaData, setIsInvalidoVendaData] = useState(false);
  const [isInvalidoVendaEntrega, setIsInvalidoVendaEntrega] = useState(false);
  const [isInvalidoVendaNome, setIsInvalidoVendaNome] = useState(false);
  const [isInvalidoVendaCPF, setIsInvalidoVendaCPF] = useState(false);
  const [isInvalidoVendaTelefone, setIsInvalidoVendaTelefone] = useState(false);
  const [isInvalidoVendaEndereco, setIsInvalidoVendaEndereco] = useState(false);
  const [isInvalidoVendaComplemento, setIsInvalidoVendaComplemento] = useState(false);
  const [isInvalidoVendaLentes, setIsInvalidoVendaLentes] = useState(false);
  const [isInvalidoVendaArmacao, setIsInvalidoVendaArmacao] = useState(false);
  const [isInvalidoVendaPreco, setIsInvalidoVendaPreco] = useState(false);
  const [isInvalidoVendaSinal, setIsInvalidoVendaSinal] = useState(false);
  const [isInvalidoVendaApagar, setIsInvalidoVendaApagar] = useState(false);
  const [isInvalidoVendaObs, setIsInvalidoVendaObs] = useState(false);

  const [statusRequest, setStatusRequest] = useState('');


  useEffect(() => {
    const regex = /^[0-9]*$/;
    if (vendaCPF === "" || regex.test(vendaCPF)) {
      setIsInvalidoVendaCPF(false);
    } else {
      setIsInvalidoVendaCPF(true);
    }
  }, [vendaCPF]);

  useEffect(() => {
    setFiltros({ campo: campoBusca, valor: vendaCPF });
  }, [vendaCPF, campoBusca]);


  const handleChange = (e) => {
    const value = e.target.value;
    setOpenFilterCpf(true);
  
    if (value === "") {
      setCliente(null);
      setClienteId(null); // limpa também o ID do cliente
      setVendaCPF(""); // limpa o campo
      setFiltros({ campo: campoBusca, valor: "" });
      setIsLoading(false);
      return;
    }
  
    if (campoBusca === 'cpf') {
      const somenteNumeros = value.replace(/\D/g, '');
      setVendaCPF(somenteNumeros);
      setFiltros({ campo: 'cpf', valor: somenteNumeros });
    } else {
      setVendaCPF(value); // <- reusando mesmo campo para busca por nome
      setFiltros({ campo: 'nome', valor: value });
    }
  
    setIsLoading(true);
  };
  

  const handleClick = async () => {
    setOpenFilterCpf(true);
  }

  const handleFocus = () => {
    setIsLoading(true);
  };

  const filterCpf = useCallback(async () => {
    if (!vendaCPF || vendaCPF.length < 2) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/filter`, { params: filtros });
      if (response.data.clientes.length === 0) {
        setCliente({});
      } else {
        setCliente(response.data.clientes[0]);
        setClienteId(response.data.clientes[0].id);
      }
    } catch (error) {
      console.error("Erro ao buscar cliente", error);
      setCliente({});
    } finally {
      setIsLoading(false);
    }
  }, [filtros, vendaCPF]);


  const handleCriar = async () => {
    if (!clienteId) {
      alert("Selecione um cliente válido.");
      return;
    }
  
    const grauData = [];
  
    const lentesTipos = ['Longe', 'Perto'];
    const olhos = ['OD', 'OE'];
  
    lentesTipos.forEach((lente) => {
      olhos.forEach((olho) => {
        const esferico = document.querySelector(`[name=esferico_${lente}_${olho}]`)?.value || "";
        const cilindrico = document.querySelector(`[name=cilindrico_${lente}_${olho}]`)?.value || "";
        const eixo = document.querySelector(`[name=eixo_${lente}_${olho}]`)?.value || "";
        const add = document.querySelector(`[name=add_${lente}_${olho}]`)?.value || "";
        const dp = document.querySelector(`[name=dp_${lente}_${olho}]`)?.value || "";
  
        // Só adiciona se algum campo tiver valor
        if (esferico || cilindrico || eixo || add || dp) {
          grauData.push({
            lente,
            olho,
            esferico,
            cilindrico,
            eixo,
            add,
            dp
          });
        }
      });
    });
  
    const payload = {
      data: vendaData,
      entrega: vendaEntrega,
      clienteId,
      clienteCpf: vendaCPF,
      lentes: vendaLentes,
      armacao: vendaArmacao,
      preco: parseFloat(vendaPreco),
      sinal: vendaSinal ? parseFloat(vendaSinal) : null,
      a_pagar: parseFloat(vendaApagar),
      obs: vendaObs,
      alturaPupilar,
      graus: grauData
    };
    console.log("Payload:", payload);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/criar-com-grau`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message);
  
      alert(result.message);
      router.push('/vendas');
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar a venda.");
    }
  };
  

  const cadastrarCliente = async () => {
    router.push('/clientes/cadastrar')
  }

  useEffect(() => {
    filterCpf();
  }, [filterCpf]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenFilterCpf(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownRef]);

  return (<>
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <h3 className="text-neutral-800 text-xl font-medium ">
        {vendaData || "Data de venda"} - {vendaNome || "Nome do cliente"}
      </h3>
      <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
        {/* Buscar client */}
        <div className="w-full mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 mb-1">
            Buscar cliente por: <span className="text-red-600">*</span>
          </label>
          <div className="w-full flex items-center gap-2 mb-4 px-3">
            {/* Select pequeno */}
            <select
              value={campoBusca}
              onChange={(e) => setCampoBusca(e.target.value)}
              className="border px-2 py-2 rounded text-sm font-medium text-neutral-700 flex-shrink-0 w-auto"
            >
              <option value="cpf">CPF</option>
              <option value="nome">Nome</option>
            </select>

            {/* Input que ocupa o restante */}
            <div className="relative flex-grow">
              <input
                onChange={handleChange}
                onFocus={handleFocus}
                onClick={handleClick}
                value={vendaCPF || ""}
                type="text"
                name="vendaBusca"
                placeholder={`Digite o ${campoBusca === "cpf" ? "CPF" : "Nome"}`}
                maxLength={campoBusca === "cpf" ? 11 : 200}
                required
                className={`peer w-full border px-3 py-2 rounded font-medium text-neutral-600 focus:outline-2 outline-blue-400 transition-all duration-300 ${isInvalidoVendaCPF ? "outline-red-500 focus:outline-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={filterCpf}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-105 transition"
              >
                <SearchIcon fontSize="small" className="text-neutral-800 hover:text-black" />
              </button>
            </div>
          </div>
          {openFilterCpf && (
            <div
              ref={dropdownRef}
              className="bg-gray-100 shadow-lg rounded-md w-full max-w-lg absolute z-50 mt-1 p-3"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <CircularProgress size={24} />
                </div>
              ) : cliente && cliente.nome ? (
                <div
                onClick={() => {
                  const c = cliente;
                  if (!c?.id) {
                    alert("Cliente inválido");
                    return;
                  }
                
                  setVendaNome(c.nome);
                  setVendaCPF(c.cpf);
                  setVendaTelefone(c.telefone);
                  setVendaEndereco(c.endereco);
                  setVendaComplemento(c.complemento);
                  setClienteId(c.id); // ESSENCIAL
                  setOpenFilterCpf(false);
                
                  console.log("Cliente ID selecionado:", c.id);
                }}
                  className="cursor-pointer flex gap-3 items-center hover:bg-gray-200 transition rounded p-2"
                >
                  <div className="bg-orange-400 text-white rounded-full p-2">
                    <PersonIcon fontSize="small" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-neutral-800">
                      {cliente.nome}
                    </span>
                    <span className="text-sm text-neutral-600">
                      CPF: {cliente.cpf}
                    </span>
                    <span className="text-sm text-neutral-600">
                      Tel: {cliente.telefone}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-600">
                  Nenhum cliente encontrado.
                  <button
                    onClick={cadastrarCliente}
                    className="ml-2 bg-orange-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Cadastrar novo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        {/* data */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaData"
            className="block font-medium text-sm text-neutral-700"
          >
            Data de venda: <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            onChange={(e) => setVendaData(e.target.value)}
            value={vendaData || ""}
            name="vendaData"
            required
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaData
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div>

        {/* entrega */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaEntrega"
            className="block font-medium text-sm text-neutral-700"
          >
            Data de entrega:
          </label>
          <input
            type="date"
            name="vendaEntrega"
            onChange={(e) => setVendaEntrega(e.target.value)}
            value={vendaEntrega || ""}
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaEntrega
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div>

        {/* Seção de lentes e armação */}
        <div
          className="w-full flex mt-5 mb-7 border-t pt-6 cursor-pointer"
          onClick={() => setShowLentesArmacao(!showLentesArmacao)}
        >
          <span className="text-neutral-800 text-xl font-medium">Lentes e Armação</span>
          {showLentesArmacao ? (
            <KeyboardArrowUpIcon className="text-neutral-600" />
          ) : (
            <KeyboardArrowDownIcon className="text-neutral-600" />
          )}
        </div>
        {showLentesArmacao && (
          <>
            {/* lentes */}
            <div className="w-full mt-3 mb-4 px-3">
              <label
                htmlFor="vendaLentes"
                className="block font-medium text-sm text-neutral-700"
              >
                Lentes <span className="text-red-600">*</span>
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[A-Za-z0-9\s]+$/;
                  if (value === "" || regex.test(value)) {
                    setVendaLentes(value);
                    setIsInvalidoVendaLentes(false);
                  } else {
                    setIsInvalidoVendaLentes(true);
                  }
                }}
                value={vendaLentes || ""}
                type="text"
                name="vendaLentes"
                maxLength={100}
                required
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaLentes ? "outline-red-500 focus:outline-red-500" : ""
                  }`}
              />
            </div>

            {/* armação */}
            <div className="w-full mt-3 mb-4 px-3">
              <label
                htmlFor="vendaArmacao"
                className="block font-medium text-sm text-neutral-700"
              >
                Armação: <span className="text-red-600">*</span>
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[A-Za-z0-9\s]+$/;
                  if (value === "" || regex.test(value)) {
                    setVendaArmacao(value);
                    setIsInvalidoVendaArmacao(false);
                  } else {
                    setIsInvalidoVendaArmacao(true);
                  }
                }}
                value={vendaArmacao || ""}
                type="text"
                name="vendaArmacao"
                maxLength={100}
                required
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaArmacao ? "outline-red-500 focus:outline-red-500" : ""
                  }`}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm text-left text-neutral-800">
                <thead className="bg-neutral-200">
                  <tr>
                    <th className="px-4 py-2 border">Lentes</th>
                    <th className="px-4 py-2 border">Olho</th>
                    <th className="px-4 py-2 border">Esférico</th>
                    <th className="px-4 py-2 border">Cilíndrico</th>
                    <th className="px-4 py-2 border">Eixo</th>
                    <th className="px-4 py-2 border">ADD</th>
                    <th className="px-4 py-2 border">DP / DNP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { lente: 'Longe', olho: 'OD' },
                    { lente: 'Longe', olho: 'OE' },
                    { lente: 'Perto', olho: 'OD' },
                    { lente: 'Perto', olho: 'OE' },
                  ].map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border">{item.lente}</td>
                      <td className="px-4 py-2 border">{item.olho}</td>
                      <td className="px-2 py-1 border">
                        <input type="text" name={`esferico_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-2 py-1 border">
                        <input type="text" name={`cilindrico_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-2 py-1 border">
                        <input type="text" name={`eixo_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-2 py-1 border">
                        <input type="text" name={`add_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" />
                      </td>
                      <td className="px-2 py-1 border">
                        <input type="text" name={`dp_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" />
                      </td>
                    </tr>
                  ))}

                  {/* Altura Pupilar */}
                  <tr className="bg-white">
                    <td className="px-4 py-2 border bg-neutral-100" colSpan={6}>Altura Pupilar</td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="altura_pupilar"
                        value={alturaPupilar}
                        onChange={(e) => setAlturaPupilar(e.target.value)}
                        className="w-full px-2 py-1 border rounded bg-neutral-100"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <hr className="w-full my-6 border-t border-neutral-200" />
      <span className="text-neutral-800 text-xl font-medium">Detalhes de venda</span>

      <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
        
        {/* preço */}
        <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaPreco"
            className="block font-medium text-sm text-neutral-700"
          >
            Preço: <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setVendaPreco(value);
                  setIsInvalidoVendaEndereco(false);
                } else {
                  setIsInvalidoVendaEndereco(true);
                }
              }}
              value={vendaPreco || ""}
              type="text"
              name="vendaPreco"
              required
              className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaPreco
                ? "outline-red-500 focus:outline-red-500"
                : ""
                }`}
            />
          </div>
        </div>

        {/* Sinal */}
        <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaSinal"
            className="block font-medium text-sm text-neutral-700"
          >
            Sinal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setVendaSinal(value);
                  setIsInvalidoVendaSinal(false);
                } else {
                  setIsInvalidoVendaSinal(true);
                }
              }}
              value={vendaSinal || ""}
              type="text"
              name="vendaSinal"
              className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaSinal
                ? "outline-red-500 focus:outline-red-500"
                : ""
                }`}
            />
          </div>
        </div>

        {/* Apagar */}
        <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaApagar"
            className="block font-medium text-sm text-neutral-700"
          >
            Apagar
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setVendaApagar(value);
                  setIsInvalidoVendaApagar(false);
                } else {
                  setIsInvalidoVendaApagar(true);
                }
              }}
              value={vendaApagar || ""}
              type="text"
              name="vendaApagar"
              className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaApagar
                ? "outline-red-500 focus:outline-red-500"
                : ""
                }`}
            />
          </div>
        </div>

        {/* obs */}
        <div className="w-full mt-3 mb-4 px-3">
          <label
            htmlFor="vendaObs"
            className="block font-medium text-sm text-neutral-700"
          >
            Observação
          </label>
          <input
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[A-Za-z0-9\s]+$/;
              if (value === "" || regex.test(value)) {
                setVendaObs(value);
                setIsInvalidoVendaObs(false);
              } else {
                setIsInvalidoVendaObs(true);
              }
            }}
            value={vendaObs || ""}
            type="text"
            name="vendaObs"
            maxLength={255}
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaObs
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div>
      </div>
    </div>

    <div className="w-60 flex justify-start gap-3 my-9 px-4">
      <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
    </div>

    {statusRequest === true && (
      <SuccessNotification message="Venda cadastrada com sucesso!" />
    )}
    {statusRequest === false && (
      <ErrorNotification message="Não foi possível cadastrar a venda!" />
    )}
  </>);
}
export default FormCriarVendas;