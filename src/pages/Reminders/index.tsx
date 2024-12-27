import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ReminderForm } from './components/ReminderForm';
import { ReminderList } from './components/ReminderList';
import { useReminders } from './hooks/useReminders';
import { Reminder } from './types';

export default function Reminders() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { loadReminders, isLoading, error } = useReminders();

  useEffect(() => {
    loadAndSetReminders();
  }, []);

  async function loadAndSetReminders() {
    const data = await loadReminders();
    setReminders(data);
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Erro ao carregar lembretes: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Lembretes</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Lembrete
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
        </div>
      ) : (
        <ReminderList reminders={reminders} />
      )}

      {isFormOpen && (
        <ReminderForm
          onClose={() => setIsFormOpen(false)}
          onSave={() => {
            loadAndSetReminders();
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}