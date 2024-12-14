import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Education } from '../../types/resume';
import { GraduationCap, MapPin, Plus, Trash2 } from 'lucide-react';
import { EducationEntry } from './education/EducationEntry';

export function EducationEditor() {
  const { resumeData, setSection } = useResumeStore();
  const education = resumeData.sections.education.content as Education[];

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      achievements: [],
    };
    setSection('education', [...education, newEducation]);
  };

  const updateEducation = (index: number, updatedEducation: Education) => {
    const updatedEducations = [...education];
    updatedEducations[index] = updatedEducation;
    setSection('education', updatedEducations);
  };

  const removeEducation = (index: number) => {
    const updatedEducations = education.filter((_, i) => i !== index);
    setSection('education', updatedEducations);
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <EducationEntry
          key={edu.id}
          education={edu}
          onChange={(updated) => updateEducation(index, updated)}
          onRemove={() => removeEducation(index)}
        />
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </button>
    </div>
  );
}