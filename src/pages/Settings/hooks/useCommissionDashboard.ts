import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

export function useCommissionDashboard() {
  const [data, setData] = useState({
    totalCommissions: 0,
    pendingCommissions: 0,
    averageCommissionRate: 0,
    topProfessionals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadDashboardData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Load total commissions
      const { data: commissionsData, error: commissionsError } = await supabase
        .from('commissions')
        .select(`
          amount,
          status,
          professionals (
            name,
            services (
              name,
              commission_rate
            )
          )
        `)
        .eq('owner_id', user.id);

      if (commissionsError) throw commissionsError;

      const total = commissionsData.reduce((sum, c) => sum + c.amount, 0);
      const pending = commissionsData
        .filter(c => c.status === 'pending')
        .reduce((sum, c) => sum + c.amount, 0);

      // Calculate average commission rate
      const rates = commissionsData.flatMap(c => 
        c.professionals.services.map(s => s.commission_rate)
      );
      const avgRate = rates.length > 0 
        ? rates.reduce((sum, rate) => sum + rate, 0) / rates.length
        : 0;

      // Get top professionals
      const professionalStats = commissionsData.reduce((acc, c) => {
        const name = c.professionals.name;
        if (!acc[name]) {
          acc[name] = { totalCommissions: 0, completedServices: 0 };
        }
        acc[name].totalCommissions += c.amount;
        acc[name].completedServices += 1;
        return acc;
      }, {});

      const topProfessionals = Object.entries(professionalStats)
        .map(([name, stats]) => ({
          name,
          ...stats
        }))
        .sort((a, b) => b.totalCommissions - a.totalCommissions)
        .slice(0, 5);

      setData({
        totalCommissions: total,
        pendingCommissions: pending,
        averageCommissionRate: avgRate,
        topProfessionals
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    data,
    loading,
    error,
    loadDashboardData
  };
}