const TableToolbar = ({
  page,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
      
      {/* Linhas por página */}
      <div className="flex items-center">
        <label className="mr-2">Linhas:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            onRowsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="bg-white dark:bg-primaria-800 border border-gray-300 dark:border-zinc-700 rounded px-3 py-1 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primaria-800"
        >
          {rowsPerPageOptions.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Paginação */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
        >
          ◀
        </button>

        <span className="mx-1 text-sm font-medium">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default TableToolbar;
