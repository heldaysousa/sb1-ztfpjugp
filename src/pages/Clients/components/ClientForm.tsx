import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Client, ClientFormData } from '../types';
import { useClients } from '../hooks/useClients';
import { validatePhone } from '../../../utils/validation';

interface ClientFormProps {
  client?: Client | null;
  onClose: () => void;
  onSave: () => void;
}

const REFERRAL_SOURCES = [
  { value: 'social_media', label: 'Redes Sociais' },
  { value: 'referral', label: 'Indicação' },
  { value: 'neighborhood', label: 'Vizinhança' },
  { value: 'other', label: 'Outro' }
];

export function ClientForm({ client, onClose, onSave }: ClientFormProps) {
  const { createClient, updateClient } = useClients();
  const [formData, setFormData] = useState<ClientFormData>({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    notes: client?.notes || '',
    first_visit_date: client?.first_visit_date || new Date().toISOString().split('T')[0],
    birthday: client?.birthday || '',
    social_media: client?.social_media || {},
    referral_source: client?.referral_source || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }
    if (!formData.first_visit_date) {
      newErrors.first_visit_date = 'Data do primeiro atendimento é obrigatória';
    }
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const success = client?.id 
      ? await updateClient(client.id, formData)
      : await createClient(formData);

    if (success) {
      onSave();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-10">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {client ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <Input
              label="Telefone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Data do Primeiro Atendimento *"
              type="date"
              value={formData.first_visit_date}
              onChange={(e) => setFormData({ ...formData, first_visit_date: e.target.value })}
              error={errors.first_visit_date}
            />

            <Input
              label="Data de Aniversário"
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Como nos conheceu?
              </label>
              <select
                value={formData.referral_source}
                onChange={(e) => setFormData({ ...formData, referral_source: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-purple focus:ring-accent-purple"
              >
                <option value="">Selecione uma opção</option>
                {REFERRAL_SOURCES.map(source => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Instagram"
                value={formData.social_media?.instagram || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    instagram: e.target.value
                  }
                })}
                placeholder="@usuario"
              />

              <Input
                label="Facebook"
                value={formData.social_media?.facebook || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    facebook: e.target.value
                  }
                })}
                placeholder="facebook.com/usuario"
              />

              <Input
                label="TikTok"
                value={formData.social_media?.tiktok || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  social_media: {
                    ...formData.social_media,
                    tiktok: e.target.value
                  }
                })}
                placeholder="@usuario"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-purple focus:ring-accent-purple"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {client ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}