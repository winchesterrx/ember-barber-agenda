import { useEffect, useState } from 'react';
import { Calendar, Users, CalendarCheck, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const [dados, setDados] = useState<{
    agendamentos_hoje: number;
    novos_clientes: number;
    servicos_realizados: number;
    receita_mensal: string;
  } | null>(null);

  useEffect(() => {
    fetch('https://xofome.online/barbeariamagic/dashboard_stats.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDados(data);
      });
  }, []);

  if (!dados) return <div className="text-white">Carregando...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-barber-dark p-4 rounded-lg text-white">
        <p className="text-sm text-gray-400">Agendamentos Hoje</p>
        <h3 className="text-3xl font-bold">{dados.agendamentos_hoje}</h3>
        <p className="text-green-500 text-xs mt-2">+X desde ontem</p>
        <Calendar className="w-5 h-5 text-barber-orange mt-2" />
      </div>
      <div className="bg-barber-dark p-4 rounded-lg text-white">
        <p className="text-sm text-gray-400">Novos Clientes</p>
        <h3 className="text-3xl font-bold">{dados.novos_clientes}</h3>
        <p className="text-green-500 text-xs mt-2">+Y esta semana</p>
        <Users className="w-5 h-5 text-barber-orange mt-2" />
      </div>
      <div className="bg-barber-dark p-4 rounded-lg text-white">
        <p className="text-sm text-gray-400">Serviços Realizados</p>
        <h3 className="text-3xl font-bold">{dados.servicos_realizados}</h3>
        <p className="text-green-500 text-xs mt-2">+Z este mês</p>
        <CalendarCheck className="w-5 h-5 text-barber-orange mt-2" />
      </div>
      <div className="bg-barber-dark p-4 rounded-lg text-white">
        <p className="text-sm text-gray-400">Receita Mensal</p>
        <h3 className="text-3xl font-bold">R$ {dados.receita_mensal}</h3>
        <p className="text-green-500 text-xs mt-2">+15% em relação ao mês anterior</p>
        <DollarSign className="w-5 h-5 text-barber-orange mt-2" />
      </div>
    </div>
  );
};

export default DashboardStats;
