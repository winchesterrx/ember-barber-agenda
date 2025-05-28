import { useEffect, useState } from "react";
import { Timer, DollarSign, Scissors } from "lucide-react";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

const PublicServices = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const res = await fetch("https://xofome.online/barbeariamagic/listar_servicos_publico.php");
        const data = await res.json();
        const processado = data.map((s: any) => ({
          ...s,
          preco: parseFloat(s.preco) || 0,
          duracao: parseInt(s.duracao) || 0,
        }));
        setServicos(processado);
      } catch (err) {
        console.error("Erro ao carregar serviços:", err);
      }
    };

    fetchServicos();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-barber-gray text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Nossos Serviços</h2>
        <p className="text-barber-light mt-2">Qualidade e estilo para o homem moderno</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicos.map((s) => (
          <div
            key={s.id}
            className="bg-barber-dark border border-barber-light-gray rounded-xl shadow-lg p-5 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Scissors className="text-barber-orange w-6 h-6" />
              {s.imagem && (
                <img
                  src={`https://xofome.online/barbeariamagic/${s.imagem}`}
                  alt={s.nome}
                  className="w-10 h-10 object-cover rounded-full border border-barber-light-gray"
                />
              )}
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">{s.nome}</h3>
            <p className="text-barber-light text-sm mb-4">{s.descricao}</p>

            <div className="flex justify-between text-barber-orange text-sm border-t border-barber-light-gray pt-3">
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4" /> {s.duracao} min
              </span>
              <span className="flex items-center gap-1 font-bold">
                <DollarSign className="w-4 h-4" /> R$ {s.preco.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicServices;
