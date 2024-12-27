import React from 'react';
import { Input } from '../../../components/ui/Input';

interface BusinessHours {
  [key: string]: { start: string; end: string } | null;
}

interface BusinessHoursFormProps {
  value: BusinessHours;
  onChange: (hours: BusinessHours) => void;
}

const WEEKDAYS = [
  { id: 'monday', label: 'Segunda-feira' },
  { id: 'tuesday', label: 'Terça-feira' },
  { id: 'wednesday', label: 'Quarta-feira' },
  { id: 'thursday', label: 'Quinta-feira' },
  { id: 'friday', label: 'Sexta-feira' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' }
];

export function BusinessHoursForm({ value, onChange }: BusinessHoursFormProps) {
  const handleChange = (day: string, field: 'start' | 'end', time: string) => {
    const newHours = { ...value };
    if (!newHours[day]) {
      newHours[day] = { start: '09:00', end: '18:00' };
    }
    newHours[day] = {
      ...newHours[day]!,
      [field]: time
    };
    onChange(newHours);
  };

  const toggleDay = (day: string) => {
    const newHours = { ...value };
    newHours[day] = newHours[day] ? null : { start: '09:00', end: '18:00' };
    onChange(newHours);
  };

  return (
    <div className="space-y-4">
      {WEEKDAYS.map(({ id, label }) => (
        <div key={id} className="flex items-center space-x-4">
          <div className="w-40">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={value[id] !== null}
                onChange={() => toggleDay(id)}
                className="rounded border-gray-300 text-accent-purple 
                         focus:ring-accent-purple"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </label>
          </div>
          
          {value[id] && (
            <div className="flex items-center space-x-2">
              <Input
                type="time"
                value={value[id]?.start}
                onChange={(e) => handleChange(id, 'start', e.target.value)}
                className="w-32"
              />
              <span className="text-gray-500">até</span>
              <Input
                type="time"
                value={value[id]?.end}
                onChange={(e) => handleChange(id, 'end', e.target.value)}
                className="w-32"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}