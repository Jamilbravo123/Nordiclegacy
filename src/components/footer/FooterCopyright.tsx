import React from 'react';

export function FooterCopyright() {
  return (
    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
      © {new Date().getFullYear()} Nordic Legacy. All rights reserved.
    </div>
  );
}