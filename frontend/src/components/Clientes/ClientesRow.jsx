'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import ModalEditarClientes from './Editar/ModalEditarClientes';

export default function ClientesRow({ clientes }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    useEffect(() => {
        if (clientes.length > 0) {
            setIsLoading(false);
        }
    }, [clientes]);


    const handleButtonClick = (cliente) => {
        try {
            Cookies.set('selectedCliente', cliente);
            router.push('/clientes/editar');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    return (<>
        {isLoading ? (
            <SkeletonLoader numColumns={6} />
        ) : clientes.length > 0 ? (
            clientes.map((cliente, index) => (
                <tr key={index} className="cursor-pointer border-t border-zinc-100 hover:bg-gray-200 dark:bg-primaria-900 dark:hover:bg-primaria-800 dark:border-zinc-800">
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{cliente.codigo}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-800 dark:text-slate-50">{cliente.nome}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{cliente.celular}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{cliente.endereco}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{cliente.bairro}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <button
                            onClick={() => handleButtonClick(cliente.codigo)}
                            className="text-neutral-700 hover:text-neutral-900 dark:text-slate-200 dark:hover:text-slate-50 transition ease-in flex items-center justify-center"
                        >
                            <ModeEditOutlineIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
                        </button>
                        <ModalEditarClientes isOpen={isOpen} onToggle={toggleDrawer} />
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="6">
                    <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
                        <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};