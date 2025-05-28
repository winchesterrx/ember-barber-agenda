import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

const ServicesList = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const res = await fetch("https://xofome.online/barbeariamagic/listar_servicos_publicos.php");
        const data = await res.json();

        const parsed = data.map((s: any) => ({
          ...s,
          preco: parseFloat(s.preco),
          duracao: parseInt(s.duracao),
        }));

        setServicos(parsed);
      } catch (err) {
        console.error("Erro ao carregar serviços públicos", err);
        setErro("Não foi possível carregar os serviços no momento.");
      }
    };

    fetchServicos();
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#1c1c1c] via-[#222] to-[#1c1c1c] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-sm">
            <span className="text-barber-orange">✂️</span> Nossos Serviços
          </h2>
          <p className="text-lg text-gray-400 mt-2 font-light">
            Qualidade e estilo para o homem moderno
          </p>
        </div>

        {erro ? (
          <p className="text-red-500 text-center">{erro}</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map((service) => (
              <div
                key={service.id}
                className="bg-[#121212] border border-[#333] rounded-xl p-6 shadow-lg hover:border-barber-orange hover:scale-[1.02] transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-barber-orange text-xl">✂️</span>
                  {service.imagem && (
                    <img
                      src={`https://xofome.online/barbeariamagic/${service.imagem}`}
                      alt={service.nome}
                      className="h-10 w-10 rounded-full object-cover border border-gray-700"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold mb-1 text-white">{service.nome}</h3>
                <p className="text-sm text-gray-400 mb-4">{service.descricao}</p>

                <div className="flex justify-between items-center border-t border-[#333] pt-3 mt-auto text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-barber-orange" />
                    <span>{service.duracao} min</span>
                  </div>
                  <span className="text-barber-orange font-semibold text-lg">
                    R$ {service.preco.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesList;
