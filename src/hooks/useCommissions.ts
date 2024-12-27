import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Commission } from '../types/professional';

export function useCommissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadCommissions = useCallback(async (
    startDate: string,
    endDate: string,
    status?: 'pending' | 'paid' | 'cancelled',
    professionalId?: string
  ) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('commissions')
        .select(`
          *,
          professionals (name),
          appointments (
            date,
            services (name)
          )
        `)
        .eq('owner_id', user.id)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      if (professionalId) {
        query = query.eq('professional_id', professionalId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setCommissions(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const payCommission = useCallback(async (id: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error: updateError } = await supabase
        .from('commissions')
        .update({
          status: 'paid',
          payment_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('owner_id', user.id);

      if (updateError) throw updateError;
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    commissions,
    loading,
    error,
    loadCommissions,
    payCommission
  };
}