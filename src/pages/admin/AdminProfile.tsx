import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Save, Camera } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [barberId, setBarberId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('barberToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const barber = JSON.parse(token);
    if (!barber || !barber.id) {
      navigate('/admin/login');
      return;
    }

    setBarberId(Number(barber.id));

    fetch(`https://xofome.online/barbeariamagic/get_barbeiro_por_id.php?id=${barber.id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(prev => ({
          ...prev,
          name: data.nome,
          whatsapp: data.whatsapp,
          email: data.email
        }));
        setProfileImage(data.foto_url);
      });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const formatWhatsApp = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatWhatsApp(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: formattedValue }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !barberId) return;
    setSaving(true);

    fetch('https://xofome.online/barbeariamagic/atualizar_perfil_barbeiro.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: barberId,
        nome: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        } else {
          setErrors(prev => ({ ...prev, general: 'Erro ao salvar alterações' }));
        }
      })
      .catch(() => setErrors(prev => ({ ...prev, general: 'Erro de conexão' })))
      .finally(() => setSaving(false));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Perfil do Barbeiro</h1>
        <div className="bg-barber-gray rounded-lg p-6">
          {saveSuccess && (
            <div className="mb-6 p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded text-green-500">
              Alterações salvas com sucesso!
            </div>
          )}
          {errors.general && (
            <div className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-500">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-barber-dark">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Foto do perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-barber-light opacity-30" />
                      </div>
                    )}
                  </div>
                  <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-barber-orange p-2 rounded-full cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={() => {}}
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-400">Recomendado: 300x300px</p>
              </div>
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="text"
                        value={formData.whatsapp}
                        onChange={handleWhatsAppChange}
                        className="input-field pl-10"
                        placeholder="(00) 00000-0000"
                        maxLength={16}
                      />
                    </div>
                    {errors.whatsapp && <p className="mt-1 text-red-500 text-sm">{errors.whatsapp}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-barber-orange hover:bg-opacity-90 transition-colors text-white px-6 py-3 rounded-md flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
