export interface Settings {
  id: string;
  daily_revenue_goal: number;
  monthly_revenue_goal: number;
  default_commission_closing_day: number;
  default_commission_payment_deadline: number;
  default_commission_rate: number;
}

export interface CommissionSettings {
  defaultClosingDay: number;
  defaultPaymentDeadline: number;
  defaultCommissionRate: number;
}