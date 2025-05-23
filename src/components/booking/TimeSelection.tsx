
import { useState, useEffect } from 'react';

interface TimeSelectionProps {
  onSelect: (time: string) => void;
  serviceId: number;
  barberId: number;
  date: Date | null;
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

// This would be fetched from the backend in a real application
const generateAvailableTimes = (): TimeSlot[] => {
  const times = [];
  let id = 1;
  
  for (let hour = 9; hour <= 19; hour++) {
    if (hour !== 12) { // Skip lunch hour
      const hourStr = hour.toString().padStart(2, '0');
      
      // Every 30 minutes
      times.push({
        id: id++,
        time: `${hourStr}:00`,
        available: Math.random() > 0.3 // Randomly make some times unavailable for demo
      });
      
      times.push({
        id: id++,
        time: `${hourStr}:30`,
        available: Math.random() > 0.3
      });
    }
  }
  
  return times;
};

const TimeSelection = ({ onSelect, serviceId, barberId, date }: TimeSelectionProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be an API call to get available times
    // based on serviceId, barberId and date
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setAvailableTimes(generateAvailableTimes());
      setLoading(false);
    }, 500);
  }, [serviceId, barberId, date]);
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onSelect(time);
  };

  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha o horário</h2>
      
      <div className="bg-barber-gray border border-barber-light-gray rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-barber-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableTimes.map((slot) => (
              <button
                key={slot.id}
                className={`p-3 rounded-md text-center ${
                  selectedTime === slot.time
                    ? 'bg-barber-orange text-white'
                    : slot.available
                    ? 'bg-barber-dark hover:bg-barber-orange hover:text-white transition-colors'
                    : 'bg-barber-dark opacity-40 cursor-not-allowed'
                }`}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                data-time={slot.time}
                name="time_slot"
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelection;
