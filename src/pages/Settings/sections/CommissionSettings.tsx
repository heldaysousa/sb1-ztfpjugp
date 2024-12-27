import React, { useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import { useSettings } from '../hooks/useSettings';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export function CommissionSettings() {
  const { settings, loading, error, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    defaultClosingDay: settings?.default_commission_closing_day || 5,
    defaultPaymentDeadline: settings?.default_commission_payment_deadline || 10,
    defaultCommissionRate: settings?.default_commission_rate || 30
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await updateSettings({
        default_commission_closing_day: formData.defaultClosingDay,
        default_commission_payment_deadline: formData.defaultPaymentDeadline,
        default_commission_rate: formData.defaultCommissionRate
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error updating commission settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>Configurações de Comissão</Title>
        <Text>Configure as regras padrão para cálculo e pagamento de comissões</Text>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Dia de Fechamento"
              type="number"
              min="1"
              max="31"
              value={formData.defaultClosingDay}
              onChange={(e) => setFormData({
                ...formData,
                defaultClosingDay: parseInt(e.target.value)
              })}
              required
            />

            <Input
              label="Prazo de Pagamento (dias)"
              type="number"
              min="1"
              value={formData.defaultPaymentDeadline}
              onChange={(e) => setFormData({
                ...formData,
                defaultPaymentDeadline: parseInt(e.target.value)
              })}
              required
            />

            <Input
              label="Taxa de Comissão Padrão (%)"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.defaultCommissionRate}
              onChange={(e) => setFormData({
                ...formData,
                defaultCommissionRate: parseFloat(e.target.value)
              })}
              required
            />
          </div>

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