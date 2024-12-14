import React from 'react';
import { Education as EducationType } from '../../../types/resume';
import { formatDate } from '../../../utils/date';
import { useTheme } from '../../../contexts/ThemeContext';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  const { theme } = useTheme();
  if (!education?.length) return null;

  return (
    <section className="space-y-4">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Education
      </h2>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <div className="font-bold text-gray-900">{edu.degree}</div>
              <div className="text-sm text-gray-700">{edu.institution}</div>
              {edu.gpa && (
                <div className="text-sm text-gray-600">CGPA: {edu.gpa}</div>
              )}
            </div>
            <div className="text-sm text-gray-600 text-right">
              {formatDate(edu.graduationDate)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}