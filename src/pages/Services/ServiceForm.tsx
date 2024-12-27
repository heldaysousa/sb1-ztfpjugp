import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/authStore';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
  onSave: () => void;
}

export function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    duration: service?.duration || 30,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    if (formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm() || !user) return;

    const serviceData = {
      ...formData,
      owner_id: user.id // Add owner_id to the service data
    };

    if (service?.id) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', service.id);

      if (error) {
        console.error('Error updating service:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        console.error('Error creating service:', error);
        return;
      }
    }

    onSave();
  }

  // Rest of the component remains the same...