'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import LucrosRow from './LucrosRow';
import { LucrosMenuMoreResponsive } from './Actions/LucrosMenuMoreResponsive';
import { searchUserId } from '@/utils/searchUserId';

const LucrosTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [Lucros, setLucros] = useState([]);

    useEffect(() => {
        const fetchLucros = async () => {
            const token = await searchUserId();
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lucros/listar`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data && Array.isArray(response.data)) {
                    const restructuredData = response.data.map((lucros) => {
                        return {
                            id: lucros.id,
                            data: lucros.data,
                            cliente: lucros.cliente,
                            valor: lucros.valor,
                        };
                    });
                    setLucros(restructuredData);
                    setTotalPages(Math.ceil(restructuredData.length / rowsPerPage));
                } else {
                    setLucros([]);
                    setTotalPages(1);
                }
            } catch (error) {
                setLucros([]);
                setTotalPages(1);
            }
        };

        fetchLucros();
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

    const paginatedLucros = Lucros.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setTotalPages(Math.ceil(Lucros.length / newRowsPerPage));
        handlePageChange(1);
    };
    return (
        <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <LucrosMenuMoreResponsive
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
            <table className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="pr-4 pl-6 py-2 md:py-5 text-sm text-end font-semibold text-neutral-800 dark:text-slate-50">Código</th>
                        <th className="px-4 py-2 md:py-5 text-sm text-start font-semibold text-neutral-800 dark:text-slate-50">Cliente</th>
                        <th className="px-4 py-2 md:py-5 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Valor</th>
                        <th className="px-4 py-2 md:py-5 text-sm font-semibold text-start text-neutral-800 dark:text-slate-50">Data</th>
                        <th className="pr-6 pl-4 py-2 md:py-5"></th>
                    </tr>
                </thead>
                <tbody>
                    <LucrosRow lucrosData={paginatedLucros} />
                </tbody>
            </table>
        </div>
    );
};

export default LucrosTable;