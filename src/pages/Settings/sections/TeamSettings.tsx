import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { useProfessionals } from '../hooks/useProfessionals';
import { ProfessionalList } from '../components/ProfessionalList';
import { CommissionDashboard } from '../components/CommissionDashboard';

export function TeamSettings() {
  const { professionals, loading, error } = useProfessionals();

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

  return (
    <div className="space-y-6">
      <div>
        <Title>Gestão da Equipe</Title>
        <Text>Gerencie sua equipe e visualize o desempenho</Text>
      </div>

      <Card>
        <CommissionDashboard />
      </Card>

      <Card>
        <ProfessionalList professionals={professionals} />
      </Card>
    </div>
  );
}