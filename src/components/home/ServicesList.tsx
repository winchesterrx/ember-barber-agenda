
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
    <section className="py-16 bg-barber-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Nossos Serviços</h2>
        <p className="text-center mb-12 text-gray-400">Qualidade e estilo para o homem moderno</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-barber-dark border border-barber-light-gray rounded-lg p-6 flex flex-col hover:border-barber-orange transition-colors"
              data-service-id={service.id}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-barber-orange" />
                  <span>{service.duration} min</span>
                </div>
                <span className="text-xl font-semibold text-barber-orange">R$ {service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
