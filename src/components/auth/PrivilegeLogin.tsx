import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { LoginForm } from './LoginForm';
import { LoginHeader } from './LoginHeader';
import { SignupModal } from './SignupModal';
import { VerificationNotification } from './VerificationNotification';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

export default function PrivilegeLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { verificationEmail?: string; showVerification?: boolean } | null;

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 sm:py-24">
      <Container className="max-w-md">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-8">
          <LoginHeader />
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </Container>
      <SignupModal />
      {state?.showVerification && state?.verificationEmail && (
        <VerificationNotification 
          email={state.verificationEmail}
          onClose={() => navigate('/privilege', { replace: true })}
        />
      )}
    </div>
  );
}