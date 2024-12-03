'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";

const steps = [
  { titulo: "Dados Pessoais" },
  { titulo: "Endereço" },
  { titulo: "Dados Complementares" },
  { titulo: "Financeiro" },
  { titulo: "Observações" },
];


const FormEditarClientes = () => {
  const [input, setInputs] = useState({
    cli_nome: '',
    cli_tipo_cliente: '',
    cli_cpf_cnpj: '',
    cli_data_nascimento: '',
    cli_rg_inscricao_estadual: '',
    cli_data_nascimento: '',
    cli_genero: '',
    cli_telefone: '',
    cli_celular: '',
    cli_email: '',
    cli_endereco: '',
    cli_numero: '',
    cli_complemento: '',
    cli_bairro: '',
    cli_cidade: '',
    cli_estado: '',
    cli_cep: '',
    cli_pais: '',
    cli_inscricao_municipal: '',
    cli_inscricao_estadual: '',
    cli_codigo_regime_tributario: '',
    cli_cnae: '',
    cli_suframa: '',
    cli_limite_credito: '',
    cli_saldo_devedor: '',
    cli_observacoes: '',
  });

  const [statusRequest, setStatusRequest] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const cli_codigo = Cookies.get('selectedCliente');

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(
          `https://pos-backend-six.vercel.app/api/clientes/getId/${cli_codigo}`
        );
        setInputs(response.data.cliente);
      }catch (error) {
        console.log(error);
      }
    };
  
    if (cli_codigo) {
      fetchCliente();
    }
  }, [cli_codigo]);

  const handleEditar = async () => {
    const { cli_data_atualizacao, cli_data_cadastro, cli_data_excluido, cli_excluido, cli_data_nascimento, ...clienteSemDatas } = input;
  
    const dataNascimentoFormatada = cli_data_nascimento ? new Date(cli_data_nascimento).toISOString().split('T')[0] : null;
    
    if (dataNascimentoFormatada) {
      clienteSemDatas.cli_data_nascimento = dataNascimentoFormatada;
    }
  
    try {
      const res = await axios.put('https://pos-backend-six.vercel.app/api/clientes/editar', {
        ...clienteSemDatas,
        cli_codigo
      });
      if (res.status === 200) {
        setStatusRequest(true);
      }
    } catch (error) {
      setStatusRequest(false);
    }
  }

  const handleStepClick = (index, e) => {
    e.preventDefault();
    setActiveStep(index);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="lg:flex lg:gap-28 mx-2 md:mx-4 lg:mx-6">
      <form className="w-full lg:max-w-6xl xl:max-w-7xl">
        <div className="flex flex-col gap-4">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.titulo}>
                <div>
                  <button
                    className="focus:outline-none"
                    onClick={(e) => handleStepClick(index, e)}
                  >
                    <h2 className="text-lg font-semibold text-neutral-700">{step.titulo}</h2>
                  </button>
                  {activeStep === index && (
                    <>
                      {index === 0 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-4">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_nome || ''}
                              name="cli_nome"
                              type="text"
                              required
                              placeholder="Nome do cliente"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            ></input>
                            <label
                              htmlFor="cli_nome"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Nome do cliente
                            </label>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div>
                              <input
                                type="radio"
                                value="F"
                                checked={input.cli_tipo_cliente === 'F'}
                                id="cli_tipo_cliente_fisica"
                                name="cli_tipo_cliente"
                                onChange={inputChange}
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="cli_tipo_cliente_fisica"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Física
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                value="J"
                                checked={input.cli_tipo_cliente === 'J'}
                                id="cli_tipo_cliente_juridica"
                                name="cli_tipo_cliente"
                                onChange={inputChange}
                                required
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="cli_tipo_cliente_juridica"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Jurídica
                              </label>
                            </div>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_cpf_cnpj || ''}
                              type="text"
                              name="cli_cpf_cnpj"
                              placeholder="CPF/CNPJ"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_cpf_cnpj"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              CPF/CNPJ
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_rg_inscricao_estadual || ''}
                              type="text"
                              name="cli_rg_inscricao_estadual"
                              placeholder="RG/Inscrição Estadual"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_rg_inscricao_estadual"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              RG/Inscrição Estadual
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_data_nascimento ? new Date(input.cli_data_nascimento).toISOString().split('T')[0] : ''}
                              type="date"
                              name="cli_data_nascimento"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_data_nascimento"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Data de Nascimento
                            </label>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="M"
                                checked={input.cli_genero === 'M'}
                                onChange={inputChange}
                                id="cli_genero_masculino"
                                name="cli_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="cli_genero_masculino"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Masculino
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="F"
                                checked={input.cli_genero === 'F'}
                                onChange={inputChange}
                                id="cli_genero_feminino"
                                name="cli_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="cli_genero_feminino"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Feminino
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="O"
                                checked={input.cli_genero === 'O'}
                                onChange={inputChange}
                                id="cli_genero_outro"
                                name="cli_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="cli_genero_outro"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Outro
                              </label>
                            </div>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_telefone || ''}
                              type="text"
                              name="cli_telefone"
                              placeholder="Telefone"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_telefone"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Telefone
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_celular || ''}
                              type="text"
                              name="cli_celular"
                              placeholder="Celular"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_celular"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Celular
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_email || ''}
                              type="email"
                              name="cli_email"
                              placeholder="E-mail"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_email"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              E-mail
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-4">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_endereco || ''}
                              name="cli_endereco"
                              type="text"
                              required
                              placeholder="Endereço"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_endereco"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Endereço
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_numero || ''}
                              type="text"
                              name="cli_numero"
                              placeholder="Número"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_numero"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Número
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_complemento || ''}
                              type="text"
                              name="cli_complemento"
                              placeholder="Complemento"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_complemento"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Complemento
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_bairro || ''}
                              type="text"
                              name="cli_bairro"
                              placeholder="Bairro"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_bairro"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Bairro
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_cidade || ''}
                              type="text"
                              name="cli_cidade"
                              placeholder="Cidade"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_cidade"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Cidade
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_estado || ''}
                              type="text"
                              name="cli_estado"
                              placeholder="Estado"
                              maxLength='2'
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_estado"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Estado
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_cep || ''}
                              type="text"
                              name="cli_cep"
                              placeholder="CEP"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_cep"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              CEP
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_pais || ''}
                              type="text"
                              name="cli_pais"
                              placeholder="País"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_pais"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              País
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-4">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_inscricao_municipal || ''}
                              type="text"
                              name="cli_inscricao_municipal"
                              placeholder="Inscrição Municipal"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_inscricao_municipal"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Inscrição Municipal
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_inscricao_estadual || ''}
                              type="text"
                              name="cli_inscricao_estadual"
                              placeholder="Inscrição Estadual"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_inscricao_estadual"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Inscrição Estadual
                            </label>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="1"
                                checked={input.cli_codigo_regime_tributario === '1'}
                                id="regime_tributario_1"
                                name="cli_codigo_regime_tributario"
                                onChange={inputChange}
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="regime_tributario_1"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Simples Nacional
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="2"
                                checked={input.cli_codigo_regime_tributario === '2'}
                                id="regime_tributario_2"
                                name="cli_codigo_regime_tributario"
                                onChange={inputChange}
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="regime_tributario_2"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Lucro Presumido
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="3"
                                checked={input.cli_codigo_regime_tributario === '3'}
                                id="regime_tributario_3"
                                name="cli_codigo_regime_tributario"
                                onChange={inputChange}
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="regime_tributario_3"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Lucro Real
                              </label>
                            </div>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_cnae || ''}
                              type="text"
                              name="cli_cnae"
                              placeholder="CNAE"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_cnae"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              CNAE
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_suframa || ''}
                              type="text"
                              name="cli_suframa"
                              placeholder="SUFRAMA"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_suframa"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              SUFRAMA
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="flex flex-col lg:flex-wrap gap-4 mt-8 mb-7 ml-4">
                          <div>
                            <div className="flex flex-col gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.cli_limite_credito || ''}
                                  name="cli_limite_credito"
                                  type="text"
                                  placeholder="Limite de Crédito"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="cli_limite_credito"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Limite de Crédito
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.cli_saldo_devedor || ''}
                                  name="cli_saldo_devedor"
                                  type="text"
                                  placeholder="Saldo Devedor"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="cli_saldo_devedor"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Saldo Devedor
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="flex flex-col lg:flex-wrap gap-4 mt-8 mb-7 ml-4">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.cli_observacoes || ''}
                              name="cli_observacoes"
                              type="text"
                              placeholder="Observações"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cli_observacoes"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Observações
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Step>
            ))}
          </Stepper>

          <div className="flex gap-3 my-9 px-4">
            {activeStep > 0 && (
              <BtnActions title="Voltar" onClick={handleBack} color="desativado" />
            )}
            {activeStep < 4 ? (
              <BtnActions title="Próximo" onClick={handleNext} color="ativado" />
            ) : (
              <BtnActions title="Editar" onClick={handleEditar} color="ativado" />
            )}
          </div>
          {statusRequest === true && (
            <SuccessNotification message="Cliente editado com sucesso!" />
          )}
          {statusRequest === false && (
            <ErrorNotification message="Não foi possível editar o cliente!" />
          )}
        </div>
      </form>
    </div>
  );
}
export default FormEditarClientes;