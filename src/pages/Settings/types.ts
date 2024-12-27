import { Professional } from '../../types/professional';

export interface BusinessSettings {
  id: string;
  owner_id: string;
  business_hours: Record<string, { start: string; end: string } | null>;
  commission_payment_day?: number;
  notification_preferences: {
    email: boolean;
    sms: boolean;
  };
  daily_revenue_goal: number;
  monthly_revenue_goal: number;
}

export interface BusinessHours {
  [key: string]: { start: string; end: string } | null;
}

export interface RevenueGoals {
  dailyGoal: number;
  monthlyGoal: number;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

export interface TeamMember extends Professional {
  services: Array<{
    id: string;
    name: string;
    commission_rate?: number;
  }>;
}