'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ModalEditarProduto from "@/components/Produtos/Editar/ModalEditarProduto"
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Ui/SkeletonTableRow"

export default function LucrosRow({ lucrosData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (lucrosData.length > 0) {
            setIsLoading(false);
        }
    }, [lucrosData]);

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    const handleButtonClick = (lucros) => {
        try {
            Cookies.set('selectedLucros', lucros);
            router.push('/luros/editar');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    return (<>
        {isLoading ? (
            <SkeletonLoader numColumns={6} />
        ) : lucrosData.length > 0 ? (
            lucrosData.map((lucros, index) => (
                <tr key={index} className="cursor-pointer border-t border-zinc-100 hover:bg-gray-200 dark:bg-primaria-900 dark:hover:bg-primaria-800 dark:border-b dark:border-zinc-800">
                    <td className="pr-4 pl-6 py-4 md:py-5 text-end whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{lucros.id}</div>
                    </td>
                    <td className="px-4 py-2 md:py-5 text-sm text-start whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="text-sm font-medium text-center text-neutral-800 dark:text-slate-50">{lucros.cliente}</div>
                        </div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{lucros.valor}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-start whitespace-nowrap">
                        <div className="text-sm text-neutral-800 dark:text-slate-50">{lucros.data}</div>
                    </td>
                    <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
                        <button
                            onClick={() => handleButtonClick(lucros.id)}
                            className="text-neutral-700 hover:text-neutral-900 dark:text-slate-200 dark:hover:text-slate-50 transition ease-in flex items-center justify-center"
                        >
                            <ModeEditOutlineIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
                        </button>
                        <ModalEditarProduto isOpen={isOpen} onToggle={toggleDrawer} />
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