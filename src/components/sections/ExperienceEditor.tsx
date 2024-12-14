import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Experience } from '../../types/resume';
import { Briefcase, Calendar, MapPin, Plus, Trash2 } from 'lucide-react';
import { ExperienceEntry } from './experience/ExperienceEntry';

export function ExperienceEditor() {
  const { resumeData, setSection } = useResumeStore();
  const experiences = resumeData.sections.experience.content as Experience[];

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
    };
    setSection('experience', [...experiences, newExperience]);
  };

  const updateExperience = (index: number, updatedExperience: Experience) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = updatedExperience;
    setSection('experience', updatedExperiences);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setSection('experience', updatedExperiences);
  };

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <ExperienceEntry
          key={experience.id}
          experience={experience}
          onChange={(updated) => updateExperience(index, updated)}
          onRemove={() => removeExperience(index)}
        />
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </button>
    </div>
  );
}