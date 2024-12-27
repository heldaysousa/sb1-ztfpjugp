import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Professional, ProfessionalFormData } from '../types/professional';

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
        .select(`
          *,
          professional_services (
            service_id,
            commission_rate
          )
        `)
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

  const createProfessional = useCallback(async (data: ProfessionalFormData) => {
    if (!user) return false;

    setLoading(true);
    try {
      // Insert professional
      const { data: professional, error: professionalError } = await supabase
        .from('professionals')
        .insert([{
          owner_id: user.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          document_number: data.document_number,
          base_commission_rate: data.base_commission_rate
        }])
        .select()
        .single();

      if (professionalError) throw professionalError;

      // Insert professional services
      if (data.services.length > 0) {
        const { error: servicesError } = await supabase
          .from('professional_services')
          .insert(
            data.services.map(service => ({
              professional_id: professional.id,
              service_id: service.service_id,
              commission_rate: service.commission_rate
            }))
          );

        if (servicesError) throw servicesError;
      }

      await loadProfessionals();
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, loadProfessionals]);

  const updateProfessional = useCallback(async (id: string, data: ProfessionalFormData) => {
    if (!user) return false;

    setLoading(true);
    try {
      // Update professional
      const { error: updateError } = await supabase
        .from('professionals')
        .update({
          name: data.name,
          email: data.email,
          phone: data.phone,
          document_number: data.document_number,
          base_commission_rate: data.base_commission_rate,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('owner_id', user.id);

      if (updateError) throw updateError;

      // Delete existing services
      const { error: deleteError } = await supabase
        .from('professional_services')
        .delete()
        .eq('professional_id', id);

      if (deleteError) throw deleteError;

      // Insert new services
      if (data.services.length > 0) {
        const { error: servicesError } = await supabase
          .from('professional_services')
          .insert(
            data.services.map(service => ({
              professional_id: id,
              service_id: service.service_id,
              commission_rate: service.commission_rate
            }))
          );

        if (servicesError) throw servicesError;
      }

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