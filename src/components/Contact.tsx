import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8">Let's Build Together</h2>
            <p className="text-gray-400 mb-8">
              Are you a construction or engineering firm owner looking to secure your company's future? We'd love to discuss potential opportunities.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-4" />
                <span>contact@nordicconstruction.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-4" />
                <span>+46 (0) 8 123 456 789</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-4" />
                <span>Norrmalm, Stockholm, Sweden</span>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:border-white"></textarea>
            </div>
            <button className="w-full bg-white text-gray-900 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}