'use client'
import { useState } from "react";
import axios from "axios";
import BtnActions from "@/components/Ui/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import SuccessNotification from "@/components/Ui/Notification/SuccessNotification";
import ErrorNotification from "@/components/Ui/Notification/ErrorNotification";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const FormCriarLucros = () => {
  const [lucros_nome, setLucros_nome] = useState('');
  const [lucros_razao_social, setLucros_razao_social] = useState('');
  const [lucros_cnpj, setLucros_cnpj] = useState('');
  const [lucros_inscricao_estadual, setLucros_inscricao_estadual] = useState(null);
  const [lucros_endereco, setLucros_endereco] = useState('');
  const [lucros_bairro, setLucros_bairro] = useState('');
  const [lucros_cidade, setLucros_cidade] = useState('');
  const [lucros_estado, setLucros_estado] = useState('');
  const [lucros_cep, setLucros_cep] = useState('');
  const [lucros_telefone, setLucros_telefone] = useState(null);
  const [lucros_email, setLucros_email] = useState(null);
  const [lucros_contato, setLucros_contato] = useState(null);

  const [lucros_banco, setLucros_banco] = useState(null);
  const [lucros_agencia, setLucros_agencia] = useState(null);
  const [lucros_conta, setLucros_conta] = useState(null);
  const [lucros_pix, setLucros_pix] = useState(null);

  const [lucros_observacoes, setLucros_observacoes] = useState(null);
  const [lucros_ativo, setLucros_ativo] = useState(true);

  const Lucros = {
    lucros_nome,
    lucros_razao_social,
    lucros_cnpj,
    lucros_inscricao_estadual,
    lucros_endereco,
    lucros_bairro,
    lucros_cidade,
    lucros_estado,
    lucros_cep,
    lucros_telefone,
    lucros_email,
    lucros_contato,
    lucros_banco,
    lucros_agencia,
    lucros_conta,
    lucros_pix,
    lucros_observacoes,
    lucros_ativo
  }

  const [isInvalidoLucrosNome, setIsInvalidoLucrosNome] = useState(null);
  const [isInvalidoLucrosRazaoSocial, setIsInvalidoLucrosRazaoSocial] = useState(null);
  const [isInvalidoLucrosCNPJ, setIsInvalidoLucrosCNPJ] = useState(null);
  const [isInvalidoLucrosTelefone, setIsInvalidoLucrosTelefone] = useState(null);
  const [isInvalidoLucrosEmail, setIsInvalidoLucrosEmail] = useState(null);
  const [isInvalidoLucrosContato, setIsInvalidoLucrosContato] = useState(null);
  const [isInvalidoLucrosInscricaoEstadual, setIsInvalidoLucrosInscricaoEstadual] = useState(null);

  const [isInvalidoLucrosEndereco, setIsInvalidoLucrosEndereco] = useState(null);
  const [isInvalidoLucrosBairro, setIsInvalidoLucrosBairro] = useState(null);
  const [isInvalidoLucrosCidade, setIsInvalidoLucrosCidade] = useState(null);
  const [isInvalidoLucrosEstado, setIsInvalidoLucrosEstado] = useState(null);
  const [isInvalidoLucrosCEP, setIsInvalidoLucrosCEP] = useState(null);
  
  const [isInvalidoLucrosBanco, setIsInvalidoLucrosBanco] = useState(null);
  const [isInvalidoLucrosAgencia, setIsInvalidoLucrosAgencia] = useState(null);
  const [isInvalidoLucrosConta, setIsInvalidoLucrosConta] = useState(null);
  const [isInvalidoLucrosPIX, setIsInvalidoLucrosPIX] = useState(null);

  const [isInvalidoLucrosObservacoes, setIsInvalidoLucrosObservacoes] = useState(null);

  const [secaoAtiva, setSecaoAtiva] = useState("dadosBasicos");

  const router = useRouter();

  const buscarCNPJ = async (cnpj) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/utils/cnpj`, { cnpj });
      if(response.data.data === null) {
        setIsInvalidoLucrosCNPJ(true);
      }else{
        setLucros_nome(response.data.data.nome);
        const cepFormatado = response.data.data.cep.replace(/[.-]/g, '');
        setLucros_cep(cepFormatado);
        setLucros_email(response.data.data.email)
      }
    } catch (error) {
      setIsInvalidoLucrosCNPJ(true);
    }
  };

  const buscarCEP = async (cep) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/utils/cep`, { cep });
      if(response.data.data === null) {
        setIsInvalidoLucrosCEP(true);
      }else{
        setLucros_endereco(response.data.data.logradouro);
        setLucros_bairro(response.data.data.bairro);
        setLucros_cidade(response.data.data.localidade);
        setLucros_estado(response.data.data.uf);
      }
    } catch (error) {
      setIsInvalidoLucrosCEP(true);
    }
  }

  const handleCriar = async () => {
    try{
      await axios.post('https://pos-backend-six.vercel.app/api/Lucroses/cadastrar', Lucros)
      toast.success("Lucros cadastrado com sucesso!");
      setTimeout(() => {
        router.push('/Lucros');
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar Lucros.");
    }
  }


  return (<>
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      {/* <BtnBackPage title="Voltar" /> */}
      <h3 className="text-neutral-800 text-xl font-medium ">
        {lucros_nome || "Novo Lucros"}
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
              htmlFor="lucros_cnpj"
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
                    setLucros_cnpj(value);
                    setIsInvalidoLucrosCNPJ(false);
                    if (value.length === 14) {
                      buscarCNPJ(value);
                    }
                  } else {
                    setIsInvalidoLucrosCNPJ(true);
                  }
                }}
                value={lucros_cnpj || ""}
                type="text"
                name="lucros_cnpj"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                  isInvalidoLucrosCNPJ
                    ? "outline-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
              <button
                onClick={() => buscarCNPJ(lucros_cnpj)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
              >
                <SearchIcon fontSize="20px" />
              </button>
            </div>
            {isInvalidoLucrosCNPJ && <span className="absolute right-4 font-medium text-red-600 text-sm mt-1">Não foi possível buscar o CNPJ.</span>}
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_nome"
              className="block font-medium text-sm text-neutral-700"
            >
              Nome do Lucros <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                if (value === "" || regex.test(value)) {
                  setLucros_nome(value);
                  setIsInvalidoLucrosNome(false);
                } else {
                  setIsInvalidoLucrosNome(true);
                }
              }}
              value={lucros_nome || ''}
              name="lucros_nome"
              type="text"
              required
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosNome
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_razao_social"
              className="block font-medium text-sm text-neutral-700"
            >
              Razão Social <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                if (value === "" || regex.test(value)) {
                  setLucros_razao_social(value);
                  setIsInvalidoLucrosRazaoSocial(false);
                } else {
                  setIsInvalidoLucrosRazaoSocial(true);
                }
              }}
              value={lucros_razao_social || ''}
              name="lucros_razao_social"
              type="text"
              required
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${ 
                isInvalidoLucrosRazaoSocial
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_inscricao_estadual"
              className="block font-medium text-sm text-neutral-700"
            >
              Inscrição Estadual
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setLucros_inscricao_estadual(value);
                  setIsInvalidoLucrosInscricaoEstadual(false);
                } else {
                  setIsInvalidoLucrosInscricaoEstadual(true);
                }
              }}
              value={lucros_inscricao_estadual || ''}
              name="lucros_inscricao_estadual"
              type="text"
              maxLength={14}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosInscricaoEstadual
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_telefone"
              className="block font-medium text-sm text-neutral-700"
            >
              Telefone
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setLucros_telefone(value);
                  setIsInvalidoLucrosTelefone(false);
                } else {
                  setIsInvalidoLucrosTelefone(true);
                }
              }}
              value={lucros_telefone || ''}
              name="lucros_telefone"
              type="text"
              maxLength={14}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosTelefone
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_contato"
              className="block font-medium text-sm text-neutral-700"
            >
              Contato
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setLucros_contato(value);
                  setIsInvalidoLucrosContato(false);
                } else {
                  setIsInvalidoLucrosContato(true);
                }
              }}
              value={lucros_contato || ''}
              name="lucros_contato"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosContato
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>              

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_email"
              className="block font-medium text-sm text-neutral-700"
            >
              E-mail 
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9@._-]*$/;
                if (regex.test(value)) {
                  setLucros_email(value);
                  setIsInvalidoLucrosEmail(false);
                } else {
                  setIsInvalidoLucrosEmail(true);
                }
              }}
              value={lucros_email || ''}
              name="lucros_email"
              type="email"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosEmail
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
            <label htmlFor="lucros_cep" className="block mb-1 font-medium text-sm text-neutral-700">CEP <span className="text-red-600">*</span></label>
            <div className="relative">
              <div className="relative h-10 w-full">
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[0-9]*$/;
                    if (value === "" || regex.test(value)) {
                      setLucros_cep(value);
                      setIsInvalidoLucrosCEP(false);
                      if(value.length === 8) {
                        buscarCEP(value);
                      }
                    } else {
                      setIsInvalidoLucrosCEP(true);
                    }
                  }}
                  value={lucros_cep || ''}
                  type="text"
                  name="lucros_cep"
                  required
                  maxLength={8}
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                    isInvalidoLucrosCEP
                      ? "outline-red-500 focus:outline-red-500"
                      : ""
                  }`}
                />
                <button
                  onClick={() => buscarCEP(lucros_cep)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                >
                  <SearchIcon fontSize='20px'/>
                </button>
              </div>
              {isInvalidoLucrosCEP && <span className="absolute right-4 font-medium text-red-600 text-sm mt-1">Não foi possível buscar o CEP.</span>}
            </div>
          </div>

          <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_endereco"
              className="block font-medium text-sm text-neutral-700"
            >
              Logradouro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setLucros_endereco(value);
                  setIsInvalidoLucrosEndereco(false);
                } else {
                  setIsInvalidoLucrosEndereco(true);
                }
              }}
              value={lucros_endereco || ''}
              name="lucros_endereco"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosEndereco
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_bairro"
              className="block font-medium text-sm text-neutral-700"
            >
              Bairro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setLucros_bairro(value);
                  setIsInvalidoLucrosBairro(false);
                } else {
                  setIsInvalidoLucrosBairro(true);
                }
              }}
              value={lucros_bairro || ''}
              name="lucros_bairro"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosBairro
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_cidade"
              className="block font-medium text-sm text-neutral-700"  
            >
              Cidade <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setLucros_cidade(value);
                  setIsInvalidoLucrosCidade(false);
                } else {
                  setIsInvalidoLucrosCidade(true);
                }
              }}
              value={lucros_cidade || ''}
              name="lucros_cidade"
              type="text"
              maxLength={255}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosCidade
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_estado"
              className="block font-medium text-sm text-neutral-700"
            >
              Estado <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z]*$/;
                if (regex.test(value)) {
                  setLucros_estado(value);
                  setIsInvalidoLucrosEstado(false);
                } else {
                  setIsInvalidoLucrosEstado(true);
                }
              }}
              value={lucros_estado || ''}
              name="lucros_estado"
              type="text"
              maxLength={2}
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosEstado
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
              htmlFor="lucros_banco"
              className="block font-medium text-sm text-neutral-700"
            >
              Banco
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(value)) {
                  setLucros_banco(value);
                  setIsInvalidoLucrosBanco(false);
                } else {
                  setIsInvalidoLucrosBanco(true);
                }
              }}
              value={lucros_banco || ''}
              name="lucros_banco"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosBanco
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_agencia"
              className="block font-medium text-sm text-neutral-700"
            >
              Agência
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9-]*$/;
                if (regex.test(value)) {
                  setLucros_agencia(value);
                  setIsInvalidoLucrosAgencia(false);
                } else {
                  setIsInvalidoLucrosAgencia(true);
                }
              }}
              value={lucros_agencia || ''}
              name="lucros_agencia"
              type="text"
              maxLength={4}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosAgencia
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_conta"
              className="block font-medium text-sm text-neutral-700"
            >
              Conta
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(value)) {
                  setLucros_conta(value);
                  setIsInvalidoLucrosConta(false);
                } else {
                  setIsInvalidoLucrosConta(true);
                }
              }}
              value={lucros_conta || ''}
              name="lucros_conta"
              type="text"
              maxLength={12}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosConta
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_pix"
              className="block font-medium text-sm text-neutral-700"
            >
              PIX
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9@._-]*$/;
                if (regex.test(value)) {
                  setLucros_pix(value);
                  setIsInvalidoLucrosPIX(false);
                } else {
                  setIsInvalidoLucrosPIX(true);
                }
              }}
              value={lucros_pix || ''}
              name="lucros_pix"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosPIX
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="lucros_observacoes"
              className="block font-medium text-sm text-neutral-700"
            >
              Observações
            </label>
            <textarea
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9\s]*$/;
                if (regex.test(value)) {
                  setLucros_observacoes(value);
                  setIsInvalidoLucrosObservacoes(false);
                } else {
                  setIsInvalidoLucrosObservacoes(true);
                }
              }}
              value={lucros_observacoes || ''}
              name="lucros_observacoes"
              type="text"
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoLucrosObservacoes
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
              <label htmlFor="lucros_ativo_true" className="flex items-center">
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    lucros_ativo === true ? "border-orange-500 bg-orange-400" : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value={true}
                  checked={lucros_ativo === true}
                  id="lucros_ativo_true"
                  name="lucros_ativo"
                  onChange={(e) => setLucros_ativo(true)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <span className="font-normal ml-2">Ativo</span>
              </label>

              <label htmlFor="lucros_ativo_false" className="flex items-center">
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    lucros_ativo === false ? "border-orange-500 bg-orange-400" : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value={false}
                  checked={lucros_ativo === false}
                  id="lucros_ativo_false"
                  name="lucros_ativo"
                  onChange={(e) => setLucros_ativo(false)}
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
  </>);
}
