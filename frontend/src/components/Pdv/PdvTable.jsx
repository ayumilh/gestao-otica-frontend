import { PdvImageConent } from "./Actions/PdvImageConent";

export const PdvTable = ({ produto }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-2 border-b-2 border-gray-200 text-center text-sm xl:text-base text-orange-400">Item</th>
              <th className="px-2 border-b-2 border-gray-200 text-center text-sm xl:text-base text-orange-400">Código</th>
              <th className="px-2 border-b-2 border-gray-200 text-start text-sm xl:text-base text-orange-400">Produto</th>
              <th className="px-2 border-b-2 border-gray-200 text-end text-sm xl:text-base text-orange-400">Qtde</th>
              <th className="px-2 border-b-2 border-gray-200 text-center text-sm xl:text-base text-orange-400">Valor</th>
              <th className="px-2 border-b-2 border-gray-200 text-center text-sm xl:text-base text-orange-400">Total</th>
            </tr>
          </thead>
          <tbody>
          {produto.map((produto, index) => (
            <tr key={index}>
              <td className="text-center text-sm xl:text-base px-2 py-3">{index + 1}</td>
              <td className="text-center text-sm xl:text-base px-2 py-3">{produto.pro_codigo}</td>
              <td className="text-start text-sm xl:text-base px-2 py-3">CARVÃO ECOLÓGICO 4KG</td>
              <td className="text-end text-sm xl:text-base px-2 py-3">{produto.quantidade}</td>
              <td className="text-center text-sm xl:text-base px-2 py-3">{produto.preco_unitario}</td>
              <td className="text-center text-sm xl:text-base px-2 py-3">R$ {produto.preco_unitario * produto.quantidade}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {produto.length === 0 && (
        <div className="w-60 xl:w-80 xl:h-80 mt-10">
          <PdvImageConent />
        </div>
      )}
    </div>
  )
}