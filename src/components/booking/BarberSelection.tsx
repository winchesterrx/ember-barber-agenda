
interface Barber {
  id: number;
  name: string;
  photo: string;
  experience: string;
}

interface BarberSelectionProps {
  onSelect: (barber: Barber) => void;
}

const barbers: Barber[] = [
  {
    id: 1,
    name: 'Marcio Silva',
    photo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
    experience: '7 anos de experiência'
  },
  {
    id: 2,
    name: 'Ricardo Gomes',
    photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    experience: '5 anos de experiência'
  },
  {
    id: 3,
    name: 'André Souza',
    photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    experience: '4 anos de experiência'
  }
];

const BarberSelection = ({ onSelect }: BarberSelectionProps) => {
  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha o barbeiro</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div 
            key={barber.id} 
            className="bg-barber-gray border border-barber-light-gray rounded-lg overflow-hidden cursor-pointer hover:border-barber-orange transition-colors"
            onClick={() => onSelect(barber)}
            data-barber-id={barber.id}
            name="barber"
          >
            <div className="aspect-[1/1] overflow-hidden">
              <img 
                src={barber.photo} 
                alt={barber.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-1">{barber.name}</h3>
              <p className="text-barber-orange text-sm">{barber.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberSelection;
