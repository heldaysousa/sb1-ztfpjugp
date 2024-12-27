import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/format';

interface RevenueGoalsFormProps {
  dailyGoal: number;
  monthlyGoal: number;
  onSave: (goals: { dailyGoal: number; monthlyGoal: number }) => Promise<void>;
}

export function RevenueGoalsForm({ dailyGoal, monthlyGoal, onSave }: RevenueGoalsFormProps) {
  const [goals, setGoals] = useState({
    dailyGoal,
    monthlyGoal
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(goals);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Diária
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={goals.dailyGoal}
              onChange={(e) => setGoals({ ...goals, dailyGoal: parseFloat(e.target.value) })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-accent-purple focus:border-accent-purple"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Atual: {formatCurrency(dailyGoal)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Mensal
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={goals.monthlyGoal}
              onChange={(e) => setGoals({ ...goals, monthlyGoal: parseFloat(e.target.value) })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-accent-purple focus:border-accent-purple"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Atual: {formatCurrency(monthlyGoal)}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Metas'}
        </Button>
      </div>
    </form>
  );
}