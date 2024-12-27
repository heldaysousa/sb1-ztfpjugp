import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { ServiceForm } from './components/ServiceForm';
import { formatCurrency } from '../../utils/format';
import { useServices } from './hooks/useServices';
import { Service } from './types';

export default function Services() {
  const { services, loading, error, loadServices, deleteService } = useServices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
        <Button
          onClick={() => {
            setEditingService(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingService(service);
                    setIsFormOpen(true);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                Duração: {service.duration} min
              </span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(service.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setIsFormOpen(false);
            setEditingService(null);
          }}
          onSave={() => {
            loadServices();
            setIsFormOpen(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}