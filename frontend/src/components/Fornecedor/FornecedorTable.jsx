'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FornecedorRow from './FornecedorRow';
import { FornecedorMenuMoreResponsive } from './Actions/FornecedorMenuMoreResponsive';

const FornecedorTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [fornecedor, setFornecedor] = useState([]);

    useEffect(() => {
        const fetchFornecedor = async () => {
            try {
                const response = await axios.get("https://pos-backend-six.vercel.app/api/fornecedores/get");
                if (response.data && Array.isArray(response.data.fornecedores)) {
                    const restructuredData = response.data.fornecedores.map((fornecedor) => {
                        return {
                            codigo: fornecedor.for_codigo,
                            nome: fornecedor.for_nome,
                            cnpj: fornecedor.for_cnpj,
                            contato: fornecedor.for_contato,
                            endereco: fornecedor.for_endereco,
                        };
                    });
                    setFornecedor(restructuredData);
                    setTotalPages(Math.ceil(restructuredData.length / rowsPerPage));
                } else {
                    setFornecedor([]);
                    setTotalPages(1);
                }
            } catch (error) {
                setFornecedor([]);
                setTotalPages(1);
            }
        };

        fetchFornecedor();
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

    const paginatedFornecedor = fornecedor.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setTotalPages(Math.ceil(fornecedor.length / newRowsPerPage));
        handlePageChange(1);
    };
    return (
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <FornecedorMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-2 md:py-5 text-sm text-start font-semibold text-neutral-800 dark:text-slate-50">Nome</th>
                        <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">CNPJ</th>
                        <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Contato</th>
                        <th className="px-4 py-4 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Endereço</th>
                        <th className="pr-6 pl-4 py-2 md:py-5"></th>
                    </tr>
                </thead>
                <tbody>
                    <FornecedorRow fornecedores={paginatedFornecedor} />
                </tbody>
            </table>
        </div>
    );
};

export default FornecedorTable;