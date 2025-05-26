import { useState, useEffect } from 'react';

const diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

const horariosPadrao = [
  { inicio: '09:00', fim: '09:30' },
  { inicio: '09:30', fim: '10:00' },
  { inicio: '10:00', fim: '10:30' },
  { inicio: '11:00', fim: '11:30' },
  { inicio: '14:00', fim: '14:30' },
  { inicio: '15:00', fim: '15:30' },
  { inicio: '16:00', fim: '16:30' },
];

const ManageSchedule = () => {
  const token = sessionStorage.getItem('barberToken');
  const { id: id_barbeiro } = JSON.parse(token);

  const [horarios, setHorarios] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  // Inicializa todos os dias e horários com false
  useEffect(() => {
    const init: any = {};
    diasDaSemana.forEach((dia) => {
      init[dia] = {};
      horariosPadrao.forEach((h) => {
        const key = `${h.inicio}-${h.fim}`;
        init[dia][key] = false;
      });
    });
    setHorarios(init);
  }, []);

  const toggleHorario = (dia: string, intervalo: string) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [intervalo]: !prev[dia][intervalo],
      },
    }));
  };

  const salvarHorarios = () => {
    const payload: any[] = [];

    for (const dia of diasDaSemana) {
      for (const intervalo in horarios[dia]) {
        const ativo = horarios[dia][intervalo];
        if (ativo) {
          const [inicio, fim] = intervalo.split('-');
          payload.push({
            dia_semana: dia,
            horario_inicio: inicio.trim(),
            horario_fim: fim.trim(),
            ativo: 1,
          });
        }
      }
    }

    fetch('https://xofome.online/barbeariamagic/salvar_horarios.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_barbeiro,
        horarios: payload,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Horários salvos com sucesso!');
        } else {
          alert('Erro ao salvar horários');
        }
      });
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Horários</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {diasDaSemana.map((dia) => (
          <div key={dia} className="bg-barber-dark p-4 rounded-lg">
            <h2 className="text-xl capitalize mb-2">{dia}</h2>
            {horariosPadrao.map(({ inicio, fim }) => {
              const key = `${inicio}-${fim}`;
              return (
                <div key={key} className="flex items-center justify-between my-2">
                  <span>{inicio} - {fim}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={horarios[dia]?.[key] || false}
                      onChange={() => toggleHorario(dia, key)}
                    />
                    <div className={`w-10 h-5 bg-gray-400 rounded-full ${horarios[dia]?.[key] ? 'bg-orange-500' : ''}`}></div>
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button onClick={salvarHorarios} className="bg-barber-orange px-6 py-2 rounded hover:bg-orange-600 transition">
          Salvar Horários
        </button>
      </div>
    </div>
  );
};

export default ManageSchedule;
