'use client'
import { useState } from 'react';
import axios from 'axios';
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";


const FormCriarProduto = () => {
    const [pro_nome, setPro_nome] = useState('');
    const [pro_descricao, setPro_descricao] = useState('');
    const [cat_codigo, setCat_codigo] = useState(0);
    const [for_codigo, setFor_codigo] = useState(0);

    const [pro_unidade, setPro_unidade] = useState('');
    const [pro_peso, setPro_peso] = useState(null);
    const [pro_altura, setPro_altura] = useState(null);
    const [pro_largura, setPro_largura] = useState(null);
    const [pro_profundidade, setPro_profundidade] = useState(null);

    const [pro_preco_custo, setPro_preco_custo] = useState('');
    const [pro_margem_lucro, setPro_margem_lucro] = useState('');
    const [pro_preco_venda, setPro_preco_venda] = useState('');
    const [pro_preco_promocional, setPro_preco_promocional] = useState(null);
    const [pro_preco_atacado, setPro_preco_atacado] = useState(null);

    const [pro_codigo_ncm, setPro_codigo_ncm] = useState('');
    const [pro_codigo_cest, setPro_codigo_cest] = useState(null);
    const [pro_cfop_saida, setPro_cfop_saida] = useState(0);
    const [pro_cfop_entrada, setPro_cfop_entrada] = useState(null);
    const [pro_cst_origem, setPro_cst_origem] = useState('');
    const [pro_cst_tributacao, setPro_cst_tributacao] = useState('');
    const [pro_csosn, setPro_csosn] = useState(null);
    const [pro_aliquota_icms, setPro_aliquota_icms] = useState('');
    const [pro_aliquota_ipi, setPro_aliquota_ipi] = useState(null);
    const [pro_aliquota_pis, setPro_aliquota_pis] = useState(null);
    const [pro_aliquota_cofins, setPro_aliquota_cofins] = useState(null);
    const [pro_modalidade_icms, setPro_modalidade_icms] = useState(null);
    const [pro_base_calculo_icms, setPro_base_calculo_icms] = useState(null);
    const [pro_valor_icms, setPro_valor_icms] = useState(null);
    const [pro_base_calculo_icms_st, setPro_base_calculo_icms_st] = useState(null);
    const [pro_valor_icms_st, setPro_valor_icms_st] = useState(null);
    const [pro_valor_ipi, setPro_valor_ipi] = useState(null);
    const [pro_base_calculo_ipi, setPro_base_calculo_ipi] = useState(null);
    const [pro_base_calculo_pis, setPro_base_calculo_pis] = useState(null);
    const [pro_valor_pis, setPro_valor_pis] = useState(null);
    const [pro_base_calculo_cofins, setPro_base_calculo_cofins] = useState(null);
    const [pro_valor_cofins, setPro_valor_cofins] = useState(null);
    const [pro_codigo_ean, setPro_codigo_ean] = useState(null);

    const [pro_estoque_atual, setPro_estoque_atual] = useState(0);
    const [pro_estoque_minimo, setPro_estoque_minimo] = useState(0);
    const [pro_estoque_maximo, setPro_estoque_maximo] = useState(0);

    const [pro_descricao_nf, setPro_descricao_nf] = useState(null);
    const [pro_observacoes, setPro_observacoes] = useState(null);
    const [pro_descricao_cupom, setPro_descricao_cupom] = useState(null);

    const [pro_marca, setPro_marca] = useState(null);
    const [pro_composto, setPro_composto] = useState(false);
    const [pro_data_validade, setPro_data_validade] = useState(null);

    const products = {
        pro_nome,
        pro_descricao,
        cat_codigo,
        for_codigo,
        pro_unidade,
        pro_peso,
        pro_altura,
        pro_largura,
        pro_profundidade,
        pro_preco_custo,
        pro_margem_lucro,
        pro_preco_venda,
        pro_preco_promocional,
        pro_preco_atacado,
        pro_codigo_ncm,
        pro_codigo_cest,
        pro_cfop_saida,
        pro_cfop_entrada,
        pro_cst_origem,
        pro_cst_tributacao,
        pro_csosn,
        pro_aliquota_icms,
        pro_aliquota_ipi,
        pro_aliquota_pis,
        pro_aliquota_cofins,
        pro_modalidade_icms,
        pro_base_calculo_icms,
        pro_valor_icms,
        pro_base_calculo_icms_st,
        pro_valor_icms_st,
        pro_valor_ipi,
        pro_base_calculo_ipi,
        pro_base_calculo_pis,
        pro_valor_pis,
        pro_base_calculo_cofins,
        pro_valor_cofins,
        pro_codigo_ean,
        pro_estoque_atual,
        pro_estoque_minimo,
        pro_estoque_maximo,
        pro_descricao_nf,
        pro_observacoes,
        pro_descricao_cupom,
        pro_marca,
        pro_composto,
        pro_data_validade,
    }

    const [isInvalidoProdutoNome, setIsInvalidoProdutoNome] = useState(null);
    const [isInvalidoProdutoDescricao, setIsInvalidoProdutoDescricao] = useState(null);
    const [isInvalidoProdutoCategoria, setIsInvalidoProdutoCategoria] = useState(null);
    const [isInvalidoProdutoFornecedor, setIsInvalidoProdutoFornecedor] = useState(null);

    const [isInvalidoProdutoUnidade, setIsInvalidoProdutoUnidade] = useState(null);
    const [isInvalidoProdutoPeso, setIsInvalidoProdutoPeso] = useState(null);
    const [isInvalidoProdutoAltura, setIsInvalidoProdutoAltura] = useState(null);
    const [isInvalidoProdutoLargura, setIsInvalidoProdutoLargura] = useState(null);
    const [isInvalidoProdutoProfundidade, setIsInvalidoProdutoProfundidade] = useState(null);

    const [isInvalidoProdutoPrecoCusto, setIsInvalidoProdutoPrecoCusto] = useState(null);
    const [isInvalidoProdutoMargemLucro, setIsInvalidoProdutoMargemLucro] = useState(null);
    const [isInvalidoProdutoPrecoVenda, setIsInvalidoProdutoPrecoVenda] = useState(null);
    const [isInvalidoProdutoPrecoPromocional, setIsInvalidoProdutoPrecoPromocional] = useState(null);
    const [isInvalidoProdutoPrecoAtacado, setIsInvalidoProdutoPrecoAtacado] = useState(null);

    const [isInvalidoProdutoCodigoNcm, setIsInvalidoProdutoCodigoNcm] = useState(null);
    const [isInvalidoProdutoCodigoCest, setIsInvalidoProdutoCodigoCest] = useState(null);
    const [isInvalidoProdutoCfopSaida, setIsInvalidoProdutoCfopSaida] = useState(null);
    const [isInvalidoProdutoCfopEntrada, setIsInvalidoProdutoCfopEntrada] = useState(null);
    const [isInvalidoProdutoCstOrigem, setIsInvalidoProdutoCstOrigem] = useState(null);
    const [isInvalidoProdutoCstTributacao, setIsInvalidoProdutoCstTributacao] = useState(null);
    const [isInvalidoProdutoCsosn, setIsInvalidoProdutoCsosn] = useState(null);
    const [isInvalidoProdutoAliquotaIcms, setIsInvalidoProdutoAliquotaIcms] = useState(null);
    const [isInvalidoProdutoAliquotaIpi, setIsInvalidoProdutoAliquotaIpi] = useState(null);
    const [isInvalidoProdutoAliquotaPis, setIsInvalidoProdutoAliquotaPis] = useState(null);
    const [isInvalidoProdutoAliquotaCofins, setIsInvalidoProdutoAliquotaCofins] = useState(null);
    const [isInvalidoProdutoModalidadeIcms, setIsInvalidoProdutoModalidadeIcms] = useState(null);
    const [isInvalidoProdutoBaseCalculoIcms, setIsInvalidoProdutoBaseCalculoIcms] = useState(null);
    const [isInvalidoProdutoValorIcms, setIsInvalidoProdutoValorIcms] = useState(null);
    const [isInvalidoProdutoBaseCalculoIcmsSt, setIsInvalidoProdutoBaseCalculoIcmsSt] = useState(null);
    const [isInvalidoProdutoValorIcmsSt, setIsInvalidoProdutoValorIcmsSt] = useState(null);
    const [isInvalidoProdutoValorIpi, setIsInvalidoProdutoValorIpi] = useState(null);
    const [isInvalidoProdutoBaseCalculoIpi, setIsInvalidoProdutoBaseCalculoIpi] = useState(null);
    const [isInvalidoProdutoBaseCalculoPis, setIsInvalidoProdutoBaseCalculoPis] = useState(null);
    const [isInvalidoProdutoValorPis, setIsInvalidoProdutoValorPis] = useState(null);
    const [isInvalidoProdutoBaseCalculoCofins, setIsInvalidoProdutoBaseCalculoCofins] = useState(null);
    const [isInvalidoProdutoValorCofins, setIsInvalidoProdutoValorCofins] = useState(null);

    const [isInvalidoProdutoCodigoEan, setIsInvalidoProdutoCodigoEan] = useState(null);

    const [isInvalidoProdutoEstoqueAtual, setIsInvalidoProdutoEstoqueAtual] = useState(null);
    const [isInvalidoProdutoEstoqueMinimo, setIsInvalidoProdutoEstoqueMinimo] = useState(null);
    const [isInvalidoProdutoEstoqueMaximo, setIsInvalidoProdutoEstoqueMaximo] = useState(null);

    const [isInvalidoProdutoDescricaoNf, setIsInvalidoProdutoDescricaoNf] = useState(null);
    const [isInvalidoProdutoObservacoes, setIsInvalidoProdutoObservacoes] = useState(null);
    const [isInvalidoProdutoDescricaoCupom, setIsInvalidoProdutoDescricaoCupom] = useState(null);

    const [isInvalidoProdutoMarca, setIsInvalidoProdutoMarca] = useState(null);
    const [isInvalidoProdutoComposto, setIsInvalidoProdutoComposto] = useState(null);
    const [isInvalidoProdutoDataValidade, setIsInvalidoProdutoDataValidade] = useState(null);



    const [secaoAtiva, setSecaoAtiva] = useState('dadosBasicos');
    const [statusRequest, setStatusRequest] = useState(null);

    const handleCriar = async () => {
        try {
            await axios.post('https://pos-backend-six.vercel.app/api/produtos/cadastrar', products)
            setStatusRequest(true);
        } catch (error) {
            setStatusRequest(false);
        }
    }


    return (<>
        <div className="w-full xl:max-w-screen-lg flex flex-col">
            {/* <BtnBackPage title="Voltar" /> */}
            <h3 className="text-neutral-800 text-xl font-medium ">
                {pro_nome || "Novo Produto"}
            </h3>

            <div className="flex gap-6 mt-5 mb-2 relative">
                <button
                    onClick={() => setSecaoAtiva("dadosBasicos")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "dadosBasicos"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    dados básicos
                </button>
                <button
                    onClick={() => setSecaoAtiva("dadosFiscais")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "dadosFiscais"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    dados fiscais
                </button>
                <button
                    onClick={() => setSecaoAtiva("outros")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "outros"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    outros
                </button>
            </div>

            {secaoAtiva === "dadosBasicos" && (
                <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_nome"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Nome do produto <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setPro_nome(value);
                                    setIsInvalidoProdutoNome(false);
                                } else {
                                    setIsInvalidoProdutoNome(true);
                                }
                            }}
                            value={pro_nome || ""}
                            name="pro_nome"
                            type="text"
                            required
                            maxLength={255}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoNome
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_descricao"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Descrição do produto <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setPro_descricao(value);
                                    setIsInvalidoProdutoDescricao(false);
                                } else {
                                    setIsInvalidoProdutoDescricao(true);
                                }
                            }}
                            value={pro_descricao || ""}
                            name="pro_descricao"
                            type="text"
                            required
                            maxLength={255}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoDescricao
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cat_codigo"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Categoria <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = Math.floor(e.target.value);
                                const regex = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setCat_codigo(value);
                                    setIsInvalidoProdutoCategoria(false);
                                } else {
                                    setIsInvalidoProdutoCategoria(true);
                                }
                            }}
                            value={cat_codigo || ""}
                            type="number"
                            name="cat_codigo"
                            maxLength={100}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCategoria
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="for_codigo"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Fornecedor <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = Math.floor(e.target.value);
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value.toString())) {
                                    setFor_codigo(value);
                                    setIsInvalidoProdutoFornecedor(false);
                                } else {
                                    setIsInvalidoProdutoFornecedor(true);
                                }
                            }}
                            value={for_codigo || ""}
                            type="number"
                            name="for_codigo"
                            maxLength={100}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoFornecedor
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_codigo_ean"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código EAN
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setPro_codigo_ean(value);
                                    setIsInvalidoProdutoCodigoEan(false);
                                } else {
                                    setIsInvalidoProdutoCodigoEan(true);
                                }
                            }}
                            value={pro_codigo_ean || ""}
                            type="number"
                            name="pro_codigo_ean"
                            maxLength={13}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCodigoEan
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_unidade"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Unidade <span className="text-red-600">*</span>
                        </label>
                        <input
                            // definir um jeito certo de enviar
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setPro_unidade(value);
                                    setIsInvalidoProdutoUnidade(false);
                                } else {
                                    setIsInvalidoProdutoUnidade(true);
                                }
                            }}
                            value={pro_unidade || ""}
                            name="pro_unidade"
                            type="text"
                            required
                            placeholder='Un, Pç, Kg'
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoUnidade
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <hr className="w-full my-6 border-t border-neutral-200" />

                    <div className='flex flex-wrap w-full'>
                        <div className='w-full block'>
                            <h3 className="text-lg font-semibold text-neutral-600">Dimensões do Produto</h3>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_peso"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Peso
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^\d+(\.\d{1,3})?$/;
                                    const regexLength = /^[0-9]*$/;
                                    if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                        setPro_peso(value);
                                        setIsInvalidoProdutoPeso(false);
                                    } else {
                                        setIsInvalidoProdutoPeso(true);
                                    }
                                }}
                                value={pro_peso || ""}
                                type="number"
                                step="0.001"
                                name="pro_peso"
                                maxLength={10}
                                placeholder="0,000"
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoPeso
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_altura"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Altura
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^\d+(\.\d{1,3})?$/;
                                    const regexLength = /^[0-9]*$/;
                                    if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                        setPro_altura(value);
                                        setIsInvalidoProdutoAltura(false);
                                    } else {
                                        setIsInvalidoProdutoAltura(true);
                                    }
                                }}
                                value={pro_altura || ""}
                                type="number"
                                step="0.001"
                                name="pro_altura"
                                maxLength={10}
                                placeholder="0,00"
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoAltura
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_largura"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Largura
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^\d+(\.\d{1,3})?$/;
                                    const regexLength = /^[0-9]*$/;
                                    if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                        setPro_largura(value);
                                        setIsInvalidoProdutoLargura(false);
                                    } else {
                                        setIsInvalidoProdutoLargura(true);
                                    }
                                }}
                                value={pro_largura || ""}
                                type="number"
                                name="pro_largura"
                                placeholder="0,00"
                                maxLength={10}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoLargura
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_profundidade"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Profundidade
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^\d+(\.\d{1,3})?$/;
                                    const regexLength = /^[0-9]*$/;
                                    if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                        setPro_profundidade(value);
                                        setIsInvalidoProdutoProfundidade(false);
                                    } else {
                                        setIsInvalidoProdutoProfundidade(true);
                                    }
                                }}
                                value={pro_profundidade || ""}
                                type="number"
                                step="0.001"
                                name="pro_profundidade"
                                placeholder="0,00"
                                maxLength={10}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoProfundidade
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>
                    </div>

                    <hr className="w-full my-6 border-t border-neutral-200" />

                    <div className='flex flex-wrap w-full'>
                        <div className='w-full block'>
                            <h3 className="text-lg font-semibold text-neutral-600">Preços do Produto</h3>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_preco_custo"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Preço de custo <span className="text-red-600">*</span>
                            </label>
                            <div className='relative'>
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^\d+(\.\d{1,2})?$/;
                                        const regexLength = /^[0-9]*$/;
                                        if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                            setPro_preco_custo(value);
                                            setIsInvalidoProdutoPrecoCusto(false);
                                        } else {
                                            setIsInvalidoProdutoPrecoCusto(true);
                                        }
                                    }}
                                    value={pro_preco_custo || ""}
                                    type="number"
                                    step="0.01"
                                    name="pro_preco_custo"
                                    required
                                    maxLength={10}
                                    placeholder="0,00"
                                    className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoPrecoCusto
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_margem_lucro"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Margem de lucro <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^\d+(\.\d{1,2})?$/;
                                    const regexLength = /^[0-9]*$/;
                                    if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                        setPro_margem_lucro(value);
                                        setIsInvalidoProdutoMargemLucro(false);
                                    } else {
                                        setIsInvalidoProdutoMargemLucro(true);
                                    }
                                }}
                                value={pro_margem_lucro || ""}
                                type="number"
                                step="0.01"
                                name="pro_margem_lucro"
                                required
                                placeholder="0,00"
                                maxLength={10}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoMargemLucro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_preco_venda"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Preço de venda <span className="text-red-600">*</span>
                            </label>
                            <div className='relative'>
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^\d+(\.\d{1,2})?$/;
                                        const regexLength = /^[0-9]*$/;
                                        if (regex.test(value.toString()) || regexLength.test(value.toString())) {
                                            setPro_preco_venda(value);
                                            setIsInvalidoProdutoPrecoVenda(false);
                                        } else {
                                            setIsInvalidoProdutoPrecoVenda(true);
                                        }
                                    }}
                                    value={pro_preco_venda || ""}
                                    type="number"
                                    step="0.01"
                                    name="pro_preco_venda"
                                    required
                                    maxLength={10}
                                    placeholder="0,00"
                                    className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoPrecoVenda
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_preco_promocional"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Preço promocional
                            </label>
                            <div className='relative'>
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^\d+(\.\d{1,2})?$/;
                                        const regexLength = /^[0-9]*$/;;
                                        if (regex.test(value.toString()) || regexLength.test(value.toString())) {
                                            setPro_preco_promocional(value);
                                            setIsInvalidoProdutoPrecoPromocional(false);
                                        } else {
                                            setIsInvalidoProdutoPrecoPromocional(true)
                                        }
                                    }}
                                    value={pro_preco_promocional || ""}
                                    type="number"
                                    step="0.01"
                                    name="pro_preco_promocional"
                                    placeholder="0,00"
                                    maxLength={10}
                                    className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoPrecoPromocional
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_preco_atacado"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Preço de atacado
                            </label>
                            <div className='relative'>
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^\d+(\.\d{1,2})?$/;
                                        const regexLength = /^[0-9]*$/;
                                        if (regex.test(value.toString()) || regexLength.test(value.toString())) {
                                            setPro_preco_atacado(value);
                                            setIsInvalidoProdutoPrecoAtacado(false);
                                        } else {
                                            setIsInvalidoProdutoPrecoAtacado(true);
                                        }
                                    }}
                                    value={pro_preco_atacado || ""}
                                    type="number"
                                    step="0.01"
                                    name="pro_preco_atacado"
                                    maxLength={10}
                                    placeholder="0,00"
                                    className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoPrecoAtacado
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {secaoAtiva === 'dadosFiscais' && (
                <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_codigo_ncm"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código NCM <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d{8}$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_codigo_ncm(value);
                                    setIsInvalidoProdutoCodigoNcm(false);
                                } else {
                                    setIsInvalidoProdutoCodigoNcm(true);
                                }
                            }}
                            value={pro_codigo_ncm || ""}
                            type="text"
                            name="pro_codigo_ncm"
                            maxLength={8}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCodigoNcm
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_codigo_cest"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            CEST
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d{7}$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || regexLength.test(value.toString())) {
                                    setPro_codigo_cest(value);
                                    setIsInvalidoProdutoCodigoCest(false);
                                } else {
                                    setIsInvalidoProdutoCodigoCest(true);
                                }
                            }}
                            value={pro_codigo_cest || ""}
                            type="text"
                            name="pro_codigo_cest"
                            maxLength={7}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCodigoCest
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>



                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_cfop_saida"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            CFOP Saída <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = Math.floor(e.target.value);
                                const regex = /^[0-9]{0,4}$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setPro_cfop_saida(value);
                                    setIsInvalidoProdutoCfopSaida(false);
                                } else {
                                    setIsInvalidoProdutoCfopSaida(true);
                                }
                            }}
                            value={pro_cfop_saida || ""}
                            type="number"
                            name="pro_cfop_saida"
                            required
                            maxLength={4}
                            minLength={4}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCfopSaida
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_cfop_entrada"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            CFOP Entrada
                        </label>
                        <input
                            onChange={(e) => {
                                const value = Math.floor(e.target.value);
                                const regex = /^[0-9]{0,4}$/;
                                if (regex.test(value.toString())) {
                                    setPro_cfop_entrada(value);
                                    setIsInvalidoProdutoCfopEntrada(false);
                                } else {
                                    setIsInvalidoProdutoCfopEntrada(true);
                                }
                            }}
                            value={pro_cfop_entrada || ""}
                            type="number"
                            name="pro_cfop_entrada"
                            maxLength={4}
                            minLength={4}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCfopEntrada
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>



                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_cst_origem"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Origem <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regexLenght = /^[1-9]$/;
                                if (regexLenght.test(value.toString()) || value === "") {
                                    setPro_cst_origem(value);
                                    setIsInvalidoProdutoCstOrigem(false);
                                } else {
                                    setIsInvalidoProdutoCstOrigem(true);
                                }
                            }}
                            value={pro_cst_origem || ""}
                            type="text"
                            name="pro_cst_origem"
                            required
                            maxLength={1}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCstOrigem
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_cst_tributacao"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Tributação <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regexLenght = /^[1-9]$/;
                                if (regexLenght.test(value.toString()) || value === "") {
                                    setPro_cst_tributacao(value);
                                    setIsInvalidoProdutoCstTributacao(false);
                                } else {
                                    setIsInvalidoProdutoCstTributacao(true);
                                }
                            }}
                            value={pro_cst_tributacao || ""}
                            type="text"
                            name="pro_cst_tributacao"
                            maxLength={3}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCstTributacao
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_csosn"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código CSOSN
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regexLenght = /^[1-9]$/;
                                if (regexLenght.test(value.toString())) {
                                    setPro_csosn(value);
                                    setIsInvalidoProdutoCsosn(false);
                                } else {
                                    setIsInvalidoProdutoCsosn(true);
                                }
                            }}
                            value={pro_csosn || ""}
                            type="text"
                            name="pro_csosn"
                            maxLength={4}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoCsosn
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_aliquota_icms"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Alíquota ICMS <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_aliquota_icms(value);
                                    setIsInvalidoProdutoAliquotaIcms(false);
                                } else {
                                    setIsInvalidoProdutoAliquotaIcms(true);
                                }
                            }}
                            value={pro_aliquota_icms || ""}
                            type="text"
                            name="pro_aliquota_icms"
                            maxLength={10}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoAliquotaIcms
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_modalidade_icms"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Modalidade ICMS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[1-9]$/;
                                if (regex.test(value.toString())) {
                                    setPro_modalidade_icms(value);
                                    setIsInvalidoProdutoModalidadeIcms(false);
                                } else {
                                    setIsInvalidoProdutoModalidadeIcms(true);
                                }
                            }}
                            value={pro_modalidade_icms || ""}
                            type="text"
                            name="pro_modalidade_icms"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoModalidadeIcms
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_aliquota_ipi"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Alíquota IPI
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_aliquota_ipi(value);
                                    setIsInvalidoProdutoAliquotaIpi(false);
                                } else {
                                    setIsInvalidoProdutoAliquotaIpi(true);
                                }
                            }}
                            value={pro_aliquota_ipi || ""}
                            type="text"
                            name="pro_aliquota_ipi"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoAliquotaIpi
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_aliquota_pis"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Alíquota PIS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_aliquota_pis(value);
                                    setIsInvalidoProdutoAliquotaPis(false);
                                } else {
                                    setIsInvalidoProdutoAliquotaPis(true);
                                }
                            }}
                            value={pro_aliquota_pis || ""}
                            type="text"
                            name="pro_aliquota_pis"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoAliquotaPis
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_aliquota_cofins"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Alíquota COFINS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_aliquota_cofins(value);
                                    setIsInvalidoProdutoAliquotaCofins(false);
                                } else {
                                    setIsInvalidoProdutoAliquotaCofins(true);
                                }
                            }}
                            value={pro_aliquota_cofins || ""}
                            type="text"
                            name="pro_aliquota_cofins"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoAliquotaCofins
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_base_calculo_icms'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de cálculo ICMS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_base_calculo_icms(value);
                                    setIsInvalidoProdutoBaseCalculoIcms(false);
                                } else {
                                    setIsInvalidoProdutoBaseCalculoIcms(true);
                                }
                            }}
                            value={pro_base_calculo_icms || ""}
                            type="text"
                            name="pro_base_calculo_icms"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoBaseCalculoIcms
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_base_calculo_icms_st'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de cálculo ICMS ST
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_base_calculo_icms_st(value);
                                    setIsInvalidoProdutoBaseCalculoIcmsSt(false);
                                } else {
                                    setIsInvalidoProdutoBaseCalculoIcmsSt(true);
                                }
                            }}
                            value={pro_base_calculo_icms_st || ""}
                            type="text"
                            name="pro_base_calculo_icms_st"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoBaseCalculoIcmsSt
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_base_calculo_ipi'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de cálculo IPI
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_base_calculo_ipi(value);
                                    setIsInvalidoProdutoBaseCalculoIpi(false);
                                } else {
                                    setIsInvalidoProdutoBaseCalculoIpi(true);
                                }
                            }}
                            value={pro_base_calculo_ipi || ""}
                            type="text"
                            name="pro_base_calculo_ipi"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoBaseCalculoIpi
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_base_calculo_pis'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de cálculo PIS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_base_calculo_pis(value);
                                    setIsInvalidoProdutoBaseCalculoPis(false);
                                } else {
                                    setIsInvalidoProdutoBaseCalculoPis(true);
                                }
                            }}
                            value={pro_base_calculo_pis || ""}
                            type="text"
                            name="pro_base_calculo_pis"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoBaseCalculoPis
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_base_calculo_cofins'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de cálculo COFINS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_base_calculo_cofins(value);
                                    setIsInvalidoProdutoBaseCalculoCofins(false);
                                } else {
                                    setIsInvalidoProdutoBaseCalculoCofins(true);
                                }
                            }}
                            value={pro_base_calculo_cofins || ""}
                            type="text"
                            name="pro_base_calculo_cofins"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoBaseCalculoCofins
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_valor_icms'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor ICMS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_valor_icms(value);
                                    setIsInvalidoProdutoValorIcms(false);
                                } else {
                                    setIsInvalidoProdutoValorIcms(true);
                                }
                            }}
                            value={pro_valor_icms || ""}
                            type="text"
                            name="pro_valor_icms"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoValorIcms
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_valor_ipi'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor IPI
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_valor_ipi(value);
                                    setIsInvalidoProdutoValorIpi(false);
                                } else {
                                    setIsInvalidoProdutoValorIpi(true);
                                }
                            }}
                            value={pro_valor_ipi || ""}
                            type="text"
                            name="pro_valor_ipi"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoValorIpi
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_valor_pis'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor PIS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_valor_pis(value);
                                    setIsInvalidoProdutoValorPis(false);
                                } else {
                                    setIsInvalidoProdutoValorPis(true);
                                }
                            }}
                            value={pro_valor_pis || ""}
                            type="text"
                            name="pro_valor_pis"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoValorPis
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_valor_cofins'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor COFINS
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_valor_cofins(value);
                                    setIsInvalidoProdutoValorCofins(false);
                                } else {
                                    setIsInvalidoProdutoValorCofins(true);
                                }
                            }}
                            value={pro_valor_cofins || ""}
                            type="text"
                            name="pro_valor_cofins"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoValorCofins
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor='pro_valor_icms_st'
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor ICMS ST
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^\d+(\.\d{1,2})?$/;
                                const regexLength = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "" || regexLength.test(value.toString())) {
                                    setPro_valor_icms_st(value);
                                    setIsInvalidoProdutoValorIcmsSt(false);
                                } else {
                                    setIsInvalidoProdutoValorIcmsSt(true);
                                }
                            }}
                            value={pro_valor_icms_st || ""}
                            type="text"
                            name="pro_valor_icms_st"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoValorIcmsSt
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>
                </div>
            )}

            {secaoAtiva === 'outros' && (
                <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_estoque_minimo"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Estoque mínimo
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setPro_estoque_minimo(value);
                                    setIsInvalidoProdutoEstoqueMinimo(false);
                                } else {
                                    setIsInvalidoProdutoEstoqueMinimo(true);
                                }
                            }}
                            value={pro_estoque_minimo || ""}
                            type="text"
                            name="pro_estoque_minimo"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoEstoqueMinimo
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_estoque_maximo"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Estoque máximo
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setPro_estoque_maximo(value);
                                    setIsInvalidoProdutoEstoqueMaximo(false);
                                } else {
                                    setIsInvalidoProdutoEstoqueMaximo(true);
                                }
                            }}
                            value={pro_estoque_maximo || ""}
                            type="text"
                            name="pro_estoque_maximo"
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoEstoqueMaximo
                                    ?
                                    "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="pro_estoque_atual"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Estoque atual <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (regex.test(value.toString()) || value === "") {
                                    setPro_estoque_atual(value);
                                    setIsInvalidoProdutoEstoqueAtual(false);
                                } else {
                                    setIsInvalidoProdutoEstoqueAtual(true);
                                }
                            }}
                            value={pro_estoque_atual || ""}
                            type="text"
                            name="pro_estoque_atual"
                            maxLength={10}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProdutoEstoqueAtual ? "outline-red-500 focus:outline-red-500" : ""}`}
                        />
                    </div>

                    <hr className="w-full my-6 border-t border-neutral-200" />

                    <div className='flex flex-wrap w-full'>
                        <div className='w-full block'>
                            <h3 className="text-lg font-semibold text-neutral-600">Detalhes do Produto</h3>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_descricao_nf"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Descrição NF
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPro_descricao_nf(value);
                                }}
                                value={pro_descricao_nf || ""}
                                type="text"
                                name="pro_descricao_nf"
                                maxLength={100}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_observacoes"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Observações
                            </label>
                            <textarea
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPro_observacoes(value);
                                }}
                                value={pro_observacoes || ""}
                                name="pro_observacoes"
                                maxLength={100}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_descricao_cupom"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Descrição Cupom
                            </label>
                            <textarea
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPro_descricao_cupom(value);
                                }}
                                value={pro_descricao_cupom || ""}
                                name="pro_descricao_cupom"
                                maxLength={100}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_marca"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Marca
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPro_marca(value);
                                }}
                                value={pro_marca || ""}
                                type="text"
                                name="pro_marca"
                                maxLength={100}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_composto"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Composto
                            </label>
                            <div className="flex items-center mt-2">
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setPro_composto(value);
                                    }}
                                    value={pro_composto || ""}
                                    type="radio"
                                    name="pro_composto"
                                    className="mr-2"
                                />
                                <label htmlFor="pro_composto" className="text-sm text-neutral-700">Sim</label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setPro_composto(value);
                                    }}
                                    value={pro_composto || ""}
                                    type="radio"
                                    name="pro_composto"
                                    className="ml-4 mr-2"
                                />
                                <label htmlFor="pro_composto" className="text-sm text-neutral-700">Não</label>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="pro_data_validade"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Data de validade
                            </label>
                            <input
                                onChange={(e) => setPro_data_validade(e.target.value)}
                                value={pro_data_validade || ""}
                                type="date"
                                name="pro_data_validade"
                                maxLength={100}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
        <div className="w-60 flex justify-start gap-3 my-9 px-4">
            <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
        </div>
        {statusRequest === true && (
            <SuccessNotification message="Produto criado com sucesso!" />
        )}
        {statusRequest === false && (
            <ErrorNotification message="Não foi possível criar o produto!" />
        )}
    </>)
}
export default FormCriarProduto