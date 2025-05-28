import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Service {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

const ServicesList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://xofome.online/barbeariamagic/listar_servicos_publicos.php")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => setErro("Erro ao carregar os serviços"));
  }, []);

  return (
    <section className="bg-gradient-to-b from-barber-dark to-barber-gray py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">✨ Nossos Serviços ✨</h2>
        <p className="text-gray-300 text-lg mt-2 italic">
          Qualidade e estilo para o homem moderno
        </p>
      </div>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-barber-dark rounded-lg shadow-lg p-6 border border-barber-light-gray hover:border-barber-orange transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-barber-orange">{service.nome}</h3>
              {service.imagem && (
                <img
                  src={`https://xofome.online/barbeariamagic/${service.imagem}`}
                  alt={service.nome}
                  className="w-12 h-12 rounded-full object-cover border border-barber-light-gray"
                />
              )}
            </div>
            <p className="text-gray-400 mb-4">{service.descricao}</p>
            <div className="flex justify-between text-sm text-gray-300 border-t pt-2 border-barber-light-gray">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-barber-orange mr-1" />
                {service.duracao} min
              </div>
              <div className="text-barber-orange font-semibold">
                R$ {parseFloat(service.preco).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
