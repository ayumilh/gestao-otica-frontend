'use client'
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useUserToken } from '@/utils/useUserToken';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VendasSelectFilter from './VendasSelectFilter';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


export const VendasMenuMoreResponsive = ({ currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange, onVendas }) => {
    const theme = useTheme();
    const { token } = useUserToken();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [vendas, setVendas] = useState([]);

    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchVendasIniciais = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/listar`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const vendasData = response.data?.vendas || [];
    
                const formatarMoeda = (valor) => {
                    if (valor === null || valor === undefined) return '';
                    return Number(valor).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2
                    }).replace('R$', '').trim();
                };
    
                const vendasFormatadas = vendasData.map((venda) => ({
                    ...venda,
                    preco: formatarMoeda(venda.preco),
                    sinal: formatarMoeda(venda.sinal),
                    a_pagar: formatarMoeda(venda.a_pagar),
                }));
    
                setVendas(vendasFormatadas);
            } catch (error) {
                console.error('Erro ao buscar vendas iniciais:', error);
            }
        };
    
        fetchVendasIniciais();
    }, []);

    
    useEffect(() => {
        onVendas(vendas);
    }, [onVendas, vendas]);

    const menuMoreVertRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuMoreVertRef.current && !menuMoreVertRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuMoreVertRef])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMobileFilter(false);
            }
        }

        if (showMobileFilter) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileFilter]);


    return (
        <div className="border-l-indigo-200 w-full flex justify-start pl-4 pt-5 pb-2 gap-3 sticky top-0 left-0 z-40" ref={menuMoreVertRef}>
            {isMobile ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowMobileFilter((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {showMobileFilter ? (
                            <CloseIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                        ) : (
                            <SearchIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                        )}
                    </button>

                    {showMobileFilter && (
                        <div className="absolute top-10 left-0 w-[90vw] dark:bg-primaria-800 p-3 z-50">
                            <VendasSelectFilter onVendas={setVendas} />
                        </div>
                    )}
                </div>
            ) : (<>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        {/* <input type="checkbox" name="" id="" className="dark:color-primaria-800" /> */}
                        <VendasSelectFilter onVendas={setVendas} />
                    </div>
                    {/* <FilterAltOutlinedIcon className="w-6 h-6 text-segundaria-800" /> */}
                </div>
            </>)}

            <div className="flex items-center flex-col md:flex-row gap-2 ml-auto mr-4">
                <div>
                    <label htmlFor="rowsPerPage" className="text-sm mr-1">Linhas por página:</label>
                    <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} className="py-1 rounded bg-transparent">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className='w-full md:w-auto text-end'>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pr-2 py-1 rounded">
                        <KeyboardArrowLeftIcon className={currentPage === 1 ? "opacity-50" : ""} />
                    </button>
                    <span>{currentPage} de {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pl-2 py-1 rounded">
                        <KeyboardArrowRightIcon className={currentPage === totalPages ? "opacity-50" : ""} />
                    </button>
                </div>
            </div>
        </div>
    )
}
