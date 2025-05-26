import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Clock, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface TimeSlot {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

const days = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
];

const AdminSchedule = () => {
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: 'monday',
    start_time: '09:00',
    end_time: '09:30'
  });
  const [selectedDay, setSelectedDay] = useState('monday');

  useEffect(() => {
    const token = sessionStorage.getItem('barberToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const { id } = JSON.parse(token);
    fetch(`https://xofome.online/barbeariamagic/get_horarios_disponiveis.php?id_barbeiro=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const slots = data.horarios.map((h: any, index: number) => ({
            id: index + 1,
            day: h.dia_semana,
            start_time: h.horario_inicio,
            end_time: h.horario_fim,
            is_active: h.ativo === 1
          }));
          setTimeSlots(slots);
        }
        setLoading(false);
      });
  }, [navigate]);

  const handleToggleActive = (id: number) => {
    setTimeSlots(prevSlots => 
      prevSlots.map(slot => 
        slot.id === id ? { ...slot, is_active: !slot.is_active } : slot
      )
    );
  };

  const handleAddNewSlot = () => {
  const newId = timeSlots.length > 0 ? Math.max(...timeSlots.map(slot => slot.id)) + 1 : 1;
  const slot: TimeSlot = {
    id: newId,
    day: newSlot.day,
    start_time: newSlot.start_time,
    end_time: newSlot.end_time,
    is_active: true
  };

  console.log("🧩 Novo horário adicionado:", slot); // 👈 log útil para debug

  setTimeSlots(prev => [...prev, slot]);
  setIsAddingSlot(false);
};

  const handleSaveAll = () => {
    const token = sessionStorage.getItem('barberToken');
    if (!token) return;

    const { id: id_barbeiro } = JSON.parse(token);
    const payload = timeSlots.map(({ day, start_time, end_time, is_active }) => ({
      dia_semana: day,
      horario_inicio: start_time,
      horario_fim: end_time,
      ativo: is_active ? 1 : 0
    }));

    console.log("🔄 Enviando payload:", payload);

    fetch('https://xofome.online/barbeariamagic/salvar_horarios.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_barbeiro, horarios: payload })
    })
      .then(res => res.json())
      .then(data => {
        console.log("📥 Resposta da API:", data);
        if (data.success) alert('Horários salvos com sucesso!');
        else alert('Erro ao salvar horários: ' + data.message);
      })
      .catch(err => {
        console.error("❌ Erro na requisição:", err);
        alert('Erro de rede ao salvar horários');
      });
  };

  const filteredSlots = timeSlots.filter(slot => slot.day === selectedDay);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciar Horários</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSaveAll}
              className="bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-md"
            >
              Salvar Todos
            </button>
            <button
              onClick={() => setIsAddingSlot(true)}
              className="flex items-center gap-2 bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-4 py-2 rounded-md"
            >
              <Plus className="w-5 h-5" />
              Adicionar Horário
            </button>
          </div>
        </div>

        {isAddingSlot && (
          <div className="bg-barber-gray rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Novo Horário</h3>
              <button
                onClick={() => setIsAddingSlot(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dia da Semana</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="input-field"
                  name="day"
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hora Início</label>
                <input
                  type="time"
                  value={newSlot.start_time}
                  onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                  className="input-field"
                  name="start_time"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hora Fim</label>
                <input
                  type="time"
                  value={newSlot.end_time}
                  onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                  className="input-field"
                  name="end_time"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddNewSlot}
                className="bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-2 rounded-md"
              >
                Adicionar
              </button>
            </div>
          </div>
        )}

        <div className="bg-barber-gray rounded-lg p-6">
          <div className="overflow-x-auto">
            <div className="mb-6 bg-barber-dark rounded-lg p-2 inline-flex">
              {days.map((day) => (
                <button
                  key={day.value}
                  onClick={() => setSelectedDay(day.value)}
                  className={`px-4 py-2 rounded-lg ${selectedDay === day.value ? 'bg-barber-orange text-white' : 'text-gray-300'}`}
                >
                  {day.label.split('-')[0]}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-barber-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredSlots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`bg-barber-dark p-4 rounded-lg border ${slot.is_active ? 'border-barber-orange' : 'border-gray-600 opacity-50'}`}
                  data-slot-id={slot.id}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-barber-orange mr-2" />
                      <span className="text-sm font-medium">
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={slot.is_active}
                        onChange={() => handleToggleActive(slot.id)}
                        name={`slot_active_${slot.id}`}
                      />
                      <div className="w-9 h-5 bg-barber-light-gray rounded-full peer peer-checked:bg-barber-orange peer-focus:ring-1 peer-focus:ring-barber-orange peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                    </label>
                  </div>

                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{days.find(d => d.value === slot.day)?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhum horário cadastrado para este dia</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSchedule;
