'use client'
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalGrauCliente({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-6 relative overflow-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <CloseIcon />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-neutral-800">Informações Oftalmológicas</h2>

        {data.map((item, index) => (
          <div key={index} className="mb-6">
            <p className="text-sm text-neutral-700 mb-2"><strong>Data:</strong> {item.data}</p>
            <p className="text-sm text-neutral-700"><strong>Lentes:</strong> {item.lentes}</p>
            <p className="text-sm text-neutral-700"><strong>Armação:</strong> {item.armacao}</p>
            <p className="text-sm text-neutral-700 mb-2"><strong>Altura Pupilar:</strong> {item.alturaPupilar || 'N/A'}</p>

            <table className="min-w-full border text-sm text-left text-neutral-800 mt-2">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 border">Lente</th>
                  <th className="px-2 py-1 border">Olho</th>
                  <th className="px-2 py-1 border">Esférico</th>
                  <th className="px-2 py-1 border">Cilíndrico</th>
                  <th className="px-2 py-1 border">Eixo</th>
                  <th className="px-2 py-1 border">ADD</th>
                  <th className="px-2 py-1 border">DP / DNP</th>
                </tr>
              </thead>
              <tbody>
                {item.graus.map((g, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-2 py-1 border">{g.lente}</td>
                    <td className="px-2 py-1 border">{g.olho}</td>
                    <td className="px-2 py-1 border">{g.esferico || '-'}</td>
                    <td className="px-2 py-1 border">{g.cilindrico || '-'}</td>
                    <td className="px-2 py-1 border">{g.eixo || '-'}</td>
                    <td className="px-2 py-1 border">{g.add || '-'}</td>
                    <td className="px-2 py-1 border">{g.dp || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
