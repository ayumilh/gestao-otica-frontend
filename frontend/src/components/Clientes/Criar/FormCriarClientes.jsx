"use client";
import { useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useRouter } from "next/navigation";
import { searchUserId } from "@/utils/searchUserId";

const FormCriarClientes = () => {
    const token = searchUserId();
    const [cli_nome, setCli_nome] = useState("");
    const [cli_cpf, setCli_cpf] = useState("");
    const [cli_endereco, setCli_endereco] = useState("");
    const [cli_numero, setCli_numero] = useState("");
    const [cli_complemento, setCli_complemento] = useState(null);
    const [cli_telefone, setCli_telefone] = useState("");

    const [errorsInput, setErrorsInput] = useState({});
    
    const cliente = {
        nome: cli_nome,
        cpf: cli_cpf,
        endereco: cli_endereco,
        numero: cli_numero,
        complemento: cli_complemento,
        telefone: cli_telefone,
    };

    const [isInvalidoClienteNome, setIsInvalidoClienteNome] = useState(false);
    const [isInvalidoClienteCpf, setIsInvalidoClienteCpf] = useState(false);
    const [isInvalidoClienteEndereco, setIsInvalidoClienteEndereco] = useState(false);
    const [isInvalidoClienteNumero, setIsInvalidoClienteNumero] = useState(false);
    const [isInvalidoClienteComplemento, setIsInvalidoClienteComplemento] = useState(false);
    const [isInvalidoClienteTelefone, setIsInvalidoClienteTelefone] = useState(false);

    const [statusRequest, setStatusRequest] = useState("");
    const router = useRouter();

    // Função para sanitizar os inputs
    const sanitizeInput = (value, regex, shouldTrim = true) => {
        const sanitizedValue = shouldTrim ? value.trim().replace(regex, '') : value.replace(regex, '');
        return sanitizedValue;
    };

    const handleNomeChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^a-zA-ZÀ-ÿ0-9\s'.-]/g;
        const sanitizedValue = sanitizeInput(value, regex, false);

        if (value === sanitizedValue) {
            setCli_nome(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_nome, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteNome(false);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cli_nome: 'Nome inválido. Apenas letras, espaços, hifens e apóstrofos são permitidos.',
            }));
            setIsInvalidoClienteNome(true);
        }
    };

    const handleEnderecoChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^a-zA-ZÀ-ÿ0-9\s'-]/g;
        const sanitizedValue = sanitizeInput(value, regex, false);

        if (value === sanitizedValue) {
            setCli_endereco(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_endereco, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteEndereco(false);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cli_endereco: 'Endereço inválido. Apenas letras, espaços, hifens e apóstrofos são permitidos.',
            }));
            setIsInvalidoClienteEndereco(true);
        }
    };

    const handleNumeroChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^0-9]/g;
        const sanitizedValue = sanitizeInput(value, regex);

        if (value === sanitizedValue) {
            setCli_numero(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_numero, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteNumero(false);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cli_numero: 'Número inválido. Apenas números são permitidos.',
            }));
            setIsInvalidoClienteNumero(true);
        }
    };

    const handleComplementoChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^a-zA-ZÀ-ÿ0-9\s'.-]/g;
        const sanitizedValue = sanitizeInput(value, regex, false);

        if (value === sanitizedValue) {
            setCli_complemento(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_complemento, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteComplemento(false);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cli_complemento: 'Complemento inválido. Apenas letras, espaços, hifens e apóstrofos são permitidos.',
            }));
            setIsInvalidoClienteComplemento(true);
        }
    };

    const handleCpfChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^0-9]/g;
        const sanitizedValue = sanitizeInput(value, regex);
        
        if (value == sanitizedValue) {
            setCli_cpf(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_cpf, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteCpf(false);
        } else if (regex.test(value)) {
            setErrorsInput((prevErrors) => {
                const { cli_cpf, ...rest } = prevErrors;
                return rest; // Remove o erro do estado
            });
            setIsInvalidoClienteCpf(true);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cpf: 'CPF inválido. Deve conter exatamente 11 números.',
            }));
            setIsInvalidoClienteCpf(true);
        }
    };

    const handleTelefoneChange = (e) => {
        const value = e.target.value.trimStart();
        const regex = /[^0-9]/g;
        const sanitizedValue = sanitizeInput(value, regex);

        if (value === sanitizedValue) {
            setCli_telefone(sanitizedValue);
            setErrorsInput((prevErrors) => {
                const { cli_telefone, ...rest } = prevErrors;
                return rest;
            });
            setIsInvalidoClienteTelefone(false);
        } else {
            setErrorsInput((prevErrors) => ({
                ...prevErrors,
                cli_telefone: 'Telefone inválido. Apenas números são permitidos.',
            }));
            setIsInvalidoClienteTelefone(true);
        }
    };

    const handleCriar = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/cadastrar`,
                cliente,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
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

            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                <div className="w-full flex flex-wrap mt-5 mb-7">
                    {/* nome */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_nome"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Nome do cliente <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleNomeChange}
                            value={cli_nome}
                            name="cli_nome"
                            type="text"
                            required
                            maxLength={200}
                            minLength={1}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteNome
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_nome && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_nome}</p>
                        )}
                    </div>

                    {/* cpf */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_cpf"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            CPF <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleCpfChange}
                            value={cli_cpf || ""}
                            name="cli_cpf"
                            type="text"
                            maxLength={11}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteCpf
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_cpf && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_cpf}</p>
                        )}
                    </div>

                    {/* endereço */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_endereco"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Endereço <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleEnderecoChange}
                            value={cli_endereco || ""}
                            type="text"
                            name="cli_endereco"
                            maxLength={200}
                            minLength={1}
                            required
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteEndereco
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_endereco && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_endereco}</p>
                        )}
                    </div>

                    {/* numero */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_numero"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Número <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleNumeroChange}
                            value={cli_numero || ""}
                            type="text"
                            name="cli_numero"
                            required
                            maxLength={10}
                            minLength={1}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteNumero
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_numero && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_numero}</p>
                        )}
                    </div>

                    {/* complemento */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_complemento"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Complemento
                        </label>
                        <input
                            onChange={handleComplementoChange}
                            value={cli_complemento || ""}
                            type="text"
                            name="cli_complemento"
                            maxLength={50}
                            minLength={1}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteComplemento
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_complemento && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_complemento}</p>
                        )}
                    </div>

                    {/* telefone */}
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cli_telefone"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Telefone <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleTelefoneChange}
                            value={cli_telefone || ""}
                            type="text"
                            name="cli_telefone"
                            required
                            maxLength={11}
                            minLength={1}
                            className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoClienteTelefone
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                        {errorsInput.cli_telefone && (
                            <p className="text-red-500 relative text-sm mt-1">{errorsInput.cli_telefone}</p>
                        )}
                    </div>
                </div>
            </div>
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
