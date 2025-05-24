import { useEffect, useState } from 'react';
import { User, Star } from 'lucide-react';

interface Barber {
  id: number;
  name: string;
  photo: string;
  experience: string;
}

interface BarberSelectionProps {
  onSelect: (barber: Barber) => void;
}

const BarberSelection = ({ onSelect }: BarberSelectionProps) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://xofome.online/barbeariamagic/get_barbeiros.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBarbers(data.barbeiros);
        } else {
          setBarbers([]);
        }
      })
      .catch(() => setBarbers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha o barbeiro</h2>

      {loading ? (
        <p className="text-gray-300">Carregando barbeiros...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbers.map((barber) => (
            <div 
              key={barber.id} 
              className="bg-barber-dark border border-barber-light-gray rounded-lg p-6 cursor-pointer hover:border-barber-orange transition-colors"
              onClick={() => onSelect(barber)}
              data-barber-id={barber.id}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-barber-gray mb-4 overflow-hidden">
                  {barber.photo ? (
                    <img 
                      src={barber.photo} 
                      alt={barber.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                        e.currentTarget.parentElement?.appendChild(
                          Object.assign(document.createElement('div'), { 
                            className: 'flex items-center justify-center',
                            innerHTML: '<span class="text-barber-orange"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>'
                          })
                        );
                        e.currentTarget.remove();
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-barber-orange" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{barber.name}</h3>
                <div className="flex items-center text-sm text-gray-300 mb-2">
                  <Star className="w-4 h-4 mr-1 text-barber-orange" />
                  <span>{barber.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarberSelection;
