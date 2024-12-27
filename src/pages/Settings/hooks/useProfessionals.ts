import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { Professional } from '../../../types/professional';

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadProfessionals = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('professionals')
        .select('*')
        .eq('owner_id', user.id)
        .eq('active', true)
        .order('name');

      if (fetchError) throw fetchError;
      setProfessionals(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createProfessional = useCallback(async (data: Omit<Professional, 'id' | 'owner_id'>) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error: insertError } = await supabase
        .from('professionals')
        .insert([{
          ...data,
          owner_id: user.id
        }]);

      if (insertError) throw insertError;
      await loadProfessionals();
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadProfessionals]);

  const updateProfessional = useCallback(async (id: string, data: Partial<Professional>) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error: updateError } = await supabase
        .from('professionals')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('owner_id', user.id);

      if (updateError) throw updateError;
      await loadProfessionals();
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadProfessionals]);

  return {
    professionals,
    loading,
    error,
    loadProfessionals,
    createProfessional,
    updateProfessional
  };
}