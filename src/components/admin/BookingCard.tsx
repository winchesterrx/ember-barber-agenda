import { useState } from 'react';
import { PhoneCall, Check, X, MoreHorizontal, Clock, CalendarCheck } from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  time: string;
  status: string;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const [status, setStatus] = useState(booking.status);
  const [showOptions, setShowOptions] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setShowOptions(false);

    fetch('https://xofome.online/barbeariamagic/atualizar_status.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: booking.id,
        status: newStatus
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          console.error('Erro ao atualizar status:', data.message);
          setStatus(booking.status || 'pending');
        }
      })
      .catch(err => {
        console.error('Erro de rede ao atualizar status:', err);
        setStatus(booking.status || 'pending');
      });
  };

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Pendente';
    }
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return `https://wa.me/55${digits}`;
  };

  return (
    <div
      className="bg-barber-dark border border-barber-light-gray rounded-lg p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 mb-3"
      data-booking-id={booking.id}
    >
      <div className={`h-3 w-3 rounded-full ${getStatusColor()} md:mr-2 hidden md:block`}></div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-medium">{booking.customerName}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()} bg-opacity-20 text-${status === 'confirmed' ? 'green' : status === 'cancelled' ? 'red' : 'yellow'}-500 md:hidden`}>
            {getStatusText()}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
          <div className="flex items-center text-sm text-gray-300">
            <Clock className="w-4 h-4 text-barber-orange mr-1" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <CalendarCheck className="w-4 h-4 text-barber-orange mr-1" />
            <span>{booking.service}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block text-sm text-gray-300">
        {getStatusText()}
      </div>

      <div className="flex items-center gap-3 mt-3 md:mt-0">
        <a
          href={formatPhone(booking.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-barber-gray hover:bg-barber-orange hover:text-white transition-colors p-3 rounded-md"
          aria-label="Ligar para cliente"
        >
          <PhoneCall className="w-6 h-6" />
        </a>

        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="bg-barber-gray hover:bg-barber-orange hover:text-white transition-colors p-3 rounded-md"
            aria-label="Mais opções"
          >
            <MoreHorizontal className="w-6 h-6" />
          </button>

          {showOptions && (
            <div className="absolute right-0 z-10 w-48 mt-2 bg-barber-gray rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => handleStatusChange('confirmed')}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-left hover:bg-barber-dark"
              >
                <Check className="w-4 h-4 text-green-500" />
                Confirmar
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-left hover:bg-barber-dark"
              >
                <X className="w-4 h-4 text-red-500" />
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
