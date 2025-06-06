'use client';

import React, { useState, useEffect } from 'react';

export default function TableGeneric({
  dados,
  colunas,
  renderLinha,
  titulo,
  topoExtra,
  rowsPerPageOptions = [10, 20, 50],
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [linhasPorPagina, setLinhasPorPagina] = useState(rowsPerPageOptions[0]);

  const totalPaginas = Math.ceil(dados.length / linhasPorPagina);

  useEffect(() => {
    if (paginaAtual > totalPaginas) setPaginaAtual(totalPaginas || 1);
  }, [dados.length, linhasPorPagina, totalPaginas, paginaAtual]);

  const dadosPaginados = dados.slice(
    (paginaAtual - 1) * linhasPorPagina,
    paginaAtual * linhasPorPagina
  );

  return (
    <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-full max-w-[1270px] flex flex-col my-10 overflow-x-auto">
      
      {/* TOPO */}
      <div className="sticky top-0 z-30 p-4 bg-inherit">
        {titulo && <h2 className="text-lg font-semibold">{titulo}</h2>}
        {topoExtra}
      </div>

      {/* TABELA DESKTOP */}
      <div className="overflow-auto max-h-[70vh] px-4 pb-4">
        <table className="table-auto min-w-full hidden md:table">
          <thead>
            <tr>
              {colunas.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-sm font-semibold text-neutral-800 dark:text-slate-50 ${col.className || ''}`}
                >
                  {col.titulo}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, i) => (
              <tr key={i}>{renderLinha(item)}</tr>
            ))}
          </tbody>
        </table>

        {/* MOBILE */}
        <div className="md:hidden space-y-4">
          {dadosPaginados.map((item, i) => (
            <div key={i}>{renderLinha(item)}</div>
          ))}
        </div>
      </div>

      {/* CONTROLE DE PAGINAÇÃO */}
      <div className="flex justify-between items-center p-4">
        <div>
          <label className="text-sm text-neutral-600 dark:text-slate-200">
            Linhas por página:&nbsp;
            <select
              value={linhasPorPagina}
              onChange={(e) => {
                setLinhasPorPagina(Number(e.target.value));
                setPaginaAtual(1);
              }}
              className="bg-white dark:bg-zinc-800 border rounded px-2 py-1 text-sm"
            >
              {rowsPerPageOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={paginaAtual <= 1}
            onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            disabled={paginaAtual >= totalPaginas}
            onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
