import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Language } from '../../types/resume';
import { Languages as LanguagesIcon, Plus, Trash2 } from 'lucide-react';

export function LanguagesEditor() {
  const { resumeData, setSection } = useResumeStore();
  const languages = resumeData.sections.languages.content as Language[];

  const addLanguage = () => {
    const newLanguage: Language = {
      id: crypto.randomUUID(),
      name: '',
      proficiency: '',
    };
    setSection('languages', [...languages, newLanguage]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setSection('languages', updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setSection('languages', updatedLanguages);
  };

  const proficiencyLevels = [
    'Native',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Basic',
  ];

  return (
    <div className="space-y-6">
      {languages.map((language, index) => (
        <div
          key={language.id}
          className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
        >
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <LanguagesIcon className="w-4 h-4 mr-2" />
                Language
              </label>
              <input
                type="text"
                value={language.name}
                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="English"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select proficiency</option>
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => removeLanguage(index)}
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Remove language"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </button>
    </div>
  );
}