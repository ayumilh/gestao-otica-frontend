'use client'
import { useState, useEffect } from 'react';
import ClientesRow from './ClientesRow';
import { ClientesMenuMoreResponsive } from './Actions/ClientesMenuMoreResponsive';
import ExportarTabelaButton from '@/utils/ExportarTabelaButton';

const ClientesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [clientes, setClientes] = useState([]);

    const handleClientesUpdate = (newClientes) => {
        setClientes(newClientes);
        setTotalPages(Math.ceil(newClientes.length / rowsPerPage));
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

    const paginatedClientes = clientes.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setTotalPages(Math.ceil(clientes.length / newRowsPerPage));
        handlePageChange(1);
    };

    return (
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border-2 dark:border-black/10 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <ClientesMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                onClientes={handleClientesUpdate}
            />

            <div className="flex justify-between items-center px-2 py-2">
                <ExportarTabelaButton dados={clientes} tipo="clientes" cor="orange" />
            </div>
            
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-3 md:py-4 text-sm text-end font-semibold text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Nome</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">CPF</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Telefone</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    <ClientesRow clientes={paginatedClientes} />
                </tbody>
            </table>

        </div>
    );
};

export default ClientesTable;