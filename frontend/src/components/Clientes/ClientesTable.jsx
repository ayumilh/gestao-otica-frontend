'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ClientesRow from './ClientesRow';
import { ClientesMenuMoreResponsive } from './Actions/ClientesMenuMoreResponsive';

const ClientesTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get("https://pos-backend-six.vercel.app/api/clientes/get");
                if (response.data && Array.isArray(response.data.clientes)) {
                    const restructuredData = response.data.clientes.map((cliente) => {
                        return {
                            codigo: cliente.cli_codigo,
                            nome: cliente.cli_nome,
                            celular: cliente.cli_celular,
                            bairro: cliente.cli_bairro,
                            endereco: cliente.cli_endereco,
                        };
                    });
                    setClientes(restructuredData);
                    setTotalPages(Math.ceil(restructuredData.length / rowsPerPage));
                } else {
                    setClientes([]);
                    setTotalPages(1);
                }
            } catch (error) {
                setClientes([]);
                setTotalPages(1);
            }
        };

        fetchClientes();
    }, [rowsPerPage, currentPage]);

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
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <ClientesMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-3 md:py-4 text-sm font-semibold text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Nome</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Celular</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Endereço</th>
                        <th className="px-4 py-3 md:py-4 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Bairro</th>
                        <th className="pl-4 pr-6 py-3 md:py-4"></th>
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