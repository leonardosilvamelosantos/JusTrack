import React, { useState } from 'react';
import { Upload, MapPin, Phone } from 'lucide-react';
import { createLawyer } from '../lib/auth';

interface ProfileSetupFormProps {
  onComplete: (data: any) => void;
}

export const ProfileSetupForm = ({ onComplete }: ProfileSetupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    oabNumber: '',
    oabState: '',
    address: '',
    whatsapp: '',
    howFound: '',
    professionalDoc: null as File | null,
    oabPhoto: null as File | null,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const lawyer = await createLawyer({
        oabNumber: formData.oabNumber,
        name: formData.name,
        email: sessionStorage.getItem('tempEmail') || '', // Get email from session storage
        address: formData.address,
        whatsapp: formData.whatsapp,
        oabState: formData.oabState,
        howFound: formData.howFound
      });
      
      onComplete(lawyer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete seu Perfil</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número OAB
            </label>
            <input
              type="text"
              name="oabNumber"
              value={formData.oabNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado OAB
            </label>
            <select
              name="oabState"
              value={formData.oabState}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="BA">Bahia</option>
              <option value="ES">Espírito Santo</option>
              <option value="PE">Pernambuco</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline-block w-4 h-4 mr-1" />
            Endereço Completo
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rua, número, complemento, cidade, estado"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline-block w-4 h-4 mr-1" />
            WhatsApp
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="inline-block w-4 h-4 mr-1" />
              Documento Profissional (opcional)
            </label>
            <input
              type="file"
              name="professionalDoc"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="inline-block w-4 h-4 mr-1" />
              Foto da Carteira OAB (opcional)
            </label>
            <input
              type="file"
              name="oabPhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Como conheceu a plataforma?
          </label>
          <select
            name="howFound"
            value={formData.howFound}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="indicacao">Indicação</option>
            <option value="redes_sociais">Redes Sociais</option>
            <option value="pesquisa">Pesquisa Google</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
        >
          {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </button>
      </form>
    </div>
  );
};