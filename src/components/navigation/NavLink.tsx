import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="text-gray-300 hover:text-white transition-colors px-4 py-2"
    >
      {children}
    </a>
  );
}