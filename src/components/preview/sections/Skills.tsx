import React from 'react';
import { Skill } from '../../../types/resume';
import { useTheme } from '../../../contexts/ThemeContext';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const { theme } = useTheme();
  if (!skills?.length) return null;

  return (
    <section className="space-y-4">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Skills
      </h2>

      <div className="space-y-3">
        {skills.map((category) => (
          <div key={category.id}>
            <div className="font-bold text-gray-900 mb-1">
              {category.category}:
            </div>
            <div className="text-sm text-gray-700">
              {category.skills.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}