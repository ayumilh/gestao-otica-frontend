const TableRowRenderer = ({ data, columnsMap }) => {
  return data.map((item, index) => (
    <tr
      key={index}
      className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-150"
    >
      {columnsMap.map((col, i) => (
        <td
          key={i}
          className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200 whitespace-pre-wrap break-words align-middle border-b border-gray-100 dark:border-zinc-700"
        >
          {typeof col === 'function' ? col(item) : item[col] ?? '—'}
        </td>
      ))}
    </tr>
  ));
};

export default TableRowRenderer;
