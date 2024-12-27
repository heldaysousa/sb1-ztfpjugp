import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { formatDate } from '../../../../utils/format';
import { MaintenanceAlert as MaintenanceAlertType } from './types';

interface MaintenanceAlertProps {
  alert: MaintenanceAlertType;
}

export function MaintenanceAlert({ alert }: MaintenanceAlertProps) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Manutenção recomendada para <strong>{alert.service_name}</strong>
          </p>
          <p className="mt-1 text-sm text-yellow-600">
            Último atendimento: {formatDate(alert.last_appointment)} 
            ({alert.days_since_last} dias atrás)
          </p>
          <p className="mt-1 text-sm text-yellow-600">
            Frequência recomendada: {alert.recommended_frequency} dias
          </p>
        </div>
      </div>
    </div>
  );
}