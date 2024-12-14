import React from 'react';
import { Plus, Minus } from 'lucide-react';

type AchievementsListProps = {
  achievements: string[];
  onChange: (updated: string[]) => void;
};

export function AchievementsList({ achievements, onChange }: AchievementsListProps) {
  const addAchievement = () => {
    onChange([...achievements, '']);
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    onChange(updated);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Academic Achievements (optional)
      </label>
      {achievements.map((achievement, index) => (
        <div key={index} className="flex items-start space-x-2">
          <input
            type="text"
            value={achievement}
            onChange={(e) => updateAchievement(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Dean's List, Academic Scholarship, etc."
          />
          <button
            onClick={() => removeAchievement(index)}
            className="p-2 text-gray-400 hover:text-gray-500"
            title="Remove achievement"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addAchievement}
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Achievement
      </button>
    </div>
  );
}