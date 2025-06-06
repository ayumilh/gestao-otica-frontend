const ExportButton = ({ dados = [] }) => {
  const exportar = () => {
    const csv = [
      Object.keys(dados[0] || {}).join(","),
      ...dados.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv";
    link.click();
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={exportar}
        className="bg-segundaria-800 text-white text-sm px-4 py-2 rounded hover:bg-segundaria-900"
      >
        Exportar
      </button>
    </div>
  );
};

export default ExportButton;