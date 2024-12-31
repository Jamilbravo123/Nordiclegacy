import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center">
          Building Nordic Legacy
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl text-center text-gray-200 mb-12">
          We acquire and elevate exceptional construction and engineering firms across the Nordic region
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-sm text-lg font-semibold hover:bg-gray-100 transition-colors">
          Explore Opportunities
        </button>
        
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>
    </div>
  );
}