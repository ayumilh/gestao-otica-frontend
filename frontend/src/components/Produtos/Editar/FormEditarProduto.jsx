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
  { titulo: "Informações Basica", subtitulo: "Preencha as informações básicas do seu produto" },
  { titulo: "Caracteristicas", subtitulo: "Defina caracteristicas do seu produto" },
  { titulo: "Preço de venda", subtitulo: "Adicione o preço de venda do seu produto" },
  { titulo: "Tributação", subtitulo: "Adicione informações de tributação do seu produto" },
  { titulo: "Estoque", subtitulo: "Adicione informações de estoque do seu produto" },
  { titulo: "Descrição", subtitulo: "Adicione descrições do seu produto" },
  { titulo: "Outros", subtitulo: "Adicione outras informações do seu produto" },
];


export const FormEditarProduto = () => {
  const [input, setInputs] = useState({
    pro_descricao:"",
    cat_codigo:"",
    for_codigo:"",
    pro_unidade:"",
    pro_peso:"",
    pro_altura:"",
    pro_largura:"",
    pro_profundidade:"",
    pro_preco_custo:"",
    pro_margem_lucro:"",
    pro_preco_venda:"",
    pro_preco_promocional:"",
    pro_preco_atacado:"",
    pro_codigo_ncm:"",
    pro_codigo_cest:"",
    pro_cfop_saida:"",
    pro_cfop_entrada:"",
    pro_cst_origem:"",
    pro_cst_tributacao:"",
    pro_csosn:"",
    pro_aliquota_icms:"",
    pro_aliquota_ipi:"",
    pro_aliquota_pis:"",
    pro_aliquota_cofins:"",
    pro_modalidade_icms:"",
    pro_base_calculo_icms:"",
    pro_valor_icms:"",
    pro_base_calculo_icms_st:"",
    pro_valor_icms_st:"",
    pro_valor_ipi:"",
    pro_base_calculo_ipi:"",
    pro_base_calculo_pis:"",
    pro_valor_pis:"",
    pro_base_calculo_cofins:"",
    pro_valor_cofins:"",
    pro_codigo_ean:"",
    pro_estoque_atual:"",
    pro_estoque_minimo:"",
    pro_estoque_maximo:"",
    pro_descricao_nf:"",
    pro_observacoes:"",
    pro_descricao_cupom:"",
    pro_marca:"",
    pro_composto:"",
    pro_data_validade:"",
  });

  const [statusRequest, setStatusRequest] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const pro_codigo = Cookies.get("selectedProduct");

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://pos-backend-six.vercel.app/api/produtos/getId/${pro_codigo}`
        );
        setInputs(response.data.produto);
      }catch (error) {
        console.log(error);
      }
    };
  
    if (pro_codigo) {
      fetchProduct();
    }
  }, [pro_codigo]);



  const handleStepClick = (index, e) => {
    e.preventDefault();
    setActiveStep(index);
  };


  const handleEditar = async () => {
    const { pro_id, user_id, pro_data_validade, pro_codigo, pro_data_criacao, pro_data_excluido, pro_excluido, pro_data_atualizacao, ...produtoSemDatas } = input;
  
    const dataValidadeFormatada = pro_data_validade ? new Date(pro_data_validade).toISOString().split('T')[0] : null;
    
    if (dataValidadeFormatada) {
      produtoSemDatas.pro_data_validade = dataValidadeFormatada;
    }

    try {
      const res = await axios.put('https://pos-backend-six.vercel.app/api/produtos/editar', {
        ...produtoSemDatas,
        pro_codigo,
      });
      setStatusRequest(true);
    } catch (error) {
      setStatusRequest(false);
    }
  }

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
                      <p className="text-sm md:text-base font-medium text-neutral-600">
                        {step.subtitulo}
                      </p>
                      {index === 0 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.pro_descricao || ''}
                              name="pro_descricao"
                              type="text"
                              required
                              placeholder="Descrição do produto"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            ></input>
                            <label
                              htmlFor="pro_descricao"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Descrição do produto
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.cat_codigo || ''}
                              step="1"
                              type="number"
                              name="cat_codigo"
                              placeholder="Categoria"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="cat_codigo"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Categoria
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.for_codigo || ''}
                              step="1"
                              type="number"
                              name="for_codigo"
                              placeholder="Fornecedor"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="for_codigo"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Fornecedor
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}                             
                              value={input.pro_unidade || ''}
                              name="pro_unidade"
                              type="text"
                              required
                              placeholder="Unidade"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_unidade"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Unidade
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_peso || ''}
                              type="number"
                              step="0.001"
                              name="pro_peso"
                              placeholder="Peso"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_peso"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Peso
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_altura || ''}
                              type="number"
                              step="0.001"
                              name="pro_altura"
                              placeholder="Altura"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_altura"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Altura
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_largura || ''}
                              type="number"
                              name="pro_largura"
                              placeholder="Largura"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_largura"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Largura
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_profundidade || ''}
                              type="number"
                              step="0.001"
                              name="pro_profundidade"
                              placeholder="Profundidade"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_profundidade"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Profundidade
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_preco_custo || ''}
                              type="number"
                              step="0.01"
                              required
                              name="pro_preco_custo"
                              placeholder="Preço de custo"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_preco_custo"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Preço de custo
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_margem_lucro || ''}
                              type="number"
                              step="0.01"
                              name="pro_margem_lucro"
                              required
                              placeholder="Margem de lucro"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_margem_lucro"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Margem de lucro
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_preco_venda || ''}
                              type="number"
                              step="0.01"
                              name="pro_preco_venda"
                              required
                              placeholder="Preço de venda"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_preco_venda"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Preço de venda
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_preco_promocional || ''}
                              type="number"
                              step="0.01"
                              name="pro_preco_promocional"
                              placeholder="Preço promocional"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_preco_promocional"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Preço promocional
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_preco_atacado || ''}
                              type="number"
                              step="0.01"
                              name="pro_preco_atacado"
                              placeholder="Preço de atacado"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_preco_atacado"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Preço de atacado
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="flex flex-col lg:flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div>
                            <h3 className="w-64 lg:w-full text-sm font-semibold text-neutral-800">Informações Básicas do Produto</h3>
                            <div className="flex flex-wrap gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_codigo_ncm || ''}
                                  name="pro_codigo_ncm"
                                  required
                                  type="text"
                                  placeholder="Código NCM"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_codigo_ncm"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Código NCM
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_codigo_cest || ''}
                                  name="pro_codigo_cest"
                                  type="text"
                                  placeholder="Código CEST"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_codigo_cest"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Código CEST
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="w-64 lg:w-full text-sm font-semibold text-neutral-800">Detalhes Fiscais</h3>
                            <div className="flex flex-wrap gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_cfop_saida || ''}
                                  name="pro_cfop_saida"
                                  step="1"
                                  type="number"
                                  required
                                  placeholder="CFOP - (saída)"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_cfop_saida"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  CFOP - (saída)
                                </label>
                              </div>         
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_cfop_entrada || ''}
                                  step='1'
                                  type="number"
                                  name="pro_cfop_entrada"
                                  placeholder="CFOP - (entrada)"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_cfop_entrada"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  CFOP - (entrada)
                                </label>
                              </div>

                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_cst_origem || ''}
                                  name="pro_cst_origem"
                                  type="text"
                                  required
                                  placeholder="Origem"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_cst_origem"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Situação Tributária - Origem
                                </label>
                              </div>

                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_cst_tributacao || ''}
                                  name="pro_cst_tributacao"
                                  type="text"
                                  required
                                  placeholder="Tributação"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_cst_tributacao"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Tributação
                                </label>
                              </div>

                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  name="pro_csosn"
                                  type="text"
                                  value={input.pro_csosn || ''}
                                  placeholder="Código CSOSN"
                                  maxLength="3"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_csosn"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Código CSOSN
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="w-64 lg:w-full text-sm font-semibold text-neutral-800">ICMS (Imposto sobre Circulação de Mercadorias e Serviços)</h3>
                            <div className="flex flex-wrap gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_aliquota_icms || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_aliquota_icms"
                                  placeholder="Alíquota ICMS"
                                  required
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_aliquota_icms"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Alíquota ICMS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_modalidade_icms || ''}
                                  name="pro_modalidade_icms"
                                  type="text"
                                  placeholder="Modalidade ICMS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_modalidade_icms"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Modalidade ICMS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_base_calculo_icms || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_base_calculo_icms"
                                  placeholder="Base Cálculo ICMS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_base_calculo_icms"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Base Cálculo ICMS
                                </label>
                              </div>

                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_valor_icms || ''}
                                  name="pro_valor_icms"
                                  placeholder="Valor ICMS"
                                  type="number"
                                  step="0.01"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_valor_icms"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Valor ICMS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_base_calculo_icms_st || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_base_calculo_icms_st"
                                  placeholder="Base Cálculo ICMS ST"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_base_calculo_icms_st"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Base Cálculo ICMS ST
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_valor_icms_st || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_valor_icms_st"
                                  placeholder="Valor ICMS ST"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_valor_icms_st"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Valor ICMS ST
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="w-64 lg:w-full text-sm font-semibold text-neutral-800">IPI (Imposto sobre Produtos Industrializados)</h3>
                            <div className="flex flex-wrap gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_aliquota_ipi || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_aliquota_ipi"
                                  placeholder="Alíquota IPI"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_aliquota_ipi"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Alíquota IPI
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_valor_ipi || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_valor_ipi"
                                  placeholder="Valor IPI"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_valor_ipi"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Valor IPI
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_base_calculo_ipi || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_base_calculo_ipi"
                                  placeholder="Calculo IPI"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_base_calculo_ipi"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Calculo IPI
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="w-64 lg:w-full text-sm font-semibold text-neutral-800">PIS/PASEP e COFINS</h3>
                            <div className="flex flex-wrap gap-4 mb-7 mt-2 px-2">
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_aliquota_pis || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_aliquota_pis"
                                  placeholder="Alíquota PIS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_aliquota_pis"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Alíquota PIS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_valor_pis || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_valor_pis"
                                  placeholder="Valor PIS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_valor_pis"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Valor PIS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_base_calculo_pis || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_base_calculo_pis"
                                  placeholder="Calculo PIS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_base_calculo_pis"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Calculo PIS
                                </label>
                              </div>
                              
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  type="number"
                                  step="0.01"
                                  value={input.pro_aliquota_cofins || ''}
                                  name="pro_aliquota_cofins"
                                  placeholder="Alíquota COFINS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_aliquota_cofins"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Alíquota COFINS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_valor_cofins || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_valor_cofins"
                                  placeholder="Valor COFINS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_valor_cofins"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Valor COFINS
                                </label>
                              </div>
                              <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                                <input
                                  onChange={inputChange}
                                  value={input.pro_base_calculo_cofins || ''}
                                  type="number"
                                  step="0.01"
                                  name="pro_base_calculo_cofins"
                                  placeholder="Calculo COFINS"
                                  className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                                />
                                <label
                                  htmlFor="pro_base_calculo_cofins"
                                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                >
                                  Calculo COFINS
                                </label>
                              </div>
                            </div>
                          </div>                  

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_codigo_ean || ''}
                              name="pro_codigo_ean"
                              placeholder="Codigo EAN"
                              type="text"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_codigo_ean"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Codigo EAN
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="flex flex-wrap xl:flex-row gap-4 xl:gap-2 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.pro_estoque_atual || ''}
                              type="number"
                              step="1"
                              name="pro_estoque_atual"
                              required
                              placeholder="Estoque atual"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_estoque_atual"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Estoque atual
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.pro_estoque_minimo || ''}
                              name="pro_estoque_minimo"
                              type="number"
                              step="1"
                              placeholder="Estoque minimo"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_estoque_minimo"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Estoque minimo
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-52 lg:w-60">
                            <input
                              onChange={inputChange}
                              value={input.pro_estoque_maximo || ''}
                              name="pro_estoque_maximo"
                              placeholder="Estoque maximo"
                              type="number"
                              step="1"
                              className="peer h-full w-full md:w-52 lg:w-60 rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_estoque_maximo"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Estoque maximo
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 5 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_descricao_nf || ''}
                              name="pro_descricao_nf"
                              placeholder="Descrição NF"
                              type="text"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_descricao_nf"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Descrição NF
                            </label>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_observacoes || ''}
                              name="pro_observacoes"
                              placeholder="Observação"
                              type="text"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_observacoes"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Observação
                            </label>
                          </div>
                        </div>
                      )}
                      {index === 6 && (
                        <div className="flex flex-wrap gap-4 mt-8 mb-7 ml-3 md:ml-6 lg:ml-7">
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_descricao_cupom || ''}
                              name="pro_descricao_cupom"
                              placeholder="Descrição Cupom"
                              type="text"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_descricao_cupom"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Descrição Cupom
                            </label>
                          </div>

                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}                           
                              value={input.pro_marca || ''}
                              name="pro_marca"
                              placeholder="Marca"
                              type="text"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_marca"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Marca
                            </label>
                          </div>
                          <div className="relative w-full md:w-[320px] lg:w-[416px]">
                            <span className="mb-2 font-medium opacity-90">
                              Composto
                            </span>
                            <div className="flex flex-col md:flex-row gap-4">
                              <label>
                                <input
                                  type="radio"
                                  value="Sim"
                                  name="pro_composto"
                                  checked={
                                    input.pro_composto === true
                                  }
                                  onChange={inputChange}
                                />
                                <span className="font-normal ml-2">Sim</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  value="Não"
                                  name="pro_composto"
                                  checked={
                                    input.pro_composto === false
                                  }
                                  onChange={inputChange}
                                />
                                <span className="font-normal ml-2">Não</span>
                              </label>
                            </div>
                          </div>
                          <div className="relative h-10 w-full md:w-[320px] lg:w-[416px]">
                            <input
                              onChange={inputChange}
                              value={input.pro_data_validade ? new Date(input.pro_data_validade).toISOString().split('T')[0] : ''}
                              name="pro_data_validade"
                              placeholder="Data de validade"
                              type="date"
                              className="peer h-full w-full rounded-lg border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            />
                            <label
                              htmlFor="pro_data_validade"
                              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                            >
                              Data de validade
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
            {activeStep < 6 ? (
              <BtnActions title="Próximo" onClick={handleNext} color="ativado" />
            ) : (
              <BtnActions title="Editar" onClick={handleEditar} color="ativado" />
            )}
          </div>
          {statusRequest === true && (
            <SuccessNotification message="Produto editado com sucesso!" />
          )}
          {statusRequest === false && (
            <ErrorNotification message="Não foi possível editar o produto!" />
          )}
        </div>
      </form>
    </div>
  );
}
