import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminOverview } from '../pages/AdminOverview';
import { OfferingsManager } from '../pages/offerings/OfferingsManager';
import { MembersManager } from '../pages/members/MembersManager';
import { NotificationsManager } from '../pages/notifications/NotificationsManager';
import { AnalyticsDashboard } from '../pages/analytics/AnalyticsDashboard';
import { AdminSettings } from '../pages/settings/AdminSettings';
import { AccessControl } from '../pages/access/AccessControl';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminOverview />} />
      <Route path="/offerings/*" element={<OfferingsManager />} />
      <Route path="/members/*" element={<MembersManager />} />
      <Route path="/notifications/*" element={<NotificationsManager />} />
      <Route path="/analytics/*" element={<AnalyticsDashboard />} />
      <Route path="/settings/*" element={<AdminSettings />} />
      <Route path="/access/*" element={<AccessControl />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}