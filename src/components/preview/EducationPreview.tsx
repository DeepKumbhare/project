import React from 'react';
import { Education } from '../../types/resume';
import { formatDate } from '../../utils/date';

type EducationPreviewProps = {
  education?: Education[];
};

export function EducationPreview({ education = [] }: EducationPreviewProps) {
  if (!education?.length) return null;

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div key={edu.id} className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                {edu.degree}
              </h3>
              <p className="text-sm text-gray-700">{edu.institution}</p>
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(edu.graduationDate)}
            </div>
          </div>
          {edu.location && (
            <p className="text-sm text-gray-600">{edu.location}</p>
          )}
          {edu.gpa && (
            <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
          )}
          {edu.achievements?.length > 0 && (
            <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
              {edu.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}