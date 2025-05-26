import { useState, useEffect } from 'react';

interface TimeSlot {
  horario: string;
  disponivel: boolean;
}

interface TimeSelectionProps {
  onSelect: (time: string) => void;
  serviceId: number;
  barberId: number;
  date: Date | null;
  availableTimes: TimeSlot[];
}

const TimeSelection = ({ onSelect, serviceId, barberId, date, availableTimes }: TimeSelectionProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onSelect(time);
  };

  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha o horário</h2>

      <div className="bg-barber-gray border border-barber-light-gray rounded-lg p-6">
        {availableTimes.length === 0 ? (
          <div className="text-center text-gray-400">Nenhum horário disponível</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableTimes.map((slot, index) => (
              <button
                key={index}
                className={`p-3 rounded-md text-center transition-colors ${
                  selectedTime === slot.horario
                    ? 'bg-barber-orange text-white'
                    : slot.disponivel
                    ? 'bg-barber-dark hover:bg-barber-orange hover:text-white'
                    : 'bg-barber-dark opacity-40 cursor-not-allowed'
                }`}
                onClick={() => slot.disponivel && handleTimeSelect(slot.horario)}
                disabled={!slot.disponivel}
                data-time={slot.horario}
                name="time_slot"
              >
                {slot.horario}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelection;
