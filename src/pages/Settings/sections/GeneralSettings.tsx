import React, { useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import { useSettings } from '../hooks/useSettings';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { formatCurrency } from '../../../utils/format';

export function GeneralSettings() {
  const { settings, loading, error, updateSettings } = useSettings();
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      const dailyGoal = parseFloat(formData.get('daily_goal') as string);
      const monthlyGoal = parseFloat(formData.get('monthly_goal') as string);

      if (isNaN(dailyGoal) || dailyGoal <= 0) {
        throw new Error('Meta diária deve ser maior que zero');
      }
      if (isNaN(monthlyGoal) || monthlyGoal <= 0) {
        throw new Error('Meta mensal deve ser maior que zero');
      }

      await updateSettings({
        daily_revenue_goal: dailyGoal,
        monthly_revenue_goal: monthlyGoal
      });

      setSuccess(true);
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Configurações Gerais</Title>
        <Text>Configure as preferências básicas do seu negócio</Text>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Input
                label="Meta Diária"
                name="daily_goal"
                type="number"
                min="0.01"
                step="0.01"
                defaultValue={settings?.daily_revenue_goal}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Meta atual: {formatCurrency(settings?.daily_revenue_goal || 0)}
              </p>
            </div>

            <div>
              <Input
                label="Meta Mensal"
                name="monthly_goal"
                type="number"
                min="0.01"
                step="0.01"
                defaultValue={settings?.monthly_revenue_goal}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Meta atual: {formatCurrency(settings?.monthly_revenue_goal || 0)}
              </p>
            </div>
          </div>

          {formError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{formError}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm font-medium text-green-800">
                Configurações salvas com sucesso!
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}