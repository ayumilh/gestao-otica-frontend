'use client'
import { useState } from "react";
import axios from "axios";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import ModalAddProduto from "./ModalAddProduto";

export const FormCriarNF = () => {
    // dados NF
    const [cUF, setCUF] = useState(null);
    const [cNF, setCNF] = useState("");
    const [natOp, setNatOp] = useState("");
    const [mod, setMod] = useState(null);
    const [serie, setSerie] = useState(1);
    const [nNF, setNNF] = useState(null);
    const [dhEmi, setDhEmi] = useState(null);
    const [tpNF, setTpNF] = useState(null);
    const [idDest, setIdDest] = useState(null);
    const [cMunFG, setCMunFG] = useState("");
    const [tpImp, setTpImp] = useState(null);
    const [tpEmis, setTpEmis] = useState(null);
    const [cDV, setCDV] = useState(null);
    const [tpAmb, setTpAmb] = useState(null);
    const [finNFe, setFinNFe] = useState(null);
    const [indFinal, setIndFinal] = useState(null);
    const [indPres, setIndPres] = useState(null);
    const [indIntermed, setIndIntermed] = useState(null);
    const [procEmi, setProcEmi] = useState(null);

    // emitente
    const [CNPJ, setCNPJ] = useState("");
    const [xNome, setXNome] = useState("");
    const [xFant, setXFant] = useState("");
    const [xLgr, setXLgr] = useState("");
    const [nro, setNro] = useState("");
    const [xBairro, setXBairro] = useState("");
    const [cMun, setCMun] = useState("");
    const [xMun, setXMun] = useState("");
    const [UF, setUF] = useState("");
    const [CEP, setCEP] = useState("");
    const [cPais, setCPais] = useState("");
    const [xPais, setXPais] = useState("Brasil");
    const [fone, setFone] = useState("");
    const [IE, setIE] = useState("");
    const [CRT, setCRT] = useState("");

    // destinatario
    const [destIdEstrangeiro, setDestIdEstrangeiro] = useState("");
    const [destCNPJ, setDestCNPJ] = useState("");
    const [destCPF, setDestCPF] = useState("");
    const [destXNome, setDestXNome] = useState("");
    const [destXLgr, setDestXLgr] = useState("");
    const [destNro, setDestNro] = useState("");
    const [destXBairro, setDestXBairro] = useState("");
    const [destCMun, setDestCMun] = useState("");
    const [destXMun, setDestXMun] = useState("");
    const [destUF, setDestUF] = useState("");
    const [destCEP, setDestCEP] = useState("");
    const [destCPais, setDestCPais] = useState("");
    const [destXPais, setDestXPais] = useState("Brasil");
    const [destFone, setDestFone] = useState("");
    const [destIndIEDest, setDestIndIEDest] = useState("");
    const [destIE, setDestIE] = useState("");
    const [destISUF, setDestISUF] = useState("");
    const [destIM, setDestIM] = useState("");
    const [destEmail, setDestEmail] = useState("");
    const [isInvalidoDestIdEstrangeiro, setIsInvalidoDestIdEstrangeiro] = useState(false);
    const [isInvalidoDestCNPJ, setIsInvalidoDestCNPJ] = useState(false);
    const [isInvalidoDestCPF, setIsInvalidoDestCPF] = useState(false);
    const [isInvalidoDestXNome, setIsInvalidoDestXNome] = useState(false);
    const [isInvalidoDestXLgr, setIsInvalidoDestXLgr] = useState(false);
    const [isInvalidoDestNro, setIsInvalidoDestNro] = useState(false);
    const [isInvalidoDestXBairro, setIsInvalidoDestXBairro] = useState(false);
    const [isInvalidoDestCMun, setIsInvalidoDestCMun] = useState(false);
    const [isInvalidoDestXMun, setIsInvalidoDestXMun] = useState(false);
    const [isInvalidoDestUF, setIsInvalidoDestUF] = useState(false);
    const [isInvalidoDestCEP, setIsInvalidoDestCEP] = useState(false);
    const [isInvalidoDestCPais, setIsInvalidoDestCPais] = useState(false);
    const [isInvalidoDestXPais, setIsInvalidoDestXPais] = useState(false);
    const [isInvalidoDestFone, setIsInvalidoDestFone] = useState(false);
    const [isInvalidoDestIndIEDest, setIsInvalidoDestIndIEDest] = useState(false);
    const [isInvalidoDestIE, setIsInvalidoDestIE] = useState(false);
    const [isInvalidoDestISUF, setIsInvalidoDestISUF] = useState(false);
    const [isInvalidoDestIM, setIsInvalidoDestIM] = useState(false);
    const [isInvalidoDestEmail, setIsInvalidoDestEmail] = useState(false);

    const [indIEDest, setIndIEDest] = useState("");
    const [ISUF, setISUF] = useState("");
    const [IM, setIM] = useState("");
    const [email, setEmail] = useState("");
    const [nItem, setNItem] = useState("");
    const [cProd, setCProd] = useState("");
    const [cEAN, setCEAN] = useState("");
    const [xProd, setXProd] = useState("");
    const [NCM, setNCM] = useState("");
    const [CFOP, setCFOP] = useState("");
    const [uCom, setUCom] = useState("");
    const [qCom, setQCom] = useState("");
    const [vUnCom, setVUnCom] = useState("");
    const [vProd, setVProd] = useState("");
    const [cEANTrib, setCEANTrib] = useState("");
    const [uTrib, setUTrib] = useState("");
    const [qTrib, setQTrib] = useState("");
    const [vUnTrib, setVUnTrib] = useState("");
    const [indTot, setIndTot] = useState("");
    const [vTotTrib, setVTotTrib] = useState("");
    const [orig, setOrig] = useState("");
    const [CST, setCST] = useState("");
    const [modBC, setModBC] = useState("");

    // total imposto
    const [vBC, setVBC] = useState(null);
    const [pIPI, setPIPI] = useState("");
    const [pPIS, setPPIS] = useState("");
    const [pCOFINS, setPCOFINS] = useState("");
    const [pICMS, setPICMS] = useState("");
    const [vICMS, setVICMS] = useState("");
    const [vICMSDeson, setVICMSDeson] = useState("");
    const [vFCP, setVFCP] = useState("");
    const [cEnq, setCEnq] = useState("");
    const [vIPI, setVIPI] = useState("");
    const [vPIS, setVPIS] = useState("");
    const [vCOFINS, setVCOFINS] = useState("");
    const [infAdProd, setInfAdProd] = useState("");
    const [xCampo, setXCampo] = useState("");
    const [xTexto, setXTexto] = useState("");
    const [vBCST, setVBCST] = useState("");
    const [vST, setVST] = useState("");
    const [vFCPST, setVFCPST] = useState("");
    const [vFCPSTRet, setVFCPSTRet] = useState("");
    const [vFrete, setVFrete] = useState("");
    const [vSeg, setVSeg] = useState("");
    const [vDesc, setVDesc] = useState("");
    const [vII, setVII] = useState("");
    const [vIPIDevol, setVIPIDevol] = useState("");
    const [vOutro, setVOutro] = useState("");
    const [vNF, setVNF] = useState("");

    // transporte
    const [transpModFrete, setTranspModFrete] = useState("");
    const [transpCEP, setTranspCEP] = useState("");
    const [transpXLgr, setTranspXLgr] = useState("");
    const [transpNro, setTranspNro] = useState("");
    const [transpXBairro, setTranspXBairro] = useState("");
    const [transpCMun, setTranspCMun] = useState("");
    const [transpXMun, setTranspXMun] = useState("");
    const [transpUF, setTranspUF] = useState("");
    const [isInvalidoTranspModFrete, setIsInvalidoTranspModFrete] = useState(false);
    const [isInvalidoTranspCEP, setIsInvalidoTranspCEP] = useState(false);
    const [isInvalidoTranspXLgr, setIsInvalidoTranspXLgr] = useState(false);
    const [isInvalidoTranspNro, setIsInvalidoTranspNro] = useState(false);
    const [isInvalidoTranspXBairro, setIsInvalidoTranspXBairro] = useState(false);
    const [isInvalidoTranspCMun, setIsInvalidoTranspCMun] = useState(false);
    const [isInvalidoTranspXMun, setIsInvalidoTranspXMun] = useState(false);
    const [isInvalidoTranspUF, setIsInvalidoTranspUF] = useState(false);

    const [isInvalidoCUF, setIsInvalidoCUF] = useState(false);
    const [isInvalidoCNF, setIsInvalidoCNF] = useState(false);
    const [isInvalidoNatOp, setIsInvalidoNatOp] = useState(false);
    const [isInvalidoMod, setIsInvalidoMod] = useState(false);
    const [isInvalidoSerie, setIsInvalidoSerie] = useState(false);
    const [isInvalidoNNF, setIsInvalidoNNF] = useState(false);
    const [isInvalidoDhEmi, setIsInvalidoDhEmi] = useState(false);
    const [isInvalidoTpNF, setIsInvalidoTpNF] = useState(false);
    const [isInvalidoIdDest, setIsInvalidoIdDest] = useState(false);
    const [isInvalidoCMunFG, setIsInvalidoCMunFG] = useState(false);
    const [isInvalidoTpImp, setIsInvalidoTpImp] = useState(false);
    const [isInvalidoTpEmis, setIsInvalidoTpEmis] = useState(false);
    const [isInvalidoCDV, setIsInvalidoCDV] = useState(false);
    const [isInvalidoTpAmb, setIsInvalidoTpAmb] = useState(false);
    const [isInvalidoFinNFe, setIsInvalidoFinNFe] = useState(false);
    const [isInvalidoIndFinal, setIsInvalidoIndFinal] = useState(false);
    const [isInvalidoIndPres, setIsInvalidoIndPres] = useState(false);
    const [isInvalidoIndIntermed, setIsInvalidoIndIntermed] = useState(false);
    const [isInvalidoProcEmi, setIsInvalidoProcEmi] = useState(false);

    // emitente
    const [emitCEP, setEmitCEP] = useState("");
    const [emitCNPJ, setEmitCNPJ] = useState("");
    const [emitXNome, setEmitXNome] = useState("");
    const [emitXFant, setEmitXFant] = useState("");
    const [emitXLgr, setEmitXLgr] = useState("");
    const [emitNro, setEmitNro] = useState("");
    const [emitXBairro, setEmitXBairro] = useState("");
    const [emitCMun, setEmitCMun] = useState("");
    const [emitXMun, setEmitXMun] = useState("");
    const [emitUF, setEmitUF] = useState("");
    const [emitCPais, setEmitCPais] = useState("");
    const [emitXPais, setEmitXPais] = useState("");
    const [emitFone, setEmitFone] = useState("");
    const [emitIE, setEmitIE] = useState("");
    const [emitCRT, setEmitCRT] = useState("");
    const [isInvalidoEmitCEP, setIsInvalidoEmitCEP] = useState(false);
    const [isInvalidoEmitCNPJ, setIsInvalidoEmitCNPJ] = useState(false);
    const [isInvalidoEmitXNome, setIsInvalidoEmitXNome] = useState(false);
    const [isInvalidoEmitXFant, setIsInvalidoEmitXFant] = useState(false);
    const [isInvalidoEmitXLgr, setIsInvalidoEmitXLgr] = useState(false);
    const [isInvalidoEmitNro, setIsInvalidoEmitNro] = useState(false);
    const [isInvalidoEmitXBairro, setIsInvalidoEmitXBairro] = useState(false);
    const [isInvalidoEmitCMun, setIsInvalidoEmitCMun] = useState(false);
    const [isInvalidoEmitXMun, setIsInvalidoEmitXMun] = useState(false);
    const [isInvalidoEmitUF, setIsInvalidoEmitUF] = useState(false);
    const [isInvalidoEmitCPais, setIsInvalidoEmitCPais] = useState(false);
    const [isInvalidoEmitXPais, setIsInvalidoEmitXPais] = useState(false);
    const [isInvalidoEmitFone, setIsInvalidoEmitFone] = useState(false);
    const [isInvalidoEmitIE, setIsInvalidoEmitIE] = useState(false);
    const [isInvalidoEmitCRT, setIsInvalidoEmitCRT] = useState(false);
    const [isInvalidoEmitISUF, setIsInvalidoEmitISUF] = useState(false);

    const [isInvalidoVProd, setIsInvalidoVProd] = useState(false);
    const [isInvalidoVTotTrib, setIsInvalidoVTotTrib] = useState(false);
    const [isInvalidoOrig, setIsInvalidoOrig] = useState(false);
    const [isInvalidoCST, setIsInvalidoCST] = useState(false);
    const [isInvalidoModBC, setIsInvalidoModBC] = useState(false);
    const [isInvalidoVBC, setIsInvalidoVBC] = useState(false);
    const [isInvalidoVICMSDeson, setIsInvalidoVICMSDeson] = useState(false);
    const [isInvalidoVFCP, setIsInvalidoVFCP] = useState(false);
    const [isInvalidoPICMS, setIsInvalidoPICMS] = useState(false);
    const [isInvalidoVICMS, setIsInvalidoVICMS] = useState(false);
    const [isInvalidoCEnq, setIsInvalidoCEnq] = useState(false);
    const [isInvalidoPIPI, setIsInvalidoPIPI] = useState(false);
    const [isInvalidoPPIS, setIsInvalidoPPIS] = useState(false);
    const [isInvalidoPCOFINS, setIsInvalidoPCOFINS] = useState(false);
    const [isInvalidoVIPI, setIsInvalidoVIPI] = useState(false);
    const [isInvalidoVPIS, setIsInvalidoVPIS] = useState(false);
    const [isInvalidoVCOFINS, setIsInvalidoVCOFINS] = useState(false);
    const [isInvalidoInfAdProd, setIsInvalidoInfAdProd] = useState(false);
    const [isInvalidoVBCST, setIsInvalidoVBCST] = useState(false);
    const [isInvalidoVST, setIsInvalidoVST] = useState(false);
    const [isInvalidoVFCPST, setIsInvalidoVFCPST] = useState(false);
    const [isInvalidoVFCPSTRet, setIsInvalidoVFCPSTRet] = useState(false);
    const [isInvalidoVProduto, setIsInvalidoVProduto] = useState(false);
    const [isInvalidoVFrete, setIsInvalidoVFrete] = useState(false);
    const [isInvalidoVSeg, setIsInvalidoVSeg] = useState(false);
    const [isInvalidoVDesc, setIsInvalidoVDesc] = useState(false);
    const [isInvalidoVII, setIsInvalidoVII] = useState(false);
    const [isInvalidoVIPIDevol, setIsInvalidoVIPIDevol] = useState(false);
    const [isInvalidoVOutro, setIsInvalidoVOutro] = useState(false);
    const [isInvalidoVNF, setIsInvalidoVNF] = useState(false);

    const [tPag, setTPag] = useState("");
    const [vPag, setVPag] = useState("");
    const [isInvalidoTPag, setIsInvalidoTPag] = useState(false);
    const [isInvalidoVPag, setIsInvalidoVPag] = useState(false);

    const [ambiente, setAmbiente] = useState("");
    const [isInvalidoAmbiente, setIsInvalidoAmbiente] = useState(false);

    const [produtos, setProdutos] = useState([]);

    const formDataNF = {
        ide: {
            cUF: parseInt(cUF),
            cNF,
            natOp,
            mod: parseInt(mod),
            serie: parseInt(serie),
            nNF: parseInt(nNF),
            dhEmi,
            tpNF: parseInt(tpNF),
            idDest: parseInt(idDest),
            cMunFG: parseInt(cMunFG),
            tpImp: parseInt(tpImp),
            tpEmis: parseInt(tpEmis),
            cDV: parseInt(cDV),
            tpAmb: parseInt(tpAmb),
            finNFe: parseInt(finNFe),
            indFinal: parseInt(indFinal),
            indPres: parseInt(indPres),
            indIntermed: parseInt(indIntermed),
            procEmi: parseInt(procEmi),
        },
        emit: {
            CNPJ: emitCNPJ,
            xNome: emitXNome,
            xFant: emitXFant,
            enderEmit: {
                xLgr: emitXLgr,
                nro: emitNro,
                xBairro: emitXBairro,
                cMun: emitCMun,
                xMun: emitXMun,
                UF: emitUF,
                CEP: emitCEP,
                cPais: emitCPais,
                xPais: emitXPais,
                fone: emitFone
            },
            IE: emitIE,
            CRT: parseInt(emitCRT)
        },
        dest: {
            CNPJ: destCNPJ,
            CPF: destCPF,
            idEstrangeiro: destIdEstrangeiro,
            xNome: destXNome,
            enderDest: {
                xLgr: destXLgr,
                nro: destNro,
                xBairro: destXBairro,
                cMun: destCMun,
                xMun: destXMun,
                UF: destUF,
                CEP: destCEP,
                cPais: destCPais,
                xPais: destXPais,
                fone: destFone
            },
            indIEDest: parseInt(indIEDest),
            IE: destIE,
            ISUF: destISUF,
            IM: destIM,
            email: destEmail
        },
        entrega: {
            xLgr: transpXLgr,
            nro: transpNro,
            xBairro: transpXBairro,
            cMun: transpCMun,
            xMun: transpXMun,
            UF: transpUF
        },
        det: produtos,
        total: {
            ICMSTot: {
                vBC: parseFloat(vBC),
                vICMS: parseFloat(vICMS),
                vICMSDeson: parseFloat(vICMSDeson),
                vFCP: parseFloat(vFCP),
                vBCST: parseFloat(vBCST),
                vST: parseFloat(vST),
                vFCPST: parseFloat(vFCPST),
                vFCPSTRet: parseFloat(vFCPSTRet),
                vProd: parseFloat(vProd),
                vFrete: parseFloat(vFrete),
                vSeg: parseFloat(vSeg),
                vDesc: parseFloat(vDesc),
                vII: parseFloat(vII),
                vIPI: parseFloat(vIPI),
                vIPIDevol: parseFloat(vIPIDevol),
                vPIS: parseFloat(vPIS),
                vCOFINS: parseFloat(vCOFINS),
                vOutro: parseFloat(vOutro),
                vNF: parseFloat(vNF)
            }
        },
        transp: {
            modFrete: parseInt(transpModFrete),
        },
        pag: {
            detPag: [
                {
                    tPag,
                    vPag: parseFloat(vPag)
                }
            ]
        },
        ambiente
    };

    const [secaoAtiva, setSecaoAtiva] = useState("dadosNF");
    const [statusRequest, setStatusRequest] = useState(null);
    

    const handleCriar = async () => {
        try{
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatusRequest(true);
        } catch (error) {
            setStatusRequest(false);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    }
    const closeKitModal = () => {
        setIsModalOpen(false);
    }

    const handleInputChange = (setter, setInvalid, regex) => (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === "" || regex.test(value)) {
            setter(value);
            setInvalid(false);
        } else {
            setInvalid(true);
        }
    };

    const handleAddProduto = (produto) => {
        const novoProduto = {
            nItem: produtos.length + 1,
            prod: {
                ...produto,
                qCom: parseFloat(produto.qCom),
                vUnCom: parseFloat(produto.vUnCom),
                vProd: parseFloat(produto.vProd),
                qTrib: parseFloat(produto.qTrib),
                vUnTrib: parseFloat(produto.vUnTrib),
                indTot: parseInt(produto.indTot)
            },
            imposto: {
                ...produto || {},
                vTotTrib: parseFloat(produto.vTotTrib) || 0,
                ICMS: {
                    ICMS00: {
                        ...((produto.ICMS && produto.ICMS.ICMS00) || {}),
                        orig: parseInt(produto.ICMS.ICMS00.orig || 0),
                        modBC: parseInt(produto.ICMS.ICMS00.modBC) || 0,
                        vBC: parseFloat(produto.ICMS.ICMS00.vBC) || 0,
                        pICMS: parseFloat(produto.ICMS.ICMS00.pICMS) || 0,
                        vICMS: parseFloat(produto.ICMS.ICMS00.vICMS) || 0
                    }
                },
                IPI: {
                    ...produto.IPI,
                    IPITrib: {
                        ...imposto.IPI.IPITrib,
                        vBC: parseFloat(produto.IPI.IPITrib.vBC),
                        pIPI: parseFloat(produto.IPI.IPITrib.pIPI),
                        vIPI: parseFloat(produto.IPI.IPITrib.vIPI)
                    }
                },
                PIS: {
                    ...produto.PIS,
                    PISAliq: {
                        ...produto.PIS.PISAliq,
                        vBC: parseFloat(produto.PIS.PISAliq.vBC),
                        pPIS: parseFloat(produto.PIS.PISAliq.pPIS),
                        vPIS: parseFloat(produto.PIS.PISAliq.vPIS)
                    }
                },
                COFINS: {
                    ...produto.COFINS,
                    COFINSAliq: {
                        ...produto.COFINS.COFINSAliq,
                        vBC: parseFloat(produto.COFINS.COFINSAliq.vBC),
                        pCOFINS: parseFloat(produto.COFINS.COFINSAliq.pCOFINS),
                        vCOFINS: parseFloat(produto.COFINS.COFINSAliq.vCOFINS)
                    }
                }
            },
            infAdProd: produto.infAdProd,
            obsItem: produto.obsItem
        };

        setProdutos([...produtos, novoProduto]);
    };


    return (<>
        <div className="w-full xl:max-w-screen-lg flex flex-col">
            {/* <BtnBackPage title="Voltar" /> */}
            <h3 className="text-neutral-800 text-xl font-medium ">
                Emitindo Nota Fiscal
            </h3>

            <div className="flex gap-4 mt-5 mb-2 relative">
                <button
                    onClick={() => setSecaoAtiva("dadosNF")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "dadosNF"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    dados NF
                </button>
                <button
                    onClick={() => setSecaoAtiva("emitente")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "emitente"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    emitente
                </button>
                <button
                    onClick={() => setSecaoAtiva("destinatario")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "destinatario"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    destinatario
                </button>
                <button
                    onClick={() => setSecaoAtiva("produto")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "produto"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    produto
                </button>
                <button
                    onClick={() => setSecaoAtiva("totalImposto")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "totalImposto"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    total do imposto
                </button>
                <button
                    onClick={() => setSecaoAtiva("transporte")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "transporte"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    transporte
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
                    onClick={() => setSecaoAtiva("pagamento")}
                    className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${secaoAtiva === "pagamento"
                        ? "border-b-2 border-segundaria-900 text-neutral-800"
                        : ""
                        }`}
                >
                    pagamento
                </button>
            </div>

            {secaoAtiva === 'dadosNF' && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cUF"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código da UF <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setCUF, setIsInvalidoCUF, /^[0-9]{0,2}$/)}
                            value={cUF || ""}
                            type="number"
                            name="cUF"
                            maxLength={2}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCUF
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cNF"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código da NF
                        </label>
                        <input
                            onChange={handleInputChange(setCNF, setIsInvalidoCNF, /^[0-9]{0,8}$/)}
                            value={cNF || ""}
                            type="number"
                            name="cNF"
                            maxLength={8}
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCNF
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="natOp"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Natureza da Operação <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setNatOp, setIsInvalidoNatOp, /^[a-zA-Z\s]{0,60}$/)}
                            value={natOp || ""}
                            type="text"
                            name="natOp"
                            maxLength={60}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNatOp
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="mod"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Modelo de documento <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setMod, setIsInvalidoMod, /^[0-9]{0,2}$/)}
                            value={mod || ""}
                            type="number"
                            name="mod"
                            maxLength={2}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoMod
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="serie"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Série <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setSerie, setIsInvalidoSerie, /^[0-9]*$/)}
                            value={serie || "1"}
                            type="number"
                            name="serie"
                            maxLength={3}
                            minLength={1}
                            required
                            disabled
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoSerie
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="nNF"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Número da NF <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setNNF, setIsInvalidoNNF, /^[0-9]{0,9}$/)}
                            value={nNF || ""}
                            type="number"
                            name="nNF"
                            maxLength={9}
                            minLength={1}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNNF
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="dhEmi"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Data de Emissão <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => setDhEmi(e.target.value)}
                            value={dhEmi || ""}
                            type="date"
                            name="dhEmi"
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDhEmi
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="tpNF"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Tipo da NF <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "0" || value === "1") {
                                    setTpNF(value);
                                    setIsInvalidoTpNF(false);
                                } else {
                                    setIsInvalidoTpNF(true);
                                }
                            }}
                            value={tpNF || ""}
                            name="tpNF"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTpNF
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o tipo</option>
                            <option value="0">Entrada</option>
                            <option value="1">Saída</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="idDest"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Destino da NF <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "0" || value === "1" || value === "2") {
                                    setIdDest(value);
                                    setIsInvalidoIdDest(false);
                                } else {
                                    setIsInvalidoIdDest(true);
                                }
                            }}
                            value={idDest || ""}
                            name="idDest"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIdDest
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o destino</option>
                            <option value="0">Interno</option>
                            <option value="1">Interestadual</option>
                            <option value="2">Exterior</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cMunFG"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Código do Município de localização do emitente <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={handleInputChange(setCMunFG, setIsInvalidoCMunFG,/^[0-9]{0,7}$/)}
                            value={cMunFG || ""}
                            type="text"
                            name="cMunFG"
                            maxLength={7}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCMunFG
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="tpImp"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Tipo de Impressão <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "0" || value === "1" || value === "2" || value === "3" || value === "4") {
                                    setTpImp(value);
                                    setIsInvalidoTpImp(false);
                                } else {
                                    setIsInvalidoTpImp(true);
                                }
                            }}
                            value={tpImp || ""}
                            name="tpImp"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTpImp
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o tipo de impressão</option>
                            <option value="0">Retrato</option>
                            <option value="1">Paisagem</option>
                            <option value="2">Simplificado</option>
                            <option value="3">DANFE NFC-e</option>
                            <option value="4">DANFE NFC-e em mensagem eletrônica</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="tpEmis"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Tipo de Emissão <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "1") {
                                    setTpEmis(value);
                                    setIsInvalidoTpEmis(false);
                                } else {
                                    setIsInvalidoTpEmis(true);
                                }
                            }}
                            value={tpEmis || ""}
                            name="tpEmis"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTpEmis
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o tipo de emissão</option>
                            <option value="1">Normal</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="cDV"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Dígito Verificador
                        </label>
                        <input
                            onChange={handleInputChange(setCDV, setIsInvalidoCDV, /^[0-9]{0,9}$/)}
                            value={cDV || ""}
                            type="text"
                            name="cDV"
                            maxLength={9}
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCDV
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="tpAmb"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Ambiente <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "1" || value === "2") {
                                    setTpAmb(value);
                                    setIsInvalidoTpAmb(false);
                                } else {
                                    setIsInvalidoTpAmb(true);
                                }
                            }}
                            value={tpAmb || ""}
                            name="tpAmb"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTpAmb
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o ambiente</option>
                            <option value="1">Produção</option>
                            <option value="2">Homologação</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="finNFe"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Finalidade da NF-e <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "1" || value === "2" || value === "3" || value === "4") {
                                    setFinNFe(value);
                                    setIsInvalidoFinNFe(false);
                                } else {
                                    setIsInvalidoFinNFe(true);
                                }
                            }}
                            value={finNFe || ""}
                            name="finNFe"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoFinNFe
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione a finalidade</option>
                            <option value="1">Normal</option>
                            <option value="2">Complementar</option>
                            <option value="3">Ajuste</option>
                            <option value="4">Devolução</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="indFinal"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Consumidor Final <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "0" || value === "1") {
                                    setIndFinal(value);
                                    setIsInvalidoIndFinal(false);
                                } else {
                                    setIsInvalidoIndFinal(true);
                                }
                            }}
                            value={indFinal || ""}
                            name="indFinal"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIndFinal
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o consumidor final</option>
                            <option value="0">Não</option>
                            <option value="1">Sim</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="indPres"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Indicador de Presença do comprador <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (["0", "1", "2", "3", "4", "9"].includes(value)) {
                                    setIndPres(value);
                                    setIsInvalidoIndPres(false);
                                } else {
                                    setIsInvalidoIndPres(true);
                                }
                            }}
                            value={indPres || ""}
                            name="indPres"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIndPres
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o indicador de presença</option>
                            <option value="0">Não se aplica</option>
                            <option value="1">Operação presencial</option>
                            <option value="2">Operação não presencial, pela Internet</option>
                            <option value="3">Operação não presencial, Teleatendimento</option>
                            <option value="4">NFC-e em operação com entrega a domicílio</option>
                            <option value="9">Operação não presencial, outros</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="indIntermed"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Indicador de Intermediação
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (["0", "1"].includes(value)) {
                                    setIndIntermed(value);
                                    setIsInvalidoIndIntermed(false);
                                } else {
                                    setIsInvalidoIndIntermed(true);
                                }
                            }}
                            value={indIntermed || ""}
                            name="indIntermed"
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIndIntermed
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o indicador de intermediação</option>
                            <option value="0">Operação sem intermediador</option>
                            <option value="1">Operação em site ou Marketplace</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="procEmi"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Processo de Emissão <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (["0", "1", "2", "3"].includes(value)) {
                                    setProcEmi(value);
                                    setIsInvalidoProcEmi(false);
                                } else {
                                    setIsInvalidoProcEmi(true);
                                }
                            }}
                            value={procEmi || ""}
                            name="procEmi"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoProcEmi
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        >
                            <option value="" disabled>Selecione o processo de emissão</option>
                            <option value="0">Emissão de NF-e com aplicativo do contribuinte</option>
                            <option value="1">Emissão de NF-e avulsa pelo Fisco</option>
                            <option value="2">Emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco</option>
                            <option value="3">Emissão de NF-e pelo contribuinte com aplicativo fornecido pelo Fisco</option>
                        </select>
                    </div>
                </div>
            )}

            {secaoAtiva === "emitente" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className='w-full flex flex-wrap mt-5 mb-7'>
                        <div className="w-full mt-3 mb-4 px-3">
                            <div className="relative items-center">
                                <label
                                    htmlFor="emitCNPJ"
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
                                                setEmitCNPJ(value);
                                                setIsInvalidoEmitCNPJ(false);
                                            } else {
                                                setIsInvalidoEmitCNPJ(true);
                                            }
                                        }}
                                        value={emitCNPJ || ""}
                                        type="text"
                                        name="emitCNPJ"
                                        maxLength={14}
                                        required
                                        className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitCNPJ
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                            }`}
                                    />
                                    <button
                                        onClick={() => buscarCNPJ(emitCNPJ)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                                    >
                                        <SearchIcon fontSize="20px" />
                                    </button>

                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="emitXNome"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Razão social <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[a-zA-Z\s]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setEmitXNome(value);
                                        setIsInvalidoEmitXNome(false);
                                    } else {
                                        setIsInvalidoEmitXNome(true);
                                    }
                                }}
                                value={emitXNome || ""}
                                type="text"
                                name="emitXNome"
                                maxLength={60}
                                required
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXNome
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="emitXFant"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Nome Fantasia <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[a-zA-Z\s]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setEmitXFant(value);
                                        setIsInvalidoEmitXFant(false);
                                    } else {
                                        setIsInvalidoEmitXFant(true);
                                    }
                                }}
                                value={emitXFant || ""}
                                type="text"
                                name="emitXFant"
                                maxLength={60}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXFant
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="emitIE"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Inscrição Estadual <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setEmitIE(value);
                                        setIsInvalidoEmitIE(false);
                                    } else {
                                        setIsInvalidoEmitIE(true);
                                    }
                                }}
                                value={emitIE || ""}
                                type="text"
                                name="emitIE"
                                maxLength={14}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitIE
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label htmlFor="emitCRT" className="block mb-1 font-medium text-sm text-neutral-700">Regime Tributário</label>
                            <select
                                id="Regime_Tributario"
                                name="emitCRT"
                                value={emitCRT}
                                onChange={(e) => setEmitCRT(e.target.value)}
                                className="mt-3 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            >
                                <option value="1">Simples Nacional</option>
                                <option value="2">Lucro Presumido</option>
                                <option value="3">Lucro Real</option>
                                <option value="4">Simples Nacional - MEI</option>
                            </select>
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="emitFone"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Telefone <span className="text-red-600">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setEmitFone(value);
                                        setIsInvalidoEmitFone(false);
                                    } else {
                                        setIsInvalidoEmitFone(true);
                                    }
                                }}
                                value={emitFone || ""}
                                type="text"
                                name="emitFone"
                                maxLength={14}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitFone
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>
                    </div>

                    <hr className="w-full my-4 border-t border-neutral-200" />

                    {/* Endereço */}
                    <div className='w-full flex flex-col mt-5 mb-7'>
                        <h3 className='text-neutral-800 text-lg font-semibold'>Endereço</h3>
                        <div className='w-full flex flex-wrap mt-5'>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitCEP"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    CEP <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitCEP(value);
                                            setIsInvalidoEmitCEP(false);
                                        } else {
                                            setIsInvalidoEmitCEP(true);
                                        }
                                    }}
                                    value={emitCEP || ""}
                                    type="text"
                                    name="emitCEP"
                                    maxLength={8}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitCEP
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitXLgr"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Logradouro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitXLgr(value);
                                            setIsInvalidoEmitXLgr(false);
                                        } else {
                                            setIsInvalidoEmitXLgr(true);
                                        }
                                    }}
                                    value={emitXLgr || ""}
                                    type="text"
                                    name="emitXgr"
                                    maxLength={60}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXLgr
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitXBairro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Bairro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitXBairro(value);
                                            setIsInvalidoEmitXBairro(false);
                                        } else {
                                            setIsInvalidoEmitXBairro(true);
                                        }
                                    }}
                                    value={emitXBairro || ""}
                                    type="text"
                                    name="emitXBairro"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXBairro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitNro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Número <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitNro(value);
                                            setIsInvalidoEmitNro(false);
                                        } else {
                                            setIsInvalidoEmitNro(true);
                                        }
                                    }}
                                    value={emitNro || ""}
                                    type="text"
                                    name="emitNro"
                                    maxLength={10}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitNro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitUF"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    UF <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitUF(value);
                                            setIsInvalidoEmitUF(false);
                                        } else {
                                            setIsInvalidoEmitUF(true);
                                        }
                                    }}
                                    value={emitUF || ""}
                                    type="text"
                                    name="emitUF"
                                    maxLength={2}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitUF
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitXPais"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    País <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitXPais(value);
                                            setIsInvalidoEmitXPais(false);
                                        } else {
                                            setIsInvalidoEmitXPais(true);
                                        }
                                    }}
                                    value={emitXPais || ""}
                                    type="text"
                                    name="emitxPais"
                                    maxLength={60}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXPais
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitCPais"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Código do País <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitCPais(value);
                                            setIsInvalidoEmitCPais(false);
                                        } else {
                                            setIsInvalidoCPais(true);
                                        }
                                    }}
                                    value={emitCPais || ""}
                                    type="text"
                                    name="emitCPais"
                                    maxLength={4}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitCPais
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitXMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Nome do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitXMun(value);
                                            setIsInvalidoEmitXMun(false);
                                        } else {
                                            setIsInvalidoEmitXMun(true);
                                        }
                                    }}
                                    value={emitXMun || ""}
                                    type="text"
                                    name="emitXMun"
                                    maxLength={60}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitXMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="emitCMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Código do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setEmitCMun(value);
                                            setIsInvalidoEmitCMun(false);
                                        } else {
                                            setIsInvalidoEmitCMun(true);
                                        }
                                    }}
                                    value={emitCMun || ""}
                                    type="text"
                                    name="emitCMun"
                                    maxLength={7}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmitCMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* colocar o input de cnpj/cpf */}
            {secaoAtiva === "destinatario" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className='w-full flex flex-wrap mt-5 mb-7'>
                        {/* tipo de documento */}
                        {/* <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
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
                    className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                      cli_tipo_cliente === "F"
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
                    className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                      cli_tipo_cliente === "J"
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
                      className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                        isInvalidoClienteCpf
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
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      const regex = /^[0-9]*$/;
                      if (value === "" || regex.test(value)) {
                        setCli_cpf_cnpj(value);
                        setIsInvalidoClienteCnpj(false);
                      } else {
                        setIsInvalidoClienteCnpj(true);
                      }
                    }}
                    value={cli_cpf_cnpj || ""}
                    type="text"
                    name="cli_cpf_cnpj"
                    maxLength={14}
                    className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                      isInvalidoClienteCnpj
                        ? "outline-red-500 focus:outline-red-500"
                        : ""
                    }`}
                  />
                  <button
                    onClick={() => buscarCNPJ(cli_cpf_cnpj)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                  >
                    <SearchIcon fontSize="20px" />
                  </button>
                </div>
              )}
            </div> */}

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="destIdEstrangeiro"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Id Estrangeiro
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setDestIdEstrangeiro(value);
                                        setIsInvalidoDestIdEstrangeiro(false);
                                    } else {
                                        setIsInvalidoDestIdEstrangeiro(true);
                                    }
                                }}
                                value={destIdEstrangeiro || ""}
                                type="text"
                                name="destIdEstrangeiro"
                                maxLength={20}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestIdEstrangeiro
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="destXNome"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Nome
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[a-zA-Z\s]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setDestXNome(value);
                                        setIsInvalidoDestXNome(false);
                                    } else {
                                        setIsInvalidoDestXNome(true);
                                    }
                                }}
                                value={destXNome || ""}
                                type="text"
                                name="destXNome"
                                maxLength={60}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestXNome
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="destEmail"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Email
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[a-zA-Z0-9@.]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setDestEmail(value);
                                        setIsInvalidoDestEmail(false);
                                    } else {
                                        setIsInvalidoDestEmail(true);
                                    }
                                }}
                                value={destEmail || ""}
                                type="email"
                                name="destEmail"
                                maxLength={60}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestEmail
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                            <label
                                htmlFor="destFone"
                                className="block font-medium text-sm text-neutral-700"
                            >
                                Telefone
                            </label>
                            <input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[0-9]*$/;
                                    if (value === "" || regex.test(value)) {
                                        setDestFone(value);
                                        setIsInvalidoDestFone(false);
                                    } else {
                                        setIsInvalidoDestFone(true);
                                    }
                                }}
                                value={destFone || ""}
                                type="text"
                                name="destFone"
                                maxLength={14}
                                className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestFone
                                    ? "outline-red-500 focus:outline-red-500"
                                    : ""
                                    }`}
                            />
                        </div>
                    </div>

                    <div className='w-full flex flex-col mt-5 mb-7'>
                        <h3 className='text-neutral-800 text-lg font-semibold'>Endereço</h3>
                        <div className='w-full flex flex-wrap mt-5'>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destCEP"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    CEP <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestCEP(value);
                                            setIsInvalidoDestCEP(false);
                                        } else {
                                            setIsInvalidoDestCEP(true);
                                        }
                                    }}
                                    value={destCEP || ""}
                                    type="text"
                                    name="destCEP"
                                    maxLength={8}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestCEP
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destXLgr"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Logradouro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestXLgr(value);
                                            setIsInvalidoDestXLgr(false);
                                        } else {
                                            setIsInvalidoDestXLgr(true);
                                        }
                                    }}
                                    value={destXLgr || ""}
                                    type="text"
                                    name="destXLgr"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestXLgr
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destXBairro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Bairro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestXBairro(value);
                                            setIsInvalidoDestXBairro(false);
                                        } else {
                                            setIsInvalidoDestXBairro(true);
                                        }
                                    }}
                                    value={destXBairro || ""}
                                    type="text"
                                    name="destXBairro"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestXBairro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destNro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Número <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestNro(value);
                                            setIsInvalidoDestNro(false);
                                        } else {
                                            setIsInvalidoDestNro(true);
                                        }
                                    }}
                                    value={destNro || ""}
                                    type="text"
                                    name="destNro"
                                    maxLength={10}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestNro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destUF"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    UF <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestUF(value);
                                            setIsInvalidoDestUF(false);
                                        } else {
                                            setIsInvalidoDestUF(true);
                                        }
                                    }}
                                    value={destUF || ""}
                                    type="text"
                                    name="destUF"
                                    maxLength={2}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestUF
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destXPais"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    País <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestXPais(value);
                                            setIsInvalidoDestXPais(false);
                                        } else {
                                            setIsInvalidoDestXPais(true);
                                        }
                                    }}
                                    value={destXPais || ""}
                                    type="text"
                                    name="destXPais"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestXPais
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destCPais"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Código do País <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestCPais(value);
                                            setIsInvalidoDestCPais(false);
                                        } else {
                                            setIsInvalidoDestCPais(true);
                                        }
                                    }}
                                    value={destCPais || ""}
                                    type="text"
                                    name="destCPais"
                                    maxLength={4}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestCPais
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destXMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Nome do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestXMun(value);
                                            setIsInvalidoDestXMun(false);
                                        } else {
                                            setIsInvalidoDestXMun(true);
                                        }
                                    }}
                                    value={destXMun || ""}
                                    type="text"
                                    name="destXMun"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestXMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destCMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Código do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestCMun(value);
                                            setIsInvalidoDestCMun(false);
                                        } else {
                                            setIsInvalidoDestCMun(true);
                                        }
                                    }}
                                    value={destCMun || ""}
                                    type="text"
                                    name="destCMun"
                                    maxLength={7}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestCMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* info fiscais */}
                    <div className='w-full flex flex-col mt-5 mb-7'>
                        <h3 className='text-neutral-800 text-lg font-semibold'>Informações Fiscais do Destinatário</h3>
                        <div className='w-full flex flex-wrap mt-5'>
                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="indIEDest"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Indicador da IE <span className="text-red-600">*</span>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setIndIEDest(e.target.value);
                                    }}
                                    value={indIEDest || ""}
                                    name="indIEDest"
                                    className="rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
                                >
                                    <option value="">Selecione</option>
                                    <option value="1">Contribuinte ICMS</option>
                                    <option value="2">Contribuinte isento de Inscrição</option>
                                    <option value="9">Não Contribuinte</option>
                                </select>
                            </div>

                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destIE"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Inscrição Estadual
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestIE(value);
                                            setIsInvalidoDestIE(false);
                                        } else {
                                            setIsInvalidoDestIE(true);
                                        }
                                    }}
                                    value={destIE || ""}
                                    type="text"
                                    name="destIE"
                                    maxLength={14}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestIE
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destISUF"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Inscrição Suframa
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestISUF(value);
                                            setIsInvalidoDestISUF(false);
                                        } else {
                                            setIsInvalidoDestISUF(true);
                                        }
                                    }}
                                    value={destISUF || ""}
                                    type="text"
                                    name="destISUF"
                                    maxLength={9}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestISUF
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="destIM"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Inscrição Municipal
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setDestIM(value);
                                            setIsInvalidoDestIM(false);
                                        } else {
                                            setIsInvalidoDestIM(true);
                                        }
                                    }}
                                    value={destIM || ""}
                                    type="text"
                                    name="destIM"
                                    maxLength={14}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoDestIM
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {secaoAtiva === 'produto' && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full md:w-full flex flex-col overflow-x-auto">
                        <div className='absolute'>
                            <button type='button' onClick={handleButtonClick} className='rounded-lg flex items-center justify-center gap-1 text-base py-2 px-3'>
                                <span><AddIcon className='w-5 h-5' /></span>
                                <span className='text-sm hover:text-black font-medium'>Inserir produto</span>
                            </button>
                        </div>
                        <div className="rounded-2xl flex flex-col h-[400px] mx-auto lg:mx-0 mb-6 mt-14 overflow-x-auto">
                            <table className="table-auto min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Codigo do produto</th>
                                        <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Valor do produto</th>
                                        <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Quantidade</th>
                                        <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            {isModalOpen && (
                                <ModalAddProduto onClose={closeKitModal} onAddProduto={handleAddProduto} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {secaoAtiva === 'totalImposto' && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vBC"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de Cálculo do ICMS <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVBC(value);
                                    setIsInvalidoVBC(false);
                                } else {
                                    setIsInvalidoVBC(true);
                                }
                            }}
                            value={vBC || ""}
                            type="text"
                            name="vBC"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVBC
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vICMS"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do ICMS <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;;
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
                            required
                            placeholder="0.00"
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVICMS
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vICMSDeson"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do ICMS Desonerado <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVICMSDeson(value);
                                    setIsInvalidoVICMSDeson(false);
                                } else {
                                    setIsInvalidoVICMSDeson(true);
                                }
                            }}
                            value={vICMSDeson || ""}
                            type="text"
                            name="vICMSDeson"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVICMSDeson
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vFCP"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do FCP (Fundo de Combate à Pobreza) <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVFCP(value);
                                    setIsInvalidoVFCP(false);
                                } else {
                                    setIsInvalidoVFCP(true);
                                }
                            }}
                            value={vFCP || ""}
                            type="text"
                            name="vFCP"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVFCP
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vBCST"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Base de Cálculo do ICMS ST <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVBCST(value);
                                    setIsInvalidoVBCST(false);
                                } else {
                                    setIsInvalidoVBCST(true);
                                }
                            }}
                            value={vBCST || ""}
                            type="text"
                            name="vBCST"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVBCST
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>
                    

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vFCPST"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do FCP ST (Fundo de Combate à Pobreza) <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVFCPST(value);
                                    setIsInvalidoVFCPST(false);
                                } else {
                                    setIsInvalidoVFCPST(true);
                                }
                            }}
                            value={vFCPST || ""}
                            type="text"
                            name="vFCPST"
                            maxLength={15}
                            required
                            placeholder="0.00"
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVFCPST
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vST"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do ICMS ST <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVST(value);
                                    setIsInvalidoVST(false);
                                } else {
                                    setIsInvalidoVST(true);
                                }
                            }}
                            value={vST || ""}
                            type="text"
                            name="vST"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVST
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>
                    

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vFCPSTRet"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do FCP ST Retido (Fundo de Combate à Pobreza) <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVFCPSTRet(value);
                                    setIsInvalidoVFCPSTRet(false);
                                } else {
                                    setIsInvalidoVFCPSTRet(true);
                                }
                            }}
                            value={vFCPSTRet || ""}
                            type="text"
                            name="vFCPSTRet"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVFCPSTRet
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vProd"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total dos Produtos <span className="text-red-600">*</span>
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
                            name="vProd"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVProd
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vFrete"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do Frete <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVFrete(value);
                                    setIsInvalidoVFrete(false);
                                } else {
                                    setIsInvalidoVFrete(true);
                                }
                            }}
                            value={vFrete || ""}
                            type="text"
                            name="vFrete"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVFrete
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vSeg"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do Seguro <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVSeg(value);
                                    setIsInvalidoVSeg(false);
                                } else {
                                    setIsInvalidoVSeg(true);
                                }
                            }}
                            value={vSeg || ""}
                            type="text"
                            name="vSeg"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVSeg
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vDesc"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do Desconto <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVDesc(value);
                                    setIsInvalidoVDesc(false);
                                } else {
                                    setIsInvalidoVDesc(true);
                                }
                            }}
                            value={vDesc || ""}
                            type="text"
                            name="vDesc"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVDesc
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vII"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do II (Imposto de Importação) <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVII(value);
                                    setIsInvalidoVII(false);
                                } else {
                                    setIsInvalidoVII(true);
                                }
                            }}
                            value={vII || ""}
                            type="text"
                            name="vII"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVII
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vIPI"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do IPI (Imposto sobre Produtos Industrializados) <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVIPI(value);
                                    setIsInvalidoVIPI(false);
                                } else {
                                    setIsInvalidoVIPI(true);
                                }
                            }}
                            value={vIPI || ""}
                            type="text"
                            name="vIPI"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVIPI
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vIPIDevol"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do IPI Devolvido <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVIPIDevol(value);
                                    setIsInvalidoVIPIDevol(false);
                                } else {
                                    setIsInvalidoVIPIDevol(true);
                                }
                            }}
                            value={vIPIDevol || ""}
                            type="text"
                            name="vIPIDevol"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVIPIDevol
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vPIS"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do PIS (Programa de Integração Social) <span className="text-red-600">*</span>
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
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVPIS
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vCOFINS"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total do COFINS (Contribuição para o Financiamento da Seguridade Social) <span className="text-red-600">*</span>
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
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVCOFINS
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vOutro"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Outras Despesas Acessórias <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVOutro(value);
                                    setIsInvalidoVOutro(false);
                                } else {
                                    setIsInvalidoVOutro(true);
                                }
                            }}
                            value={vOutro || ""}
                            type="text"
                            name="vOutro"
                            maxLength={15}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVOutro
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vNF"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Total da Nota Fiscal <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value.replace(",", ".");
                                const regex = /^\d+(\.\d{0,2})?$/;
                                if (value === "" || regex.test(value)) {
                                    setVNF(value);
                                    setIsInvalidoVNF(false);
                                } else {
                                    setIsInvalidoVNF(true);
                                }
                            }}
                            value={vNF || ""}
                            type="text"
                            name="vNF"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVNF
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>
                </div>
            )}

            {secaoAtiva === "transporte" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
                        <label
                            htmlFor="transpModFrete"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Modalidade de Frete <span className="text-red-600">*</span>
                        </label>
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                setTranspModFrete(value);
                                setIsInvalidoTranspModFrete(false);
                            }}
                            value={transpModFrete || ""}
                            name="transpModFrete"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 text-sm focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspModFrete ? "outline-red-500 focus:outline-red-500" : ""
                                }`}
                        >
                            <option value="" disabled>Selecione a modalidade de frete</option>
                            <option value="0">0 - Contratação do Frete por conta do Remetente (CIF)</option>
                            <option value="1">1 - Contratação do Frete por conta do destinatário/remetente (FOB)</option>
                            <option value="2">2 - Contratação do frete por conta de terceiros</option>
                            <option value="3">3 - Transporte próprio por conta do remetente</option>
                            <option value="4">4 - Transporte próprio por conta do destinatário</option>
                            <option value="9">9 - Sem Ocorrência de transporte</option>
                        </select>
                    </div>
                    <hr className="w-full my-4 border-t border-neutral-200" />

                    {/* Endereço */}
                    <div className='w-full flex flex-col mt-5 mb-7'>
                        <h3 className='text-neutral-800 text-lg font-semibold'>Endereço</h3>
                        <div className='w-full flex flex-wrap mt-5'>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpCEP"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    CEP <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const regex = /^[0-9]*$/;
                                            if (value === "" || regex.test(value)) {
                                                setTranspCEP(value);
                                                setIsInvalidoTranspCEP(false);
                                            } else {
                                                setIsInvalidoTranspCEP(true);
                                            }
                                        }}
                                        value={transpCEP || ""}
                                        type="text"
                                        name="transpCEP"
                                        maxLength={8}
                                        required
                                        className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspCEP
                                            ? "outline-red-500 focus:outline-red-500"
                                            : ""
                                            }`} 
                                    />
                                    <button
                                        onClick={() => buscarCEP(transpCEP)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                                    >
                                        <SearchIcon fontSize='20px' />
                                    </button>
                                </div>
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpXLgr"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Logradouro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspXLgr(value);
                                            setIsInvalidoTranspXLgr(false);
                                        } else {
                                            setIsInvalidoTranspXLgr(true);
                                        }
                                    }}
                                    value={transpXLgr || ""}
                                    type="text"
                                    name="transpXLgr"
                                    maxLength={60}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspXLgr
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpXBairro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Bairro <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspXBairro(value);
                                            setIsInvalidoTranspXBairro(false);
                                        } else {
                                            setIsInvalidoTranspXBairro(true);
                                        }
                                    }}
                                    value={transpXBairro || ""}
                                    type="text"
                                    name="transpXBairro"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspXBairro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpNro"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Número <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspNro(value);
                                            setIsInvalidoTranspNro(false);
                                        } else {
                                            setIsInvalidoTranspNro(true);
                                        }
                                    }}
                                    value={transpNro || ""}
                                    type="text"
                                    name="transpNro"
                                    maxLength={10}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspNro
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpXMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Nome do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspXMun(value);
                                            setIsInvalidoTranspXMun(false);
                                        } else {
                                            setIsInvalidoTranspXMun(true);
                                        }
                                    }}
                                    value={transpXMun || ""}
                                    type="text"
                                    name="transpXMun"
                                    maxLength={60}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspXMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>

                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpCMun"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    Código do Município <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[0-9]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspCMun(value);
                                            setIsInvalidoTranspCMun(false);
                                        } else {
                                            setIsInvalidoTranspCMun(true);
                                        }
                                    }}
                                    value={transpCMun || ""}
                                    type="text"
                                    name="transpCMun"
                                    maxLength={7}
                                    required
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspCMun
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>
                            
                            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
                                <label
                                    htmlFor="transpUF"
                                    className="block font-medium text-sm text-neutral-700"
                                >
                                    UF <span className="text-red-600">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const regex = /^[a-zA-Z\s]*$/;
                                        if (value === "" || regex.test(value)) {
                                            setTranspUF(value);
                                            setIsInvalidoTranspUF(false);
                                        } else {
                                            setIsInvalidoTranspUF(true);
                                        }
                                    }}
                                    value={transpUF || ""}
                                    type="text"
                                    name="transpUF"
                                    maxLength={2}
                                    className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTranspUF
                                        ? "outline-red-500 focus:outline-red-500"
                                        : ""
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {secaoAtiva === "infoAdicionais" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                </div>
            )}

            {secaoAtiva === "pagamento" && (
                <div className="flex flex-wrap transition-transform duration-500 ease-in">
                    <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                        <label
                            htmlFor="tPag"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Forma de Pagamento <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[a-zA-Z\s]*$/;
                                if (value === "" || regex.test(value)) {
                                    setTPag(value);
                                    setIsInvalidoTPag(false);
                                } else {
                                    setIsInvalidoTPag(true);
                                }
                            }}
                            value={tPag || ""}
                            type="text"
                            name="tPag"
                            maxLength={15}
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTPag
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>

                    <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                        <label
                            htmlFor="vPag"
                            className="block font-medium text-sm text-neutral-700"
                        >
                            Valor Pago <span className="text-red-600">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[0-9]*$/;
                                if (value === "" || regex.test(value)) {
                                    setVPag(value);
                                    setIsInvalidoVPag(false);
                                } else {
                                    setIsInvalidoVPag(true);
                                }
                            }}
                            value={vPag || ""}
                            type="number"
                            name="vPag"
                            maxLength={15}
                            placeholder="0.00"
                            required
                            className={`rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoVPag
                                ? "outline-red-500 focus:outline-red-500"
                                : ""
                                }`}
                        />
                    </div>
                </div>
            )}
        </div>
        <div className="w-60 flex justify-start gap-3 my-9 px-4">
            <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
        </div>
        {statusRequest === true && (
            <SuccessNotification message="Nota fiscal criada com sucesso!" />
        )}
        {statusRequest === false && (
            <ErrorNotification message="Não foi possível criar a nota fiscal!" />
        )}
    </>)
}
