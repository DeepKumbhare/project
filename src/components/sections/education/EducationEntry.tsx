import React from 'react';
import { Education } from '../../../types/resume';
import { GraduationCap, MapPin, Award, Plus, Minus, Trash2 } from 'lucide-react';
import { AchievementsList } from './AchievementsList';

type EducationEntryProps = {
  education: Education;
  onChange: (updated: Education) => void;
  onRemove: () => void;
};

export function EducationEntry({ education, onChange, onRemove }: EducationEntryProps) {
  const handleChange = (field: keyof Education, value: any) => {
    onChange({ ...education, [field]: value });
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GraduationCap className="w-4 h-4 mr-2" />
                Degree
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="University Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Graduation Date
              </label>
              <input
                type="month"
                value={education.graduationDate}
                onChange={(e) => handleChange('graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Award className="w-4 h-4 mr-2" />
              GPA (optional)
            </label>
            <input
              type="text"
              value={education.gpa || ''}
              onChange={(e) => handleChange('gpa', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="3.8/4.0"
            />
          </div>

          <AchievementsList
            achievements={education.achievements || []}
            onChange={(updated) => handleChange('achievements', updated)}
          />
        </div>

        <button
          onClick={onRemove}
          className="ml-4 p-1 text-gray-400 hover:text-gray-500"
          title="Remove education"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}