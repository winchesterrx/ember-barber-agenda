import { useEffect, useState } from "react";
import { Clock, Scissors } from "lucide-react";

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
      .catch(err => setErro("Não foi possível carregar os serviços."));
  }, []);

  return (
    <section className="bg-gradient-to-b from-barber-dark via-barber-gray to-barber-dark py-24 px-6">
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">Nossos Serviços</h2>
        <p className="text-gray-300 text-base mt-3 italic">Qualidade e estilo para o homem moderno</p>
        <div className="h-1 w-24 bg-barber-orange mx-auto mt-4 rounded"></div>
      </div>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-barber-dark rounded-2xl shadow-md p-6 border border-barber-light-gray hover:border-barber-orange transition duration-300 hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <Scissors className="text-barber-orange w-6 h-6" />
              {service.imagem && (
                <img
                  src={`https://xofome.online/barbeariamagic/${service.imagem}`}
                  alt={service.nome}
                  className="w-12 h-12 rounded-full object-cover border-2 border-barber-orange"
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{service.nome}</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{service.descricao}</p>
            <div className="flex justify-between text-sm text-gray-300 border-t pt-3 border-barber-light-gray">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-barber-orange" />
                {service.duracao} min
              </div>
              <div className="text-barber-orange font-semibold text-lg">
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
