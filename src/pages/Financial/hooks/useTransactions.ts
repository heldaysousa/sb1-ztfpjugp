import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { Transaction, TransactionFilter } from '../types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const loadTransactions = useCallback(async (filter: TransactionFilter) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('owner_id', user.id)
        .gte('date', filter.startDate)
        .lte('date', filter.endDate)
        .order('date', { ascending: false });

      if (filter.type !== 'all') {
        query = query.eq('type', filter.type);
      }

      const { data, error: queryError } = await query;
      if (queryError) throw queryError;
      
      setTransactions(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id' | 'owner_id'>) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .insert([{
          ...transaction,
          owner_id: user.id
        }]);

      if (error) throw error;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteTransaction = useCallback(async (id: string) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    addTransaction,
    deleteTransaction
  };
}