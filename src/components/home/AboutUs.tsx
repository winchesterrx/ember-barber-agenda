import { Check } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="container mx-auto px-4 bg-black bg-opacity-70 rounded-xl py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Por que escolher a <span className="text-barber-orange">Magic Barber</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Somos uma barbearia premium dedicada a oferecer o melhor em estilo e cuidado masculino. 
              Nossa equipe de barbeiros experientes está comprometida em proporcionar uma experiência única de cuidado pessoal.
            </p>
            <ul className="space-y-4">
              {[ 
                'Barbeiros profissionais com anos de experiência',
                'Ambiente moderno e aconchegante',
                'Produtos de alta qualidade',
                'Sistema de agendamento fácil e rápido'
              ].map((item, index) => (
                <li key={index} className="flex items-start text-white">
                  <span className="mr-2 mt-1 bg-barber-orange p-1 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://xofome.online/barbeariamagic/fotos/background.jpeg"
                alt="Barbeiro profissional" 
                className="w-full h-full object-cover rounded-lg border border-gray-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-barber-orange text-white p-4 rounded-lg shadow-md">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-sm">Anos de experiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
