import React from 'react';

export default function About() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg mb-8">
              We are more than investors; we are builders of legacy. Our mission is to identify, acquire, and nurture exceptional construction and engineering firms across the Nordic region, preserving their unique expertise while providing the resources and support needed for sustained growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-gray-900 pl-4">
                <h3 className="font-bold mb-2">Strategic Growth</h3>
                <p className="text-gray-600">Focused on long-term value creation through strategic acquisitions</p>
              </div>
              <div className="border-l-4 border-gray-900 pl-4">
                <h3 className="font-bold mb-2">Nordic Heritage</h3>
                <p className="text-gray-600">Deep understanding of Nordic construction excellence</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Modern architecture"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}