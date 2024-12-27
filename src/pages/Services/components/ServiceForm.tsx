import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Service } from '../types';
import { useServices } from '../hooks/useServices';
import { useSettings } from '../../Settings/hooks/useSettings';

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
  onSave: () => void;
}

export function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const { createService, updateService } = useServices();
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    duration: service?.duration || 30,
    commission_rate: service?.commission_rate || settings?.default_commission_rate || 30
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    if (formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }
    if (formData.commission_rate < 0 || formData.commission_rate > 100) {
      newErrors.commission_rate = 'Taxa de comissão deve estar entre 0 e 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let success;
      
      if (service?.id) {
        success = await updateService(service.id, formData);
      } else {
        success = await createService(formData);
      }

      if (success) {
        onSave();
      }
    } catch (error) {
      console.error('Error saving service:', error);
      setErrors({ submit: 'Erro ao salvar serviço' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {service ? 'Editar Serviço' : 'Novo Serviço'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={isSubmitting}
          />

          <Input
            label="Descrição"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={isSubmitting}
          />

          <Input
            label="Preço"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            error={errors.price}
            disabled={isSubmitting}
          />

          <Input
            label="Duração (minutos)"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            error={errors.duration}
            disabled={isSubmitting}
          />

          <Input
            label="Taxa de Comissão (%)"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formData.commission_rate}
            onChange={(e) => setFormData({ ...formData, commission_rate: parseFloat(e.target.value) })}
            error={errors.commission_rate}
            disabled={isSubmitting}
          />

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : service ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}