import React from 'react';

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

interface NotificationSettingsProps {
  value: NotificationPreferences;
  onChange: (preferences: NotificationPreferences) => void;
}

export function NotificationSettings({ value, onChange }: NotificationSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="email-notifications"
          checked={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-accent-purple 
                   focus:ring-accent-purple"
        />
        <label htmlFor="email-notifications" className="ml-3">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Notificações por Email
          </span>
          <span className="block text-sm text-gray-500">
            Receba atualizações importantes por email
          </span>
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="sms-notifications"
          checked={value.sms}
          onChange={(e) => onChange({ ...value, sms: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-accent-purple 
                   focus:ring-accent-purple"
        />
        <label htmlFor="sms-notifications" className="ml-3">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Notificações por SMS
          </span>
          <span className="block text-sm text-gray-500">
            Receba lembretes e confirmações por SMS
          </span>
        </label>
      </div>
    </div>
  );
}