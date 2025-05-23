
import { Scissors, Beard, Clock, Spray, Sparkles } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
}

interface ServiceSelectionProps {
  onSelect: (service: Service) => void;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Corte de Cabelo',
    description: 'Corte moderno com acabamento perfeito',
    price: 40,
    duration: 30,
    icon: <Scissors className="w-8 h-8" />
  },
  {
    id: 2,
    name: 'Barba',
    description: 'Modelagem e hidratação completa',
    price: 30,
    duration: 30,
    icon: <Beard className="w-8 h-8" />
  },
  {
    id: 3,
    name: 'Combo Completo',
    description: 'Cabelo + barba com atendimento premium',
    price: 65,
    duration: 60,
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 4,
    name: 'Pintura',
    description: 'Coloração profissional e durável',
    price: 70,
    duration: 90,
    icon: <Spray className="w-8 h-8" />
  }
];

const ServiceSelection = ({ onSelect }: ServiceSelectionProps) => {
  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha o serviço</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-barber-gray border border-barber-light-gray rounded-lg p-6 cursor-pointer hover:border-barber-orange transition-colors"
            onClick={() => onSelect(service)}
            data-service-id={service.id}
            name="service"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-barber-orange bg-opacity-10 rounded-lg">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                <p className="text-gray-400 mb-3 text-sm">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-1 text-barber-orange" />
                    <span>{service.duration} min</span>
                  </div>
                  <span className="text-xl font-semibold text-barber-orange">R$ {service.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
