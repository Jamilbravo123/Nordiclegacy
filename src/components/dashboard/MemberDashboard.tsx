import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { Overview } from './pages/Overview';
import { Benefits } from './pages/Benefits';
import { Points } from './pages/Points';
import { Profile } from './pages/Profile';
import { ReferFriends } from './pages/ReferFriends';

export default function MemberDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/points" element={<Points />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/referral" element={<ReferFriends />} />
      </Routes>
    </DashboardLayout>
  );
}