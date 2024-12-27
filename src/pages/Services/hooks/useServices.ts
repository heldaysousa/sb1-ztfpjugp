import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Service } from '../types';
import { useAuthStore } from '../../../store/authStore';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadServices = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('owner_id', user.id)
        .order('name');

      if (fetchError) throw fetchError;
      setServices(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createService = useCallback(async (serviceData: Omit<Service, 'id' | 'owner_id'>) => {
    if (!user) return false;

    try {
      const { error: insertError } = await supabase
        .from('services')
        .insert([{ ...serviceData, owner_id: user.id }]);

      if (insertError) throw insertError;
      await loadServices();
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  }, [user, loadServices]);

  return {
    services,
    loading,
    error,
    loadServices,
    createService
  };
}