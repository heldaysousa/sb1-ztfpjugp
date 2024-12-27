import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

interface Settings {
  id: string;
  daily_revenue_goal: number;
  monthly_revenue_goal: number;
  default_commission_closing_day: number;
  default_commission_payment_deadline: number;
  default_commission_rate: number;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadSettings = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('business_settings')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          const { data: newSettings, error: createError } = await supabase
            .from('business_settings')
            .insert([{
              owner_id: user.id,
              daily_revenue_goal: 1000,
              monthly_revenue_goal: 30000,
              default_commission_closing_day: 5,
              default_commission_payment_deadline: 10,
              default_commission_rate: 30
            }])
            .select()
            .single();

          if (createError) throw createError;
          setSettings(newSettings);
          return;
        }
        throw fetchError;
      }

      setSettings(data);
    } catch (err) {
      console.error('Error loading settings:', err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateSettings = useCallback(async (updates: Partial<Settings>) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    try {
      const { error: updateError } = await supabase
        .from('business_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('owner_id', user.id);

      if (updateError) throw updateError;
      await loadSettings();
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  }, [user, loadSettings]);

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings
  };
}