import React, { useState, useEffect } from 'react';
import { Plus, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { ClientForm } from './ClientForm';
import { formatDate } from '../../utils/format';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error loading clients:', error);
      return;
    }
    
    setClients(data || []);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <Button
          onClick={() => {
            setEditingClient(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-6 rounded-lg shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">
                {client.name}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingClient(client);
                  setIsFormOpen(true);
                }}
              >
                Editar
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {client.phone}
              </div>
              {client.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Cliente desde {formatDate(client.created_at)}
              </div>
            </div>

            {client.notes && (
              <p className="text-sm text-gray-600 border-t pt-2">
                {client.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ClientForm
          client={editingClient}
          onClose={() => {
            setIsFormOpen(false);
            setEditingClient(null);
          }}
          onSave={() => {
            loadClients();
            setIsFormOpen(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
}