import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import BookingSteps from '@/components/booking/BookingSteps';
import BarberSelection from '@/components/booking/BarberSelection';
import DateSelection from '@/components/booking/DateSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import CustomerInfo from '@/components/booking/CustomerInfo';
import AppointmentPreview from '@/components/booking/AppointmentPreview';

interface Service {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
  descricao: string;
  imagem: string;
}

interface Barber {
  id: number;
  name: string;
  photo: string;
  experience: string;
  whatsapp?: string;
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

interface TimeSlot {
  horario: string;
  disponivel: boolean;
}

// Componente para mostrar a mensagem de fidelidade
function MensagemFidelidade({ barbeiroId }: { barbeiroId: number }) {
  const [fidelidade, setFidelidade] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // Estado para debug opcional
  // const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!barbeiroId) {
      setFidelidade(null);
      return;
    }
    setLoading(true);
    // setErro(null);
    fetch(`https://xofome.online/barbeariamagic/buscar_fidelidade.php?barbeiro_id=${barbeiroId}`)
      .then(res => res.json())
      .then(data => {
        if (
          data.success &&
          data.data &&
          String(data.data.ativo).trim() === '1'
        ) {
          setFidelidade(data.data);
        } else {
          setFidelidade(null);
        }
        setLoading(false);
      })
      .catch((e) => {
        setFidelidade(null);
        setLoading(false);
        // setErro('Erro ao buscar configuração de fidelidade'); // só para debug
      });
  }, [barbeiroId]);

  if (loading || !fidelidade) return null;

  return (
    <div className="bg-barber-orange bg-opacity-20 border-l-4 border-barber-orange p-4 rounded mb-4 text-barber-orange font-medium">
      {fidelidade.tipo_regra === 'cortes'
        ? `Programa de Fidelidade: A cada ${fidelidade.cortes_necessarios} cortes, ganha 1 corte grátis!`
        : `Programa de Fidelidade: A cada R$${fidelidade.valor_necessario} em serviços, ganha 1 corte grátis!`}
    </div>
  );
}

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
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
    fetch('https://xofome.online/barbeariamagic/listar_servicos_publicos.php')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Erro ao buscar serviços:', err));
  }, []);

  useEffect(() => {
    if (bookingData.barber && bookingData.date) {
      const dayOfWeek = bookingData.date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
      const dateStr = bookingData.date.toISOString().split('T')[0];

      fetch(`https://xofome.online/barbeariamagic/horarios_disponiveis_filtrados.php?id_barbeiro=${bookingData.barber.id}&dia_semana=${dayOfWeek}&data=${dateStr}`)
        .then(res => res.json())
        .then(data => {
          const agora = new Date();
          const isToday = bookingData.date?.toDateString() === agora.toDateString();
          const horariosFiltrados = data.filter((slot: TimeSlot) => {
            if (!isToday) return true;
            const [h, m, s] = slot.horario.split(':');
            const slotDate = new Date();
            slotDate.setHours(Number(h), Number(m), Number(s));
            return slotDate > agora;
          });
          setAvailableTimes(horariosFiltrados);
        })
        .catch(() => setAvailableTimes([]));
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome_cliente: updatedBooking.customer.name,
        telefone: updatedBooking.customer.whatsapp,
        cpf: updatedBooking.customer.cpf,
        data: updatedBooking.date?.toISOString().split('T')[0],
        horario: updatedBooking.time,
        servico: updatedBooking.service?.nome,
        valor: updatedBooking.service?.preco ?? 0,
        barbeiro: updatedBooking.barber?.name,
        id_barbeiro: updatedBooking.barber?.id,
        id_servico: updatedBooking.service?.id
      })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.success) {
          alert(response.message || 'Erro ao salvar o agendamento.');
          return;
        }

        // Salva no localStorage para a página de sucesso
        localStorage.setItem('agendamento_sucesso', 'true');
        localStorage.setItem('dados_agendamento', JSON.stringify({
          service: updatedBooking.service,
          barber: updatedBooking.barber,
          date: updatedBooking.date,
          time: updatedBooking.time,
          customer: updatedBooking.customer
        }));

        const dataFormatada = updatedBooking.date?.toLocaleDateString('pt-BR') ?? '';
        const msg = `Novo agendamento confirmado! ✂️\n\n👤 Cliente: ${updatedBooking.customer.name}\n📞 WhatsApp: ${updatedBooking.customer.whatsapp}\n💈 Serviço: ${updatedBooking.service?.nome}\n✂️ Barbeiro: ${updatedBooking.barber?.name}\n📅 Data: ${dataFormatada}\n⏰ Horário: ${updatedBooking.time}`;

        // Formata o número de WhatsApp do barbeiro, removendo qualquer caractere que não seja dígito
        const numeroFormatado = updatedBooking.barber?.whatsapp?.replace(/\D/g, '');
        const link = `https://wa.me/55${numeroFormatado}?text=${encodeURIComponent(msg)}`;

        window.location.href = link;

        navigate('/agendamento/sucesso', {
          state: {
            booking: {
              service: updatedBooking.service,
              barber: updatedBooking.barber,
              date: updatedBooking.date?.toISOString(),
              time: updatedBooking.time,
              customer: updatedBooking.customer
            }
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
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((servico) => (
              <div
                key={servico.id}
                className={`cursor-pointer border p-4 rounded-xl bg-[#1f1f1f] transition duration-200 hover:border-orange-500 ${
                  bookingData.service?.id === servico.id ? 'border-orange-500' : 'border-transparent'
                }`}
                onClick={() => handleServiceSelect(servico)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-orange-500 text-lg">✂️</span>
                  {servico.imagem ? (
                    <img
                      src={`https://xofome.online/barbeariamagic/${servico.imagem}`}
                      alt={servico.nome}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-avatar.png';
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                  )}
                </div>
                <h3 className="text-white font-semibold">{servico.nome}</h3>
                <p className="text-gray-400 text-sm mb-2">{servico.descricao}</p>
                <div className="flex justify-between text-sm text-orange-400">
                  <span>🕒 {servico.duracao} min</span>
                  <span>R$ {parseFloat(servico.preco.toString()).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        );
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
            {/* Mensagem de fidelidade só aparece se o barbeiro foi selecionado e o programa está ativo */}
            {bookingData.barber && (
              <MensagemFidelidade barbeiroId={bookingData.barber.id} />
            )}
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
