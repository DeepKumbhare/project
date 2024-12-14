import React from 'react';
import { Experience as ExperienceType } from '../../../types/resume';
import { formatDate } from '../../../utils/date';
import { useTheme } from '../../../contexts/ThemeContext';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const { theme } = useTheme();
  if (!experiences?.length) return null;

  return (
    <section className="space-y-4">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <div className="font-bold text-gray-900">{experience.company}</div>
              <div className="text-sm text-gray-700">{experience.title}</div>
              {experience.location && (
                <div className="text-sm text-gray-600">{experience.location}</div>
              )}
              {experience.responsibilities?.length > 0 && (
                <ul className="mt-2 list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="text-sm text-gray-600 text-right whitespace-nowrap">
              {formatDate(experience.startDate)} - {experience.current ? 'present' : formatDate(experience.endDate)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}