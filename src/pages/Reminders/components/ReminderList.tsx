import React from 'react';
import { Bell, Check, X, Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '../../../utils/format';
import { useReminders } from '../hooks/useReminders';
import { Reminder } from '../types';

interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  const { deleteReminder, sendReminder } = useReminders();

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este lembrete?')) {
      await deleteReminder(id);
    }
  };

  const handleSend = async (id: string) => {
    await sendReminder(id);
  };

  if (reminders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum lembrete encontrado
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-rose-500"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{reminder.text}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatDate(reminder.date)}</span>
                <span>{formatTime(reminder.time)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {reminder.status === 'pending' && (
                <button
                  onClick={() => handleSend(reminder.id)}
                  className="text-gray-400 hover:text-rose-600"
                >
                  <Bell className="w-5 h-5" />
                </button>
              )}
              {reminder.status === 'sent' && (
                <span className="text-green-500">
                  <Check className="w-5 h-5" />
                </span>
              )}
              {reminder.status === 'failed' && (
                <span className="text-red-500">
                  <X className="w-5 h-5" />
                </span>
              )}
              <button
                onClick={() => handleDelete(reminder.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}