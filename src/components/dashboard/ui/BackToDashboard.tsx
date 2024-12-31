import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/Button';

export function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <Button
      variant="secondary"
      onClick={() => navigate('/dashboard')}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Dashboard
    </Button>
  );
}