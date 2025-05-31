import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Progress } from '@/components/ui/progress';

const BookingSuccess = () => {
  const location = useLocation();
  const [booking] = useState(() => {
    if (location.state?.booking) return location.state.booking;
    const dados = localStorage.getItem('dados_agendamento');
    return dados ? JSON.parse(dados) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!booking) return;
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimer);
  }, [booking]);

  useEffect(() => {
    if (!isLoading && booking) {
      const intervalId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            // Abrir WhatsApp
            window.open(getWhatsAppLink(), '_blank');
            return 0;
          }
          return prev - 1;
        });
        setProgress(prev => prev + 20);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, booking]);

  // Format date for WhatsApp message
  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getWhatsAppLink = () => {
    if (!booking) return '';
    // Se quiser usar o número do barbeiro cadastrado, troque aqui:
    // const barberPhone = booking.barber?.whatsapp || "5517997799982";
    const barberPhone = "5517997799982";
    const message = `Olá! Novo agendamento confirmado pelo Magic Barber:
🧔 Cliente: ${booking.customer.name}
✂️ Serviço: ${booking.service?.name || booking.service?.nome}
📅 Data: ${formatDate(booking.date)}
⏰ Horário: ${booking.time}
💰 Valor: R$ ${(booking.service?.price || booking.service?.preco)?.toFixed(2)}`;
    return `https://wa.me/${barberPhone}?text=${encodeURIComponent(message)}`;
  };

  // Exibe mensagem amigável se não houver dados
  if (!booking) {
    return (
      <div className="min-h-screen bg-barber-dark text-barber-light flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4 flex items-center justify-center">
          <div className="bg-barber-gray border border-barber-light-gray rounded-lg p-8 shadow-lg bg-opacity-90 text-center">
            <h1 className="text-2xl font-bold mb-4">Nenhum agendamento recente encontrado.</h1>
            <Link to="/" className="text-barber-orange underline">Voltar para o início</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-barber-dark text-barber-light flex flex-col">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]" 
           style={{ backgroundImage: "url('/images/barber-shop-interior.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-lg mx-auto bg-barber-gray border border-barber-light-gray rounded-lg p-8 shadow-lg bg-opacity-90">
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
                    <p className="text-gray-300">{booking?.service?.name || booking?.service?.nome}</p>
                  </div>
                  <div>
                    <p className="text-barber-orange font-semibold">Valor</p>
                    <p className="text-gray-300">R$ {(booking?.service?.price || booking?.service?.preco)?.toFixed(2)}</p>
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
              
              <div className="mt-6">
                <p className="text-sm text-center mb-2">Abrindo WhatsApp em {countdown} segundos...</p>
                <Progress value={progress} className="h-2 mb-6" />
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <Link 
                  to="/"
                  onClick={() => {
                    localStorage.removeItem('agendamento_sucesso');
                    localStorage.removeItem('dados_agendamento');
                  }}
                  className="bg-barber-gray border border-barber-orange text-barber-orange hover:bg-barber-light-gray transition-colors px-6 py-3 rounded-md flex items-center justify-center gap-2 shadow-md btn-cancel"
                >
                  Início
                </Link>
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 btn-send"
                >
                  <Send className="w-5 h-5" />
                  Enviar agora
                </a>
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
