'use client'
import { useEffect, useState } from 'react';
import VendasRow from './VendasRow';
import { VendasMenuMoreResponsive } from './Actions/VendasMenuMoreResponsive';
import ExportarTabelaButton from '@/utils/ExportarTabelaButton';

const VendasTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [vendas, setVendas] = useState([]);

    const handleVendasUpdate = (newVendas) => {
        setVendas(newVendas);
        setTotalPages(Math.ceil(newVendas.length / rowsPerPage));
    };

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const paginatedVendas = vendas.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setTotalPages(Math.ceil(vendas.length / newRowsPerPage));
        handlePageChange(1);
    };


    return (
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border-2 dark:border-black/10 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <VendasMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                onVendas={handleVendasUpdate}
            />
            <div className="flex justify-between items-center px-2 py-2">
                <ExportarTabelaButton dados={vendas} tipo="vendas" cor="orange" />
            </div>
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-3 md:py-4 text-sm font-semibold text-end text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Cliente</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Lentes</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Armação</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-end text-neutral-800 dark:text-slate-50">Preço</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Sinal</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">A_Pagar</th>
                        <th className="pr-4 pl-6 py-3 md:py-4 text-sm font-semibold text-end text-neutral-800 dark:text-slate-50">Data</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    <VendasRow vendas={paginatedVendas} />
                </tbody>
            </table>
        </div>
    );
};

export default VendasTable;