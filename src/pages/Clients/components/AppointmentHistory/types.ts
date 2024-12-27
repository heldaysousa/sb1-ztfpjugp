export interface Appointment {
  id: string;
  service_id: string;
  service_name: string;
  appointment_date: string;
  price: number;
  status: 'completed' | 'cancelled' | 'no_show';
  notes?: string;
}

export interface MaintenanceAlert {
  id: string;
  service_name: string;
  last_appointment: string;
  days_since_last: number;
  recommended_frequency: number;
}

export interface AppointmentHistoryProps {
  appointments: Appointment[];
  maintenanceAlerts: MaintenanceAlert[];
}