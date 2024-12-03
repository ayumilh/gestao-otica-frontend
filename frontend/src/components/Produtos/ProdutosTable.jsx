import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ProdutosRow from './ProdutosRow';

const ProdutosTable = () => {
  return (
    <div className="bg-segundaria-700 dark:bg-primaria-900 dark:border dark:border-zinc-800 shadow-lg rounded-2xl w-[345px] md:w-[728px] lg:w-[800px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <div className="flex items-center justify-between px-4 py-2 lg:px-6 lg:py-3">
        <div className="flex items-center gap-4">
          <input type="checkbox" name="" id="" className="dark:color-primaria-800" />
          <div className="flex items-center w-full max-w-60 rounded-full py-2 relative">
            <div className="relative w-full">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" className="w-full focus:outline-none focus:ring focus:border-gray-700 bg-white dark:bg-primaria-800 rounded-lg text-txt-primaria outline-none pl-10 pr-3 py-2 text-xs" placeholder="O que procura?"/>
            </div>
          </div>
        </div>
        <FilterAltOutlinedIcon className="w-6 h-6 text-segundaria-800" />
      </div>
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Código</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Descrição</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Categoria</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Fornecedor</th>
            <th className="px-4 py-4 md:py-5 text-sm font-semibold text-center text-neutral-800 dark:text-slate-50">Preço de venda</th>
            <th className="pr-6 pl-4 py-2 md:py-5"></th>
          </tr>
        </thead>
        <tbody>
          <ProdutosRow />
        </tbody>
      </table>
    </div>
  );
};

export default ProdutosTable;