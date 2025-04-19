'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarMobile from '../Navbar/Mobile/NavbarMobile'
import LaunchIcon from '@mui/icons-material/Launch';
import { FaUser, FaList, FaBox, FaFileInvoice } from 'react-icons/fa'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BtnAtivado from '../Geral/Button/BtnAtivado';
import TitlePage from '../Geral/TitlePage';
import DropdownFilterWeek from '../Geral/Dropdown/DropdownFilterWeek';
import DropdownMore from '../Geral/Dropdown/DropdownMore';

const InicioContent = () => {
    const getSaudacao = () => {
        const hora = new Date().getHours();
        if (hora < 12) {
            return "Bom dia";
        } else if (hora < 18) {
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    };
    const saudacao = getSaudacao();

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar`);
                setClientes(res.data.clientes || []);
            } catch (err) {
                console.error('Erro ao buscar clientes:', err);
            }
        };

        fetchClientes();
    }, []);


    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const buscarVendas = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`);
                setVendas(res.data.vendas || []);
            } catch (err) {
                console.error("Erro ao buscar vendas:", err);
            }
        };
        buscarVendas();
    }, []);

    return (
        <div className='w-full mt-4 lg:mt-6 lg:px-8 px-5'>
            <div className="w-full px-4 pb-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-auto flex justify-between items-center h-12 pt-5">
                <div className='w-full flex items-center justify-between mx-auto mb-4'>
                    <div className="flex items-center">
                        <NavbarMobile />
                        <TitlePage title='Home' />
                    </div>
                </div>
            </div>
            <div className='mx-auto w-full 2xl:max-w-screen-xl flex flex-col items-center gap-4 justify-center pb-10'>
                <div className='w-full flex flex-col justify-between gap-10'>
                    <div className='w-full flex flex-col xl:flex-col gap-5'>
                        <div className='w-full flex'>
                            <p className='text-neutral-700 font-semibold text-start'>{saudacao}, User</p>
                        </div>
                        <div className='flex flex-col xl:flex-row gap-5'>
                            {/* clientes */}
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3">
                                        <div className="flex justify-center items-center bg-amber-400 text-white rounded-full p-2">
                                            <FaUser className="text-white h-3 w-3" />
                                        </div>
                                        <span className='font-bold text-lg text-amber-400'>Clientes</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/clientes">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                        <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button>
                                        <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button>
                                    </div>
                                    <DropdownFilterWeek />
                                </div>
                                {clientes.length === 0 ? (
                                    <div className='w-full flex flex-col items-center justify-center gap-5'>
                                        <span className='text-center text-sm font-medium '>
                                            Você não possui clientes cadastrados.
                                        </span>
                                        <BtnAtivado title='Novo cliente' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col gap-3'>
                                        {clientes.slice(0, 5).map((cliente) => (
                                            <div
                                                key={cliente.id}
                                                className='flex justify-between items-center border-b border-gray-200 px-4 py-3'
                                            >
                                                <div className='flex flex-col'>
                                                    <span className='font-semibold text-sm text-neutral-800 dark:text-white'>{cliente.nome}</span>
                                                    <span className='text-xs text-neutral-500 dark:text-neutral-300'>Tel: {cliente.telefone || '—'}</span>
                                                </div>
                                                {/* <a
                                                    href={`/clientes/${cliente.id}`} 
                                                    className='text-blue-500 text-xs font-medium hover:underline'
                                                >
                                                    Ver
                                                </a> */}
                                            </div>

                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* vendas */}
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3">
                                        <div className="flex justify-center items-center bg-blue-500 text-white rounded-full p-2">
                                            <FaList className="text-white h-3 w-3" />
                                        </div>
                                        <span className='font-bold text-lg text-blue-500'>Vendas</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/vendas">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                        <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button>
                                        <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button>
                                    </div>
                                    <DropdownFilterWeek />
                                </div>
                                {vendas.length === 0 ? (
                                    <div className='w-full flex flex-col items-center justify-center gap-5'>
                                        <span className='text-center text-sm font-medium '>
                                            Você não possui vendas.
                                        </span>
                                        <BtnAtivado title='Criar venda' onClick="/vendas/criar" page="/vendas/criar" size="sm" rounded="md" />
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col gap-3'>
                                        {vendas.slice(0, 5).map((venda) => (
                                            <div
                                                key={venda.id}
                                                className='flex justify-between items-center border-b border-gray-200 px-4 py-3'
                                            >
                                                <div className='flex flex-col'>
                                                    <span className='font-semibold text-sm text-neutral-800 dark:text-white'>
                                                        {venda.cliente?.nome || "Cliente desconhecido"}
                                                    </span>
                                                    <span className='text-xs text-neutral-500 dark:text-neutral-300'>
                                                        {new Date(venda.data).toLocaleDateString('pt-BR')} – R$ {parseFloat(venda.preco).toFixed(2)}
                                                    </span>
                                                </div>
                                                {/* <a href={`/vendas/${venda.id}`} className='text-blue-500 text-xs font-medium hover:underline'>Ver</a> */}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div className='flex flex-col xl:flex-row gap-5'>
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3">
                                        <div className="flex justify-center items-center bg-blue-400 text-white rounded-full p-2">
                                            <FaBox className="text-white h-3 w-3" />
                                        </div>
                                        <span className='font-bold text-lg text-blue-500'>Produtos</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/clientes">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button>
                                        <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button>
                                    </div>
                                    <DropdownFilterWeek />
                                </div>
                                <div className='w-full flex flex-col items-center justify-center gap-5'>
                                    <span className='text-center text-sm font-medium '>
                                        Você não possui produtos cadastrados.
                                    </span>
                                    <BtnAtivado title='Novo produto' onClick="/produtos" page="/produtos/criar" size="sm" rounded="md" />
                                </div>
                            </div>
                            
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3 items-start">
                                        <div className="flex justify-center items-center bg-red-400 text-white rounded-full p-2">
                                            <FaFileInvoice className="text-white h-3 w-3" />
                                        </div>
                                        <span className='w-32 font-bold text-lg text-red-400'>Notas fiscais</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/clientes">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button>
                                        <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button>
                                        <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button>
                                    </div>
                                    <DropdownFilterWeek />
                                </div>
                                <div className='w-full flex flex-col items-center justify-center gap-5'>
                                    <span className='text-center text-sm font-medium '>
                                        Você não possui emissões de nota fiscais.
                                    </span>
                                    <BtnAtivado title='Criar NF' onClick="/nf" page="/nf/criar" size="sm" rounded="md" />
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <hr className='w-full' />


                    {/* CONTA */}

                    <div className='w-full flex flex-col xl:flex-row gap-7'>
                                                {/* contas a receber */}
                                                <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                            <div className='flex justify-between items-center'>
                                <p className='text-neutral-700 font-semibold pt-2 text-start'>Valor recebido</p>
                                <div className='flex gap-2'>
                                    <HelpOutlineIcon className='text-neutral-700 dark:text-gray-200 w-6 h-6' />
                                    <DropdownMore />
                                </div>
                            </div>

                            <div className='w-36 bg-green-100 px-4 py-3 rounded-lg mt-2'>
                                <span className='block font-medium text-green-600 dark:text-green-600'>R$ 0,00</span>
                                <span className='text-xs font-medium text dark:text-neutral-800'>Vencendo hoje</span>
                            </div>

                            <hr className='my-5' />

                            <div className='flex justify-between mb-5'>
                                <div className='flex'>
                                    {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                    <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Abertas</button>
                                    <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Atrasadas</button>
                                </div>
                                <DropdownFilterWeek />
                            </div>
                            <div className='w-full flex flex-col items-center justify-center gap-5'>
                                <span className='text-center text-sm font-medium '>
                                    Você não possui recebimentos em aberto <br /> nos próximos 3 dias.
                                </span>
                                <BtnAtivado title='Criar Recebimento' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
                            </div>
                        </div>
                        
                        {/* contas a pagar */}
                        <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 ring-1 ring-gray-100 dark:ring-1 dark:ring-black ring-opacity-5 shadow-md'>
                            <div className='flex justify-between items-center'>
                                <p className='text-neutral-700 font-semibold pt-2 text-start'>A receber</p>
                                <div className='flex gap-2'>
                                    <HelpOutlineIcon className='text-neutral-700 dark:text-gray-200 w-6 h-6' />
                                    <DropdownMore />
                                </div>
                            </div>

                            <div className='w-36 bg-yellow-100 px-4 py-3 rounded-lg mt-2'>
                                <span className='block font-medium text-yellow-600 dark:text-yellow-600'>R$ 0,00</span>
                                <span className='text-xs font-medium text dark:text-neutral-800'>Vencendo hoje</span>
                            </div>

                            <hr className='my-5' />

                            <div className='flex justify-between mb-5'>
                                <div className='flex'>
                                    {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                    <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Abertas</button>
                                    <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Atrasadas</button>
                                </div>
                                <DropdownFilterWeek />
                            </div>
                            <div className='w-full flex flex-col items-center justify-center gap-5'>
                                <span className='text-center text-sm font-medium '>
                                    Você não possui pagamentos em aberto <br /> no próximos 30 dias.
                                </span>
                                <BtnAtivado title='Criar Pagamento' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default InicioContent