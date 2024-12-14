import React from 'react';
import { Plus, Minus } from 'lucide-react';

type ResponsibilitiesListProps = {
  responsibilities: string[];
  onChange: (updated: string[]) => void;
};

export function ResponsibilitiesList({ responsibilities, onChange }: ResponsibilitiesListProps) {
  const addResponsibility = () => {
    onChange([...responsibilities, '']);
  };

  const updateResponsibility = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    onChange(updated);
  };

  const removeResponsibility = (index: number) => {
    const updated = responsibilities.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Key Responsibilities
      </label>
      {responsibilities.map((responsibility, index) => (
        <div key={index} className="flex items-start space-x-2">
          <textarea
            value={responsibility}
            onChange={(e) => updateResponsibility(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
            placeholder="Describe a key responsibility or achievement..."
          />
          <button
            onClick={() => removeResponsibility(index)}
            className="p-2 text-gray-400 hover:text-gray-500"
            title="Remove responsibility"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addResponsibility}
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Responsibility
      </button>
    </div>
  );
}