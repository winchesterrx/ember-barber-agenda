
import { Check } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Serviço' },
  { id: 2, name: 'Barbeiro' },
  { id: 3, name: 'Data' },
  { id: 4, name: 'Horário' },
  { id: 5, name: 'Seus dados' }
];

const BookingSteps = ({ currentStep }: BookingStepsProps) => {
  return (
    <nav aria-label="Progress" className="hidden sm:block">
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <li key={step.id} className={`flex items-center ${index === steps.length - 1 ? '' : 'flex-1'}`}>
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                step.id < currentStep 
                  ? 'bg-barber-orange' 
                  : step.id === currentStep 
                  ? 'bg-barber-orange' 
                  : 'bg-barber-gray'
              }`}>
                {step.id < currentStep ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm ${step.id === currentStep ? 'text-white' : 'text-gray-400'}`}>
                    {step.id}
                  </span>
                )}
              </div>
              
              {/* Step name */}
              <span className={`mt-2 text-sm font-medium ${
                step.id <= currentStep ? 'text-barber-orange' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 ${
                  step.id < currentStep ? 'bg-barber-orange' : 'bg-barber-gray'
                }`} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BookingSteps;
