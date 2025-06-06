'use client';
import { useState, useEffect, useRef } from 'react';
import ExportButton from '@/components/Ui/Table/ExportButton';
import TableToolbar from '@/components/Ui/Table/TableToolbar';

const TableContent = ({
  columns = [],
  fetchData,
  renderRow,
  filterComponent = null,
  page,
  onPageChange,
  limit,
  onLimitChange,
  rowsPerPageOptions = [10, 20, 50, 100],
}) => {
  const tableContainerRef = useRef(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);

  const loadData = async () => {
    const res = await fetchData({ page, limit });
    setData(res.dados);
    setTotal(res.total);
  };

  useEffect(() => {
    loadData();
  }, [page, limit, fetchData]);


  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const container = tableContainerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <div ref={tableContainerRef} id="tabela-principal" className="bg-segundaria-700 dark:bg-primaria-900 dark:border-2 dark:border-black/10 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">

      {/* Toolbar Fixa */}
      <div className="sticky top-0 z-30 bg-segundaria-700 dark:bg-primaria-900 border-b border-gray-300 dark:border-zinc-700 shadow-sm">
        {filterComponent && (
          <div className="px-4 py-3">
            {filterComponent}
          </div>
        )}
        <div className="flex justify-between items-start px-4 py-2">
          <ExportButton dados={data} />
          <TableToolbar
            page={page}
            totalPages={totalPages}
            rowsPerPage={limit}
            onPageChange={onPageChange}
            onRowsPerPageChange={onLimitChange}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </div>
      </div>

      {/* MOBILE - CARDS ELEGANTES */}
      <div className="block lg:hidden px-4 space-y-4 py-4">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-sm p-4 space-y-3">
              {columns.map((col, i) => {
                const label = typeof col === 'string' ? col : `Campo ${i + 1}`;
                const valor = item[Object.keys(item)[i]] ?? '—';

                return (
                  <div key={i} className="flex flex-col">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {label}
                    </span>
                    <span className="text-[15px] text-gray-800 dark:text-white font-medium break-words leading-tight">
                      {valor}
                    </span>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 text-sm py-4">
            Nenhum resultado encontrado.
          </div>
        )}
      </div>


      {/* DESKTOP - TABELA */}
      <div className="hidden lg:block w-full">
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 md:py-4 text-sm font-semibold text-left text-neutral-800 dark:text-slate-50"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
            {renderRow(data)}
          </tbody>
        </table>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-dark-segundaria-800 text-white hover:brightness-110 transition-all px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-1"
        >
          <span className="text-lg text-white">↑</span> Topo
        </button>
      )}

    </div>
  );
};

export default TableContent;
