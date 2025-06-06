import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2, Upload, Timer, Image as ImageIcon, DollarSign, Type } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

const BarberServices = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [form, setForm] = useState<Omit<Servico, "id">>({
    nome: "",
    descricao: "",
    preco: 0,
    duracao: 30,
    imagem: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const idBarbeiro = 1;

  const fetchServicos = async () => {
    try {
      const res = await fetch(`https://xofome.online/barbeariamagic/listar_servicos.php?id_barbeiro=${idBarbeiro}`);
      const data = await res.json();
      const sanitized = data.map((s: any) => ({
        ...s,
        preco: parseFloat(s.preco) || 0,
        duracao: parseInt(s.duracao) || 0,
      }));
      setServicos(sanitized);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      setErro("Erro ao carregar os serviços. Por favor, tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const salvarServico = async () => {
    const body = {
      id: editId ?? 0,
      id_barbeiro: idBarbeiro,
      nome: form.nome,
      descricao: form.descricao,
      preco: form.preco,
      duracao: form.duracao,
      imagem: form.imagem,
    };

    try {
      const response = await fetch("https://xofome.online/barbeariamagic/salvar_servico.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!result.success) {
        alert("Erro ao salvar: " + (result.message || "Erro desconhecido."));
      } else {
        setForm({ nome: "", descricao: "", preco: 0, duracao: 30, imagem: "" });
        setEditId(null);
        fetchServicos();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao salvar o serviço. Consulte o console.");
    }
  };

  const excluirServico = async (id: number) => {
    await fetch("https://xofome.online/barbeariamagic/excluir_servico.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchServicos();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://xofome.online/barbeariamagic/upload_imagem.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setForm({ ...form, imagem: data.url });
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
          <PlusCircle className="text-orange-500" /> Gerenciar Serviços
        </h2>

        {erro && <div className="text-red-500 bg-red-100 p-2 rounded mb-4">{erro}</div>}

        <div className="grid gap-4 mb-8 bg-barber-gray bg-opacity-70 p-4 sm:p-6 rounded-lg border border-barber-light-gray">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Type className="text-barber-orange" />
              <input
                placeholder="Nome do Serviço"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="p-2 rounded bg-barber-dark w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="text-barber-orange" />
              <input
                type="number"
                placeholder="Preço"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) || 0 })}
                className="p-2 rounded bg-barber-dark w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-barber-orange" />
              <input
                type="number"
                placeholder="Duração (min)"
                value={form.duracao}
                onChange={(e) => setForm({ ...form, duracao: parseInt(e.target.value) || 0 })}
                className="p-2 rounded bg-barber-dark w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="text-barber-orange" />
              <input type="file" onChange={handleImageUpload} className="text-white w-full" />
            </div>
            <div className="md:col-span-2">
              <textarea
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="p-2 rounded bg-barber-dark w-full"
              />
            </div>
          </div>

          {form.imagem && <img src={`https://xofome.online/barbeariamagic/${form.imagem}`} className="h-32 rounded border border-barber-light-gray object-cover mt-2" />}

          <button
            type="button"
            onClick={salvarServico}
            className="w-full sm:w-auto bg-barber-orange hover:bg-opacity-90 px-6 py-3 mt-4 rounded-lg text-white font-semibold text-lg"
          >
            {editId ? "Atualizar Serviço" : "Salvar Serviço"}
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mb-4">Serviços Cadastrados</h3>
        <div className="grid gap-4">
          {servicos.map((s) => (
            <div key={s.id} className="p-4 border border-barber-light-gray rounded bg-barber-gray bg-opacity-80 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div className="space-y-1 w-full">
                <h4 className="text-lg font-bold text-barber-orange">{s.nome}</h4>
                <p>{s.descricao}</p>
                <p>
                  <strong>Preço:</strong> R$ {(s.preco || 0).toFixed(2)} | <strong>Duração:</strong> {(s.duracao || 0)} min
                </p>
              </div>
              {s.imagem && (
                <img
                  src={`https://xofome.online/barbeariamagic/${s.imagem}`}
                  className="h-20 w-20 object-cover rounded border border-barber-light-gray"
                />
              )}
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => {
                    setForm(s);
                    setEditId(s.id);
                  }}
                  className="text-sm bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => excluirServico(s.id)}
                  className="text-sm bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BarberServices;
