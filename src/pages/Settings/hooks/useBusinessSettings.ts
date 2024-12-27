import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

interface BusinessSettings {
  id: string;
  owner_id: string;
  business_hours: Record<string, { start: string; end: string } | null>;
  commission_payment_day?: number;
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  daily_revenue_goal: number;
  monthly_revenue_goal: number;
}

export function useBusinessSettings() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
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

      if (fetchError) throw fetchError;
      setSettings(data);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error loading business settings:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateSettings = useCallback(async (updates: Partial<BusinessSettings>) => {
    if (!user) return;

    try {
      const { error: upsertError } = await supabase
        .from('business_settings')
        .upsert({
          owner_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (upsertError) throw upsertError;
      await loadSettings();
    } catch (err) {
      setError((err as Error).message);
      console.error('Error updating business settings:', err);
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