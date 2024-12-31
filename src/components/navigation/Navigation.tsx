import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { NavLink } from './NavLink';
import { PrivilegeButton } from './PrivilegeButton';
import { useScrollTransparency } from '../../hooks/useScrollTransparency';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollTransparency();

  const scrollToTeam = (e: React.MouseEvent) => {
    e.preventDefault();
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-gray-900/95'
      } rounded-b-2xl mx-auto max-w-[98%] left-1/2 -translate-x-1/2 mt-2`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-white text-xl font-bold">Nordic Legacy</a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="#team-section" onClick={scrollToTeam}>About</NavLink>
            <NavLink href="#heritage">Heritage</NavLink>
            <NavLink href="#portfolio">Portfolio</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <PrivilegeButton />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#team-section"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={scrollToTeam}
              >
                About
              </a>
              <a
                href="#heritage"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Heritage
              </a>
              <a
                href="#portfolio"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <PrivilegeButton />
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}