import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2, Upload, Timer, Image as ImageIcon, DollarSign, Type } from "lucide-react";

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
  const idBarbeiro = 1; // ajustar para login real

  const fetchServicos = async () => {
    const res = await fetch(`https://xofome.online/barbeariamagic/listar_servicos.php?id_barbeiro=${idBarbeiro}`);
    const data = await res.json();
    setServicos(data);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const salvarServico = async () => {
    const body = {
      ...form,
      id: editId ?? 0,
      id_barbeiro: idBarbeiro,
    };

    await fetch("https://xofome.online/barbeariamagic/salvar_servico.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setForm({ nome: "", descricao: "", preco: 0, duracao: 30, imagem: "" });
    setEditId(null);
    fetchServicos();
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
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="text-orange-500" /> Gerenciar Serviços
      </h2>

      <div className="grid gap-4 mb-8 bg-barber-gray bg-opacity-70 p-6 rounded-lg border border-barber-light-gray">
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
          <Type className="text-barber-orange" />
          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="p-2 rounded bg-barber-dark w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="text-barber-orange" />
          <input
            type="number"
            placeholder="Preço"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) })}
            className="p-2 rounded bg-barber-dark w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Timer className="text-barber-orange" />
          <input
            type="number"
            placeholder="Duração (min)"
            value={form.duracao}
            onChange={(e) => setForm({ ...form, duracao: parseInt(e.target.value) })}
            className="p-2 rounded bg-barber-dark w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <ImageIcon className="text-barber-orange" />
          <input type="file" onChange={handleImageUpload} className="text-white" />
        </div>
        {form.imagem && <img src={`https://xofome.online/barbeariamagic/${form.imagem}`} className="h-32 rounded border border-barber-light-gray" />}
        <button
          onClick={salvarServico}
          className="bg-barber-orange hover:bg-opacity-90 px-6 py-2 rounded-lg text-white font-semibold text-lg"
        >
          {editId ? "Atualizar Serviço" : "Salvar Serviço"}
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Serviços Cadastrados</h3>
      <div className="grid gap-4">
        {servicos.map((s) => (
          <div key={s.id} className="p-4 border border-barber-light-gray rounded bg-barber-gray bg-opacity-80">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-barber-orange">{s.nome}</h4>
                <p>{s.descricao}</p>
                <p>
                  <strong>Preço:</strong> R$ {s.preco.toFixed(2)} | <strong>Duração:</strong> {s.duracao} min
                </p>
              </div>
              {s.imagem && (
                <img
                  src={`https://xofome.online/barbeariamagic/${s.imagem}`}
                  className="h-20 w-20 object-cover rounded ml-4 border border-barber-light-gray"
                />
              )}
            </div>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => {
                  setForm(s);
                  setEditId(s.id);
                }}
                className="text-sm bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <Edit size={16} /> Editar
              </button>
              <button
                onClick={() => excluirServico(s.id)}
                className="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700 flex items-center gap-1"
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberServices;
