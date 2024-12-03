'use client'
import { useState } from "react";
import axios from "axios";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useRouter } from "next/navigation";


export const FormCriarFornecedor = () => {
  const [for_nome, setFor_nome] = useState('');
  const [for_razao_social, setFor_razao_social] = useState('');
  const [for_cnpj, setFor_cnpj] = useState('');
  const [for_inscricao_estadual, setFor_inscricao_estadual] = useState(null);
  const [for_endereco, setFor_endereco] = useState('');
  const [for_bairro, setFor_bairro] = useState('');
  const [for_cidade, setFor_cidade] = useState('');
  const [for_estado, setFor_estado] = useState('');
  const [for_cep, setFor_cep] = useState('');
  const [for_telefone, setFor_telefone] = useState(null);
  const [for_email, setFor_email] = useState(null);
  const [for_contato, setFor_contato] = useState(null);

  const [for_banco, setFor_banco] = useState(null);
  const [for_agencia, setFor_agencia] = useState(null);
  const [for_conta, setFor_conta] = useState(null);
  const [for_pix, setFor_pix] = useState(null);

  const [for_observacoes, setFor_observacoes] = useState(null);
  const [for_ativo, setFor_ativo] = useState(true);

  const fornecedor = {
    for_nome,
    for_razao_social,
    for_cnpj,
    for_inscricao_estadual,
    for_endereco,
    for_bairro,
    for_cidade,
    for_estado,
    for_cep,
    for_telefone,
    for_email,
    for_contato,
    for_banco,
    for_agencia,
    for_conta,
    for_pix,
    for_observacoes,
    for_ativo
  }

  const [isInvalidoFornecedorNome, setIsInvalidoFornecedorNome] = useState(null);
  const [isInvalidoFornecedorRazaoSocial, setIsInvalidoFornecedorRazaoSocial] = useState(null);
  const [isInvalidoFornecedorCNPJ, setIsInvalidoFornecedorCNPJ] = useState(null);
  const [isInvalidoFornecedorTelefone, setIsInvalidoFornecedorTelefone] = useState(null);
  const [isInvalidoFornecedorEmail, setIsInvalidoFornecedorEmail] = useState(null);
  const [isInvalidoFornecedorContato, setIsInvalidoFornecedorContato] = useState(null);
  const [isInvalidoFornecedorInscricaoEstadual, setIsInvalidoFornecedorInscricaoEstadual] = useState(null);

  const [isInvalidoFornecedorEndereco, setIsInvalidoFornecedorEndereco] = useState(null);
  const [isInvalidoFornecedorBairro, setIsInvalidoFornecedorBairro] = useState(null);
  const [isInvalidoFornecedorCidade, setIsInvalidoFornecedorCidade] = useState(null);
  const [isInvalidoFornecedorEstado, setIsInvalidoFornecedorEstado] = useState(null);
  const [isInvalidoFornecedorCEP, setIsInvalidoFornecedorCEP] = useState(null);
  
  const [isInvalidoFornecedorBanco, setIsInvalidoFornecedorBanco] = useState(null);
  const [isInvalidoFornecedorAgencia, setIsInvalidoFornecedorAgencia] = useState(null);
  const [isInvalidoFornecedorConta, setIsInvalidoFornecedorConta] = useState(null);
  const [isInvalidoFornecedorPIX, setIsInvalidoFornecedorPIX] = useState(null);

  const [isInvalidoFornecedorObservacoes, setIsInvalidoFornecedorObservacoes] = useState(null);

  const [secaoAtiva, setSecaoAtiva] = useState("dadosBasicos");
  const [statusRequest, setStatusRequest] = useState('');

  const router = useRouter();

  const buscarCNPJ = async (cnpj) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cnpj`, { cnpj });
      if(response.data.data === null) {
        setIsInvalidoFornecedorCNPJ(true);
      }else{
        setFor_nome(response.data.data.nome);
        const cepFormatado = response.data.data.cep.replace(/[.-]/g, '');
        setFor_cep(cepFormatado);
        setFor_email(response.data.data.email)
      }
    } catch (error) {
      setIsInvalidoFornecedorCNPJ(true);
    }
  };

  const buscarCEP = async (cep) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cep`, { cep });
      if(response.data.data === null) {
        setIsInvalidoFornecedorCEP(true);
      }else{
        setFor_endereco(response.data.data.logradouro);
        setFor_bairro(response.data.data.bairro);
        setFor_cidade(response.data.data.localidade);
        setFor_estado(response.data.data.uf);
      }
    } catch (error) {
      setIsInvalidoFornecedorCEP(true);
    }
  }

  const handleCriar = async () => {
    try{
      await axios.post('https://pos-backend-six.vercel.app/api/fornecedores/cadastrar', fornecedor)
      setStatusRequest(true);
      router.push('/fornecedor');
    } catch (error) {
      console.log(error);
      setStatusRequest(false);
    }
  }


  return (<>
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      {/* <BtnBackPage title="Voltar" /> */}
      <h3 className="text-neutral-800 text-xl font-medium ">
        {for_nome || "Novo Fornecedor"}
      </h3>

      <div className="flex gap-6 mt-5 mb-2 relative">
        <button
          onClick={() => setSecaoAtiva("dadosBasicos")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "dadosBasicos"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          dados básicos
        </button>
        <button
          onClick={() => setSecaoAtiva("endereco")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "endereco"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          endereço
        </button>
        <button
          onClick={() => setSecaoAtiva("dadosBancario")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "dadosBancario"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          dados bancários
        </button>
      </div>

      {secaoAtiva === "dadosBasicos" && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="relative w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_cnpj"
              className="block font-medium text-sm text-neutral-700"
            >
              CNPJ <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === "" || regex.test(value)) {
                    setFor_cnpj(value);
                    setIsInvalidoFornecedorCNPJ(false);
                    if (value.length === 14) {
                      buscarCNPJ(value);
                    }
                  } else {
                    setIsInvalidoFornecedorCNPJ(true);
                  }
                }}
                value={for_cnpj || ""}
                type="text"
                name="for_cnpj"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                  isInvalidoFornecedorCNPJ
                    ? "outline-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
              <button
                onClick={() => buscarCNPJ(for_cnpj)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
              >
                <SearchIcon fontSize="20px" />
              </button>
            </div>
            {isInvalidoFornecedorCNPJ && <span className="absolute right-4 font-medium text-red-600 text-sm mt-1">Não foi possível buscar o CNPJ.</span>}
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_nome"
              className="block font-medium text-sm text-neutral-700"
            >
              Nome do fornecedor <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                if (value === "" || regex.test(value)) {
                  setFor_nome(value);
                  setIsInvalidoFornecedorNome(false);
                } else {
                  setIsInvalidoFornecedorNome(true);
                }
              }}
              value={for_nome || ''}
              name="for_nome"
              type="text"
              required
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorNome
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_razao_social"
              className="block font-medium text-sm text-neutral-700"
            >
              Razão Social <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                if (value === "" || regex.test(value)) {
                  setFor_razao_social(value);
                  setIsInvalidoFornecedorRazaoSocial(false);
                } else {
                  setIsInvalidoFornecedorRazaoSocial(true);
                }
              }}
              value={for_razao_social || ''}
              name="for_razao_social"
              type="text"
              required
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${ 
                isInvalidoFornecedorRazaoSocial
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_inscricao_estadual"
              className="block font-medium text-sm text-neutral-700"
            >
              Inscrição Estadual
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setFor_inscricao_estadual(value);
                  setIsInvalidoFornecedorInscricaoEstadual(false);
                } else {
                  setIsInvalidoFornecedorInscricaoEstadual(true);
                }
              }}
              value={for_inscricao_estadual || ''}
              name="for_inscricao_estadual"
              type="text"
              maxLength={14}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorInscricaoEstadual
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_telefone"
              className="block font-medium text-sm text-neutral-700"
            >
              Telefone
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setFor_telefone(value);
                  setIsInvalidoFornecedorTelefone(false);
                } else {
                  setIsInvalidoFornecedorTelefone(true);
                }
              }}
              value={for_telefone || ''}
              name="for_telefone"
              type="text"
              maxLength={14}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorTelefone
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_contato"
              className="block font-medium text-sm text-neutral-700"
            >
              Contato
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setFor_contato(value);
                  setIsInvalidoFornecedorContato(false);
                } else {
                  setIsInvalidoFornecedorContato(true);
                }
              }}
              value={for_contato || ''}
              name="for_contato"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorContato
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>              

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_email"
              className="block font-medium text-sm text-neutral-700"
            >
              E-mail 
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9@._-]*$/;
                if (regex.test(value)) {
                  setFor_email(value);
                  setIsInvalidoFornecedorEmail(false);
                } else {
                  setIsInvalidoFornecedorEmail(true);
                }
              }}
              value={for_email || ''}
              name="for_email"
              type="email"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorEmail
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`} 
            />
          </div>
        </div>
      )}

      {secaoAtiva === 'endereco' && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label htmlFor="for_cep" className="block mb-1 font-medium text-sm text-neutral-700">CEP <span className="text-red-600">*</span></label>
            <div className="relative">
              <div className="relative h-10 w-full">
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[0-9]*$/;
                    if (value === "" || regex.test(value)) {
                      setFor_cep(value);
                      setIsInvalidoFornecedorCEP(false);
                      if(value.length === 8) {
                        buscarCEP(value);
                      }
                    } else {
                      setIsInvalidoFornecedorCEP(true);
                    }
                  }}
                  value={for_cep || ''}
                  type="text"
                  name="for_cep"
                  required
                  maxLength={8}
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                    isInvalidoFornecedorCEP
                      ? "outline-red-500 focus:outline-red-500"
                      : ""
                  }`}
                />
                <button
                  onClick={() => buscarCEP(for_cep)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                >
                  <SearchIcon fontSize='20px'/>
                </button>
              </div>
              {isInvalidoFornecedorCEP && <span className="absolute right-4 font-medium text-red-600 text-sm mt-1">Não foi possível buscar o CEP.</span>}
            </div>
          </div>

          <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
            <label
              htmlFor="for_endereco"
              className="block font-medium text-sm text-neutral-700"
            >
              Logradouro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setFor_endereco(value);
                  setIsInvalidoFornecedorEndereco(false);
                } else {
                  setIsInvalidoFornecedorEndereco(true);
                }
              }}
              value={for_endereco || ''}
              name="for_endereco"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorEndereco
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label
              htmlFor="for_bairro"
              className="block font-medium text-sm text-neutral-700"
            >
              Bairro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setFor_bairro(value);
                  setIsInvalidoFornecedorBairro(false);
                } else {
                  setIsInvalidoFornecedorBairro(true);
                }
              }}
              value={for_bairro || ''}
              name="for_bairro"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorBairro
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label
              htmlFor="for_cidade"
              className="block font-medium text-sm text-neutral-700"  
            >
              Cidade <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setFor_cidade(value);
                  setIsInvalidoFornecedorCidade(false);
                } else {
                  setIsInvalidoFornecedorCidade(true);
                }
              }}
              value={for_cidade || ''}
              name="for_cidade"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorCidade
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="for_estado"
              className="block font-medium text-sm text-neutral-700"
            >
              Estado <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z]*$/;
                if (regex.test(value)) {
                  setFor_estado(value);
                  setIsInvalidoFornecedorEstado(false);
                } else {
                  setIsInvalidoFornecedorEstado(true);
                }
              }}
              value={for_estado || ''}
              name="for_estado"
              type="text"
              maxLength={2}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorEstado
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>            
        </div>
      )}

      {secaoAtiva === 'dadosBancario' && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_banco"
              className="block font-medium text-sm text-neutral-700"
            >
              Banco
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setFor_banco(value);
                  setIsInvalidoFornecedorBanco(false);
                } else {
                  setIsInvalidoFornecedorBanco(true);
                }
              }}
              value={for_banco || ''}
              name="for_banco"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorBanco
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_agencia"
              className="block font-medium text-sm text-neutral-700"
            >
              Agência
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9-]*$/;
                if (regex.test(value)) {
                  setFor_agencia(value);
                  setIsInvalidoFornecedorAgencia(false);
                } else {
                  setIsInvalidoFornecedorAgencia(true);
                }
              }}
              value={for_agencia || ''}
              name="for_agencia"
              type="text"
              maxLength={4}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorAgencia
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_conta"
              className="block font-medium text-sm text-neutral-700"
            >
              Conta
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setFor_conta(value);
                  setIsInvalidoFornecedorConta(false);
                } else {
                  setIsInvalidoFornecedorConta(true);
                }
              }}
              value={for_conta || ''}
              name="for_conta"
              type="text"
              maxLength={12}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorConta
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_pix"
              className="block font-medium text-sm text-neutral-700"
            >
              PIX
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9@._-]*$/;
                if (regex.test(value)) {
                  setFor_pix(value);
                  setIsInvalidoFornecedorPIX(false);
                } else {
                  setIsInvalidoFornecedorPIX(true);
                }
              }}
              value={for_pix || ''}
              name="for_pix"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorPIX
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="for_observacoes"
              className="block font-medium text-sm text-neutral-700"
            >
              Observações
            </label>
            <textarea
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9\s]*$/;
                if (regex.test(value)) {
                  setFor_observacoes(value);
                  setIsInvalidoFornecedorObservacoes(false);
                } else {
                  setIsInvalidoFornecedorObservacoes(true);
                }
              }}
              value={for_observacoes || ''}
              name="for_observacoes"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFornecedorObservacoes
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="Status_da_Venda"
              className="block mb-1 font-medium text-sm text-neutral-700"
            >
              Ativo
            </label>

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <label htmlFor="for_ativo_true" className="flex items-center">
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    for_ativo === true ? "border-orange-500 bg-orange-400" : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value={true}
                  checked={for_ativo === true}
                  id="for_ativo_true"
                  name="for_ativo"
                  onChange={(e) => setFor_ativo(true)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <span className="font-normal ml-2">Ativo</span>
              </label>

              <label htmlFor="for_ativo_false" className="flex items-center">
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    for_ativo === false ? "border-orange-500 bg-orange-400" : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value={false}
                  checked={for_ativo === false}
                  id="for_ativo_false"
                  name="for_ativo"
                  onChange={(e) => setFor_ativo(false)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <span className="font-normal ml-2">Inativo</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="w-60 flex justify-start gap-3 my-9 px-4">
      <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
    </div>

    {statusRequest === true && (
      <SuccessNotification message="Fornecedor criado com sucesso!" />
    )}
    {statusRequest === false && (
      <ErrorNotification message="Não foi possível criar o fornecedor!" />
    )}
  </>);
}
