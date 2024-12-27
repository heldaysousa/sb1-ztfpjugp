import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SettingsLayout } from './components/SettingsLayout';
import { GeneralSettings } from './sections/GeneralSettings';
import { TeamSettings } from './sections/TeamSettings';
import { CommissionSettings } from './sections/CommissionSettings';

export default function Settings() {
  return (
    <SettingsLayout>
      <Routes>
        <Route index element={<GeneralSettings />} />
        <Route path="equipe" element={<TeamSettings />} />
        <Route path="comissoes" element={<CommissionSettings />} />
        <Route path="*" element={<Navigate to="/configuracoes" replace />} />
      </Routes>
    </SettingsLayout>
  );
}