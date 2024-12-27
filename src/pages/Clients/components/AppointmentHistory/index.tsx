import React from 'react';
import { formatDate, formatCurrency } from '../../../../utils/format';
import { AppointmentHistoryProps } from './types';
import { StatusBadge } from './StatusBadge';
import { MaintenanceAlert } from './MaintenanceAlert';

export function AppointmentHistory({ appointments, maintenanceAlerts }: AppointmentHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Histórico de Atendimentos
        </h3>
      </div>

      {maintenanceAlerts.length > 0 && (
        <div className="space-y-2">
          {maintenanceAlerts.map((alert) => (
            <MaintenanceAlert key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Nenhum atendimento registrado
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.service_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(appointment.appointment_date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <StatusBadge status={appointment.status} />
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(appointment.price)}
                      </span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="mt-2 text-sm text-gray-500">
                      {appointment.notes}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}