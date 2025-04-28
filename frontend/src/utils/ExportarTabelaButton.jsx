'use client';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import BtnAtivado from '@/components/Ui/Button/BtnAtivado';

const ExportarTabelaButton = ({ dados = [], tipo = 'clientes', cor = 'orange' }) => {
  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tipo.charAt(0).toUpperCase() + tipo.slice(1));
    XLSX.writeFile(workbook, `${tipo}.xlsx`);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Relatório de ${tipo}`, 14, 15);
  
    if (!dados.length) {
      doc.text('Nenhum dado disponível.', 14, 30);
      doc.save(`${tipo}.pdf`);
      return;
    }
  
    // Extrai as chaves visíveis
    const colunas = Object.keys(dados[0]).map((coluna) =>
      coluna.replace(/([A-Z])/g, ' $1').toUpperCase()
    );
  
    // Trata os valores: converte datas, objetos aninhados e valores nulos
    const linhas = dados.map((item) =>
      Object.values(item).map((valor) => {
        if (typeof valor === 'object' && valor !== null) {
          // Tenta pegar 'nome', 'id' ou converte para string
          return valor.nome || valor.id || JSON.stringify(valor);
        } else if (valor instanceof Date || (typeof valor === 'string' && /\d{4}-\d{2}-\d{2}/.test(valor))) {
          return new Date(valor).toLocaleDateString('pt-BR');
        } else if (typeof valor === 'number') {
          return `R$ ${valor.toFixed(2)}`;
        } else if (valor === null || valor === undefined) {
          return '-';
        }
        return valor;
      })
    );
  
    autoTable(doc, {
      head: [colunas],
      body: linhas,
      startY: 25,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [224, 130, 45], // laranja
        textColor: [255, 255, 255],
        halign: 'center',
      },
    });
  
    doc.save(`${tipo}.pdf`);
  };
  

  return (
    <div className="w-full flex gap-2 items-center py-6">
        <BtnAtivado
        title="Exportar Excel"
        onClick={exportarExcel}
        size="sm"
        rounded="xl"
        padding="sm"
      />

      <BtnAtivado
        title="Exportar PDF"
        onClick={exportarPDF}
        size="sm"
        rounded="xl"
        padding="sm"
      />

    </div>
  );
};

export default ExportarTabelaButton;
