import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Filter {
  startDate: string;
  endDate: string;
  type: string;
}

interface FinancialState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  loadTransactions: (filter: Filter) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  loadTransactions: async (filter: Filter) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .gte('date', filter.startDate)
        .lte('date', filter.endDate)
        .order('date', { ascending: false });

      if (filter.type !== 'all') {
        query = query.eq('type', filter.type);
      }

      const { data, error } = await query;

      if (error) throw error;
      set({ transactions: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transactions')
        .insert([transaction]);

      if (error) throw error;
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTransaction: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));