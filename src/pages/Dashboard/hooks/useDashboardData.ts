import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useSettings } from '../../Settings/hooks/useSettings';

interface DashboardData {
  dailyRevenue: number;
  monthlyRevenue: number;
  dailyGoal: number;
  monthlyGoal: number;
  appointmentsToday: number;
  revenueData: Array<{ date: string; revenue: number }>;
  distributionData: Array<{ name: string; value: number }>;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    dailyGoal: 1000,
    monthlyGoal: 30000,
    appointmentsToday: 0,
    revenueData: [],
    distributionData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { settings, loadSettings } = useSettings();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (settings) {
      setData(prev => ({
        ...prev,
        dailyGoal: settings.daily_revenue_goal,
        monthlyGoal: settings.monthly_revenue_goal
      }));
    }
  }, [settings]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        // Load daily revenue
        const { data: todayData } = await supabase
          .from('transactions')
          .select('amount')
          .eq('type', 'income')
          .gte('date', today.toISOString().split('T')[0])
          .lte('date', today.toISOString().split('T')[0]);

        const dailyRevenue = todayData?.reduce((sum, t) => sum + t.amount, 0) || 0;

        // Load monthly revenue
        const { data: monthData } = await supabase
          .from('transactions')
          .select('amount')
          .eq('type', 'income')
          .gte('date', startOfMonth.toISOString().split('T')[0])
          .lte('date', today.toISOString().split('T')[0]);

        const monthlyRevenue = monthData?.reduce((sum, t) => sum + t.amount, 0) || 0;

        // Load appointments count
        const { count: appointmentsToday } = await supabase
          .from('appointments')
          .select('*', { count: 'exact' })
          .eq('date', today.toISOString().split('T')[0]);

        // Load revenue distribution
        const { data: distributionData } = await supabase
          .from('transactions')
          .select('category, amount')
          .eq('type', 'income')
          .gte('date', startOfMonth.toISOString());

        const distribution = distributionData?.reduce((acc, curr) => {
          if (!acc[curr.category]) acc[curr.category] = 0;
          acc[curr.category] += curr.amount;
          return acc;
        }, {} as Record<string, number>);

        // Load weekly revenue data
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        const { data: weeklyData } = await supabase
          .from('transactions')
          .select('date, amount')
          .eq('type', 'income')
          .in('date', last7Days);

        const revenueData = last7Days.map(date => ({
          date: new Date(date).toLocaleDateString('pt-BR'),
          revenue: weeklyData?.filter(d => d.date === date).reduce((sum, t) => sum + t.amount, 0) || 0
        }));

        setData(prev => ({
          ...prev,
          dailyRevenue,
          monthlyRevenue,
          appointmentsToday: appointmentsToday || 0,
          revenueData,
          distributionData: Object.entries(distribution || {}).map(([name, value]) => ({
            name,
            value
          }))
        }));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return { data, loading, error };
}