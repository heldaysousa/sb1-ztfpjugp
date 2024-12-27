import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Client {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Professional {
  id: string;
  name: string;
}

interface AppointmentFormProps {
  onClose: () => void;
  onSave: () => void;
}

export function AppointmentForm({ onClose, onSave }: AppointmentFormProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  
  const [formData, setFormData] = useState({
    client_id: '',
    service_id: '',
    professional_id: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadClients();
    loadServices();
    loadProfessionals();
  }, []);

  async function loadClients() {
    const { data } = await supabase.from('clients').select('id, name');
    setClients(data || []);
  }

  async function loadServices() {
    const { data } = await supabase.from('services').select('id, name, duration, price');
    setServices(data || []);
  }

  async function loadProfessionals() {
    const { data } = await supabase.from('professionals').select('id, name');
    setProfessionals(data || []);
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.client_id) newErrors.client_id = 'Cliente é obrigatório';
    if (!formData.service_id) newErrors.service_id = 'Serviço é obrigatório';
    if (!formData.professional_id) newErrors.professional_id = 'Profissional é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Horário é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    const service = services.find(s => s.id === formData.service_id);
    if (!service) return;

    const startTime = new Date(`${formData.date}T${formData.time}`);
    const endTime = new Date(startTime.getTime() + service.duration * 60000);

    const { error } = await supabase
      .from('appointments')
      .insert([{
        client_id: formData.client_id,
        service_id: formData.service_id,
        professional_id: formData.professional_id,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'scheduled',
        price: service.price
      }]);

    if (error) {
      console.error('Error creating appointment:', error);
      return;
    }

    onSave();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Novo Agendamento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              value={formData.client_id}
              onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.client_id && (
              <p className="text-sm text-red-600">{errors.client_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serviço
            </label>
            <select
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service_id && (
              <p className="text-sm text-red-600">{errors.service_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profissional
            </label>
            <select
              value={formData.professional_id}
              onChange={(e) => setFormData({ ...formData, professional_id: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            >
              <option value="">Selecione um profissional</option>
              {professionals.map((professional) => (
                <option key={professional.id} value={professional.id}>
                  {professional.name}
                </option>
              ))}
            </select>
            {errors.professional_id && (
              <p className="text-sm text-red-600">{errors.professional_id}</p>
            )}
          </div>

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

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Agendar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}