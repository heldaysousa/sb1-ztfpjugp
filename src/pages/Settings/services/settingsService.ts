import { supabase } from '../../../lib/supabase';
import { BusinessSettings } from '../types';

export class SettingsService {
  static async getSettings(userId: string) {
    const { data, error } = await supabase
      .from('business_settings')
      .select('*')
      .eq('owner_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSettings(userId: string, updates: Partial<BusinessSettings>) {
    const { error } = await supabase
      .from('business_settings')
      .upsert({
        owner_id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  }
}