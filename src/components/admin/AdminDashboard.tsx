import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layout/AdminLayout';
import { AdminOverview } from './pages/AdminOverview';
import { MembersManager } from './pages/members/MembersManager';
import { OfferingsManager } from './pages/offerings/OfferingsManager';
import { NotificationsManager } from './pages/notifications/NotificationsManager';
import { AnalyticsDashboard } from './pages/analytics/AnalyticsDashboard';
import { AdminSettings } from './pages/settings/AdminSettings';
import { AccessControl } from './pages/access/AccessControl';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminOverview />} />
        <Route path="/members" element={<MembersManager />} />
        <Route path="/offerings" element={<OfferingsManager />} />
        <Route path="/notifications" element={<NotificationsManager />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/access" element={<AccessControl />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}