
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-barber-dark py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Pronto para uma <span className="text-barber-orange">transformação</span>?
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Nossos barbeiros especializados estão prontos para oferecer o melhor em estilo e cuidado para você.
        </p>
        <Link 
          to="/agendar" 
          className="bg-barber-orange hover:bg-opacity-90 transition-all text-white px-8 py-4 rounded-md text-lg font-medium animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Agendar Horário
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-barber-orange opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-barber-orange opacity-10"></div>
    </section>
  );
};

export default HeroSection;
