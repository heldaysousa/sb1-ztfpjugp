export interface Reminder {
  id: string;
  text: string;
  time: string;
  date: string;
  client_id?: string;
  service_id?: string;
  status: 'pending' | 'sent' | 'failed';
  created_at: string;
}

export interface ReminderFormData {
  text: string;
  time: string;
  date: string;
  client_id?: string;
  service_id?: string;
}