import React from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    name: 'Stockholm Engineering Group',
    description: 'Leading civil engineering firm specializing in infrastructure',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    year: '2022'
  },
  {
    name: 'Oslo Construction Partners',
    description: 'Commercial construction and project management',
    image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a6ab7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    year: '2021'
  },
  {
    name: 'Helsinki Foundations',
    description: 'Specialized in deep foundation work and soil stabilization',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    year: '2023'
  }
];

export default function Portfolio() {
  return (
    <div className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm mb-2">Acquired {project.year}</p>
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-200">{project.description}</p>
                    <button className="mt-4 flex items-center text-white hover:underline">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}