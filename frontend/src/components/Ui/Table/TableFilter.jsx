import { useState } from "react";

const TableFilter = ({ onFilter, campos = [] }) => {
  const [filtro, setFiltro] = useState({ campo: campos[0]?.value || "", valor: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const handleSubmit = () => {
    onFilter(filtro);
  };

  return (
    <div className="flex gap-2 items-center">
      <select
        name="campo"
        value={filtro.campo}
        onChange={handleChange}
        className="border px-2 py-1 rounded text-sm"
      >
        {campos.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <input
        name="valor"
        type="text"
        value={filtro.valor}
        onChange={handleChange}
        className="border px-3 py-1 rounded text-sm"
        placeholder="Buscar..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Filtrar
      </button>
    </div>
  );
};

export default TableFilter;
