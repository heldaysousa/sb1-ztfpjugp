import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AuthGuard } from '../components/Layout/AuthGuard';
import { useAuth } from '../hooks/useAuth';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Appointments = React.lazy(() => import('../pages/Appointments'));
const Clients = React.lazy(() => import('../pages/Clients'));
const Financial = React.lazy(() => import('../pages/Financial'));
const Services = React.lazy(() => import('../pages/Services'));
const Settings = React.lazy(() => import('../pages/Settings'));

export function AppRoutes() {
  useAuth();

  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/agenda" element={<Appointments />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/financeiro" element={<Financial />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/configuracoes/*" element={<Settings />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}