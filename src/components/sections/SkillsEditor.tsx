import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Skill } from '../../types/resume';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import { SkillCategory } from './skills/SkillCategory';

export function SkillsEditor() {
  const { resumeData, setSection } = useResumeStore();
  const skills = resumeData.sections.skills.content as Skill[];

  const addCategory = () => {
    const newCategory: Skill = {
      id: crypto.randomUUID(),
      category: '',
      skills: [''],
    };
    setSection('skills', [...skills, newCategory]);
  };

  const updateCategory = (index: number, updatedCategory: Skill) => {
    const updatedCategories = [...skills];
    updatedCategories[index] = updatedCategory;
    setSection('skills', updatedCategories);
  };

  const removeCategory = (index: number) => {
    const updatedCategories = skills.filter((_, i) => i !== index);
    setSection('skills', updatedCategories);
  };

  return (
    <div className="space-y-6">
      {skills.map((category, index) => (
        <SkillCategory
          key={category.id}
          category={category}
          onChange={(updated) => updateCategory(index, updated)}
          onRemove={() => removeCategory(index)}
        />
      ))}

      <button
        onClick={addCategory}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Skill Category
      </button>
    </div>
  );
}