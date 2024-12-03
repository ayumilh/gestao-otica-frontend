'use client'
import { useEffect, useState } from "react";
import Axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FaMoneyBill } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import SearchAdvancedModal from "./Actions/SearchAdvancedModal/SearchAdvancedModal";
import ErrorNotification from "../Geral/Notification/ErrorNotification";


export const PdvSessoes = ({ adicionarProduto }) => {
  const [cli_id, setCli_id] = useState();
  const [func_id, setFunc_id] = useState();
  const [caixa_id, setCaixa_id] = useState();
  const [ped_status, setPed_status] = useState();
  const [ped_total, setPed_total] = useState(null);
  const [ped_total_pago, setPed_total_pago] = useState('');
  const [ped_dinheiro, setPed_dinheiro] = useState('');
  const [ped_pix, setPed_pix] = useState('');
  const [ped_credito_aprazo, setPed_credito_aprazo] = useState('');
  const [ped_credito_avista, setPed_credito_avista] = useState('');
  const [ped_outro_pagamento, setPed_outro_pagamento] = useState('');
  const [ped_data_pagamento, setPed_data_pagamento] = useState(null);
  const [ped_observacoes, setPed_observacoes] = useState(null);
  const [ped_fiscal, setPed_fiscal] = useState(false);
  const [ped_desconto, setPed_desconto] = useState('');
  const [ped_consignado, setPed_consignado] = useState(false); 
  const [itens, setItens] = useState([]);

  const pedido = {
    cli_id,
    func_id,
    caixa_id,
    ped_status,
    ped_total,
    ped_total_pago,
    ped_dinheiro,
    ped_pix,
    ped_credito_aprazo,
    ped_credito_avista,
    ped_outro_pagamento,
    ped_data_pagamento,
    ped_observacoes,
    ped_fiscal,
    ped_desconto,
    ped_consignado,
    itens,
  }

  const [activeContent, setActiveContent] = useState('produto');
  const isActive = (contentName) => activeContent === contentName ? 'border-b-4 border-orange-400 text-orange-400' : 'text-neutral-400 hover:border-b-4 hover:border-segundaria-900';

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showObservationInput, setShowObservationInput] = useState(false);
  const [showMoreclientInput, setShowMoreclientInput] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusRequest, setStatusRequest] = useState(false);

  const [codigoEAN, setCodigoEAN] = useState('');
  const [quantidade, setQuantidadeLocal] = useState(1);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const caixaCodigo = localStorage.getItem('caixa_codigo');
    if (caixaCodigo) {
      setCaixa_id(Number(caixaCodigo));
    }
  }, []);

  useEffect(() => {
    const getCliente = async () => {
      const cli_codigo = 16;
      try {
        const response = await Axios.get(`https://pos-backend-six.vercel.app/api/clientes/get-cli/${cli_codigo}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    getCliente()
  }, []);

  const handleCriarPedido = async () => {
    const pedidoNovo = {
      ...pedido,
      itens: produtos,
      cli_id: 40,
    }

    try{
      await Axios.post('https://pos-backend-six.vercel.app/api/pedido/criar', pedidoNovo)
    } catch (error) {
      setStatusRequest(true);
    }
  }

  async function buscarProdutoPorCodigo(codigoEAN) {
    try {
      let response;
      if (codigoEAN.length >= 1 && codigoEAN.length <= 10) {
        const pro_codigo = codigoEAN;
        response = await Axios.get(`https://pos-backend-six.vercel.app/api/produtos/get-pro/${pro_codigo}`);
      } else if (codigoEAN.length >= 11 && codigoEAN.length <= 13) {
        response = await Axios.get(`https://pos-backend-six.vercel.app/api/produtos/ean/${codigoEAN}`);
      } else {
        return null
      }
      const restruredProduct = {
        pro_id: response.data.produto.pro_id,
        preco_unitario: response.data.produto.preco,
      }
      return restruredProduct;
    } catch (error) {;
      return null;
    }
  }

  const inserirProduto = async () => {
    const produtoBuscado = await buscarProdutoPorCodigo(codigoEAN); 
    const novoProduto = {
      ...produtoBuscado,
      quantidade: quantidade,
      desconto: '0',
    };
    setProdutos((prevState) => [...prevState, novoProduto]);
    adicionarProduto(novoProduto);
  };

  const handleSearchClick = () => {
    buscarProdutoPorCodigo(codigoEAN);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const incrementarQuantidade = () => {
    const novaQuantidade = quantidade + 1;
    setQuantidadeLocal(novaQuantidade);
  };
  const decrementarQuantidade = () => {
    if (quantidade > 1) {
      const novaQuantidade = quantidade - 1;
      setQuantidadeLocal(novaQuantidade);
    }
  };


  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <div>            
        <div className="flex gap-5 mb-8">
          <button
            className={`flex items-center gap-1 border border-gray-100 rounded-lg font-semibold py-2 px-3 transition duration-300 ease-in-out ${isActive('produto')}`}
            onClick={() => setActiveContent('produto')}
          >
            <ShoppingCartIcon /> Produto
          </button>
          <button
            className={`flex items-center gap-1 border border-gray-100 rounded-lg font-semibold py-2 px-3 transition duration-300 ease-in-out ${isActive('cliente')}`}
            onClick={() => setActiveContent('cliente')}
          >
            <PersonIcon /> Cliente
          </button>


        </div>
        <div>
          {activeContent === 'produto' && (<>
            <div className="flex gap-5 items-center">
              <div className="relative w-full">
                <input
                  value={codigoEAN}
                  onChange={(e) => setCodigoEAN(e.target.value)}
                  type="text"
                  placeholder="Pesquisar por código"
                  className="w-full text-neutral-600 text-lg font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <SearchIcon className="text-orange-400 cursor-pointer" onClick={handleSearchClick}/>
                </span>
              </div>
              <div className="w-28">
                <button
                  onClick={decrementarQuantidade}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md focus:outline-none"
                >
                  -
                </button>
                <span className="text-lg font-medium mx-2">{quantidade}</span>
                <button
                  onClick={incrementarQuantidade}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <button onClick={openModal} className="mt-2 text-orange-400 underline">
                Pesquisa Avançada
              </button>
            </div>
            <div className="flex gap-5 mb-8">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={inserirProduto}
              >
                Inserir
              </button>
            </div>
            {isModalOpen && (
              <SearchAdvancedModal isOpen={isModalOpen} onClose={closeModal} />
            )}

            {/* <div>
              <button
                className="text-neutral-800 text-xl font-semibold py-2 flex items-center gap-1"
                onClick={() => setShowCommentInput(!showCommentInput)}
              >
                Anotação Interna<ArrowDropDownIcon />
              </button>
              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${showCommentInput ? 'max-h-56' : 'max-h-0'}`}
              >
                <textarea
                  onChange={(e) => setPed_observacoes(e.target.value)}
                  value={ped_observacoes || ''}
                  name="ped_observacoes"
                  placeholder="Comentário"
                  className="bg-gray-50 rounded-md w-full px-3 py-2 mb-6"
                ></textarea>
              </div>
            </div> */}

            {/* <div className="flex justify-between mb-6 pt-7">
              <div>
                <div className="bg-orange-400 pl-2 pr-5 xl:pr-10 py-1 rounded-t-lg">
                  <span className="font-medium text-white text-base xl:text-lg">Quantidade:</span>
                </div>
                <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-b-lg flex items-center justify-end">
                  <span className="text-xl font-sans text-neutral-800 font-medium">0</span>
                </div>
              </div>

              <div>
                <div className="bg-orange-400 pl-2 pr-5 xl:pr-10 py-1 rounded-t-lg">
                  <span className="font-medium text-white text-base xl:text-lg">Desconto:</span>
                </div>
                <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-b-lg flex items-center justify-end">
                  <span className="text-xl font-sans text-neutral-800 font-medium"> <span className="text-neutral-800 text-lg font-medium">% </span> 0,00</span>
                </div>
              </div>

              <div>
                <div className="bg-orange-400 pl-2 pr-5 xl:pr-10 py-1 rounded-t-lg">
                  <span className="font-medium text-white text-base xl:text-lg">Valor Unitário:</span>
                </div>
                <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-b-lg flex items-center justify-end">
                  <span className="text-xl font-sans text-neutral-800 font-medium">0</span>
                </div>
              </div>
            </div> */}

            <div className="w-full flex items-end mb-0">
              <div className="w-full px-3 py-2 rounded-md flex justify-end text-center">
                <span className="text-5xl font-sans text-neutral-800 font-medium"> <span className="font-medium text-xl text-end text-neutral-800">Total:</span> <span className="text-neutral-800 text-xl font-medium">R$ </span>{produtos.length > 0 ? (produtos[produtos.length - 1].quantidade * produtos[produtos.length - 1].preco_unitario).toFixed(2) : '0'}</span>
              </div>
            </div>
          </>)}
          {activeContent === 'cliente' && (<>
            {/* cli_id */}
            <div className="relative w-full mb-6">
              <label htmlFor="nome" className="font-medium text-neutral-700">Nome <span className="text-red-400">*</span></label>
              <input
                type="text"
                className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
              />
            </div>

            <div className="relative w-full mb-6">
              <label htmlFor="tipoCliente" className="font-medium text-neutral-700">Tipo de Cliente</label>
              <select
                id="tipoCliente"
                className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
              >
                <option value="">Selecione o tipo de cliente</option>
                <option value="individual">Física</option>
                <option value="empresa">Juridíca</option>
              </select>
            </div>

            <div className="relative w-full mb-6">
              <label htmlFor="cpf" className="font-medium text-neutral-700">CPF</label>
              <input
                type="text"
                className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
              />
            </div>

            <div className="relative w-full mb-6">
              <label htmlFor="cep" className="font-medium text-neutral-700">CEP</label>
              <input
                type="text"
                className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
              />
            </div>

            <div>
              <button
                className="text-neutral-800 text-xl  font-semibold py-2 flex items-center gap-1"
                onClick={() => setShowMoreclientInput(!showMoreclientInput)}
              >
                Mais informações<ArrowDropDownIcon />
              </button>
              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${showMoreclientInput ? 'max-h-56' : 'max-h-0'}`}
              >
                <div className="relative w-full mb-6">
                  <label htmlFor="endereco" className="font-medium text-neutral-700">Endereço</label>
                  <input
                    type="text"
                    className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                  />
                </div>
              </div>
            </div>

          </>)}
          {activeContent === 'pagamento' && (<div className="flex flex-col gap-10 transition-transform duration-1000 ease-in-out">
            {/* Totais */}
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold">Totais</h3>
              <div className="w-full flex gap-5 mt-3 px-2">
                <div className="w-2/6">
                  <span className="font-medium text-neutral-700">Total</span>
                  <div className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-end">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_total(value);
                        } else {
                          console.log(
                            "Valor inválido para Preço total."
                          );
                        }
                      }}
                      value={ped_total || ''}
                      required
                      type="text"
                      placeholder="0"
                      className="w-2/3 text-xl font-sans text-neutral-800 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>
                <div className="w-2/6">
                  <span className="font-medium text-neutral-700">Total pago</span>
                  <div className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-end">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_total_pago(value);
                        } else {
                          console.log(
                            "Valor inválido para Preço total pago."
                          );
                        }
                      }}
                      value={ped_total_pago || ''}
                      type="text"
                      placeholder="0"
                      className="w-2/3 text-xl font-sans text-neutral-800 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>

                <div className="w-2/6">
                  <span className="font-medium text-neutral-700">Desconto</span>
                  <div className="w-full border border-gray-200 px-3 py-2 rounded-md flex items-center justify-end">
                    <input 
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_desconto(value);
                        } else {
                          console.log(
                            "Valor inválido para Desconto."
                          );
                        }
                      }}
                      value={ped_desconto || ''}
                      type="text" 
                      placeholder="% 0"
                      className="w-2/3 text-xl font-sans text-neutral-800 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold">Formas de pagamento</h3>
              <div className="w-full flex gap-5 mt-3 px-2">

                <div className="w-3/12">
                  <span className="font-medium text-neutral-700">Dinheiro</span>
                  <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-center gap-1">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_dinheiro(value);
                        } else {
                          console.log(
                            "Valor inválido para Dinheiro."
                          );
                        }
                      }}
                      value={ped_dinheiro || ''}
                      type="text"
                      placeholder="0"
                      className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>

                <div className="w-3/12">
                  <span className="font-medium text-neutral-700">Cartão a prazo</span>
                  <div>
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_credito_aprazo(value);
                        } else {
                          console.log(
                            "Valor inválido para Crédito a prazo."
                          );
                        }
                      }}
                      type="text"
                      value={ped_credito_aprazo || ''}
                      placeholder="0"
                      className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>

                <div className="w-3/12">
                  <span className="font-medium text-neutral-700">Crédito a vista</span>
                  <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-center gap-1">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_credito_avista(value);
                        } else {
                          console.log(
                            "Valor inválido para Crédito a vista."
                          );
                        }
                      }}
                      value={ped_credito_avista || ''}
                      type="text"
                      name="ped_credito_avista"
                      placeholder="0"
                      className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>

                <div className="w-3/12">
                  <span className="font-medium text-neutral-700">Pix</span>
                  <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-center gap-1">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_pix(value);
                        } else {
                          console.log(
                            "Valor inválido para Pix."
                          );
                        }
                      }}
                      value={ped_pix || ''}
                      type="text"
                      name="ped_pix"
                      placeholder="0"
                      className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                    <FaPix className="text-segundaria-800 text-lg"/>
                  </div>
                </div>

                <div className="w-3/12">
                  <span className="font-medium text-neutral-700">Outro</span>
                  <div className="w-full h-14 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md flex items-center justify-center gap-1">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (regex.test(value.toString())) {
                          setPed_outro_pagamento(value);
                        } else {
                          console.log(
                            "Valor inválido para Outro pagamento."
                          );
                        }
                      }}
                      value={ped_outro_pagamento || ''}
                      type="text"
                      placeholder="0"
                      className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold">Informações adicionais</h3>
              {/* data de pagamento, inicialmente definida automaticamente */}
              <div className="relative w-full mb-6">
                <label htmlFor="data_pagamento" className="font-medium text-neutral-700">Data de pagamento</label>
                <input
                  onChange={(e) => setPed_data_pagamento(e.target.value)}
                  type="date"
                  value={ped_data_pagamento || ''}
                  className="w-full text-neutral-600 font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400"
                />
              </div>

              <div className="relative w-full mb-6">
                <label htmlFor="ped_fiscal" className="font-medium text-neutral-700">Pedido Fiscal</label>
                <input
                  name="ped_fiscal"
                  type="checkbox"
                  checked={ped_fiscal}
                  required
                  onChange={(e) => setPed_fiscal(e.target.checked)}
                  className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-orange-500"
                />
              </div>
              <div className="w-full flex flex-col mt-3 px-2">
                {/* status: Pendente, Pago, Cancelado */} 
                <div className="w-full flex gap-3 mb-4">
                  <label htmlFor="w-full">Status do Pedido:</label>
                  <select
                    onChange={(e) => setPed_status(e.target.value)}
                    name={ped_status}
                    required
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                  >
                    <option value="">Selecione um status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div className="w-full flex gap-3 mb-4">
                  <label
                    htmlFor="funcionario"
                    className="w-48 text-neutral-700 font-medium mb-1 flex justify-start items-center"
                  >
                    Funcionário
                  </label>
                  <select
                    onChange={(e) => setFunc_id(Number(e.target.value))}
                    name="func_id"
                    required  
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                  >
                    <option value="1">Luana</option>
                    <option value="2">Luigi</option>
                    <option value="3">Leila</option>
                  </select>
                </div>

                <div className="relative w-full mb-6">
                  <label htmlFor="ped_consignado" className="font-medium text-neutral-700">Consignado</label>
                  <input
                    name="ped_consignado"
                    type="checkbox"
                    checked={ped_consignado}
                    onChange={(e) => setPed_consignado(e.target.checked)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <button
                    className="text-neutral-800 text-xl font-semibold py-2 flex items-center gap-1"
                    onClick={() => setShowObservationInput(!showObservationInput)}
                  >
                    Anotar observações<ArrowDropDownIcon />
                  </button>
                  <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${showObservationInput ? 'max-h-56' : 'max-h-0'}`}
                  >
                    <textarea
                      onChange={(e) => setPed_observacoes(e.target.value)}
                      value={ped_observacoes || ''}
                      name="ped_observacoes"
                      placeholder="Comentário"
                      className="bg-gray-50 rounded-md w-full px-3 py-2 mb-6"
                    ></textarea>
                  </div>
                </div>
                
              </div>
            </div>
          </div>)}
        </div>

      </div>

      <hr className="w-full"/>

      <div className="w-full flex justify-end gap-4 mb-10">
        <button
          className="flex items-center gap-1 rounded-md text-white bg-orange-400 hover:bg-segundaria-900 active:scale-90 active:bg-segundaria-900 active:ring active:ring-orange-400 font-medium py-2 px-3 transition duration-500 ease-in-out"
          onClick={() => setActiveContent('pagamento')}
        >
          <ArrowForwardIosIcon fontSize="small" /> Forma de pagamento
        </button>

        <button
          className="flex items-center gap-1 rounded-md text-white bg-orange-400 hover:bg-segundaria-900 active:scale-90 active:bg-segundaria-900 active:ring active:ring-orange-400 font-medium py-2 px-3 transition duration-500 ease-in-out"
          onClick={handleCriarPedido}
        > 
          Finalizar venda
        </button>

      </div>
      {statusRequest && <ErrorNotification message="Erro ao finalizar venda!" />}
    </div>
  )
}
