"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAdd, MdHome } from "react-icons/md";
import { tv } from "tailwind-variants";
import CircularProgress from '@mui/material/CircularProgress';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const button = tv({
    base: 'flex items-center justify-center gap-1 bg-orange-400 h-10 hover:bg-segundaria-900 shadow-primaria rounded-3xl px-4 py-2 transition duration-200 ease-in-out',
    variants: {
        width: {
            full: 'w-full',
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
        },
        padding: {
            sm: 'px-2 py-1',
            lg: 'px-6 py-3',
            xl: 'px-8 py-3',
        }
    },
});

const span = tv({
    base: 'text-white text-sm',
    variants: {
        size: {
            sm: 'text-sm',
            base: 'text-base',
        },
    },
});

export default function BtnAtivado({ title, onClick, page, size, rounded, padding, width }) {
    const router = useRouter();
    const [isLogging, setIsLogging] = useState(false);

    const handleClick = async () => {
        setIsLogging(true);
        if (typeof onClick === 'function') {
            await onClick();
        } else if (page) {
            router.push(page);
        }
        setIsLogging(false);
    }
    return (
        <button
            type="button"
            onClick={handleClick}
            className={button({ rounded: rounded, padding: padding, width: width })}
        >
            {isLogging ? (
                <><CircularProgress color="inherit" className="text-white mr-1" size={12} /></>
            ) : (<>
                {title === 'Novo cliente' || title === 'Criar venda' || title === 'Criar NF' || title === 'Criar pedido' || title === 'Novo lucro' || title === 'Nova venda' || title === 'Criar Pagamento' || title === 'Criar Recebimento' ? (
                    <span>
                        <MdAdd className='text-white w-4 h-4' />
                    </span>
                ) : title === 'Home' ? (
                    <span>
                        <MdHome className='text-white w-4 h-4' />
                    </span>
                ) : title === 'Frente de caixa' ? (
                    <span>
                        <PointOfSaleIcon className='text-white w-4 h-4' />
                    </span>
                ) : null}
                <span className={span({ size: size })}>{title}</span>
            </>
            )}

        </button>
    );
}
