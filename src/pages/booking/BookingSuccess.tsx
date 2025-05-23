
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const booking = location.state?.booking;

  useEffect(() => {
    // If no booking data, redirect to booking page
    if (!booking) {
      navigate('/agendar');
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [booking, navigate]);

  // Format date for WhatsApp message
  const formatDate = (date: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getWhatsAppLink = () => {
    // In a real application, we would get the barber's WhatsApp from the backend
    const barberPhone = "5511999999999"; // Example phone
    
    const message = `Olá ${booking?.barber?.name}, você tem um novo agendamento com ${booking?.customer.name} para ${formatDate(booking?.date)} às ${booking?.time}. Serviço: ${booking?.service?.name}. Valor: R$ ${booking?.service?.price.toFixed(2)}.`;
    
    return `https://wa.me/${barberPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-barber-dark text-barber-light flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-lg mx-auto bg-barber-gray rounded-lg p-8 shadow-lg">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="progress-container mb-4">
                <div className="progress-bar animate-progress"></div>
              </div>
              <p className="text-xl">Enviando notificação...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center bg-green-500 bg-opacity-20 p-3 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Agendamento Confirmado!</h1>
                <p className="text-gray-300">Seu horário foi reservado com sucesso.</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-barber-orange font-semibold">Serviço</p>
                    <p className="text-gray-300">{booking?.service?.name}</p>
                  </div>
                  <div>
                    <p className="text-barber-orange font-semibold">Valor</p>
                    <p className="text-gray-300">R$ {booking?.service?.price?.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-barber-orange font-semibold">Barbeiro</p>
                    <p className="text-gray-300">{booking?.barber?.name}</p>
                  </div>
                  <div>
                    <p className="text-barber-orange font-semibold">Data e Hora</p>
                    <p className="text-gray-300">{formatDate(booking?.date)} às {booking?.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-barber-orange font-semibold">Cliente</p>
                  <p className="text-gray-300">{booking?.customer.name}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-md flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar agora
                </a>
                <Link to="/" className="text-center text-barber-orange hover:underline">
                  Voltar para a página inicial
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingSuccess;
