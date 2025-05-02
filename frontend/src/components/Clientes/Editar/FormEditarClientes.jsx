'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Ui/Button/BtnActions";
import { useUserToken } from "@/utils/useUserToken";
import { FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const FormEditarClientes = ({ cliId }) => {
  const { token } = useUserToken();
  const router = useRouter();

  const [cli_nome, setCli_nome] = useState("");
  const [cli_cpf, setCli_cpf] = useState("");
  const [cli_endereco, setCli_endereco] = useState("");
  const [cli_numero, setCli_numero] = useState("");
  const [cli_complemento, setCli_complemento] = useState("");
  const [cli_telefone, setCli_telefone] = useState("");

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


  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar?id=${cliId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data.cliente;

        if (!data) return;

        setCli_nome(data.nome);
        setCli_cpf(data.cpf);
        setCli_endereco(data.endereco);
        setCli_numero(data.numero);
        setCli_complemento(data.complemento);
        setCli_telefone(formatarTelefone(data.telefone));

      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
      }
    };

    if (cliId) {
      fetchCliente();
    }
  }, [cliId, token]);

  const handleSalvarEdicao = async () => {
    const cliente = {
      nome: cli_nome,
      endereco: cli_endereco,
      numero: cli_numero,
      complemento: cli_complemento,
      telefone: cli_telefone.replace(/\D/g, '')
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/editar?id=${cliId}`,
        cliente,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cliente editado com sucesso!");
      setTimeout(() => {
        router.push("/clientes");
      }, 2000);
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      toast.error("Erro ao editar cliente.");
    }
  };

  const handleDeleteCliente = async () => {
    const confirmar = confirm("Tem certeza que deseja deletar esta cliente?");
    if (!confirmar) return;

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/deletar/${cliId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success("Cliente deletado com sucesso!");
        setTimeout(() => {
          router.push("/clientes");
        }, 2000);
      } else {
        toast.error("Erro ao deletar cliente.");
      }
    } catch {
      toast.error("Erro ao deletar cliente.");
    }
  };

  return (
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <div className="w-full flex justify-between items-center py-6">
        <h3 className="text-neutral-800 text-xl font-medium ">
          {cli_nome || ""}
        </h3>

        <div className="flex gap-4">
          {/* ações */}
          <button
            onClick={() => {
              const query = new URLSearchParams({
                campo: 'nome',
                valor: cli_nome
              }).toString();

              router.push(`/vendas/criar?${query}`);
            }}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-600 dark:hover:text-orange-700 transition-colors"
            title="Criar venda"
          >
            <FaPlus className="text-2xl" />
          </button>

          <button
            onClick={handleDeleteCliente}
            className="text-red-600 hover:text-red-800 dark:text-red-600 dark:hover:text-red-800 transition-colors"
            title="Deletar cliente"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap mt-5 mb-7">
        {/* Nome */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            Nome
          </label>
          <input
            onChange={(e) => setCli_nome(e.target.value)}
            value={cli_nome || ""}
            type="text"
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
          />
        </div>

        {/* CPF */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            CPF
          </label>
          <input
            onChange={(e) => setCli_cpf(e.target.value)}
            value={cli_cpf || ""}
            type="text"
            maxLength={11}
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
            disabled
          />
        </div>

        {/* Endereço */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            Endereço
          </label>
          <input
            onChange={(e) => setCli_endereco(e.target.value)}
            value={cli_endereco || ""}
            type="text"
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
          />
        </div>

        {/* Número */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            Número
          </label>
          <input
            onChange={(e) => setCli_numero(e.target.value)}
            value={cli_numero || ""}
            type="text"
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
          />
        </div>

        {/* Complemento */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            Complemento
          </label>
          <input
            onChange={(e) => setCli_complemento(e.target.value)}
            value={cli_complemento || ''}
            type="text"
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
          />
        </div>

        {/* Telefone */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700 dark:text-gray-200">
            Telefone
          </label>
          <input
            onChange={(e) => setCli_telefone(e.target.value)}
            value={cli_telefone || ""}
            type="text"
            className="w-full border rounded px-3 py-2 dark:text-white dark:bg-zinc-800 dark:border-black/10"
          />
        </div>

        <div className="w-full px-3 my-4">
          <BtnActions title="Salvar alterações" onClick={handleSalvarEdicao} color="ativado" />
        </div>
      </div>
    </div>
  );
};

export default FormEditarClientes;
