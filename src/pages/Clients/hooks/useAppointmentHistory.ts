import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { Appointment, MaintenanceAlert } from '../components/AppointmentHistory/types';

export function useAppointmentHistory(clientId: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      // Load appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointment_history')
        .select(`
          id,
          service_id,
          services (name),
          appointment_date,
          price,
          status,
          notes
        `)
        .eq('client_id', clientId)
        .order('appointment_date', { ascending: false });

      if (appointmentsError) throw appointmentsError;

      // Load maintenance schedules and calculate alerts
      const { data: maintenanceData, error: maintenanceError } = await supabase
        .from('maintenance_schedules')
        .select(`
          id,
          service_id,
          services (name),
          frequency_days
        `);

      if (maintenanceError) throw maintenanceError;

      // Process appointments and generate alerts
      const processedAppointments = appointmentsData.map(apt => ({
        id: apt.id,
        service_id: apt.service_id,
        service_name: apt.services.name,
        appointment_date: apt.appointment_date,
        price: apt.price,
        status: apt.status,
        notes: apt.notes
      }));

      const alerts = generateMaintenanceAlerts(processedAppointments, maintenanceData);

      setAppointments(processedAppointments);
      setMaintenanceAlerts(alerts);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  return {
    appointments,
    maintenanceAlerts,
    loading,
    error,
    loadHistory
  };
}

function generateMaintenanceAlerts(
  appointments: Appointment[], 
  maintenanceSchedules: any[]
): MaintenanceAlert[] {
  const today = new Date();
  const alerts: MaintenanceAlert[] = [];

  maintenanceSchedules.forEach(schedule => {
    const lastAppointment = appointments
      .filter(apt => apt.service_id === schedule.service_id && apt.status === 'completed')
      .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())[0];

    if (lastAppointment) {
      const lastDate = new Date(lastAppointment.appointment_date);
      const daysSinceLast = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceLast >= schedule.frequency_days) {
        alerts.push({
          id: schedule.id,
          service_name: schedule.services.name,
          last_appointment: lastAppointment.appointment_date,
          days_since_last: daysSinceLast,
          recommended_frequency: schedule.frequency_days
        });
      }
    }
  });

  return alerts;
}