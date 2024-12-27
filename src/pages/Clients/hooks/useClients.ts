import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { Client, ClientFormData } from '../types';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadClients = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .eq('owner_id', user.id)
        .order('name');

      if (fetchError) throw fetchError;
      setClients(data || []);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createClient = useCallback(async (clientData: ClientFormData) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('clients')
        .insert([{
          ...clientData,
          owner_id: user.id,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;
      
      await loadClients();
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error('Error creating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadClients]);

  const updateClient = useCallback(async (id: string, clientData: ClientFormData) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .eq('owner_id', user.id);

      if (updateError) throw updateError;
      
      await loadClients();
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error('Error updating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadClients]);

  const deleteClient = useCallback(async (id: string) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id);

      if (deleteError) throw deleteError;
      
      await loadClients();
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error('Error deleting client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadClients]);

  return {
    clients,
    loading,
    error,
    loadClients,
    createClient,
    updateClient,
    deleteClient
  };
}