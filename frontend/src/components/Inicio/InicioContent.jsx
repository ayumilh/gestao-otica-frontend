'use client'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import NavbarMobile from '../Navbar/Mobile/NavbarMobile'
import LaunchIcon from '@mui/icons-material/Launch';
import { FaUser, FaList } from 'react-icons/fa'
import BtnAtivado from '../Ui/Button/BtnAtivado';
import TitlePage from '../Ui/TitlePage';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { useUserToken } from '@/utils/useUserToken';
import ResumoCards from './ResumoCards';


const InicioContent = () => {
    const { currentUser } = useContext(AuthContext);
    const { token } = useUserToken();

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
    const router = useRouter();
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setClientes(res.data.clientes || []);
            } catch (err) {
                console.error('Erro ao buscar clientes:', err);
            }
        };

        fetchClientes();
    }, [token]);

    const [resumo, setResumo] = useState({
        totalVendas: 0,
        totalRecebido: 0,
        totalAPagar: 0,
        aguardandoEntrega: 0,
        pagasTotais: 0,
        canceladas: 0
    });

    useEffect(() => {
        const fetchLucros = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResumo(response.data.resumo || {});
            } catch (error) {
                console.error("Erro ao buscar lucros:", error);
            }
        };

        fetchLucros();
    }, [token]);


    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const buscarVendas = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVendas(res.data.vendas || []);
            } catch (err) {
                console.error("Erro ao buscar vendas:", err);
            }
        };
        buscarVendas();
    }, [token]);

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
                            <p className='text-neutral-700 font-semibold text-start'>{saudacao}, {currentUser?.nome}</p>
                        </div>

                        {/* <ResumoCards resumo={resumo} /> */}


                        <div className='flex flex-col xl:flex-row gap-5'>
                            {/* clientes */}
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 border dark:border-2 dark:border-black/10 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3">
                                        <div className="flex justify-center items-center bg-amber-400 text-white rounded-full p-2">
                                            <FaUser className="text-white h-3 w-3" />
                                        </div>
                                        <span className='font-bold text-lg text-amber-400'>Clientes</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p onClick={() => router.push('/clientes')} className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/clientes">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                        {/* <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button> */}
                                        {/* <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button> */}
                                    </div>
                                    {/* <DropdownFilterWeek /> */}
                                </div>
                                {clientes.length === 0 ? (
                                    <div className='w-full flex flex-col items-center justify-center gap-5'>
                                        <span className='text-center text-sm font-medium '>
                                            Você não possui clientes cadastrados.
                                        </span>
                                        <BtnAtivado title='Novo cliente' onClick="/clientes" page="/clientes/criar" size="sm" rounded="md" />
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 dark:scrollbar-thumb-orange-400'>
                                        {clientes.slice(0, 5).map((cliente) => (
                                            <div
                                                key={cliente.id}
                                                className='flex justify-between items-center border-b border-gray-200 dark:border-black/20 px-4 py-3 hover:bg-gray-100 dark:hover:bg-black/20 transition duration-200 ease-in-out cursor-pointer'
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
                            <div className='bg-bg dark:bg-dark-primaria-800 w-full xl:w-1/2 flex flex-col h-full rounded-xl px-5 py-7 border dark:border-2 dark:border-black/10 shadow-md'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex gap-3">
                                        <div className="flex justify-center items-center bg-blue-500 text-white rounded-full p-2">
                                            <FaList className="text-white h-3 w-3" />
                                        </div>
                                        <span className='font-bold text-lg text-blue-500'>Vendas</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <p onClick={() => router.push('/vendas')} className='flex items-center justify-center gap-1 cursor-pointer'>
                                            <span><a className='font-light text-sm text-blue-500 hover:underline' href="/vendas">Ver mais</a></span>
                                            <LaunchIcon className='text-blue-500 w-4 h-4' />
                                        </p>
                                    </div>
                                </div>

                                <hr className='mb-5 mt-3' />

                                <div className='flex justify-between mb-5'>
                                    <div className='flex'>
                                        {/* <button className='text-neutral-700 font-medium text-sm'>Filtrar por:</button> */}
                                        {/* <button className='border border-orange-500 bg-orange-200 bg-opacity-30 rounded-l-full text-orange-500 font-medium text-sm px-3 py-1'>Grafico</button> */}
                                        {/* <button className='border border-gray-300 rounded-r-full text-neutral-500 font-medium text-sm px-3 py-1'>Lista</button> */}
                                    </div>
                                    {/* <DropdownFilterWeek /> */}
                                </div>
                                {vendas.length === 0 ? (
                                    <div className='w-full flex flex-col items-center justify-center gap-5'>
                                        <span className='text-center text-sm font-medium '>
                                            Você não possui vendas.
                                        </span>
                                        <BtnAtivado title='Criar venda' onClick="/vendas/criar" page="/vendas/criar" size="sm" rounded="md" />
                                    </div>
                                ) : (
                                    <div className='w-full flex flex-col h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 dark:scrollbar-thumb-orange-400 pr-2'>
                                        {vendas.slice(0, 5).map((venda) => (
                                            <div
                                                key={venda.id}
                                                className='flex justify-between items-center border-b border-gray-200 dark:border-black/20 px-4 py-3 hover:bg-gray-100 dark:hover:bg-black/20 transition duration-200 ease-in-out cursor-pointer'
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InicioContent