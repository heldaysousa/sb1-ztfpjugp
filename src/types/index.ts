export interface User {
  id: string;
  email: string;
  full_name: string;
  business_name?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_id: string;
  professional_id: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface Professional {
  id: string;
  name: string;
  cpf: string;
  commission_rate: number;
  services: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  last_visit: string;
}