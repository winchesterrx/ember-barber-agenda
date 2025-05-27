import { useEffect, useState } from "react";

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
  const idBarbeiro = 1; // ajuste conforme o login

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
      <h2 className="text-2xl font-bold mb-4">Gerenciar Serviços</h2>

      <div className="grid gap-4 mb-6">
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: parseFloat(e.target.value) })}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Duração (min)"
          value={form.duracao}
          onChange={(e) => setForm({ ...form, duracao: parseInt(e.target.value) })}
          className="p-2 rounded bg-gray-800 text-white"
        />
        <input type="file" onChange={handleImageUpload} className="text-white" />
        {form.imagem && <img src={`https://xofome.online/barbeariamagic/${form.imagem}`} className="h-32 rounded" />}
        <button
          onClick={salvarServico}
          className="bg-orange-600 px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          {editId ? "Atualizar" : "Salvar"}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Serviços Cadastrados</h3>
      <div className="grid gap-4">
        {servicos.map((s) => (
          <div key={s.id} className="p-4 border border-gray-700 rounded bg-barber-dark">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold">{s.nome}</h4>
                <p>{s.descricao}</p>
                <p>
                  <strong>Preço:</strong> R$ {s.preco.toFixed(2)} | <strong>Duração:</strong> {s.duracao} min
                </p>
              </div>
              {s.imagem && <img src={`https://xofome.online/barbeariamagic/${s.imagem}`} className="h-20 rounded ml-4" />}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  setForm(s);
                  setEditId(s.id);
                }}
                className="text-sm bg-blue-500 px-3 py-1 rounded"
              >
                Editar
              </button>
              <button onClick={() => excluirServico(s.id)} className="text-sm bg-red-500 px-3 py-1 rounded">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberServices;
