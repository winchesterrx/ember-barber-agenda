
import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, LogOut, Menu, X } from 'lucide-react';
import { Calendar, Clock, User, Scissors } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    // Check if user is authenticated
    const token = sessionStorage.getItem('barberToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    // Clear token and redirect to login
    sessionStorage.removeItem('barberToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Agendamentos', icon: <Calendar className="w-5 h-5" /> },
    { path: '/admin/horarios', label: 'Horários', icon: <Clock className="w-5 h-5" /> },
    { path: '/admin/perfil', label: 'Perfil', icon: <User className="w-5 h-5" /> },
    { path: '/admin/servicos', label: 'Serviços', icon: <Scissors className="w-5 h-5" /> }

  ];

  return (
    <div className="min-h-screen bg-barber-dark flex flex-col">
      {/* Top navbar */}
      <header className="bg-barber-gray border-b border-barber-light-gray">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-barber-orange font-bold text-2xl">Magic</span>
            <span className="font-semibold text-2xl">Barber</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-barber-light hover:text-barber-orange"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Desktop nav items */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-barber-light hover:text-barber-orange transition-colors px-3 py-2">
              Página Inicial
            </Link>
            <button
              onClick={handleLogout}
              className="text-barber-light hover:text-barber-orange transition-colors flex items-center gap-2 px-3 py-2"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </nav>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-barber-gray border-b border-barber-light-gray">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    isActive(item.path)
                      ? 'bg-barber-orange text-white'
                      : 'text-barber-light hover:bg-barber-dark'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-md text-barber-light hover:bg-barber-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Página Inicial
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-md text-barber-light hover:bg-barber-dark text-left w-full"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-barber-gray border-r border-barber-light-gray p-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Foto do barbeiro" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-md ${
                  isActive(item.path)
                    ? 'bg-barber-orange text-white'
                    : 'text-barber-light hover:bg-barber-dark'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-md text-barber-light hover:bg-barber-dark w-full"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </aside>
        
        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
