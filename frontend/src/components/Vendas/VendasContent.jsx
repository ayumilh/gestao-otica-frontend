'use client';

import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import TitlePage from '../Ui/TitlePage';
import BtnAtivado from '@/components/Ui/Button/BtnAtivado';
import TableContent from '@/components/Ui/Table/TableContent';
import TableRowRenderer from '@/components/Ui/Table/TableRowRenderer';
import VendasSelectFilter from './Actions/VendasSelectFilter';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const VendasContent = () => {
  return (
    <div className="w-full px-4 lg:px-0 lg:mx-4 lg:mt-6 xl:mx-8 xl:flex xl:flex-col xl:items-center">

      {/* Cabeçalho */}
      <div className="w-full lg:w-[800px] xl:w-[1270px] flex justify-between items-center pt-5 pb-4">
        <div className="flex items-center">
          <NavbarMobile />
          <TitlePage title="Vendas" />
        </div>
        <div>
          <BtnAtivado title="Nova venda" onClick="/vendas/criar" page="/vendas/criar" size="sm" />
        </div>  
      </div>

      {/* Tabela */}
      <div className="w-full flex flex-col items-center" style={{ height: '850px' }}>
        <VendasTable />
      </div>
    </div>
  );
};


const VendasTable = () => {
  const { data: session } = useSession();
  const [filtros, setFiltros] = useState({ campo: 'cliente', valor: '' });
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);

    const handleFiltrosChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPagina(1);
  };


  const fetchData = async ({ page, limit }) => {
    try {
      const params = filtros.valor ? filtros : {};
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/vendas/filter`, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
        params: { ...params, page, limit },
      });

      return {
        dados: res.data.vendas || [],
        total: res.data.total || 0,
      };
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      return { dados: [], total: 0 };
    }
  };


  const renderRow = (vendas) => (
    <TableRowRenderer
      data={vendas}
      columnsMap={[
        "id",
        (venda) => venda.cliente?.nome ?? '—',
        "lentes",
        "armacao",
        (venda) => {
          const preco = parseFloat(venda.preco);
          return isNaN(preco) ? 'R$ 0,00' : `R$ ${preco.toFixed(2)}`;
        },
        (venda) => {
          const sinal = parseFloat(venda.sinal);
          return isNaN(sinal) ? 'R$ 0,00' : `R$ ${sinal.toFixed(2)}`;
        },
        (venda) => {
          const aPagar = parseFloat(venda.a_pagar);
          return isNaN(aPagar) ? 'R$ 0,00' : `R$ ${aPagar.toFixed(2)}`;
        },
        (venda) => venda.data ? new Date(venda.data).toLocaleDateString('pt-BR') : '—',
        (venda) => venda.entrega ? new Date(venda.entrega).toLocaleDateString('pt-BR') : '—',
      ]}
    />
  );

  return (
        <TableContent
          columns={["Código", "Cliente", "Lentes", "Armação", "Preço", "Sinal", "A_Pagar", "Data", "Entrega"]}
          fetchData={fetchData}
          renderRow={renderRow}
          filterComponent={<VendasSelectFilter onVendas={handleFiltrosChange} />}
          page={pagina}
          onPageChange={setPagina}
          limit={limite}
          onLimitChange={(newLimit) => {
            setLimite(newLimit);
            setPagina(1);
          }}
        />
  );
};


export default VendasContent;


