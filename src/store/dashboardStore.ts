import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

interface DashboardState {
  dailyRevenue: number;
  monthlyRevenue: number;
  dailyGoal: number;
  monthlyGoal: number;
  appointmentsToday: number;
  revenueData: Array<{ date: string; revenue: number }>;
  revenueDistribution: Array<{ name: string; value: number }>;
  loading: boolean;
  error: string | null;
  lastUpdated: number;
  loadDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      dailyRevenue: 0,
      monthlyRevenue: 0,
      dailyGoal: 1000,
      monthlyGoal: 30000,
      appointmentsToday: 0,
      revenueData: [],
      revenueDistribution: [],
      loading: false,
      error: null,
      lastUpdated: 0,

      loadDashboardData: async () => {
        // Only reload if more than 5 minutes have passed
        const now = Date.now();
        if (now - get().lastUpdated < 5 * 60 * 1000) {
          return;
        }

        set({ loading: true, error: null });

        try {
          const today = new Date().toISOString().split('T')[0];
          const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
          
          // Load daily and monthly revenue
          const { data: todayData } = await supabase
            .from('transactions')
            .select('amount')
            .eq('date', today)
            .eq('type', 'income');

          const dailyRevenue = todayData?.reduce((sum, t) => sum + t.amount, 0) || 0;

          const { data: monthData } = await supabase
            .from('transactions')
            .select('amount')
            .gte('date', firstDayOfMonth)
            .eq('type', 'income');

          const monthlyRevenue = monthData?.reduce((sum, t) => sum + t.amount, 0) || 0;

          // Load appointments
          const { count: appointmentsToday } = await supabase
            .from('appointments')
            .select('*', { count: 'exact' })
            .eq('date', today);

          // Load revenue data
          const dates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
          }).reverse();

          const { data: revenueData } = await supabase
            .from('transactions')
            .select('date, amount')
            .eq('type', 'income')
            .in('date', dates);

          const formattedRevenueData = dates.map(date => ({
            date: new Date(date).toLocaleDateString('pt-BR'),
            revenue: revenueData?.filter(t => t.date === date).reduce((sum, t) => sum + t.amount, 0) || 0
          }));

          // Load revenue distribution
          const { data: distributionData } = await supabase
            .from('transactions')
            .select('category, amount')
            .eq('type', 'income');

          const distribution = distributionData?.reduce((acc, curr) => {
            const category = curr.category;
            if (!acc[category]) acc[category] = 0;
            acc[category] += curr.amount;
            return acc;
          }, {} as Record<string, number>);

          const revenueDistribution = Object.entries(distribution || {}).map(([name, value]) => ({
            name,
            value
          }));

          set({
            dailyRevenue,
            monthlyRevenue,
            appointmentsToday: appointmentsToday || 0,
            revenueData: formattedRevenueData,
            revenueDistribution,
            lastUpdated: now,
            loading: false
          });
        } catch (err) {
          set({ error: (err as Error).message, loading: false });
        }
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        dailyRevenue: state.dailyRevenue,
        monthlyRevenue: state.monthlyRevenue,
        dailyGoal: state.dailyGoal,
        monthlyGoal: state.monthlyGoal,
        appointmentsToday: state.appointmentsToday,
        revenueData: state.revenueData,
        revenueDistribution: state.revenueDistribution,
        lastUpdated: state.lastUpdated
      })
    }
  )
);