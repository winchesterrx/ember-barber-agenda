
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-barber-dark border-b border-barber-gray">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-barber-orange font-bold text-2xl">Magic</span>
          <span className="font-semibold text-2xl">Barber</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-barber-light hover:text-barber-orange"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-barber-light hover:text-barber-orange transition-colors">
            Home
          </Link>
          <Link to="/agendar" className="text-barber-light hover:text-barber-orange transition-colors">
            Serviços
          </Link>
          <Link to="/admin/login" className="text-barber-light hover:text-barber-orange transition-colors">
            Área do Barbeiro
          </Link>
          <Link to="/agendar" className="btn-primary">
            Agendar Horário
          </Link>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-barber-dark border-b border-barber-gray z-50">
            <div className="flex flex-col p-4 gap-4">
              <Link 
                to="/" 
                className="text-barber-light hover:text-barber-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/agendar" 
                className="text-barber-light hover:text-barber-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                to="/admin/login" 
                className="text-barber-light hover:text-barber-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Área do Barbeiro
              </Link>
              <Link 
                to="/agendar" 
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Horário
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
