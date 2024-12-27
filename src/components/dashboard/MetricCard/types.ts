import { LucideIcon } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  progress?: number;
  subtitle?: string;
}