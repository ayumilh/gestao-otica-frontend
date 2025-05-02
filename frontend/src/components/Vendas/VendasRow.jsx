'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Ui/SkeletonTableRow";

export default function VendasRow({ vendas }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    useEffect(() => {
        if (vendas && vendas.length > 0) {
            setIsLoading(false);
        }
    }, [vendas]);

    const handleButtonClick = (clienteId, vendaId) => {
        try {
            router.push(`/vendas/editar?vendaId=${vendaId}&clienteId=${clienteId}`);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    return (<>
        {isLoading ? (
            <SkeletonLoader numColumns={11} />
        ) : vendas.length > 0 ? (
            vendas.map((venda, index) => (
                <tr key={index} onClick={() => handleButtonClick(venda.clienteId, venda.id)} className="cursor-pointer border-t border-zinc-100 hover:bg-gray-200 dark:bg-primaria-900 dark:hover:bg-primaria-800 dark:border-black/10">
                    <td className="px-4 py-4 md:py-5 text-end whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.id}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50 font-semibold">{venda.cliente?.nome}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.lentes}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.armacao}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-end whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.preco}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.sinal}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.a_pagar}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-end whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{new Date(venda.data).toLocaleDateString('pt-BR')}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-800 dark:text-slate-50">
                            {venda.entrega
                                ? new Date(venda.entrega).toLocaleDateString('pt-BR')
                                : 'Não definido'}
                        </div>
                    </td>
                    {/* <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{venda.obs}</div>
                    </td> */}
                    {/* <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <button
                            onClick={() => handleButtonClick(venda.cpf)}
                            className="text-neutral-700 hover:text-neutral-900 dark:text-slate-200 dark:hover:text-slate-50 transition ease-in flex items-center justify-center"
                        >
                            <ModeEditOutlineIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
                        </button>
                    </td> */}
                </tr>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="11">
                    <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
                        <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};