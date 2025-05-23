
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CustomerInfoProps {
  onSubmit: (data: { name: string; whatsapp: string; cpf: string }) => void;
}

const CustomerInfo = ({ onSubmit }: CustomerInfoProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    cpf: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    whatsapp: '',
    cpf: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatWhatsApp = (value: string) => {
    // Remove all non-digit characters
    let digits = value.replace(/\D/g, '');
    
    // Format the phone number
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };
  
  const formatCPF = (value: string) => {
    // Remove all non-digit characters
    let digits = value.replace(/\D/g, '');
    
    // Format the CPF
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatWhatsApp(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: formattedValue }));
    
    if (errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formattedValue }));
    
    if (errors.cpf) {
      setErrors(prev => ({ ...prev, cpf: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }
    
    const whatsappDigits = formData.whatsapp.replace(/\D/g, '');
    if (!whatsappDigits) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
      valid = false;
    } else if (whatsappDigits.length < 10 || whatsappDigits.length > 11) {
      newErrors.whatsapp = 'WhatsApp inválido';
      valid = false;
    }
    
    if (formData.cpf) {
      const cpfDigits = formData.cpf.replace(/\D/g, '');
      if (cpfDigits.length !== 11) {
        newErrors.cpf = 'CPF inválido';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Pass the data to parent component
      onSubmit(formData);
      
      // Show toast notification
      toast({
        title: "Dados confirmados!",
        description: "Redirecionando para finalizar agendamento...",
        variant: "default",
      });
    }
  };

  return (
    <div className="booking-step">
      <h2 className="text-2xl font-semibold mb-6">Seus dados</h2>
      
      <form onSubmit={handleSubmit} className="bg-barber-gray border border-barber-light-gray rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome completo *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Digite seu nome completo"
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
              WhatsApp *
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              className="input-field"
              placeholder="(00) 00000-0000"
              maxLength={16}
            />
            {errors.whatsapp && <p className="mt-1 text-red-500 text-sm">{errors.whatsapp}</p>}
          </div>
          
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium mb-2">
              CPF (opcional)
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              value={formData.cpf}
              onChange={handleCpfChange}
              className="input-field"
              placeholder="000.000.000-00"
              maxLength={14}
            />
            {errors.cpf && <p className="mt-1 text-red-500 text-sm">{errors.cpf}</p>}
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-md font-medium w-full btn-finalizar"
            >
              Finalizar agendamento
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfo;
