'use client';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IconButton, Menu, MenuItem } from '@mui/material';
import autoTable from 'jspdf-autotable';

const ExportarTabelaButton = ({ dados = [], tipo = 'clientes', cor = 'orange' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    if (action === 'excel') exportarExcel();
    if (action === 'pdf') exportarPDF();
  };


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
        fillColor: [224, 130, 45], 
        textColor: [255, 255, 255],
        halign: 'center',
      },
    });

    doc.save(`${tipo}.pdf`);
  };


  return (
      <div className="w-full flex justify-start">
        <IconButton
          aria-label="export options"
          onClick={handleClick}
          className="text-orange-500 hover:bg-orange-100"
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {/* <MenuItem onClick={exportarExcel}>Exportar Excel</MenuItem> */}
          <MenuItem onClick={exportarPDF}>Exportar PDF</MenuItem>
        </Menu>
      </div>
  );
};

export default ExportarTabelaButton;
