import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BookingSteps from '@/components/booking/BookingSteps';
import ServiceSelection from '@/components/booking/ServiceSelection';
import BarberSelection from '@/components/booking/BarberSelection';
import DateSelection from '@/components/booking/DateSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import CustomerInfo from '@/components/booking/CustomerInfo';

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface Barber {
  id: number;
  name: string;
  photo: string;
  experience: string;
}

interface BookingData {
  service: Service | null;
  barber: Barber | null;
  date: Date | null;
  time: string | null;
  customer: {
    name: string;
    whatsapp: string;
    cpf: string;
  };
}

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    barber: null,
    date: null,
    time: null,
    customer: {
      name: '',
      whatsapp: '',
      cpf: ''
    }
  });

  useEffect(() => {
    if (bookingData.barber && bookingData.date) {
      const dateStr = bookingData.date.toISOString().split('T')[0];
      fetch('https://xofome.online/barbeariamagic/get_horarios_disponiveis_para_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_barbeiro: bookingData.barber.id,
          data: dateStr
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAvailableTimes(data.horarios.map((h: any) => h.horario_inicio));
          } else {
            setAvailableTimes([]);
          }
        })
        .catch(() => {
          setAvailableTimes([]);
        });
    }
  }, [bookingData.barber, bookingData.date]);

  const handleServiceSelect = (service: Service) => {
    setBookingData(prev => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleBarberSelect = (barber: Barber) => {
    setBookingData(prev => ({ ...prev, barber }));
    setCurrentStep(3);
  };

  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({ ...prev, date }));
    setCurrentStep(4);
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }));
    setCurrentStep(5);
  };

  const handleCustomerSubmit = (customerData: { name: string; whatsapp: string; cpf: string }) => {
    const updatedBooking: BookingData = {
      ...bookingData,
      customer: customerData
    };

    setBookingData(updatedBooking);

    fetch('https://xofome.online/barbeariamagic/salvar_agendamento.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_cliente: updatedBooking.customer.name,
        telefone: updatedBooking.customer.whatsapp,
        cpf: updatedBooking.customer.cpf,
        data: updatedBooking.date?.toISOString().split('T')[0],
        horario: updatedBooking.time,
        servico: updatedBooking.service?.name,
        valor: updatedBooking.service?.price ?? 0,
        barbeiro: updatedBooking.barber?.name,
        id_barbeiro: updatedBooking.barber?.id
      })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.success) {
          alert(response.message || 'Erro ao salvar o agendamento.');
          return;
        }

        const dataFormatada = updatedBooking.date?.toLocaleDateString('pt-BR') ?? '';
        const msg = `Novo agendamento confirmado! ✂️\n\n👤 Cliente: ${updatedBooking.customer.name}\n📞 WhatsApp: ${updatedBooking.customer.whatsapp}\n💈 Serviço: ${updatedBooking.service?.name}\n✂️ Barbeiro: ${updatedBooking.barber?.name}\n📅 Data: ${dataFormatada}\n⏰ Horário: ${updatedBooking.time}`;

        const link = `https://wa.me/5517997799982?text=${encodeURIComponent(msg)}`;
        window.location.href = link;

        const serializableBooking = {
          service: {
            name: updatedBooking.service?.name,
            price: updatedBooking.service?.price
          },
          barber: {
            name: updatedBooking.barber?.name
          },
          date: updatedBooking.date?.toISOString(),
          time: updatedBooking.time,
          customer: updatedBooking.customer
        };

        navigate('/agendamento/sucesso', {
          state: {
            booking: serializableBooking
          }
        });
      })
      .catch(error => {
        console.error("Erro ao salvar o agendamento:", error);
        alert("Houve um erro ao processar seu agendamento. Tente novamente.");
      });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection onSelect={handleServiceSelect} />;
      case 2:
        return <BarberSelection onSelect={handleBarberSelect} />;
      case 3:
        return <DateSelection onSelect={handleDateSelect} />;
      case 4:
        return (
          <TimeSelection
            onSelect={handleTimeSelect}
            availableTimes={availableTimes}
            serviceId={bookingData.service?.id || 0}
            barberId={bookingData.barber?.id || 0}
            date={bookingData.date}
          />
        );
      case 5:
        return <CustomerInfo onSubmit={handleCustomerSubmit} />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-barber-dark text-barber-light flex flex-col">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: "url('/images/barber-shop-interior.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      <Navbar />

      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Agendar Serviço</h1>

        <BookingSteps currentStep={currentStep} />

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-barber-gray bg-opacity-90 rounded-lg p-6 shadow-lg border border-barber-light-gray">
            {renderStepContent()}

            {currentStep > 1 && (
              <div className="mt-8 flex justify-start">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-barber-orange hover:underline hover:text-opacity-90 transition-colors btn-back"
                >
                  ← Voltar para etapa anterior
                </button>
              </div>
            )}
          </div>

          {currentStep < 5 && (
            <div className="bg-gradient-to-b from-barber-gray to-barber-dark h-4 mt-6 rounded-b-lg mx-auto max-w-4xl"></div>
          )}
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Booking;
