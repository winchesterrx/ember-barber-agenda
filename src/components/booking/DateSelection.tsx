
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';

interface DateSelectionProps {
  onSelect: (date: Date) => void;
}

const DateSelection = ({ onSelect }: DateSelectionProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onSelect(selectedDate);
    }
  };
  
  // Get current date and add 1 day
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Get date 30 days from now
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Escolha a data</h2>
      
      <div className="bg-barber-gray border border-barber-light-gray rounded-lg p-6">
        <div className="flex flex-col items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="bg-barber-gray text-white pointer-events-auto"
            fromDate={tomorrow}
            toDate={thirtyDaysFromNow}
            locale={ptBR}
            // Disable Sundays (0 = Sunday)
            disabled={(date) => {
              const day = date.getDay();
              return day === 0;
            }}
          />
          
          {date && (
            <div className="mt-4 p-4 bg-barber-orange bg-opacity-10 rounded-lg text-center">
              <p className="text-lg text-barber-orange">
                Data selecionada: <span className="font-semibold">{format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </p>
              <button
                type="button"
                onClick={() => onSelect(date)}
                className="mt-4 bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-md font-medium"
              >
                Confirmar data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
