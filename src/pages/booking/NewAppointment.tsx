import { useState } from 'react';
import { AppointmentPreview } from '@/components/booking/AppointmentPreview';

export function NewAppointment() {
  const [showPreview, setShowPreview] = useState(false);
  const [appointment, setAppointment] = useState({
    clientName: 'João Silva',
    service: 'Corte + Barba',
    date: new Date(),
    location: 'Unidade Centro',
    price: 45.00,
    duration: 30,
    barber: 'Carlos Oliveira'
  });

  const handleConfirm = () => {
    // Aqui você pode implementar a lógica para salvar o agendamento
    console.log('Agendamento confirmado:', appointment);
    setShowPreview(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Novo Agendamento</h1>

      {/* Formulário de agendamento aqui */}
      <div className="rounded-lg border bg-white p-6">
        {/* ... campos do formulário ... */}
        
        <button
          onClick={() => setShowPreview(true)}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Agendar
        </button>
      </div>

      {/* Preview do agendamento */}
      <AppointmentPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirm}
        appointment={appointment}
      />
    </div>
  );
}
