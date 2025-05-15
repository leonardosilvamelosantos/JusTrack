import React from 'react';

interface SubjectPreviewProps {
  text: string;
  maxLength?: number;
  onClick: () => void;
}

export const SubjectPreview = ({ text, maxLength = 100, onClick }: SubjectPreviewProps) => {
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="flex items-center gap-2">
      <span>{displayText}</span>
      {shouldTruncate && (
        <button
          onClick={onClick}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Ver mais
        </button>
      )}
    </div>
  );
};