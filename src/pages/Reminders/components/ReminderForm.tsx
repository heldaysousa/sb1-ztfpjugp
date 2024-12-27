import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useReminders } from '../hooks/useReminders';

interface ReminderFormProps {
  onClose: () => void;
  onSave: () => void;
}

export function ReminderForm({ onClose, onSave }: ReminderFormProps) {
  const { addReminder } = useReminders();
  const [formData, setFormData] = useState({
    text: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
    client_id: '',
    service_id: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.text.trim()) {
      newErrors.text = 'Texto é obrigatório';
    }
    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório';
    }
    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await addReminder(formData);
      onSave();
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar lembrete' });
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Novo Lembrete
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Texto do Lembrete"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            error={errors.text}
          />

          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
          />

          <Input
            label="Horário"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            error={errors.time}
          />

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}