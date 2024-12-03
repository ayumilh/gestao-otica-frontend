import React, { useState } from 'react';
import Axios from 'axios';

const SearchAdvancedModal = ({ isOpen, onClose }) => {
  const [pro_codigo, setPro_codigo] = useState(null);
  const [produtos, setProdutos] = useState([]);

  const buscarProdutos = async () => {
    try {
      const response = await Axios.get(`https://pos-backend-six.vercel.app/api/produtos/get-pro/${pro_codigo}`);
      setProdutos(response.data.produto);
      // if (Array.isArray(response.data.produto)) {
      //   const restructedProdutos = response.data.produto.map((produto) => {
      //     return {
      //       pro_codigo: produto.pro_codigo,
      //       preco_unitario: produto.preco_unitario,
      //     };
      //   });
      //   console.log(restructedProdutos);
      //   setProdutos(response.data.produto);
      // } else {
      //   console.error('Não foi possível obter os produtos');
      //   setProdutos([]);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Pesquisa Avançada</h2>
        <input
          value={pro_codigo || ''}
          onChange={(e) => setPro_codigo(e.target.value)}
          type="text"
          placeholder="Código do Produto"
          className="w-full text-neutral-600 text-lg font-medium px-4 py-2 rounded-md ring-1 ring-neutral-300 focus:outline-2 focus:outline-orange-400 mb-4"
        />
        <button onClick={buscarProdutos} className="mb-4 text-orange-400 underline">
          Buscar
        </button>
        <div className="mt-4">
          {/* <ul>
            <li>{produto.preco_unitario}</li>
          </ul> */}
          {/* {produtos.length > 0 ? (
            <ul>
              {produtos.map((produto) => (
                <li key={produto.pro_codigo}>{produto.preco_unitario}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum produto encontrado.</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchAdvancedModal;