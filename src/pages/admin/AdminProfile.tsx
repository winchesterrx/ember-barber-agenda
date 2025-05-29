
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Save, Camera } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Marcio Silva',
    whatsapp: '(11) 99999-9999',
    email: 'admin@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952');
  
  useEffect(() => {
    // Check if user is authenticated
    const token = sessionStorage.getItem('barberToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
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

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatWhatsApp(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: formattedValue }));
    
    if (errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    
    // Only validate password fields if any of them is filled
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Senha atual é obrigatória';
        valid = false;
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = 'Nova senha é obrigatória';
        valid = false;
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Nova senha deve ter pelo menos 6 caracteres';
        valid = false;
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirme a nova senha';
        valid = false;
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Clear the success message after a few seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Erro ao salvar as alterações. Tente novamente.' }));
    } finally {
      setSaving(false);
    }
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
              {/* Profile image */}
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
                      onChange={handleImageChange}
                      name="profile_image"
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-400">Recomendado: 300x300px</p>
              </div>
              
              {/* Form fields */}
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
            
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">Alterar Senha</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                    Senha atual
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="••••••"
                    />
                  </div>
                  {errors.currentPassword && <p className="mt-1 text-red-500 text-sm">{errors.currentPassword}</p>}
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                    Nova senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="••••••"
                    />
                  </div>
                  {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
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
