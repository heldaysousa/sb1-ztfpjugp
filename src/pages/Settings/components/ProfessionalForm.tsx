import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Professional } from '../../../types/professional';
import { useServices } from '../../../pages/Services/hooks/useServices';

interface ProfessionalFormProps {
  professional?: Professional | null;
  onClose: () => void;
  onSave: (data: Omit<Professional, 'id' | 'owner_id'>) => Promise<void>;
}

export function ProfessionalForm({ professional, onClose, onSave }: ProfessionalFormProps) {
  const { services, loadServices } = useServices();
  const [formData, setFormData] = useState({
    name: professional?.name || '',
    phone: professional?.phone || '',
    email: professional?.email || '',
    description: '',
    commission_rate: professional?.commission_rate || 0,
    active: professional?.active ?? true,
    services: [] as string[]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name) {
        throw new Error('Nome é obrigatório');
      }
      if (!formData.services.length) {
        throw new Error('Selecione pelo menos um serviço');
      }
      if (formData.commission_rate < 0 || formData.commission_rate > 100) {
        throw new Error('Taxa de comissão deve estar entre 0 e 100');
      }

      await onSave(formData);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {professional ? 'Editar Profissional' : 'Novo Profissional'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent-purple focus:ring-accent-purple"
              rows={3}
              placeholder="Descreva as especialidades e experiência do profissional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Serviços *
            </label>
            <div className="mt-2 space-y-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.id)}
                    onChange={(e) => {
                      const newServices = e.target.checked
                        ? [...formData.services, service.id]
                        : formData.services.filter(id => id !== service.id);
                      setFormData({ ...formData, services: newServices });
                    }}
                    className="rounded border-gray-300 text-accent-purple focus:ring-accent-purple"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {service.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Taxa de Comissão (%) *"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formData.commission_rate}
            onChange={(e) => setFormData({ ...formData, commission_rate: parseFloat(e.target.value) })}
            required
          />

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}