import { useState } from 'react';

const ModalAddProduto = ({ onClose, onAddProduto }) => {
    const [secaoAtiva, setSecaoAtiva] = useState("dados");
    const [secaoAtivaTributos, setSecaoAtivaTributos] = useState("ICMS");

    const [cProd, setCProd] = useState('');
    const [cEAN, setCEAN] = useState('');
    const [xProd, setXProd] = useState('');
    const [NCM, setNCM] = useState('');
    const [CFOP, setCFOP] = useState('');
    const [uCom, setUCom] = useState('');
    const [qCom, setQCom] = useState('');
    const [vUnCom, setVUnCom] = useState('');
    const [vProd, setVProd] = useState('');
    const [cEANTrib, setCEANTrib] = useState('');
    const [uTrib, setUTrib] = useState('');
    const [qTrib, setQTrib] = useState('');
    const [vUnTrib, setVUnTrib] = useState('');
    const [indTot, setIndTot] = useState(0);
    const [CST, setCST] = useState('');
    const [isInvalidoCProd, setIsInvalidoCProd] = useState(false);
    const [isInvalidoCEAN, setIsInvalidoCEAN] = useState(false);
    const [isInvalidoXProd, setIsInvalidoXProd] = useState(false);
    const [isInvalidoNCM, setIsInvalidoNCM] = useState(false);
    const [isInvalidoCFOP, setIsInvalidoCFOP] = useState(false);
    const [isInvalidoUCom, setIsInvalidoUCom] = useState(false);
    const [isInvalidoQCom, setIsInvalidoQCom] = useState(false);
    const [isInvalidoVUnCom, setIsInvalidoVUnCom] = useState(false);
    const [isInvalidoVProd, setIsInvalidoVProd] = useState(false);
    const [isInvalidoCEANTrib, setIsInvalidoCEANTrib] = useState(false);
    const [isInvalidoUTrib, setIsInvalidoUTrib] = useState(false);
    const [isInvalidoQTrib, setIsInvalidoQTrib] = useState(false);
    const [isInvalidoVUnTrib, setIsInvalidoVUnTrib] = useState(false);
    const [isInvalidoIndTot, setIsInvalidoIndTot] = useState(false);

    const [ICMSOrig, setICMSOrig] = useState(null);
    const [ICMSCST, setICMSCST] = useState("");
    const [modBC, setModBC] = useState(null);
    const [ICMSVBC, setICMSVBC] = useState(null);
    const [pICMS, setPICMS] = useState(null);
    const [vICMS, setVICMS] = useState(null);
    const [isInvalidoICMSOrig, setIsInvalidoICMSOrig] = useState(false);
    const [isInvalidoICMSCST, setIsInvalidoICMSCST] = useState(false);
    const [isInvalidoModBC, setIsInvalidoModBC] = useState(false);
    const [isInvalidoICMSVBC, setIsInvalidoICMSVBC] = useState(false);
    const [isInvalidoPICMS, setIsInvalidoPICMS] = useState(false);
    const [isInvalidoVICMS, setIsInvalidoVICMS] = useState(false);

    const [cEnq, setCEnq] = useState("");
    const [IPICST, setIPICST] = useState("");
    const [IPIVBC, setIPIVBC] = useState(null);
    const [pIPI, setPIPI] = useState(null);
    const [vIPI, setVIPI] = useState(null);
    const [isInvalidoCEnq, setIsInvalidoCEnq] = useState(false);
    const [isInvalidoIPICST, setIsInvalidoIPICST] = useState(false);
    const [isInvalidoIPIVBC, setIsInvalidoIPIVBC] = useState(false);
    const [isInvalidoPIPI, setIsInvalidoPIPI] = useState(false);
    const [isInvalidoVIPI, setIsInvalidoVIPI] = useState(false);

    const [PISCST, setPISCST] = useState("");
    const [PISVBC, setPISVBC] = useState(null);
    const [pPIS, setPPIS] = useState(null);
    const [vPIS, setVPIS] = useState(null);
    const [isInvalidoPISCST, setIsInvalidoPISCST] = useState(false);
    const [isInvalidoPISVBC, setIsInvalidoPISVBC] = useState(false);
    const [isInvalidoPPIS, setIsInvalidoPPIS] = useState(false);
    const [isInvalidoVPIS, setIsInvalidoVPIS] = useState(false);

    const [COFINSCST, setCOFINSCST] = useState("");
    const [COFINSVBC, setCOFINSVBC] = useState(null);
    const [pCOFINS, setPCOFINS] = useState(null);
    const [vCOFINS, setVCOFINS] = useState(null);
    const [isInvalidoCOFINSCST, setIsInvalidoCOFINSCST] = useState(false);
    const [isInvalidoCOFINSVBC, setIsInvalidoCOFINSVBC] = useState(false);
    const [isInvalidoPCOFINS, setIsInvalidoPCOFINS] = useState(false);
    const [isInvalidoVCOFINS, setIsInvalidoVCOFINS] = useState(false);


    const [xCampoObsCont, setXCampoObsCont] = useState("");
    const [xTextoObsCont, setXTextoObsCont] = useState("");
    const [xCampoObsFisco, setXCampoObsFisco] = useState("");
    const [xTextoObsFisco, setXTextoObsFisco] = useState("");
    const [isInvalidoXCampoObsCont, setIsInvalidoXCampoObsCont] = useState(false);
    const [isInvalidoXTextoObsCont, setIsInvalidoXTextoObsCont] = useState(false);
    const [isInvalidoXCampoObsFisco, setIsInvalidoXCampoObsFisco] = useState(false);
    const [isInvalidoXTextoObsFisco, setIsInvalidoXTextoObsFisco] = useState(false);


    const handleInputChange = (setter, setInvalid, regex) => (e) => {
        const value = e.target.value;
        if (value === "" || regex.test(value)) {
            setter(value);
            setInvalid(false);
        } else {
            setInvalid(true);
        }
    };

    const handleAddProduto = () => {
        const data = {
            nItem: 1, // Exemplo de número do item
            prod: {
                cProd,
                cEAN,
                xProd,
                NCM,
                CFOP,
                uCom,
                qCom: parseFloat(qCom),
                vUnCom: parseFloat(vUnCom),
                vProd: parseFloat(vProd),
                cEANTrib,
                uTrib,
                qTrib: parseFloat(qTrib),
                vUnTrib: parseFloat(vUnTrib),
                indTot: parseInt(indTot),
            },
            imposto: {
                vTotTrib: 0, // Exemplo de valor total dos tributos
                ICMS: {
                    ICMS00: {
                        orig: parseInt(ICMSOrig),
                        CST: ICMSCST,
                        modBC: parseInt(modBC),
                        vBC: parseFloat(ICMSVBC),
                        pICMS: parseFloat(pICMS),
                        vICMS: parseFloat(vICMS)
                    }
                },
                IPI: {
                    cEnq,
                    IPITrib: {
                        CST: IPICST,
                        vBC: parseFloat(IPIVBC),
                        pIPI: parseFloat(pIPI),
                        vIPI: parseFloat(vIPI)
                    }
                },
                PIS: {
                    PISAliq: {
                        CST: PISCST,
                        vBC: parseFloat(PISVBC),
                        pPIS: parseFloat(pPIS),
                        vPIS: parseFloat(vPIS)
                    }
                },
                COFINS: {
                    COFINSAliq: {
                        CST: COFINSCST,
                        vBC: parseFloat(COFINSVBC),
                        pCOFINS: parseFloat(pCOFINS),
                        vCOFINS: parseFloat(vCOFINS)
                    }
                }
            },
            infAdProd: "",
            obsItem: {
                obsCont: {
                    xCampo: xCampoObsCont,
                    xTexto: xTextoObsCont
                },
                obsFisco: {
                    xCampo: xCampoObsFisco,
                    xTexto: xTextoObsFisco
                }
            }
        };
        onAddProduto(data);
    }


    return (
        <div className="bg-bgModal fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-700 bg-opacity-70 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* header */}
                        <div className="modal-header flex justify-between items-center mb-4">
                            <h1 className='text-base text-colorFont-200 font-semibold'>Adicionar Produto</h1>
                            <button type="button" onClick={onClose} className="bg-transparent border-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600 hover:text-gray-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className='mt-[14px] flex flex-col md:justify-around'>
                            <div className='flex flex-col gap-3 md:flex-row'>
                                <div className="flex gap-4 mt-5 mb-2 relative">
                                    <button
                                        onClick={() => setSecaoAtiva("dados")}
                                        className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "dados"
                                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                                            : ""
                                            }`}
                                    >
                                        dados
                                    </button>
                                    <button
                                        onClick={() => setSecaoAtiva("tributos")}
                                        className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "tributos"
                                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                                            : ""
                                            }`}
                                    >
                                        tributos
                                    </button>
                                    <button
                                        onClick={() => setSecaoAtiva("infoAdicionais")}
                                        className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "infoAdicionais"
                                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                                            : ""
                                            }`}
                                    >
                                        info adicionais
                                    </button>
                                    <button
                                        onClick={() => setSecaoAtiva("declaracaoImportacao")}
                                        className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "declaracaoImportacao"
                                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                                            : ""
                                            }`}
                                    >
                                        declaração de importação
                                    </button>
                                    <button
                                        onClick={() => setSecaoAtiva("exportacao")}
                                        className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "exportacao"
                                            ? "border-b-2 border-segundaria-900 text-neutral-800"
                                            : ""
                                            }`}
                                    >
                                        exportação
                                    </button>
                                </div>
                            </div>

                            <div className='rounded-2xl w-full h-[420px] flex flex-col mx-auto mt-5 lg:mx-0 overflow-x-auto'>
                                {secaoAtiva === "dados" && (
                                    <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="cProd" className="block font-medium text-sm text-neutral-700">
                                                Código do produto <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setCProd, setIsInvalidoCProd, /^[0-9]+$/)}
                                                value={cProd || ""}
                                                type="text"
                                                name="cProd"
                                                maxLength={60}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCProd ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="cEAN" className="block font-medium text-sm text-neutral-700">
                                                Código de barras do produto <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setCEAN, setIsInvalidoCEAN, /^[0-9]{0,14}$/)}
                                                value={cEAN || ""}
                                                type="text"
                                                name="cEAN"
                                                maxLength={14}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCEAN ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="xProd" className="block font-medium text-sm text-neutral-700">
                                                Descrição do produto <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setXProd, setIsInvalidoXProd, /^[A-Za-z0-9\s]+$/)}
                                                value={xProd || ""}
                                                type="text"
                                                name="xProd"
                                                maxLength={120}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoXProd ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="NCM" className="block font-medium text-sm text-neutral-700">
                                                Código NCM <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setNCM, setIsInvalidoNCM, /^[0-9]{0,8}$/)}
                                                value={NCM || ""}
                                                type="text"
                                                name="NCM"
                                                maxLength={8}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNCM ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="CFOP" className="block font-medium text-sm text-neutral-700">
                                                Código CFOP <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setCFOP, setIsInvalidoCFOP, /^[0-9]{0,4}$/)}
                                                value={CFOP || ""}
                                                type="text"
                                                name="CFOP"
                                                maxLength={4}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCFOP ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="uCom" className="block font-medium text-sm text-neutral-700">
                                                Unidade comercial <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "UN" || value === "KG" || value === "LT" || value === "MT" || value === "CX" || value === "PC") {
                                                        setUCom(value);
                                                        setIsInvalidoUCom(false);
                                                    } else {
                                                        setIsInvalidoUCom(true);
                                                    }
                                                }}
                                                value={uCom || ""}
                                                name="uCom"
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoUCom ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            >
                                                <option value="" disabled>Selecione a unidade comercial</option>
                                                <option value="UN">UN - Unidade</option>
                                                <option value="KG">KG - Quilograma</option>
                                                <option value="LT">LT - Litro</option>
                                                <option value="MT">MT - Metro</option>
                                                <option value="CX">CX - Caixa</option>
                                                <option value="PC">PC - Peça</option>
                                            </select>
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="qCom" className="block font-medium text-sm text-neutral-700">
                                                Quantidade comercial <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setQCom, setIsInvalidoQCom, /^[0-9]+$/)}
                                                value={qCom || ""}
                                                type="text"
                                                name="qCom"
                                                maxLength={4}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoQCom ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="vUnCom" className="block font-medium text-sm text-neutral-700">
                                                Valor unitário de comercialização <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(",", ".");
                                                    const regex = /^\d+(\.\d{0,2})?$/;
                                                    if (value === "" || regex.test(value)) {
                                                        setVUnCom(value);
                                                        setIsInvalidoVUnCom(false);
                                                    } else {
                                                        setIsInvalidoVUnCom(true);
                                                    }
                                                }}
                                                value={vUnCom || ""}
                                                type="text"
                                                name="vUnCom"
                                                required
                                                placeholder='0.00'
                                                maxLength={13}
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVUnCom ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="vProd" className="block font-medium text-sm text-neutral-700">
                                                Valor total do produto <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(",", ".");
                                                    const regex = /^\d+(\.\d{0,2})?$/;
                                                    if (value === "" || regex.test(value)) {
                                                        setVProd(value);
                                                        setIsInvalidoVProd(false);
                                                    } else {
                                                        setIsInvalidoVProd(true);
                                                    }
                                                }}
                                                value={vProd || ""}
                                                type="text"
                                                placeholder='0.00'
                                                name="vProd"
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVProd ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="cEANTrib" className="block font-medium text-sm text-neutral-700">
                                                Código de barras tributável <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setCEANTrib, setIsInvalidoCEANTrib, /^[0-9]+$/)}
                                                value={cEANTrib || ""}
                                                type="text"
                                                name="cEANTrib"
                                                maxLength={14}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCEANTrib ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="uTrib" className="block font-medium text-sm text-neutral-700">
                                                Unidade tributável <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "UN" || value === "KG" || value === "LT" || value === "MT" || value === "CX" || value === "PC") {
                                                        setUTrib(value);
                                                        setIsInvalidoUTrib(false);
                                                    } else {
                                                        setIsInvalidoUTrib(true);
                                                    }
                                                }}
                                                value={uTrib || ""}
                                                name="uTrib"
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoUTrib ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            >
                                                <option value="" disabled>Selecione a unidade comercial</option>
                                                <option value="UN">UN - Unidade</option>
                                                <option value="KG">KG - Quilograma</option>
                                                <option value="LT">LT - Litro</option>
                                                <option value="MT">MT - Metro</option>
                                                <option value="CX">CX - Caixa</option>
                                                <option value="PC">PC - Peça</option>
                                            </select>
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="qTrib" className="block font-medium text-sm text-neutral-700">
                                                Quantidade tributável <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setQTrib, setIsInvalidoQTrib, /^[0-9]+$/)}
                                                value={qTrib || ""}
                                                type="text"
                                                name="qTrib"
                                                required
                                                maxLength={4}
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoQTrib ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="vUnTrib" className="block font-medium text-sm text-neutral-700">
                                                Valor unitário de tributação <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(",", ".");
                                                    const regex = /^\d+(\.\d{0,2})?$/;
                                                    if (value === "" || regex.test(value)) {
                                                        setVUnTrib(value);
                                                        setIsInvalidoVUnTrib(false);
                                                    } else {
                                                        setIsInvalidoVUnTrib(true);
                                                    }
                                                }}
                                                value={vUnTrib || ""}
                                                type="text"
                                                placeholder='0.00'
                                                name="vUnTrib"
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVUnTrib ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label htmlFor="indTot" className="block font-medium text-sm text-neutral-700">
                                                Indicador de total <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={handleInputChange(setIndTot, setIsInvalidoIndTot, /^[0-1]$/)}
                                                value={indTot || ""}
                                                type="text"
                                                name="indTot"
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIndTot ? "outline-red-500 focus:outline-red-500" : ""}`}
                                            />
                                        </div>
                                    </div>
                                )}
                                {secaoAtiva === "tributos" && (
                                    <div className='flex flex-col'>
                                        <div className="flex ml-2 gap-4 mb-2">
                                            <button
                                                onClick={() => setSecaoAtivaTributos("ICMS")}
                                                className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtivaTributos === "ICMS"
                                                    ? "border-b-2 border-segundaria-900 text-neutral-800"
                                                    : ""
                                                    }`}
                                            >
                                                ICMS
                                            </button>
                                            <button
                                                onClick={() => setSecaoAtivaTributos("IPI")}
                                                className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtivaTributos === "IPI"
                                                    ? "border-b-2 border-segundaria-900 text-neutral-800"
                                                    : ""
                                                    }`}
                                            >
                                                IPI
                                            </button>
                                            <button
                                                onClick={() => setSecaoAtivaTributos("PIS")}
                                                className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtivaTributos === "PIS"
                                                    ? "border-b-2 border-segundaria-900 text-neutral-800"
                                                    : ""
                                                    }`}
                                            >
                                                PIS
                                            </button>
                                            <button
                                                onClick={() => setSecaoAtivaTributos("COFINS")}
                                                className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtivaTributos === "COFINS"
                                                    ? "border-b-2 border-segundaria-900 text-neutral-800"
                                                    : ""
                                                    }`}
                                            >
                                                COFINS
                                            </button>
                                        </div>
                                        {secaoAtivaTributos === "ICMS" && (
                                            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="ICMSOrig" className="block font-medium text-sm text-neutral-700">
                                                        Origem da mercadoria <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5" || value === "6" || value === "7" || value === "8") {
                                                                setICMSOrig(value);
                                                                setIsInvalidoICMSOrig(false);
                                                            } else {
                                                                setIsInvalidoICMSOrig(true);
                                                            }
                                                        }}
                                                        value={ICMSOrig || ""}
                                                        type="number"
                                                        name="ICMSOrig"
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoICMSOrig ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione a origem</option>
                                                        <option value={0}>0 - Nacional</option>
                                                        <option value={1}>1 - Estrangeira - Importação direta</option>
                                                        <option value={2}>2 - Estrangeira - Adquirida no mercado interno</option>
                                                        <option value={3}>3 - Nacional, mercadoria ou bem com conteúdo de importação superior a 40%</option>
                                                        <option value={4}>4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos</option>
                                                        <option value={5}>5 - Nacional, mercadoria ou bem com conteúdo de importação inferior ou igual a 40%</option>
                                                        <option value={6}>6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX</option>
                                                        <option value={7}>7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX</option>
                                                        <option value={8}>8 - Nacional, mercadoria ou bem com conteúdo de importação superior a 70%</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="ICMSCST" className="block font-medium text-sm text-neutral-700">
                                                        Código de situação tributária <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "" || value === "00" || value === "10" || value === "20" || value === "30" || value === "40" || value === "41" || value === "50" || value === "51" || value === "60" || value === "70" || value === "90") {
                                                                setICMSCST(value);
                                                                setIsInvalidoICMSCST(false);
                                                            } else {
                                                                setIsInvalidoICMSCST(true);
                                                            }
                                                        }}
                                                        value={ICMSCST || ""}
                                                        type="text"
                                                        name="ICMSCST"
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoICMSCST ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione o CST</option>
                                                        <option value="00">00 - Tributada integralmente</option>
                                                        <option value="10">10 - Tributada e com cobrança do ICMS por substituição tributária</option>
                                                        <option value="20">20 - Com redução de base de cálculo</option>
                                                        <option value="30">30 - Isenta ou não tributada e com cobrança do ICMS por substituição tributária</option>
                                                        <option value="40">40 - Isenta</option>
                                                        <option value="41">41 - Não tributada</option>
                                                        <option value="50">50 - Suspensão</option>
                                                        <option value="51">51 - Diferimento</option>
                                                        <option value="60">60 - ICMS cobrado anteriormente por substituição tributária</option>
                                                        <option value="70">70 - Com redução de base de cálculo e cobrança do ICMS por substituição tributária</option>
                                                        <option value="90">90 - Outras</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="modBC" className="block font-medium text-sm text-neutral-700">
                                                        Modalidade de determinação da base de cálculo <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "" || value === "0" || value === "1" || value === "2" || value === "3") {
                                                                setModBC(value);
                                                                setIsInvalidoModBC(false);
                                                            } else {
                                                                setIsInvalidoModBC(true);
                                                            }
                                                        }}
                                                        value={modBC || ""}
                                                        type="number"
                                                        name="modBC"
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoModBC ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione a modalidade</option>
                                                        <option value={0}>0 - Margem Valor Agregado (%)</option>
                                                        <option value={1}>1 - Pauta (valor)</option>
                                                        <option value={2}>2 - Preço Tabelado Máximo (valor)</option>
                                                        <option value={3}>3 - Valor da Operação</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="ICMSVBC" className="block font-medium text-sm text-neutral-700">
                                                        Valor da base de cálculo <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setICMSVBC(value);
                                                                setIsInvalidoICMSVBC(false);
                                                            } else {
                                                                setIsInvalidoICMSVBC(true);
                                                            }
                                                        }}
                                                        value={ICMSVBC || ""}
                                                        type="text"
                                                        name="ICMSVBC"
                                                        placeholder='0.00'
                                                        maxLength={15}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoICMSVBC ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="pICMS" className="block font-medium text-sm text-neutral-700">
                                                        Alíquota do ICMS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setPICMS(value);
                                                                setIsInvalidoPICMS(false);
                                                            } else {
                                                                setIsInvalidoPICMS(true);
                                                            }
                                                        }}
                                                        value={pICMS || ""}
                                                        type="text"
                                                        name="pICMS"
                                                        maxLength={5}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPICMS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="vICMS" className="block font-medium text-sm text-neutral-700">
                                                        Valor do ICMS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setVICMS(value);
                                                                setIsInvalidoVICMS(false);
                                                            } else {
                                                                setIsInvalidoVICMS(true);
                                                            }
                                                        }}
                                                        value={vICMS || ""}
                                                        type="text"
                                                        name="vICMS"
                                                        maxLength={15}
                                                        placeholder='0.00'
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVICMS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {secaoAtivaTributos === "IPI" && (
                                            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="cEnq" className="block font-medium text-sm text-neutral-700">
                                                        Código de Enquadramento Legal do IPI <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const regex = /^[0-9]+$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setCEnq(value);
                                                                setIsInvalidoCEnq(false);
                                                            } else {
                                                                setIsInvalidoCEnq(true);
                                                            }
                                                        }}
                                                        value={cEnq || ""}
                                                        type="text"
                                                        name="cEnq"
                                                        maxLength={3}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCEnq ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="IPICST" className="block font-medium text-sm text-neutral-700">
                                                        Código de Situação Tributária do IPI <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "" || value === "00" || value === "49" || value === "50" || value === "99") {
                                                                setIPICST(value);
                                                                setIsInvalidoIPICST(false);
                                                            } else {
                                                                setIsInvalidoIPICST(true);
                                                            }
                                                        }}
                                                        value={IPICST || ""}
                                                        type="text"
                                                        name="IPICST"
                                                        maxLength={2}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIPICST ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione o CST</option>
                                                        <option value="00">00 - Tributada integralmente</option>
                                                        <option value="49">49 - Outras</option>
                                                        <option value="50">50 - Suspensão</option>
                                                        <option value="99">99 - Outras</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="IPIVBC" className="block font-medium text-sm text-neutral-700">
                                                        Valor da Base de Cálculo do IPI <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setIPIVBC(value);
                                                                setIsInvalidoIPIVBC(false);
                                                            } else {
                                                                setIsInvalidoIPIVBC(true);
                                                            }
                                                        }}
                                                        value={IPIVBC || ""}
                                                        type="text"
                                                        name="IPIVBC"
                                                        maxLength={15}
                                                        placeholder='0.00'
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIPIVBC ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="pIPI" className="block font-medium text-sm text-neutral-700">
                                                        Alíquota do IPI <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setPIPI(value);
                                                                setIsInvalidoPIPI(false);
                                                            } else {
                                                                setIsInvalidoPIPI(true);
                                                            }
                                                        }}
                                                        value={pIPI || ""}
                                                        type="text"
                                                        name="pIPI"
                                                        maxLength={15}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPIPI ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="vIPI" className="block font-medium text-sm text-neutral-700">
                                                        Valor do IPI <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const regex = /^[0-9]*\.?[0-9]{0,2}$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setVIPI(value);
                                                                setIsInvalidoVIPI(false);
                                                            } else {
                                                                setIsInvalidoPIPI(true);
                                                            }
                                                        }}
                                                        value={vIPI || ""}
                                                        type="number"
                                                        name="vIPI"
                                                        maxLength={15}
                                                        placeholder='0.00'
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVIPI ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {secaoAtivaTributos === "PIS" && (
                                            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="PISCST" className="block font-medium text-sm text-neutral-700">
                                                        Código de situação tributária do PIS <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "" || value === "01" || value === "02" || value === "03" || value === "04" || value === "05" || value === "06" || value === "07" || value === "08" || value === "09") {
                                                                setPISCST(value);
                                                                setIsInvalidoPISCST(false);
                                                            } else {
                                                                setIsInvalidoPISCST(true);
                                                            }
                                                        }}
                                                        value={PISCST || ""}
                                                        type="text"
                                                        name="CST"
                                                        maxLength={2}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPISCST ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione o CST</option>
                                                        <option value="01">01 - Operação Tributável com Alíquota Básica</option>
                                                        <option value="02">02 - Operação Tributável com Alíquota Diferenciada</option>
                                                        <option value="03">03 - Operação Tributável com Alíquota por Unidade de Medida de Produto</option>
                                                        <option value="04">04 - Operação Tributável Monofásica - Revenda a Alíquota Zero</option>
                                                        <option value="05">05 - Operação Tributável por Substituição Tributária</option>
                                                        <option value="06">06 - Operação Tributável a Alíquota Zero</option>
                                                        <option value="07">07 - Operação Isenta da Contribuição</option>
                                                        <option value="08">08 - Operação sem Incidência da Contribuição</option>
                                                        <option value="09">09 - Operação com Suspensão da Contribuição</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="PISVBC" className="block font-medium text-sm text-neutral-700">
                                                        Valor da base de cálculo do PIS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setPISVBC(value);
                                                                setIsInvalidoPISVBC(false);
                                                            } else {
                                                                setIsInvalidoPISVBC(true);
                                                            }
                                                        }}
                                                        value={PISVBC || ""}
                                                        type="text"
                                                        name="PISVBC"
                                                        maxLength={15}
                                                        placeholder='0.00'
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPISVBC ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="pPIS" className="block font-medium text-sm text-neutral-700">
                                                        Alíquota do PIS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setPPIS(value);
                                                                setIsInvalidoPPIS(false);
                                                            } else {
                                                                setIsInvalidoPPIS(true);
                                                            }
                                                        }}
                                                        value={pPIS || ""}
                                                        type="text"
                                                        name="pPIS"
                                                        maxLength={15}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPPIS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="vPIS" className="block font-medium text-sm text-neutral-700">
                                                        Valor do PIS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setVPIS(value);
                                                                setIsInvalidoVPIS(false);
                                                            } else {
                                                                setIsInvalidoVPIS(true);
                                                            }
                                                        }}
                                                        value={vPIS || ""}
                                                        type="text"
                                                        name="vPIS"
                                                        maxLength={15}
                                                        required
                                                        placeholder='0.00'
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVPIS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {secaoAtivaTributos === "COFINS" && (
                                            <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="COFINSCST" className="block font-medium text-sm text-neutral-700">
                                                        Código de Situação Tributária do COFINS <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value === "01" || value === "02" || value === "03" || value === "04" || value === "05" || value === "06" || value === "07" || value === "08" || value === "09") {
                                                                setCOFINSCST(value);
                                                                setIsInvalidoCOFINSCST(false);
                                                            } else {
                                                                setIsInvalidoCOFINSCST(true);
                                                            }
                                                        }}
                                                        value={COFINSCST || ""}
                                                        type="text"
                                                        name="COFINSCST"
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCOFINSCST ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    >
                                                        <option value="" disabled>Selecione o CST</option>
                                                        <option value="01">01 - Operação Tributável com Alíquota Básica</option>
                                                        <option value="02">02 - Operação Tributável com Alíquota Diferenciada</option>
                                                        <option value="03">03 - Operação Tributável com Alíquota por Unidade de Medida de Produto</option>
                                                        <option value="04">04 - Operação Tributável Monofásica - Revenda a Alíquota Zero</option>
                                                        <option value="05">05 - Operação Tributável por Substituição Tributária</option>
                                                        <option value="06">06 - Operação Tributável a Alíquota Zero</option>
                                                        <option value="07">07 - Operação Isenta da Contribuição</option>
                                                        <option value="08">08 - Operação sem Incidência da Contribuição</option>
                                                        <option value="09">09 - Operação com Suspensão da Contribuição</option>
                                                    </select>
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="COFINSVBC" className="block font-medium text-sm text-neutral-700">
                                                        Valor da Base de Cálculo do COFINS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setCOFINSVBC(value);
                                                                setIsInvalidoCOFINSVBC(false);
                                                            } else {
                                                                setIsInvalidoCOFINSVBC(true);
                                                            }
                                                        }}
                                                        value={COFINSVBC || ""}
                                                        type="text"
                                                        name="COFINSVBC"
                                                        required
                                                        placeholder='0.00'
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCOFINSVBC ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="pCOFINS" className="block font-medium text-sm text-neutral-700">
                                                        Alíquota do COFINS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setPCOFINS(value);
                                                                setIsInvalidoPCOFINS(false);
                                                            } else {
                                                                setIsInvalidoPCOFINS(true);
                                                            }
                                                        }}
                                                        value={pCOFINS || ""}
                                                        type="text"
                                                        name="pCOFINS"
                                                        maxLength={15}
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPCOFINS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                    <label htmlFor="vCOFINS" className="block font-medium text-sm text-neutral-700">
                                                        Valor do COFINS <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(",", ".");
                                                            const regex = /^\d+(\.\d{0,2})?$/;
                                                            if (value === "" || regex.test(value)) {
                                                                setVCOFINS(value);
                                                                setIsInvalidoVCOFINS(false);
                                                            } else {
                                                                setIsInvalidoVCOFINS(true);
                                                            }
                                                        }}
                                                        value={vCOFINS || ""}
                                                        type="text"
                                                        name="vCOFINS"
                                                        maxLength={15}
                                                        placeholder='0.00'
                                                        required
                                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVCOFINS ? "outline-red-500 focus:outline-red-500" : ""}`}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {secaoAtiva === "infoAdicionais" && (
                                    <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label
                                                htmlFor="xCampoObsCont"
                                                className="block font-medium text-sm text-neutral-700"
                                            >
                                                Campo de Observação <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const regex = /^[a-zA-Z\s]*$/;
                                                    if (value === "" || regex.test(value)) {
                                                        setXCampoObsCont(value);
                                                        setIsInvalidoXCampoObsCont(false);
                                                    } else {
                                                        setIsInvalidoXCampoObsCont(true);
                                                    }
                                                }}
                                                value={xCampoObsCont || ""}
                                                type="text"
                                                name="xCampoObsCont"
                                                maxLength={20}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoXCampoObsCont
                                                    ? "outline-red-500 focus:outline-red-500"
                                                    : ""
                                                    }`}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                            <label
                                                htmlFor="xTextoObsCont"
                                                className="block font-medium text-sm text-neutral-700"
                                            >
                                                Texto de Observação <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const regex = /^[a-zA-Z\s]*$/;
                                                    if (value === "" || regex.test(value)) {
                                                        setXTextoObsCont(value);
                                                        setIsInvalidoXTextoObsCont(false);
                                                    } else {
                                                        setIsInvalidoXTextoObsCont(true);
                                                    }
                                                }}
                                                value={xTextoObsCont || ""}
                                                type="text"
                                                name="xTextoObsCont"
                                                maxLength={160}
                                                required
                                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoXTextoObsCont
                                                    ? "outline-red-500 focus:outline-red-500"
                                                    : ""
                                                    }`}
                                            />
                                        </div>

                                        <div className='w-full flex flex-col mt-5 mb-7'>
                                            <h3 className='text-neutral-800 text-lg font-semibold'>Informação fiscal</h3>

                                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                <label
                                                    htmlFor="xCampoObsFisco"
                                                    className="block font-medium text-sm text-neutral-700"
                                                >
                                                    Campo de Observação Fiscal <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const regex = /^[a-zA-Z\s]*$/;
                                                        if (value === "" || regex.test(value)) {
                                                            setXCampoObsFisco(value);
                                                            setIsInvalidoXCampoObsFisco(false);
                                                        } else {
                                                            setIsInvalidoXCampoObsFisco(true);
                                                        }
                                                    }}
                                                    value={xCampoObsFisco || ""}
                                                    type="text"
                                                    name="xCampoObsFisco"
                                                    maxLength={20}
                                                    required
                                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoXCampoObsFisco
                                                        ? "outline-red-500 focus:outline-red-500"
                                                        : ""
                                                        }`}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                                <label
                                                    htmlFor="xTextoObsFisco"
                                                    className="block font-medium text-sm text-neutral-700"
                                                >
                                                    Texto de Observação Fiscal <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const regex = /^[a-zA-Z\s]*$/;
                                                        if (value === "" || regex.test(value)) {
                                                            setXTextoObsFisco(value);
                                                            setIsInvalidoXTextoObsFisco(false);
                                                        } else {
                                                            setIsInvalidoXTextoObsFisco(true);
                                                        }
                                                    }}
                                                    value={xTextoObsFisco || ""}
                                                    type="text"
                                                    name="xTextoObsFisco"
                                                    maxLength={160}
                                                    required
                                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoXTextoObsFisco
                                                        ? "outline-red-500 focus:outline-red-500"
                                                        : ""
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {secaoAtiva === "declaracaoImportacao" && (
                                    <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                    </div>
                                )}
                                {secaoAtiva === "exportacao" && (
                                    <div className="flex flex-wrap transition-transform duration-500 ease-in">
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={handleAddProduto} className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-segundaria-800 text-base font-medium text-white hover:bg-segundaria-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-segundaria-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddProduto;