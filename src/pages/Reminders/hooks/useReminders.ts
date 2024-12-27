import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Reminder, ReminderFormData } from '../types';

export function useReminders() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReminders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    } catch (err) {
      setError((err as Error).message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addReminder = useCallback(async (reminder: ReminderFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('reminders')
        .insert([{
          ...reminder,
          status: 'pending'
        }]);

      if (error) throw error;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteReminder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendReminder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Aqui você implementaria a lógica de envio do lembrete
      // Por exemplo, usando um serviço de SMS ou email
      
      const { error } = await supabase
        .from('reminders')
        .update({ status: 'sent' })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    loadReminders,
    addReminder,
    deleteReminder,
    sendReminder
  };
}