import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';

// Main Layout Components
import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Heritage from './components/heritage/Heritage';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

// Auth Components
import PrivilegeLogin from './components/auth/PrivilegeLogin';
import AdminLogin from './components/admin/auth/AdminLogin';
import ResetPasswordPage from './components/auth/ResetPasswordPage';

// Dashboard Components
import MemberDashboard from './components/dashboard/MemberDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      <About />
      <Heritage />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes - These should come before the main layout */}
          <Route path="/privilege/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privilege" element={<PrivilegeLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout />} />
          
          {/* Member Dashboard Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Dashboard Routes */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          {/* Catch-all route - should be last */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;