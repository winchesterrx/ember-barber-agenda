
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-barber-orange">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-barber-orange" />
                <span className="text-gray-300">Rua Itacolomi, 3831 - Vila Marim, Votuporanga- SP</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-barber-orange" />
                <a href="tel:+5517997799982" className="text-gray-300 hover:text-barber-orange transition-colors">
                  (17) 99779-9982
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-barber-orange" />
                <a href="mailto:contato@magicbarber.com" className="text-gray-300 hover:text-barber-orange transition-colors">
                  contato@magicbarber.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-barber-orange">Horários</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-barber-orange" />
                <div>
                  <p className="text-gray-300">Segunda a Sexta</p>
                  <p className="text-gray-400">09:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-barber-orange" />
                <div>
                  <p className="text-gray-300">Sábado</p>
                  <p className="text-gray-400">09:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-barber-orange" />
                <div>
                  <p className="text-gray-300">Domingo</p>
                  <p className="text-gray-400">Fechado</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Social & Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-barber-orange">Redes Sociais</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://instagram.com/magicbarber" target="_blank" rel="noopener noreferrer" className="bg-barber-gray hover:bg-barber-orange transition-colors p-2 rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/magicbarber" target="_blank" rel="noopener noreferrer" className="bg-barber-gray hover:bg-barber-orange transition-colors p-2 rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-barber-orange">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/agendar" className="text-gray-300 hover:text-barber-orange transition-colors">
                  Agendar Horário
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-300 hover:text-barber-orange transition-colors">
                  Área do Barbeiro
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-barber-gray pt-6">
  <p className="text-center text-gray-500 text-sm">
    &copy; {new Date().getFullYear()} Magic Barber - Todos os direitos reservados
  </p>
  <p className="text-center text-gray-500 text-sm">
    Desenvolvido por Gabriel Silva
  </p>
</div>

      </div>
    </footer>
  );
};

export default Footer;
