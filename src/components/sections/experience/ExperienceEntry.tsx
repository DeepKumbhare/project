import React from 'react';
import { Experience } from '../../../types/resume';
import { Briefcase, Calendar, MapPin, Plus, Trash2 } from 'lucide-react';
import { ResponsibilitiesList } from './ResponsibilitiesList';

type ExperienceEntryProps = {
  experience: Experience;
  onChange: (updated: Experience) => void;
  onRemove: () => void;
};

export function ExperienceEntry({ experience, onChange, onRemove }: ExperienceEntryProps) {
  const handleChange = (field: keyof Experience, value: any) => {
    onChange({ ...experience, [field]: value });
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Briefcase className="w-4 h-4 mr-2" />
                Job Title
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Company Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Start Date
              </label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  disabled={experience.current}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => {
                      handleChange('current', e.target.checked);
                      if (e.target.checked) {
                        handleChange('endDate', '');
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Current</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <input
              type="text"
              value={experience.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City, State"
            />
          </div>

          <ResponsibilitiesList
            responsibilities={experience.responsibilities}
            onChange={(updated) => handleChange('responsibilities', updated)}
          />
        </div>

        <button
          onClick={onRemove}
          className="ml-4 p-1 text-gray-400 hover:text-gray-500"
          title="Remove experience"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}