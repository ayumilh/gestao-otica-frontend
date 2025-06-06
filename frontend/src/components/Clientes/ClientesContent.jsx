'use client';

import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import TitlePage from '../Ui/TitlePage';
import BtnAtivado from '@/components/Ui/Button/BtnAtivado';
import TableContent from '@/components/Ui/Table/TableContent';
import TableRowRenderer from '@/components/Ui/Table/TableRowRenderer';
import ClientesSelectFilter from './Actions/ClientesSelectFilter';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ClientesContent = () => {
  return (
    <div className="w-full px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center">
      <div className="w-full lg:w-[800px] xl:w-[1270px] flex justify-between items-center h-12 pt-5">
        <div className="flex items-center">
          <NavbarMobile />
          <TitlePage title='Clientes' />
        </div>
        <div>
          <BtnAtivado title='Novo cliente' onClick="/clientes/criar" page="/clientes/criar" size="sm" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center" style={{ height: '850px' }}>
        <ClientesTable />
      </div>
    </div>
  );
};

const ClientesTable = () => {
  const { data: session } = useSession();
  const [filtros, setFiltros] = useState({ campo: 'nome', valor: '' });
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);

  const handleFiltrosChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPagina(1);
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
        if (!p2) return p1;
        if (!p3) return `(${p1}) ${p2}`;
        return `(${p1}) ${p2}-${p3}`;
      });
    } else {
      return numeros.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (match, p1, p2, p3) => {
        if (!p2) return p1;
        if (!p3) return `(${p1}) ${p2}`;
        return `(${p1}) ${p2}-${p3}`;
      });
    }
  };

  const fetchData = async ({ page, limit }) => {
    try {
      const params = filtros.valor ? filtros : {};
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/filter`, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
        params: { ...params, page, limit },
      });

      const dados = res.data.clientes.map(cliente => ({
        ...cliente,
        telefone: formatarTelefone(cliente.telefone || ''),
      }));

      return {
        dados,
        total: res.data.total || dados.length,
      };
    } catch (error) {
      return { dados: [], total: 0 };
    }
  };

  const renderRow = (clientes) => (
    <TableRowRenderer
      data={clientes}
      columnsMap={[
        "id",
        "nome",
        "cpf",
        "telefone",
        (cliente) => `${cliente.endereco}, ${cliente.numero}, ${cliente.complemento}`,
      ]}
    />
  );

  return (
    <TableContent
      columns={["Código", "Nome", "CPF", "Telefone", "Endereço"]}
      fetchData={fetchData}
      renderRow={renderRow}
      filterComponent={<ClientesSelectFilter onClientes={handleFiltrosChange} />}
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


export default ClientesContent;
