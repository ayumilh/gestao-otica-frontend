import { useState, useEffect, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useUserToken } from '@/utils/useUserToken';
import { toast } from 'react-toastify';

const VendasSelectFilter = ({ onVendas }) => {
    const { token } = useUserToken();
    const [filtros, setFiltros] = useState({
        campo: 'nome',
        valor: '',
    });

    const formatarMoeda = (valor) => {
        if (valor === null || valor === undefined) return '';
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).replace('R$', '').trim();
    };

    const filterData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/filter`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: filtros
                },
            );
            if (response.data && Array.isArray(response.data.vendas)) {
                const vendasFormatadas = response.data.vendas.map((venda) => ({
                    ...venda,
                    preco: formatarMoeda(venda.preco),
                    sinal: formatarMoeda(venda.sinal),
                    a_pagar: formatarMoeda(venda.a_pagar)
                }));

                onVendas(vendasFormatadas);
            } else {
                onVendas([]);
            }

        } catch (error) {
            toast.error('Erro ao filtrar vendas')
            onVendas([]);
        }
    }, [filtros, token, onVendas]);

    useEffect(() => {
        filterData();
    }, [filterData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="flex items-center">
                <select
                    name="campo"
                    value={filtros.campo}
                    onChange={handleInputChange}
                    className="focus:outline-none focus:ring focus:border-gray-700 bg-white dark:bg-primaria-800 rounded-lg text-txt-primaria outline-none px-2 pr-3 py-2 text-xs dark:text-gray-200"
                >
                    <option value="nome">Nome</option>
                    <option value="cpf">CPF</option>
                    <option value="telefone">Telefone</option>
                    <option value="endereco">Endereço</option>
                    <option value="lentes">Lentes</option>
                    <option value="armacao">Armação</option>
                </select>
            </div>

            <div className="flex items-center w-full max-w-60 rounded-full py-2 relative">
                <div className="relative w-full">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={filtros.valor}
                        placeholder="O que procura?"
                        name="valor"
                        className="w-full focus:outline-none focus:ring focus:border-gray-700 bg-white dark:bg-primaria-800 rounded-lg text-txt-primaria outline-none pr-10 pl-3 py-2 text-xs"
                    />
                    <button
                        type="button"
                        onClick={filterData}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-105 transition duration-500 ease-in-out"
                    >
                        <SearchIcon className="w-4 h-4 text-gray-500 hover:text-neutral-700" />
                    </button>
                </div>
            </div>

        </>
    )
}

export default VendasSelectFilter