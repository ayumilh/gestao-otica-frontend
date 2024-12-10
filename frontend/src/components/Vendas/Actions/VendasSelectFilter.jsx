import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ErrorEmpty from '@/components/Geral/Notification/ErrorEmpty';

const VendasSelectFilter = ({ onVendas }) => {
    const [filtros, setFiltros] = useState({
        campo: 'nome',
        valor: '',
    });
    const [statusRequest, setStatusRequest] = useState(null);

    const filterData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/vendas/filter', { params: filtros });
            if (response.data && Array.isArray(response.data)) {
                onVendas(response.data);
            } else {
                onVendas([]);
            }
            console.log('Filtros aplicados:', filtros);
            console.log('Dados retornados:', response.data);
        } catch (error) {
            setStatusRequest(false);
            onVendas([]);
        }
    };

    useEffect(() => {
        filterData();
    }, [filtros]);

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
            {statusRequest === true && (
                <ErrorEmpty title="filtro" onClose={() => setStatusRequest(false)} />
            )}
        </>
    )
}

export default VendasSelectFilter