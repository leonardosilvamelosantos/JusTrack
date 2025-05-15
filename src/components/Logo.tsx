import React from 'react';
import { Scale } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Scale className="w-8 h-8 text-blue-600" />
      <span className="text-2xl font-bold text-gray-800">JusTrack</span>
    </div>
  );
};