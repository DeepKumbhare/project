import React from 'react';
import { Skill } from '../../../types/resume';
import { Wrench, Plus, Minus, Trash2 } from 'lucide-react';

type SkillCategoryProps = {
  category: Skill;
  onChange: (updated: Skill) => void;
  onRemove: () => void;
};

export function SkillCategory({ category, onChange, onRemove }: SkillCategoryProps) {
  const handleChange = (field: keyof Skill, value: any) => {
    onChange({ ...category, [field]: value });
  };

  const addSkill = () => {
    handleChange('skills', [...category.skills, '']);
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...category.skills];
    updated[index] = value;
    handleChange('skills', updated);
  };

  const removeSkill = (index: number) => {
    const updated = category.skills.filter((_, i) => i !== index);
    handleChange('skills', updated);
  };

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Wrench className="w-4 h-4 mr-2" />
              Category Name
            </label>
            <input
              type="text"
              value={category.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Programming Languages"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            {category.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="JavaScript, Python, etc."
                />
                <button
                  onClick={() => removeSkill(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                  title="Remove skill"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Skill
            </button>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="ml-4 p-1 text-gray-400 hover:text-gray-500"
          title="Remove category"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}