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
  { titulo: "Informações Profissionais" },
  { titulo: "Informações Adicionais" },
  { titulo: "Observações" },
];


const FormEditarVendas = () => {
  const [input, setInputs] = useState({
    func_nome: "",
    func_tipo_documento: "",
    func_cpf_cnpj: "",
    func_rg_inscricao_estadual: "",
    func_data_nascimento: "",
    func_genero: "",
    func_telefone: "",
    func_celular: "",
    func_email: "",
    func_endereco: "",
    func_numero: "",
    func_complemento: "",
    func_bairro: "",
    func_cidade: "",
    func_estado: "",
    func_cep: "",
    func_pais: "",
    func_cargo: "",
    func_departamento: "",
    func_data_admissao: "",
    func_data_demissao: "",
    func_salario: "",
    func_comissao: "",
    func_observacoes: "",
  });

  const [statusRequest, setStatusRequest] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const func_codigo = Cookies.get('selectedvenda');

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get(
          `https://pos-backend-six.vercel.app/api/Vendas/getId/${func_codigo}`
        );
        setInputs(response.data.venda);
      }catch (error) {
        console.log(error);
      }
    };
  
    if (func_codigo) {
      fetchVendas();
    }
  }, [func_codigo]);

  const handleEditar = async () => {
    const { func_data_atualizacao, func_data_cadastro, func_data_excluido, func_excluido, func_data_nascimento, ...VendasemDatas } = input;
  
    const dataNascimentoFormatada = func_data_nascimento ? new Date(func_data_nascimento).toISOString().split('T')[0] : null;
    
    if (dataNascimentoFormatada) {
      VendasemDatas.func_data_nascimento = dataNascimentoFormatada;
    }
  
    try {
      const res = await axios.put('https://pos-backend-six.vercel.app/api/Vendas/editar', {
        ...VendasemDatas,
        func_codigo
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
                              value={input.func_nome || ''}
                              name="func_nome"
                              type="text"
                              required
                              placeholder="Nome do venda"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            ></input>
                            <label
                              htmlFor="func_nome"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Nome do venda
                            </label>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div>
                              <input
                                type="radio"
                                value="F"
                                checked={input.func_tipo_documento === 'F'}
                                id="func_tipo_documento_fisica"
                                name="func_tipo_documento"
                                onChange={inputChange}
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="func_tipo_documento_fisica"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Física
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                value="J"
                                checked={input.func_tipo_documento === 'J'}
                                id="func_tipo_documento_juridica"
                                name="func_tipo_documento"
                                onChange={inputChange}
                                required
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="func_tipo_documento_juridica"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Jurídica
                              </label>
                            </div>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_cpf_cnpj || ''}
                              type="text"
                              name="func_cpf_cnpj"
                              placeholder="CPF/CNPJ"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_cpf_cnpj"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              CPF/CNPJ
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_rg_inscricao_estadual || ''}
                              type="text"
                              name="func_rg_inscricao_estadual"
                              placeholder="RG/Inscrição Estadual"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_rg_inscricao_estadual"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              RG/Inscrição Estadual
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_data_nascimento ? new Date(input.func_data_nascimento).toISOString().split('T')[0] : ''}
                              type="date"
                              name="func_data_nascimento"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_data_nascimento"
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
                                checked={input.func_genero === 'M'}
                                onChange={inputChange}
                                id="func_genero_masculino"
                                name="func_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="func_genero_masculino"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Masculino
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="F"
                                checked={input.func_genero === 'F'}
                                onChange={inputChange}
                                id="func_genero_feminino"
                                name="func_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="func_genero_feminino"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Feminino
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                value="O"
                                checked={input.func_genero === 'O'}
                                onChange={inputChange}
                                id="func_genero_outro"
                                name="func_genero"
                                className="peer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="func_genero_outro"
                                className="ml-2 block text-sm font-medium text-gray-700"
                              >
                                Outro
                              </label>
                            </div>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_telefone || ''}
                              type="text"
                              name="func_telefone"
                              placeholder="Telefone"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_telefone"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Telefone
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_celular || ''}
                              type="text"
                              name="func_celular"
                              placeholder="Celular"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_celular"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Celular
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_email || ''}
                              type="email"
                              name="func_email"
                              placeholder="E-mail"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_email"
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
                              value={input.func_endereco || ''}
                              name="func_endereco"
                              type="text"
                              required
                              placeholder="Endereço"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_endereco"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Endereço
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_numero || ''}
                              type="text"
                              name="func_numero"
                              placeholder="Número"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_numero"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Número
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_complemento || ''}
                              type="text"
                              name="func_complemento"
                              placeholder="Complemento"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_complemento"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Complemento
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_bairro || ''}
                              type="text"
                              name="func_bairro"
                              placeholder="Bairro"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_bairro"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Bairro
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_cidade || ''}
                              type="text"
                              name="func_cidade"
                              placeholder="Cidade"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_cidade"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Cidade
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_estado || ''}
                              type="text"
                              name="func_estado"
                              placeholder="Estado"
                              maxLength='2'
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_estado"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Estado
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_cep || ''}
                              type="text"
                              name="func_cep"
                              placeholder="CEP"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_cep"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              CEP
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_pais || ''}
                              type="text"
                              name="func_pais"
                              placeholder="País"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_pais"
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
                              value={input.func_cargo || ''}
                              name="func_cargo"
                              type="text"
                              placeholder="Cargo"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_salario || ''}
                              name="func_salario"
                              type="text"
                              placeholder="Salário"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_data_admissao || ''}
                              name="func_data_admissao"
                              type="date"
                              placeholder="Data de Admissão"
                              required
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.func_data_demissao || ''}
                              name="func_data_demissao"
                              type="date"
                              placeholder="Data de Demissão"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
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
                                  value={input.func_salario || ''}
                                  name="func_salario"
                                  type="text"
                                  placeholder="Salário"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="func_salario"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Salário
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.func_comissao || ''}
                                  name="func_comissao"
                                  type="text"
                                  placeholder="Comissão"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="func_comissao"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Comissão
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
                              value={input.func_observacoes || ''}
                              name="func_observacoes"
                              type="text"
                              placeholder="Observações"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="func_observacoes"
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
            <SuccessNotification message="venda editado com sucesso!" />
          )}
          {statusRequest === false && (
            <ErrorNotification message="Não foi possível editar o venda!" />
          )}
        </div>
      </form>
    </div>
  );
}
export default FormEditarVendas;