import React from 'react';
import { Experience } from '../../types/resume';
import { formatDate } from '../../utils/date';

type ExperiencePreviewProps = {
  experiences?: Experience[];
};

export function ExperiencePreview({ experiences = [] }: ExperiencePreviewProps) {
  if (!experiences?.length) return null;

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <div key={experience.id} className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-md font-semibold text-gray-900">
                {experience.title}
              </h3>
              <p className="text-sm text-gray-700">{experience.company}</p>
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(experience.startDate)} -{' '}
              {experience.current ? 'Present' : formatDate(experience.endDate)}
            </div>
          </div>
          {experience.location && (
            <p className="text-sm text-gray-600">{experience.location}</p>
          )}
          {experience.responsibilities?.length > 0 && (
            <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}