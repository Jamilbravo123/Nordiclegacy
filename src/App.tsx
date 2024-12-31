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
          <Route path="/" element={<MainLayout />} />
          <Route path="/privilege" element={<PrivilegeLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
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
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;