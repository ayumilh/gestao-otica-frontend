'use client';

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const ClientesSelectFilter = ({ onClientes }) => {
  const [filtros, setFiltros] = useState({
    campo: 'nome',
    valor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const novosFiltros = {
      ...filtros,
      [name]: value,
    };
    setFiltros(novosFiltros);
    onClientes(novosFiltros); // Atualiza ao digitar ou trocar campo
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClientes(filtros);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4 py-2">
      {/* Seletor de campo */}
      <select
        name="campo"
        value={filtros.campo}
        onChange={handleInputChange}
        className="w-full sm:w-40 bg-white dark:bg-primaria-800 border border-gray-300 dark:border-zinc-600 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-zinc-400 text-gray-800 dark:text-gray-100"
        aria-label="Campo de filtro"
      >
        <option value="nome">Nome</option>
        <option value="cpf">CPF</option>
        <option value="telefone">Telefone</option>
        <option value="endereco">Endereço</option>
        <option value="lentes">Lentes</option>
        <option value="armacao">Armação</option>
      </select>

      {/* Campo de busca com ícone */}
      <div className="relative w-full sm:max-w-xs">
        <input
          type="text"
          name="valor"
          value={filtros.valor}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Digite para filtrar..."
          className="w-full bg-white dark:bg-primaria-800 border border-gray-300 dark:border-zinc-600 rounded-lg py-2 pr-10 pl-3 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-zinc-400"
          aria-label="Buscar clientes"
        />
        <button
          type="button"
          onClick={() => onClientes(filtros)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
        >
          <SearchIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default ClientesSelectFilter;
