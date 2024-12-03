'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import ModalEditarProduto from "@/components/Produtos/Editar/ModalEditarProduto"

export default function ProdutosRow () {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  
  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleButtonClick = (product) => {
    try {
      Cookies.set('selectedProduct', product);
      router.push('/produtos/editar');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://pos-backend-six.vercel.app/api/produtos/get");
        if (response.data && Array.isArray(response.data.produtos)) {
          const restructuredData = response.data.produtos.map((product) => {
            return {
              id: product.pro_codigo,
              descricao: product.pro_descricao, 
              categoria: product.cat_codigo, 
              fornecedor: product.for_codigo, 
              preco_venda: product.pro_preco_venda, 
            };
          });
          setProducts(restructuredData);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={6}/>
    ) : products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index} className="cursor-pointer border-t border-zinc-100 hover:bg-gray-200 dark:bg-primaria-900 dark:hover:bg-primaria-800 dark:border-b dark:border-zinc-800">
          <td className="pr-4 pl-6 py-4 md:py-5 text-center whitespace-nowrap">
            <div className="text-sm text-neutral-800 dark:text-slate-50">{product.id}</div>
          </td>
          <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
            <div className="text-sm text-neutral-800 dark:text-slate-50">{product.descricao}</div>
          </td>
          <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
            <div className="text-sm text-neutral-800 dark:text-slate-50">{product.categoria}</div>
          </td>
          <td className="px-4 py-4 md:py-5 text-center">
            <div className="text-sm text-neutral-800 dark:text-slate-50">{product.fornecedor}</div>
          </td>
          <td className="pr-6 pl-4 py-4 md:py-5 text-sm text-center whitespace-nowrap">
            <div className="text-sm text-neutral-800 dark:text-slate-50">{product.preco_venda}</div>
          </td>
          <td className="px-4 py-4 md:py-5 text-center whitespace-nowrap">
            <button
              onClick={() => handleButtonClick(product.id)}
              className="text-neutral-700 hover:text-neutral-900 dark:text-slate-200 dark:hover:text-slate-50 transition ease-in flex items-center justify-center"
            >
              <ModeEditOutlineIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
            </button>     
            <ModalEditarProduto isOpen={isOpen} onToggle={toggleDrawer} />
          </td>
        </tr> 
    ))
      ) : (
      <tr>
        <td className="text-center" colSpan="6">
          <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
            <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};