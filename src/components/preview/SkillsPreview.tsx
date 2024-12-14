import React from 'react';
import { Skill } from '../../types/resume';

type SkillsPreviewProps = {
  skills?: Skill[];
};

export function SkillsPreview({ skills = [] }: SkillsPreviewProps) {
  if (!skills?.length) return null;

  return (
    <div className="space-y-3">
      {skills.map((category) => (
        <div key={category.id}>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {category.category}
          </h3>
          <p className="text-sm text-gray-700">
            {category.skills?.join(' • ')}
          </p>
        </div>
      ))}
    </div>
  );
}