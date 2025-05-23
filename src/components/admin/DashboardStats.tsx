
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-barber-gray rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Agendamentos Hoje</h3>
            <p className="text-2xl font-semibold mt-1">5</p>
          </div>
          <div className="p-3 bg-barber-orange bg-opacity-10 rounded-lg">
            <Calendar className="w-6 h-6 text-barber-orange" />
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+3 desde ontem</span>
        </div>
      </div>
      
      <div className="bg-barber-gray rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Novos Clientes</h3>
            <p className="text-2xl font-semibold mt-1">12</p>
          </div>
          <div className="p-3 bg-barber-orange bg-opacity-10 rounded-lg">
            <Users className="w-6 h-6 text-barber-orange" />
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+7 esta semana</span>
        </div>
      </div>
      
      <div className="bg-barber-gray rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Serviços Realizados</h3>
            <p className="text-2xl font-semibold mt-1">87</p>
          </div>
          <div className="p-3 bg-barber-orange bg-opacity-10 rounded-lg">
            <Calendar className="w-6 h-6 text-barber-orange" />
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+12 este mês</span>
        </div>
      </div>
      
      <div className="bg-barber-gray rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Receita Mensal</h3>
            <p className="text-2xl font-semibold mt-1">R$ 3.475</p>
          </div>
          <div className="p-3 bg-barber-orange bg-opacity-10 rounded-lg">
            <DollarSign className="w-6 h-6 text-barber-orange" />
          </div>
        </div>
        <div className="flex items-center text-green-500 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+15% em relação ao mês anterior</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
