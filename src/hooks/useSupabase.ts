import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useSupabase() {
  const { user } = useAuthStore();

  const getProfile = useCallback(async () => {
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }, [user?.id]);

  const updateProfile = useCallback(async (updates: any) => {
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }, [user?.id]);

  return {
    getProfile,
    updateProfile,
  };
}