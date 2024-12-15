'use client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useRouter } from "next/navigation";

const FormCriarVendas = () => {
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

  const venda = {
    data: vendaData,
    entrega: vendaEntrega,
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
  const [secaoAtiva, setSecaoAtiva] = useState("dadosPessoais");
  const router = useRouter();

  const buscarCNPJ = async (cnpj) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cnpj`, { cnpj });
      if (response.data.data === null) {
        alert('CNPJ não encontrado!');
        return;
      } else {
        setVendaData(response.data.data.nome);
        setVendaArmacao(response.data.data.Armacao);

        const cepFormatado = response.data.data.cep.replace(/[.-]/g, '');
        setFunc_cep(cepFormatado);
        setVendaApagar(response.data.data.complemento);
        setVendaSinal(response.data.data.Preco);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buscarCEP = async (cep) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cep`, { cep });
      if (response.data.data === null) {
        alert('CEP não encontrado!');
        return;
      } else {
        setVendaPreco(response.data.data.logradouro);
        setVendaObs(response.data.data.Sinal);
        setFunc_Apagar(response.data.data.localidade);
        setFunc_Obs(response.data.data.uf);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // busca do cliente
  const [isLoading, setIsLoading] = useState(false);
  const [openFilterCpf, setOpenFilterCpf] = useState(false);
  const [cliente, setCliente] = useState({});
  const [filtros, setFiltros] = useState({
    campo: 'cpf',
    valor: '',
  });

  useEffect(() => {
    const regex = /^[0-9]*$/;
    if (vendaCPF === "" || regex.test(vendaCPF)) {
      setIsInvalidoVendaCPF(false);
    } else {
      setIsInvalidoVendaCPF(true);
    }
  }, [vendaCPF]);

  useEffect(() => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      valor: vendaCPF,
    }));
  }, [vendaCPF]);

  const handleChange = (e) => {
    setOpenFilterCpf(true);
    const value = e.target.value.replace(/\D/g, '');
    setVendaCPF(value);
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      valor: value,
    }));
    if (value === "") {
      setCliente(null);
      setIsLoading(false);
      setOpenFilterCpf(false);
    }
  };

  const handleClick = async () => {
    setOpenFilterCpf(true);
  }

  const handleFocus = () => {
    setIsLoading(true);
  };

  const cadastrarCliente = async () => {
    try {
      console.log('Cadastrar cliente');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const filterCpf = async () => {
    if (vendaCPF.length === 11) {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/clientes/filter', { params: filtros });
        if (response.data.clientes.length === 0) {
          setCliente({});
        } else {
          setCliente(response.data.clientes[0]);
        }
      } catch (error) {
        setCliente({});
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleCriar = async () => {
    console.log(venda);
    try {
      await axios.post('http://localhost:3001/api/vendas/cadastrar', venda)
      router.push('/vendas')
      setStatusRequest(true);
    } catch (error) {
      setStatusRequest(false);
    }
  }

  useEffect(() => {
    filterCpf();
  }, [filtros, vendaCPF]);

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
      {/* <BtnBackPage title="Voltar" /> */}
      <h3 className="text-neutral-800 text-xl font-medium ">
        {vendaData || "Data de venda"} - {vendaNome || "Nome do cliente"}
      </h3>
      <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>

        {/* <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaCNPJ"
            className="block font-medium text-sm text-neutral-700"
          >
            Buscar cliente por CPF:
          </label>
          <input
            type="text"
            className="peer rounded-sm w-full px-3 py-1 font-medium text-neutral-700 bg-transparent border-transparent border-2 border-b--600 focus:border-b-blue-400 focus:rounded-lg focus:outline outline-transparent focus:outline-transparent transition-all duration-500 ease-out"
            placeholder="Insira o CNPJ"
            onChange={(e) => setVendaCPF(e.target.value)}
          />
        </div> */}

        {/* cpf */}
        <div className="w-full mt-3 mb-4 px-3">
          <label
            htmlFor="vendaCPF"
            className="block font-medium text-sm text-neutral-700"
          >
            Buscar cliente por CPF: <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              onClick={handleClick}
              value={vendaCPF || ""}
              type="text"
              name="vendaCPF"
              maxLength={11}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaCPF
                ? "outline-red-500 focus:outline-red-500"
                : ""
                }`}
            />
            <button
              type="button"
              onClick={filterCpf}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-105 transition duration-500 ease-in-out"
            >
              <SearchIcon fontSize="small" className="text-neutral-800 hover:text-black" />
            </button>
            {openFilterCpf && (
              <div ref={dropdownRef} className="bg-gray-200 hover:bg-gray-300 focus:bg-gray-400 active:bg-gray-300 border-gray-200 hover:shadow-sm w-full mt-2 hover:rounded-sm min-h-fit flex z-50 absolute px-6 py-3 items-start justify-center transition duration-500 ease-in-out cursor-pointer">
                <div
                  className="bg-orange-400 text-white rounded-full mr-2"
                >
                  <PersonIcon fontSize="small" className="m-2" />
                </div>
                <div className="flex w-full items-center justify-between">
                  {isLoading ? (
                    <div className="flex justify-center items-center w-full mt-2">
                      <CircularProgress size={24} />
                    </div>
                  ) : (
                    <>
                      console.log(cliente);
                      {cliente ? (
                        <>
                          <span className="font-medium text-neutral-700 text-lg">{cliente.nome}</span>
                          <span className="font-medium text-neutral-700 text-sm">{cliente.cpf}</span>
                        </>
                      ) : (
                        <div>
                          <span className="font-medium text-neutral-700 text-lg">Nenhum cliente encontrado</span>
                          <button onClick={cadastrarCliente} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Cadastrar Cliente</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

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

        {/* nome */}
        {/* <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaNome"
            className="block font-medium text-sm text-neutral-700"
          >
            Nome: <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[A-Za-z0-9\s]+$/;
              if (value === "" || regex.test(value)) {
                setVendaNome(value);
                setIsInvalidoVendaNome(false);
              } else {
                setIsInvalidoVendaNome(true);
              }
            }}
            value={vendaNome || ""}
            type="text"
            name="vendaNome"
            maxLength={200}
            required
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaNome
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div> */}

        {/* telefone */}
        {/* <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaTelefone"
            className="block font-medium text-sm text-neutral-700"
          >
            Telefone: <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="vendaTelefone"
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9]*$/;
              if (value === "" || regex.test(value)) {
                setVendaTelefone(value);
                setIsInvalidoVendaTelefone(false);
              } else {
                setIsInvalidoVendaTelefone(true);
              }
            }}
            value={vendaTelefone || ""}
            maxLength={11}
            required
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaTelefone
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div> */}

        {/* endereco */}
        {/* <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaEndereco"
            className="block font-medium text-sm text-neutral-700"
          >
            Endereço: <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[A-Za-z0-9\s]+$/;
              if (value === "" || regex.test(value)) {
                setVendaEndereco(value);
                setIsInvalidoVendaEndereco(false);
              } else {
                setIsInvalidoVendaEndereco(true);
              }
            }}
            value={vendaEndereco || ""}
            type="text"
            name="vendaEndereco"
            maxLength={200}
            required
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaEndereco
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div> */}

        {/* complemento */}
        {/* <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
          <label
            htmlFor="vendaComplemento"
            className="block font-medium text-sm text-neutral-700"
          >
            Complemento:
          </label>
          <input
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[A-Za-z0-9\s]+$/;
              if (value === "" || regex.test(value)) {
                setVendaComplemento(value);
                setIsInvalidoVendaComplemento(false);
              } else {
                setIsInvalidoVendaComplemento(true);
              }
            }}
            value={vendaComplemento || ""}
            type="text"
            name="vendaComplemento"
            maxLength={100}
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaComplemento
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div> */}

        <hr className="w-full my-6 border-t border-neutral-200" />

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
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaLentes
              ? "outline-red-500 focus:outline-red-500"
              : ""
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
            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVendaArmacao
              ? "outline-red-500 focus:outline-red-500"
              : ""
              }`}
          />
        </div>
      </div>

      <hr className="w-full my-6 border-t border-neutral-200" />
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