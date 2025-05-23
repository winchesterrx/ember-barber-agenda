
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import BookingCard from '@/components/admin/BookingCard';
import DashboardStats from '@/components/admin/DashboardStats';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const generateMockBookings = () => {
  const bookings = [];
  const services = ['Corte de Cabelo', 'Barba', 'Combo Completo', 'Pintura'];
  const statuses = ['pending', 'confirmed', 'cancelled'];
  
  // Generate today's bookings
  for (let i = 0; i < 5; i++) {
    const hour = 9 + i;
    const minute = Math.random() > 0.5 ? '00' : '30';
    const serviceIndex = Math.floor(Math.random() * services.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    bookings.push({
      id: `today-${i}`,
      customerName: `Cliente ${i + 1}`,
      phone: `(11) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      service: services[serviceIndex],
      time: `${hour}:${minute}`,
      status: statuses[statusIndex]
    });
  }
  
  return bookings;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = sessionStorage.getItem('barberToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Load bookings (simulated)
    setLoading(true);
    setTimeout(() => {
      setBookings(generateMockBookings());
      setLoading(false);
    }, 1000);
  }, [navigate, currentDate, viewMode]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const getViewTitle = () => {
    if (viewMode === 'day') {
      return formatDate(currentDate);
    } else if (viewMode === 'week') {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 6);
      return `${formatDate(currentDate)} - ${formatDate(endDate)}`;
    } else {
      return currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <DashboardStats />
        
        <div className="bg-barber-gray rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Agendamentos</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-barber-dark rounded-lg flex">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-lg text-sm ${viewMode === 'day' ? 'bg-barber-orange text-white' : 'text-gray-300'}`}
                >
                  Dia
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg text-sm ${viewMode === 'week' ? 'bg-barber-orange text-white' : 'text-gray-300'}`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-lg text-sm ${viewMode === 'month' ? 'bg-barber-orange text-white' : 'text-gray-300'}`}
                >
                  Mês
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6 bg-barber-dark p-4 rounded-lg">
            <button onClick={handlePreviousDay} className="p-2 hover:bg-barber-gray rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <button onClick={handleToday} className="text-sm bg-barber-gray hover:bg-barber-orange transition-colors px-3 py-1 rounded">
                Hoje
              </button>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-barber-orange" />
                {getViewTitle()}
              </h3>
            </div>
            
            <button onClick={handleNextDay} className="p-2 hover:bg-barber-gray rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-barber-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-barber-dark rounded-lg">
              <p className="text-gray-400">Nenhum agendamento para esta data</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
