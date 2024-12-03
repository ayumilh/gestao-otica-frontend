"use client";
import { useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useRouter } from "next/navigation";


const FormCriarClientes = () => {
    const [cli_nome, setCli_nome] = useState("");
    const [cli_tipo_cliente, setCli_tipo_cliente] = useState("");
    const [cli_cpf_cnpj, setCli_cpf_cnpj] = useState("");
    const [cli_rg_inscricao_estadual, setCli_rg_inscricao_estadual] = useState(null);
    const [cli_data_nascimento, setCli_data_nascimento] = useState(null);
    const [cli_genero, setCli_genero] = useState(null);
    const [cli_telefone, setCli_telefone] = useState(null);
    const [cli_celular, setCli_celular] = useState(null);
    const [cli_email, setCli_email] = useState(null);

    const [cli_endereco, setCli_endereco] = useState("");
    const [cli_numero, setCli_numero] = useState("");
    const [cli_complemento, setCli_complemento] = useState(null);
    const [cli_bairro, setCli_bairro] = useState("");
    const [cli_cidade, setCli_cidade] = useState("");
    const [cli_estado, setCli_estado] = useState("");
    const [cli_cep, setCli_cep] = useState("");
    const [cli_pais, setCli_pais] = useState("Brasil");

    const [cli_inscricao_municipal, setCli_inscricao_municipal] = useState(null);
    const [cli_inscricao_estadual, setCli_inscricao_estadual] = useState(null);
    const [cli_codigo_regime_tributario, setCli_codigo_regime_tributario] = useState(null);
    const [cli_cnae, setCli_cnae] = useState(null);
    const [cli_suframa, setCli_suframa] = useState(null);

    const [cli_limite_credito, setCli_limite_credito] = useState(null);
    const [cli_saldo_devedor, setCli_saldo_devedor] = useState(null);

    const [cli_observacoes, setCli_observacoes] = useState(null);

    const cliente = {
        cli_nome,
        cli_tipo_cliente,
        cli_cpf_cnpj,
        cli_data_nascimento,
        cli_rg_inscricao_estadual,
        cli_data_nascimento,
        cli_genero,
        cli_telefone,
        cli_celular,
        cli_email,
        cli_endereco,
        cli_numero,
        cli_complemento,
        cli_bairro,
        cli_cidade,
        cli_estado,
        cli_cep,
        cli_pais,
        cli_inscricao_municipal,
        cli_inscricao_estadual,
        cli_codigo_regime_tributario,
        cli_cnae,
        cli_suframa,
        cli_limite_credito,
        cli_saldo_devedor,
        cli_observacoes,
    };

    const [isInvalidoClienteNome, setIsInvalidoClienteNome] = useState(null);
    const [isInvalidoClienteCnpj, setIsInvalidoClienteCnpj] = useState(null);
    const [isInvalidoClienteCpf, setIsInvalidoClienteCpf] = useState(null);
    const [isInvalidoClienteRgInscricaoEstadual, setIsInvalidoClienteRgInscricaoEstadual] = useState(null);
    const [isInvalidoClienteTelefone, setIsInvalidoClienteTelefone] = useState(null);
    const [isInvalidoClienteCelular, setIsInvalidoClienteCelular] = useState(null);

    const [isInvalidoClienteEndereco, setIsInvalidoClienteEndereco] = useState(null);
    const [isInvalidoClienteNumero, setIsInvalidoClienteNumero] = useState(null);
    const [isInvalidoClienteComplemento, setIsInvalidoClienteComplemento] = useState(null);
    const [isInvalidoClienteBairro, setIsInvalidoClienteBairro] = useState(null);
    const [isInvalidoClienteCidade, setIsInvalidoClienteCidade] = useState(null);
    const [isInvalidoClienteEstado, setIsInvalidoClienteEstado] = useState(null);
    const [isInvalidoClienteCep, setIsInvalidoClienteCep] = useState(null);
    const [isInvalidoClientePais, setIsInvalidoClientePais] = useState(null);
    const [isInvalidoClienteInscricaoMunicipal, setIsInvalidoClienteInscricaoMunicipal] = useState(null);
    const [isInvalidoClienteInscricaoEstadual, setIsInvalidoClienteInscricaoEstadual] = useState(null);
    const [isInvalidoClienteCnae, setIsInvalidoClienteCnae] = useState(null);
    const [isInvalidoClienteSuframa, setIsInvalidoClienteSuframa] = useState(null);
    const [isInvalidoClienteLimiteCredito, setIsInvalidoClienteLimiteCredito] = useState(null);
    const [isInvalidoClienteSaldoDevedor, setIsInvalidoClienteSaldoDevedor] = useState(null);


    const [secaoAtiva, setSecaoAtiva] = useState("gerais");
    const [statusRequest, setStatusRequest] = useState("");
    const router = useRouter();

    const buscarCNPJ = async (cnpj) => {
        try {
            const response = await axios.post(
                `https://pos-backend-six.vercel.app/api/utils/cnpj`,
                { cnpj }
            );
            if (response.data.data === null) {
                setIsInvalidoClienteCnpj(true);
            } else {
                setCli_nome(response.data.data.nome);
                setCli_email(response.data.data.email);

                const cepFormatado = response.data.data.cep.replace(/[.-]/g, "");
                setCli_cep(cepFormatado);
                setCli_complemento(response.data.data.complemento);
                setCli_numero(response.data.data.numero);
                setCli_cnae(response.data.data.atividade_principal[0].code);
            }
        } catch (error) {
            setIsInvalidoClienteCnpj(true);
        }
    };

    const buscarCEP = async (cep) => {
        try {
            const response = await axios.post(
                `https://pos-backend-six.vercel.app/api/utils/cep`,
                { cep }
            );
            if (response.data.data === null) {
                setIsInvalidoClienteCep(true);
            } else {
                setCli_endereco(response.data.data.logradouro);
                setCli_bairro(response.data.data.bairro);
                setCli_cidade(response.data.data.localidade);
                setCli_estado(response.data.data.uf);
            }
        } catch (error) {
            setIsInvalidoClienteCep(true);
        }
    };

    const handleCriar = async () => {
        try {
            const res = await axios.post(
                "https://pos-backend-six.vercel.app/api/clientes/cadastrar",
                cliente
            );
            setStatusRequest(true);
            router.push("/clientes");
        } catch (error) {
            setStatusRequest(false);
        }
    };

    return (<>
        <div className="w-full xl:max-w-screen-lg flex flex-col">
            {/* <BtnBackPage title="Voltar" /> */}
            <h3 className="text-neutral-800 text-xl font-medium ">
                {cli_nome || "Novo Cliente"}
            </h3>

            <div className="flex gap-6 mt-5 mb-2 relative">
                <button
                    onClick={() => setSecaoAtiva("gerais")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "gerais"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    dados básicos
                </button>
                <button
                    onClick={() => setSecaoAtiva("endereco")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "endereco"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    endereço
                </button>
                <button
                    onClick={() => setSecaoAtiva("infoFiscais")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "infoFiscais"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    dados fiscais
                </button>
                <button
                    onClick={() => setSecaoAtiva("infoFinanceiro")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "infoFinanceiro"
                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                            : ""
                        }`}
                >
                    dados financeiro
                </button>
            </div>

            {secaoAtiva === "gerais" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full flex flex-wrap mt-5 mb-7">
                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_tipo_cliente"
                                className="block mb-1 font-medium text-sm text-neutral-700"
                            >
                                Documento <span className="text-red-600">*</span>
                            </label>

                            <div className="flex flex-col md:flex-row gap-3 mt-3">
                                <label
                                    htmlFor="cli_tipo_cliente_fisica"
                                    className="flex items-center"
                                >
                                    <div
                                        className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${cli_tipo_cliente === "F"
                                                ? "border-orange-500 bg-orange-400"
                                                : "border-gray-300"
                                            }`}
                                    ></div>
                                    <input
                                        type="radio"
                                        value="F"
                                        checked={cli_tipo_cliente === "F"}
                                        id="cli_tipo_cliente_fisica"
                                        name="cli_tipo_cliente"
                                        required
                                        onChange={(e) => setCli_tipo_cliente(e.target.value)}
                                        className="opacity-0 absolute h-4 w-4"
                                    />
                                    <span className="font-normal ml-2">Fisíca</span>
                                </label>

                                <label
                                    htmlFor="cli_tipo_cliente_juridica"
                                    className="flex items-center"
                                >
                                    <div
                                        className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${cli_tipo_cliente === "J"
                                                ? "border-orange-500 bg-orange-400"
                                                : "border-gray-300"
                                            }`}
                                    ></div>
                                    <input
                                        type="radio"
                                        value="J"
                                        checked={cli_tipo_cliente === "J"}
                                        id="cli_tipo_cliente_juridica"
                                        name="cli_tipo_cliente"
                                        maxLength={14}
                                        onChange={(e) => setCli_tipo_cliente(e.target.value)}
                                        className="opacity-0 absolute h-4 w-4"
                                    />
                                    <span className="font-normal ml-2">Juridica</span>
                                </label>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            {cli_tipo_cliente === "F" && (
                                <>
                                    <div>
                                        <label
                                            htmlFor="cli_cpf_cnpj"
                                            className="block font-medium text-sm text-neutral-700"
                                        >
                                            CPF <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const regex = /^[0-9]*$/;
                                                if (value === "" || regex.test(value)) {
                                                    setCli_cpf_cnpj(value);
                                                    setIsInvalidoClienteCpf(false);
                                                } else {
                                                    setIsInvalidoClienteCpf(true);
                                                }
                                            }}
                                            value={cli_cpf_cnpj || ""}
                                            type="text"
                                            name="cli_cpf_cnpj"
                                            maxLength={11}
                                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCpf
                                                    ? "outline-red-500 focus:outline-red-500"
                                                    : ""
                                                }`}
                                        />
                                    </div>
                                </>
                            )}
                            {cli_tipo_cliente === "J" && (
                                <div className="relative items-center">
                                    <label
                                        htmlFor="cli_cpf_cnpj"
                                        className="block font-medium text-sm text-neutral-700"
                                    >
                                        CNPJ <span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const regex = /^[0-9]*$/;
                                                if (value === "" || regex.test(value)) {
                                                    setCli_cpf_cnpj(value);
                                                    setIsInvalidoClienteCnpj(false);
                                                    if (value.length === 14) {
                                                        buscarCNPJ(value);
                                                    }
                                                } else {
                                                    setIsInvalidoClienteCnpj(true);
                                                }
                                            }}
                                            value={cli_cpf_cnpj || ""}
                                            type="text"
                                            name="cli_cpf_cnpj"
                                            maxLength={14}
                                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCnpj
                                                    ? "outline-red-500 focus:outline-red-500"
                                                    : ""
                                                }`}
                                        />
                                        <button
                                            onClick={() => buscarCNPJ(cli_cpf_cnpj)}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                                        >
                                            <SearchIcon fontSize="20px" />
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_nome"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Nome do cliente <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setCli_nome(value);
                                        setIsInvalidoClienteNome(false);
                                    } else {
                                        setIsInvalidoClienteNome(true);
                                    }
                                }}
                                value={cli_nome}
                                name="cli_nome"
                                type="text"
                                required
                                maxLength={255}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteNome
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_rg_inscricao_estadual"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                RG/Inscrição Estadual
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setCli_rg_inscricao_estadual(value);
                                        setIsInvalidoClienteRgInscricaoEstadual(false);
                                    } else {
                                        setIsInvalidoClienteRgInscricaoEstadual(true);
                                    }
                                }}
                                value={cli_rg_inscricao_estadual || ""}
                                name="cli_rg_inscricao_estadual"
                                type="text"
                                maxLength={14}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteRgInscricaoEstadual
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_celular"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Celular
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setCli_celular(value);
                                        setIsInvalidoClienteCelular(false);
                                    } else {
                                        setIsInvalidoClienteCelular(true);
                                    }
                                }}
                                value={cli_celular || ""}
                                type="text"
                                name="cli_celular"
                                maxLength={11}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCelular
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_telefone"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Telefone
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setCli_telefone(value);
                                        setIsInvalidoClienteTelefone(false);
                                    } else {
                                        setIsInvalidoClienteTelefone(true);
                                    }
                                }}
                                value={cli_telefone || ""}
                                type="text"
                                name="cli_telefone"
                                maxLength={11}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteTelefone
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_email"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                E-mail
                            </label>
                            <input
                                onChange={(e) => setCli_email(e.target.value)}
                                value={cli_email || ""}
                                type="email"
                                name="cli_email"
                                maxLength={255}
                                placeholder="email@example.com"
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEndereco
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_data_nascimento"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Data de Nascimento
                            </label>
                            <input
                                onChange={(e) => setCli_data_nascimento(e.target.value)}
                                value={cli_data_nascimento || ""}
                                type="date"
                                name="cli_data_nascimento"
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEndereco
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="cli_genero"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Gênero
                            </label>
                            <div className="flex mt-3 gap-3">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        value="M"
                                        checked={cli_genero === "M"}
                                        onChange={(e) => setCli_genero(e.target.value)}
                                        id="cli_genero_masculino"
                                        name="cli_genero"
                                        className="opacity-0 absolute h-4 w-4"
                                    />
                                    <div
                                        className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${cli_genero === "M"
                                                ? "border-orange-500 bg-orange-400"
                                                : "border-gray-300"
                                            }`}
                                    ></div>
                                    <label
                                        htmlFor="cli_genero_masculino"
                                        className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Masculino
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        value="F"
                                        checked={cli_genero === "F"}
                                        onChange={(e) => setCli_genero(e.target.value)}
                                        id="cli_genero_feminino"
                                        name="cli_genero"
                                        className="opacity-0 absolute h-4 w-4"
                                    />
                                    <div
                                        className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${cli_genero === "F"
                                                ? "border-orange-500 bg-orange-400"
                                                : "border-gray-300"
                                            }`}
                                    ></div>
                                    <label
                                        htmlFor="cli_genero_feminino"
                                        className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Feminino
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        value="O"
                                        checked={cli_genero === "O"}
                                        onChange={(e) => setCli_genero(e.target.value)}
                                        id="cli_genero_outro"
                                        name="cli_genero"
                                        className="opacity-0 absolute h-4 w-4"
                                    />
                                    <div
                                        className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${cli_genero === "O"
                                                ? "border-orange-500 bg-orange-400"
                                                : "border-gray-300"
                                            }`}
                                    ></div>
                                    <label
                                        htmlFor="cli_genero_outro"
                                        className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        Outro
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {secaoAtiva === 'endereco' && (
                <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_cep" className="block mb-1 font-medium text-sm text-neutral-700">CEP <span className="text-red-600">*</span></label>
                        <div className="relative h-10 w-full">
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setCli_cep(value);
                                        setIsInvalidoClienteCep(false);
                                        if (value.length === 8) {
                                            buscarCEP(value);
                                        }
                                    } else {
                                        setIsInvalidoClienteCep(true);
                                    }
                                }}
                                value={cli_cep || ''}
                                type="text"
                                name="cli_cep"
                                required
                                maxLength={8}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCep
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                            <button
                                onClick={() => buscarCEP(cli_cep)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                            >
                                <SearchIcon fontSize='20px' />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_endereco" className="block mb-1 font-medium text-sm text-neutral-700">Logradouro <span className="text-red-600">*</span></label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_endereco(value);
                                    setIsInvalidoClienteEndereco(false);
                                } else {
                                    setIsInvalidoClienteEndereco(true);
                                }
                            }}
                            value={cli_endereco || ''}
                            name="cli_endereco"
                            type="text"
                            required
                            maxLength={255}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEndereco
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_bairro" className="block mb-1 font-medium text-sm text-neutral-700">Bairro <span className="text-red-600">*</span></label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_bairro(value);
                                    setIsInvalidoClienteBairro(false);
                                } else {
                                    setIsInvalidoClienteBairro(true);
                                }
                            }}
                            value={cli_bairro || ''}
                            name='cli_bairro'
                            type="text"
                            required
                            maxLength={255}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteBairro
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_numero" className="block mb-1 font-medium text-sm text-neutral-700">Número <span className="text-red-600">*</span></label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_numero(value);
                                    setIsInvalidoClienteNumero(false);
                                } else {
                                    setIsInvalidoClienteNumero(true);
                                }
                            }}
                            value={cli_numero || ''}
                            name='cli_numero'
                            type="text"
                            required
                            maxLength={10}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteNumero
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_complemento" className="block mb-1 font-medium text-sm text-neutral-700">Complemento</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[A-Za-z0-9\s]+$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_complemento(value);
                                    setIsInvalidoClienteComplemento(false);
                                } else {
                                    setIsInvalidoClienteComplemento(true);
                                }
                            }}
                            value={cli_complemento || ''}
                            name='cli_complemento'
                            type="text"
                            maxLength={155}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteComplemento
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_cidade" className="block mb-1 font-medium text-sm text-neutral-700">Cidade <span className="text-red-600">*</span></label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_cidade(value);
                                    setIsInvalidoClienteCidade(false);
                                } else {
                                    setIsInvalidoClienteCidade(true);
                                }
                            }}
                            value={cli_cidade || ''}
                            name='cli_cidade'
                            type="text"
                            required
                            maxLength={255}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCidade
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_estado" className="block mb-1 font-medium text-sm text-neutral-700">Estado <span className="text-red-600">*</span></label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_estado(value);
                                    setIsInvalidoClienteEstado(false);
                                } else {
                                    setIsInvalidoClienteEstado(true);
                                }
                            }}
                            value={cli_estado || ''}
                            type="text"
                            name="cli_estado"
                            maxLength='2'
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEstado ? 'outline-red-500 focus:outline-red-500' : ''}`}
                        />
                    </div>

                    <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                        <label htmlFor="cli_pais" className="block mb-1 font-medium text-sm text-neutral-700">País <span className="text-red-600">*</span> </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_pais(value);
                                    setIsInvalidoClientePais(false);
                                } else {
                                    setIsInvalidoClientePais(true);
                                }
                            }}
                            value={cli_pais || ''}
                            type="text"
                            name="cli_pais"
                            placeholder="País"
                            required
                            maxLength={155}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClientePais
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>
                </div>
            )}

            {secaoAtiva === 'infoFiscais' && (
                <div className='w-full flex flex-wrap transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_inscricao_municipal" className="block mb-1 font-medium text-sm text-neutral-700">Inscrição Municipal</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_inscricao_municipal(value);
                                    setIsInvalidoClienteInscricaoMunicipal(false);
                                } else {
                                    setIsInvalidoClienteInscricaoMunicipal(true);
                                }
                            }}
                            value={cli_inscricao_municipal || ''}
                            type="text"
                            maxLength={14}
                            name="cli_inscricao_municipal"
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteInscricaoMunicipal
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_inscricao_estadual" className="block mb-1 font-medium text-sm text-neutral-700">Inscrição Estadual</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_inscricao_estadual(value);
                                    setIsInvalidoClienteInscricaoEstadual(false);
                                } else {
                                    setIsInvalidoClienteInscricaoEstadual(true);
                                }
                            }}
                            value={cli_inscricao_estadual || ''}
                            type="text"
                            name="cli_inscricao_estadual"
                            maxLength={9}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteInscricaoEstadual
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_cnae" className="block mb-1 font-medium text-sm text-neutral-700">CNAE</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_cnae(value);
                                    setIsInvalidoClienteCnae(false);
                                } else {
                                    setIsInvalidoClienteCnae(true);
                                }
                            }}
                            value={cli_cnae || ''}
                            type="text"
                            name="cli_cnae"
                            maxLength={7}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCnae
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_suframa" className="block mb-1 font-medium text-sm text-neutral-700">Suframa</label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setCli_suframa(value);
                                    setIsInvalidoClienteSuframa(false);
                                } else {
                                    setIsInvalidoClienteSuframa(true);
                                }
                            }}
                            value={cli_suframa || ''}
                            type="text"
                            maxLength={8}
                            name="cli_suframa"
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteSuframa
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="Regime_Tributario" className="block mb-1 font-medium text-sm text-neutral-700">Regime Tributário</label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if(value === '1' || value === '2' || value === '3') {
                                    setCli_codigo_regime_tributario(value);
                                } 
                            }}
                            name="cli_codigo_regime_tributario"
                            value={cli_codigo_regime_tributario}
                            className='peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out'
                        >
                            <option value="1">Simples Nacional</option>
                            <option value="2">Lucro Presumido</option>
                            <option value="3">Lucro Real</option>
                        </select>
                    </div>
                </div>
            )}

            {secaoAtiva === 'infoFinanceiro' && (
                <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="Limite_de_Credito" className="block mb-1 font-medium text-sm text-neutral-700">Limite de Crédito</label>
                        <div className="relative h-10 w-full">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                            <input
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    const padrao = /^\d*(\.\d{0,2})?$/;
                                    const regex = /^[0-9]*$/;
                                    if (padrao.test(valor) || valor === '' || regex.test(valor)) {
                                        setCli_limite_credito(valor);
                                        setIsInvalidoClienteLimiteCredito(false);
                                    } else {
                                        setIsInvalidoClienteLimiteCredito(true);
                                    }
                                }}
                                value={cli_limite_credito || ''}
                                name="cli_limite_credito"
                                type="text"
                                maxLength={15}
                                placeholder="0,00"
                                className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteLimiteCredito
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_saldo_devedor" className="block mb-1 font-medium text-sm text-neutral-700">Saldo Devedor</label>
                        <div className="relative h-10 w-full">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
                            <input
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    const padrao = /^\d*(\.\d{0,2})?$/;
                                    const regex = /^[0-9]*$/;
                                    if (padrao.test(valor) || valor === '' || regex.test(valor)) {
                                        setCli_saldo_devedor(valor);
                                        setIsInvalidoClienteSaldoDevedor(false);
                                    } else {
                                        setIsInvalidoClienteSaldoDevedor(true);
                                    }
                                }}
                                value={cli_saldo_devedor || ''}
                                name="cli_saldo_devedor"
                                type="text"
                                maxLength={10}
                                placeholder="0,00"
                                className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteSaldoDevedor
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label htmlFor="cli_observacoes" className="block mb-1 font-medium text-sm text-neutral-700">Observações</label>
                        <div className="relative h-10 w-full">
                            <input
                                onChange={(e) => setCli_observacoes(e.target.value)}
                                value={cli_observacoes || ''}
                                name="cli_observacoes"
                                type="text"
                                maxLength={255}
                                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEndereco
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                    }`}
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
            <SuccessNotification message="Cliente criado com sucesso!" />
        )}
        {statusRequest === false && (
            <ErrorNotification message="Não foi possível criar o cliente!" />
        )}
    </>);
};

export default FormCriarClientes;
