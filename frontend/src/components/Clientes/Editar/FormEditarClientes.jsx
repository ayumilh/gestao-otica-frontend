'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useUserToken } from "@/utils/useUserToken";

const FormEditarClientes = ({ cliCpf }) => {
  const { token } = useUserToken();
  const router = useRouter();

  const [cli_nome, setCli_nome] = useState("");
  const [cli_cpf, setCli_cpf] = useState("");
  const [cli_endereco, setCli_endereco] = useState("");
  const [cli_numero, setCli_numero] = useState("");
  const [cli_complemento, setCli_complemento] = useState("");
  const [cli_telefone, setCli_telefone] = useState("");

  const [grauData, setGrauData] = useState([]);
  const [statusRequest, setStatusRequest] = useState("");
  const [errorsInput, setErrorsInput] = useState({});

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/listar?cpf=${cliCpf}`,
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
        setCli_telefone(data.telefone);



        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graus/listar?cpf=${cliCpf}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const grausData = response.data;

        if (grausData) {
          setGrauData(grausData);
          setSelectedCPF(cliCpf);
          setIsOpenModalGrau(true);
        } else {
          alert("Não foi possível buscar os dados do grau.");
        }
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
      }
    };

    if (cliCpf) {
      fetchCliente();
    }
  }, [cliCpf, token]);

  const handleSalvarEdicao = async () => {
    const cliente = {
      nome: cli_nome,
      endereco: cli_endereco,
      numero: cli_numero,
      complemento: cli_complemento,
      telefone: cli_telefone,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/editar?cpf=${cli_cpf}`,
        cliente,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatusRequest(true);
      router.push("/clientes");
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      setStatusRequest(false);
    }
  };

  return (
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      <h3 className="text-neutral-800 text-xl font-medium ">
        {cli_nome || ""}
      </h3>

      <div className="flex flex-wrap mt-5 mb-7">
        {/* Nome */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            Nome
          </label>
          <input
            onChange={(e) => setCli_nome(e.target.value)}
            value={cli_nome}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* CPF */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            CPF
          </label>
          <input
            onChange={(e) => setCli_cpf(e.target.value)}
            value={cli_cpf}
            type="text"
            maxLength={11}
            className="w-full border rounded px-3 py-2"
            disabled
          />
        </div>

        {/* Endereço */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            Endereço
          </label>
          <input
            onChange={(e) => setCli_endereco(e.target.value)}
            value={cli_endereco}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Número */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            Número
          </label>
          <input
            onChange={(e) => setCli_numero(e.target.value)}
            value={cli_numero}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Complemento */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            Complemento
          </label>
          <input
            onChange={(e) => setCli_complemento(e.target.value)}
            value={cli_complemento || ''}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Telefone */}
        <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
          <label className="block font-medium text-sm text-neutral-700">
            Telefone
          </label>
          <input
            onChange={(e) => setCli_telefone(e.target.value)}
            value={cli_telefone}
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="w-full flex flex-wrap mt-5 mb-7">
          <div className="w-full rounded-lg shadow-lg p-6 relative overflow-auto">

            <h2 className="text-xl font-semibold mb-4 text-neutral-800">Informações Oftalmológicas</h2>

            {grauData.map((item, index) => (
              <div key={index} className="mb-6">
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

        <div className="w-full px-3 my-4">
          <BtnActions title="Salvar alterações" onClick={handleSalvarEdicao} color="ativado" />
        </div>
      </div>



      {statusRequest === true && (
        <SuccessNotification message="Cliente editado com sucesso!" />
      )}
      {statusRequest === false && (
        <ErrorNotification message="Erro ao editar cliente." />
      )}
    </div>
  );
};

export default FormEditarClientes;
