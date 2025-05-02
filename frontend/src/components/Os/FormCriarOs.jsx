"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import BtnActions from "@/components/Ui/Button/BtnActions";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InputField from "@/components/Ui/Input/InputField";
import { useRouter } from "next/navigation";
import { useUserToken } from "@/utils/useUserToken";
import { toast } from "react-toastify";

const FormCriarOs = () => {
    const { token } = useUserToken();
    const router = useRouter();

    // variáveis para os dados do cliente
    const [clientesEncontrados, setClientesEncontrados] = useState([]);
    const [cli_nome, setCli_nome] = useState("");
    const [cli_cpf, setCli_cpf] = useState(null);
    const [cli_endereco, setCli_endereco] = useState("");
    const [cli_numero, setCli_numero] = useState("");
    const [cli_complemento, setCli_complemento] = useState(null);
    const [cli_telefone, setCli_telefone] = useState("");

    // variáveis para os detalhes da venda
    const [dataVenda, setDataVenda] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [preco, setPreco] = useState("");
    const [sinal, setSinal] = useState("");
    const [aPagar, setAPagar] = useState("");
    const [obs, setObs] = useState("");
    const [vendaLentes, setVendaLentes] = useState('');
    const [vendaArmacao, setVendaArmacao] = useState('');

    const [filtros, setFiltros] = useState({ campo: 'cpf', valor: '' });
    const [alturaPupilar, setAlturaPupilar] = useState("");

    // variáveis para controlar a exibição das seções
    const [showLentesArmacao, setShowLentesArmacao] = useState(false);
    const [showVendaDetails, setShowVendaDetails] = useState(false);
    const [openFilterCpf, setOpenFilterCpf] = useState(false);
    const [errorsInput, setErrorsInput] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [clienteData, setClienteData] = useState({});

    const [isInvalidoClienteNome, setIsInvalidoClienteNome] = useState(false);
    const [isInvalidoClienteCpf, setIsInvalidoClienteCpf] = useState(false);
    const [isInvalidoClienteEndereco, setIsInvalidoClienteEndereco] = useState(false);
    const [isInvalidoClienteNumero, setIsInvalidoClienteNumero] = useState(false);
    const [isInvalidoClienteComplemento, setIsInvalidoClienteComplemento] = useState(false);
    const [isInvalidoClienteTelefone, setIsInvalidoClienteTelefone] = useState(false);

    const [openFilterName, setOpenFilterName] = useState(false);
    const [grauSalvo, setGrauSalvo] = useState(false);


    const [clienteSelecionado, setClienteSelecionado] = useState(false);

    const [isInvalidoVendaLentes, setIsInvalidoVendaLentes] = useState(false);
    const [isInvalidoVendaArmacao, setIsInvalidoVendaArmacao] = useState(false);

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
            setOpenFilterName(true);
            setFiltros({ campo: 'nome', valor: sanitizedValue });
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

    const handleLentesChange = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9\s]+$/;

        if (value === "" || regex.test(value)) {
            setVendaLentes(value);
            setIsInvalidoVendaLentes(false);
        } else {
            setIsInvalidoVendaLentes(true);
        }
    };


    const handleArmacaoChange = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9\s]+$/;

        if (value === "" || regex.test(value)) {
            setVendaArmacao(value);
            setIsInvalidoVendaArmacao(false);
        } else {
            setIsInvalidoVendaArmacao(true);
        }
    };


    const handleUnificado = async () => {
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

                grauData.push({ lente, olho, esferico, cilindrico, eixo, add, dp });
            });
        });

        const payload = {
            nome: cli_nome,
            cpf: cli_cpf,
            endereco: cli_endereco,
            numero: cli_numero,
            complemento: cli_complemento,
            telefone: cli_telefone,
            data: dataVenda,
            entrega: dataEntrega,
            lentes: vendaLentes,
            armacao: vendaArmacao,
            preco: parseFloat(preco),
            sinal: parseFloat(sinal || 0),
            a_pagar: parseFloat(aPagar || 0),
            obs,
            alturaPupilar,
            graus: grauData
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/criar-os`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                toast.success("Venda criada com sucesso!");
                setGrauSalvo(true);
                setTimeout(() => {
                    router.push("/vendas");
                }, 2000);
            } else {
                toast.error("Erro ao criar venda.");
            }
        } catch (error) {
            console.error("Erro ao salvar tudo:", error);
            toast.error("Erro ao salvar tudo.");
        }
    };

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


    const filterName = useCallback(async () => {
        if (!filtros.valor || filtros.valor.length < 2 || filtros.campo !== "nome") return;

        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/filter`, {
                params: filtros,
            });

            const encontrados = response.data.clientes || [];

            setClientesEncontrados(encontrados); // <-- ESSENCIAL para dropdown funcionar

            if (encontrados.length === 0) {
                setClienteData({});
            }
        } catch (error) {
            console.error("Erro ao buscar cliente por nome", error);
            setClientesEncontrados([]);
            setClienteData({});
        } finally {
            setIsLoading(false);
        }
    }, [filtros]);


    useEffect(() => {
        if (filtros.campo === "nome" && filtros.valor.length >= 3) {
            filterName();
        }
    }, [filterName, filtros]);


    return (<>
        <div className="w-full xl:max-w-screen-lg flex flex-col">
            <h3 className="text-neutral-800 text-xl font-medium ">
                {cli_nome || "Novo Cliente"}
            </h3>

            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                {/* Nome com Dropdown */}
                <div className="w-full md:w-1/2 px-3 mb-4 relative z-20">
                    <InputField
                        label="Nome do cliente"
                        name="cli_nome"
                        value={cli_nome}
                        onChange={handleNomeChange}
                        placeholder="Digite o nome do cliente"
                        required
                        maxLength={200}
                        error={errorsInput.cli_nome}
                    />

                    {/* Dropdown com resultado */}
                    {openFilterName && clientesEncontrados.length > 0 && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto z-50"
                        >
                            {isLoading ? (
                                <div className="p-4 text-center">
                                    <CircularProgress size={24} />
                                </div>
                            ) : (
                                clientesEncontrados.map((res, index) => {
                                    const c = res.cliente || res;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setShowLentesArmacao(true);
                                                setClienteSelecionado(true);

                                                setCli_nome(c.nome || "");
                                                setCli_cpf(c.cpf || "");
                                                setCli_endereco(c.endereco || "");
                                                setCli_numero(c.numero || "");
                                                setCli_complemento(c.complemento || "");
                                                setCli_telefone(c.telefone || "");

                                                setOpenFilterName(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center transition"
                                        >
                                            <div className="bg-orange-400 text-white p-2 rounded-full">
                                                <PersonIcon fontSize="small" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{c.nome}</div>
                                                <div className="text-sm text-gray-600">CPF: {c.cpf}</div>
                                                <div className="text-sm text-gray-600">Tel: {c.telefone}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>


                {/* CPF e Telefone */}
                <div className="w-full md:w-1/4 px-3 mb-4">
                    <InputField label="CPF" name="cli_cpf" value={cli_cpf || ""} onChange={handleCpfChange} maxLength={15} error={errorsInput.cli_cpf} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-4">
                    <InputField label="Telefone" name="cli_telefone" value={cli_telefone || ""} onChange={handleTelefoneChange} required maxLength={15} error={errorsInput.cli_telefone} />
                </div>

                {/* Endereço e Número */}
                <div className="w-full md:w-3/4 px-3 mb-4">
                    <InputField label="Endereço" name="cli_endereco" value={cli_endereco || ""} onChange={handleEnderecoChange} required maxLength={200} error={errorsInput.cli_endereco} />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-4">
                    <InputField label="Número" name="cli_numero" value={cli_numero || ""} onChange={handleNumeroChange} required maxLength={10} error={errorsInput.cli_numero} />
                </div>

                {/* Complemento */}
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <InputField label="Complemento" name="cli_complemento" value={cli_complemento || ""} onChange={handleComplementoChange} maxLength={50} error={errorsInput.cli_complemento} />
                </div>

                {/* Seção de lentes e armação */}
                <div className="w-full flex mt-5 mb-3 border-t pt-6 cursor-pointer px-3" onClick={() => setShowLentesArmacao(!showLentesArmacao)}>
                    <span className="text-neutral-800 text-xl font-medium">Lentes e Armação</span>
                    {showLentesArmacao ? <KeyboardArrowUpIcon className="text-neutral-600 ml-2" /> : <KeyboardArrowDownIcon className="text-neutral-600 ml-2" />}
                </div>

                {showLentesArmacao && (
                    <>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <InputField label="Lentes" name="vendaLentes" value={vendaLentes} required maxLength={100} onChange={handleLentesChange} error={isInvalidoVendaLentes && "Campo inválido. Use apenas letras e números."} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <InputField label="Armação" name="vendaArmacao" value={vendaArmacao || ""} type="text" maxLength={100} required onChange={handleArmacaoChange} error={isInvalidoVendaArmacao && "Campo inválido. Use apenas letras e números."} />
                        </div>

                        {/* Tabela de medidas */}
                        <div className="w-full px-3 mb-4 overflow-x-auto">
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
                                            <td className="px-2 py-1 border"><input type="text" name={`esferico_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" /></td>
                                            <td className="px-2 py-1 border"><input type="text" name={`cilindrico_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" /></td>
                                            <td className="px-2 py-1 border"><input type="text" name={`eixo_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" /></td>
                                            <td className="px-2 py-1 border"><input type="text" name={`add_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" /></td>
                                            <td className="px-2 py-1 border"><input type="text" name={`dp_${item.lente}_${item.olho}`} className="w-full px-2 py-1 border rounded" /></td>
                                        </tr>
                                    ))}
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 border bg-neutral-100" colSpan={6}>Altura Pupilar</td>
                                        <td className="px-2 py-1 border">
                                            <input type="text" name="altura_pupilar" value={alturaPupilar} onChange={(e) => setAlturaPupilar(e.target.value)} className="w-full px-2 py-1 border rounded bg-neutral-100" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* Seção de detalhes da venda */}
                <div className="w-full flex mt-5 mb-3 border-t pt-6 cursor-pointer px-3" onClick={() => setShowVendaDetails(!showVendaDetails)}>
                    <span className="text-neutral-800 text-xl font-medium">Detalhes de venda</span>
                    {showVendaDetails ? <KeyboardArrowUpIcon className="text-neutral-600 ml-2" /> : <KeyboardArrowDownIcon className="text-neutral-600 ml-2" />}
                </div>

                {showVendaDetails && (
                    <>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <label className="block font-medium text-sm text-neutral-700">Data da Venda <span className="text-red-600">*</span></label>
                            <input type="date" value={dataVenda} onChange={(e) => setDataVenda(e.target.value)} className="peer rounded-lg w-full border px-3 py-2 font-medium text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <label className="block font-medium text-sm text-neutral-700">Previsão de Entrega <span className="text-red-600">*</span></label>
                            <input type="date" value={dataEntrega} onChange={(e) => setDataEntrega(e.target.value)} className="peer rounded-lg w-full border px-3 py-2 font-medium text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <InputField label="Preço Total" name="preco" value={preco} onChange={(e) => setPreco(e.target.value)} error={errorsInput?.preco} required />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <InputField label="Sinal (opcional)" name="sinal" value={sinal} onChange={(e) => setSinal(e.target.value)} error={errorsInput?.sinal} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4">
                            <InputField label="Valor a Pagar (opcional)" name="a_pagar" value={aPagar} onChange={(e) => setAPagar(e.target.value)} error={errorsInput?.a_pagar} />
                        </div>
                        <div className="w-full px-3 mb-4">
                            <label className="block font-medium text-sm text-neutral-700">Observações</label>
                            <textarea value={obs} onChange={(e) => setObs(e.target.value)} className="peer rounded-lg w-full border px-3 py-2 font-medium text-neutral-600 dark:text-white dark:bg-neutral-800 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
                        </div>
                    </>
                )}
            </div>


            <div className="w-60 flex justify-start gap-3 my-9 px-4">
                <BtnActions title="Salvar tudo" onClick={handleUnificado} color="ativado" padding="md" />
            </div>
        </div>
    </>);
};

export default FormCriarOs;
