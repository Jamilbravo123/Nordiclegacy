import React from 'react';
import { Crown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginHeader() {
  return (
    <div>
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>
      
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Crown className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          NL Privilege Login
        </h1>
        <p className="text-gray-400">
          Access exclusive benefits and opportunities
        </p>
      </div>
    </div>
  );
}