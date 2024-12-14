import React from 'react';
import { Section } from '../../types/resume';
import { cn } from '../../utils/cn';

type SectionProgressProps = {
  sections: Section[];
};

export function SectionProgress({ sections }: SectionProgressProps) {
  const completedSections = sections.filter(section => {
    if (typeof section.content === 'string') {
      return !!section.content.trim();
    }
    return Array.isArray(section.content) ? section.content.length > 0 : !!section.content;
  });

  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Progress</span>
        <span className="text-gray-900 font-medium">
          {completedSections.length} of {sections.length} sections
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}