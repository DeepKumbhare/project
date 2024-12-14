import React from 'react';
import { Language } from '../../types/resume';

type LanguagesPreviewProps = {
  languages: Language[];
};

export function LanguagesPreview({ languages }: LanguagesPreviewProps) {
  if (!languages.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {languages.map((language) => (
        <div key={language.id} className="text-sm">
          <span className="font-medium text-gray-900">{language.name}</span>
          <span className="text-gray-600"> - {language.proficiency}</span>
        </div>
      ))}
    </div>
  );
}