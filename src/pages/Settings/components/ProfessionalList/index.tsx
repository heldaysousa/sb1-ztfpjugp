import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { Professional } from '../../../../types/professional';

interface ProfessionalListProps {
  professionals: Professional[];
}

export function ProfessionalList({ professionals }: ProfessionalListProps) {
  if (professionals.length === 0) {
    return (
      <div className="text-center py-8">
        <Text>Nenhum profissional cadastrado</Text>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Title>Profissionais</Title>
      
      <div className="space-y-4">
        {professionals.map((professional) => (
          <Card key={professional.id}>
            <div className="flex justify-between items-start">
              <div>
                <Text>{professional.name}</Text>
                {professional.email && (
                  <Text className="text-gray-500">{professional.email}</Text>
                )}
              </div>
              <Text>{professional.base_commission_rate}%</Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}