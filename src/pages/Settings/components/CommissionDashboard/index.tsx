import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { formatCurrency } from '../../../../utils/format';

export function CommissionDashboard() {
  return (
    <div className="space-y-4">
      <Title>Visão Geral das Comissões</Title>
      <Text>Acompanhe o desempenho e pagamentos de comissões</Text>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Title>Total em Comissões</Title>
          <Text>{formatCurrency(0)}</Text>
        </Card>
        
        <Card>
          <Title>Comissões Pendentes</Title>
          <Text>{formatCurrency(0)}</Text>
        </Card>
        
        <Card>
          <Title>Taxa Média</Title>
          <Text>0%</Text>
        </Card>
      </div>
    </div>
  );
}