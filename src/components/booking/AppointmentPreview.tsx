import { Clock, User, Scissors, MapPin, Calendar, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointment: {
    clientName: string;
    service: string;
    date: Date;
    location: string;
    price: number;
    duration: number;
    barber: string;
  };
}

export function AppointmentPreview({
  isOpen,
  onClose,
  onConfirm,
  appointment,
}: AppointmentPreviewProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Confirmar Agendamento</h2>
            <p className="mt-2 text-sm text-gray-500">
              Revise os detalhes do seu agendamento antes de confirmar
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {format(appointment.date, "EEEE, d 'de' MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(appointment.date, "HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                  {appointment.duration} min
                </span>
              </div>
            </div>

            <div className="grid gap-4 rounded-xl border p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.clientName}</p>
                  <p className="text-sm text-gray-500">Cliente</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Scissors className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.service}</p>
                  <p className="text-sm text-gray-500">Serviço</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.location}</p>
                  <p className="text-sm text-gray-500">Local</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.barber}</p>
                  <p className="text-sm text-gray-500">Barbeiro</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Valor Total</p>
                    <p className="text-sm text-gray-500">Pagamento no local</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  R$ {appointment.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
