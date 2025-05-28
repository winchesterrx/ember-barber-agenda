import { Scissors, ScissorsLineDashed, Clock, Droplets, Sparkles } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Corte de Cabelo',
    description: 'Corte moderno com acabamento perfeito',
    price: 40,
    duration: 30,
    icon: <Scissors className="w-8 h-8 text-barber-orange" />
  },
  {
    id: 2,
    name: 'Barba',
    description: 'Modelagem e hidratação completa',
    price: 30,
    duration: 30,
    icon: <ScissorsLineDashed className="w-8 h-8 text-barber-orange" />
  },
  {
    id: 3,
    name: 'Combo Completo',
    description: 'Cabelo + barba com atendimento premium',
    price: 65,
    duration: 60,
    icon: <Sparkles className="w-8 h-8 text-barber-orange" />
  },
  {
    id: 4,
    name: 'Pintura',
    description: 'Coloração profissional e durável',
    price: 70,
    duration: 90,
    icon: <Droplets className="w-8 h-8 text-barber-orange" />
  }
];

const ServicesList = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-barber-gray to-barber-dark text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
          ✂️ Nossos Serviços
        </h2>
        <p className="mt-3 text-lg sm:text-xl text-barber-light-gray italic">
          Qualidade e estilo para o homem moderno
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-barber-dark bg-opacity-90 border border-barber-light-gray rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{service.name}</h3>
            <p className="text-sm text-barber-light mt-1 mb-4 flex-grow">{service.description}</p>
            <div className="flex justify-between items-center mt-auto text-barber-orange text-sm pt-3 border-t border-barber-light-gray">
              <div className="flex items-center gap-1">
                <Clock size={16} /> {service.duration} min
              </div>
              <span className="text-lg font-semibold">R$ {service.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
