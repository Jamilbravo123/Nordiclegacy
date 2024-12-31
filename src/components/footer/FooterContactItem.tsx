import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FooterContactItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  href?: string;
}

export function FooterContactItem({ icon: Icon, children, href }: FooterContactItemProps) {
  const content = (
    <>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="ml-3">{children}</span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="flex items-center text-gray-400 hover:text-white transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center text-gray-400">
      {content}
    </div>
  );
}