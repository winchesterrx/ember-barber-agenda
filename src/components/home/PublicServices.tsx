import { useEffect, useState } from "react";
import { Scissors, Sparkles, Droplet, Clock } from "lucide-react";

interface Servico {
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

const PublicServices = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://xofome.online/barbeariamagic/listar_servicos_publicos.php");
      const data = await res.json();
      setServicos(data);
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 text-center text-white bg-barber-gray">
      <h2 className="text-4xl font-bold mb-2">Nossos Serviços</h2>
      <p className="text-lg mb-10 text-gray-300">Qualidade e estilo para o homem moderno</p>

      <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {servicos.map((s, index) => (
          <div key={index} className="bg-barber-dark rounded-lg shadow-md p-6 text-left flex flex-col justify-between">
            <div>
              <div className="text-orange-500 mb-2">
                {index === 0 ? <Scissors /> : index === 1 ? <Sparkles /> : <Droplet />}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{s.nome}</h3>
              <p className="text-gray-300 mb-4">{s.descricao}</p>
            </div>
            <div className="flex items-center justify-between text-orange-500 font-semibold mt-auto pt-2 border-t border-gray-700">
              <span className="flex items-center gap-1"><Clock size={16} /> {s.duracao} min</span>
              <span>R$ {parseFloat(s.preco).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicServices;
