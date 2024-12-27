import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { AppointmentForm } from './AppointmentForm';
import { formatDate, formatTime } from '../../utils/format';

interface Appointment {
  id: string;
  client: { name: string };
  service: { name: string; price: number };
  professional: { name: string };
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  async function loadAppointments() {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        start_time,
        end_time,
        status,
        client:clients(name),
        service:services(name, price),
        professional:professionals(name)
      `)
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())
      .order('start_time');

    if (error) {
      console.error('Error loading appointments:', error);
      return;
    }

    setAppointments(data || []);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="flex space-x-4 items-center">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="rounded-md border-gray-300"
        />
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`bg-white p-4 rounded-lg shadow-sm border-l-4 
              ${appointment.status === 'completed' ? 'border-green-500' : 
                appointment.status === 'cancelled' ? 'border-red-500' : 
                'border-blue-500'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{appointment.client.name}</h3>
                <p className="text-sm text-gray-500">{appointment.service.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(appointment.start_time)} às {formatTime(appointment.start_time)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  com {appointment.professional.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <AppointmentForm
          onClose={() => setIsFormOpen(false)}
          onSave={() => {
            loadAppointments();
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}