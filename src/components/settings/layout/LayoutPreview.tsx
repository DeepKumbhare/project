import React from 'react';
import { ResumeLayout } from '../../../types/resume';
import { cn } from '../../../utils/cn';

type LayoutPreviewProps = {
  layout: {
    id: ResumeLayout;
    title: string;
    description: string;
  };
  isSelected: boolean;
  onClick: () => void;
};

export function LayoutPreview({ layout, isSelected, onClick }: LayoutPreviewProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start p-4 border rounded-lg transition-all",
        isSelected
          ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
          : "border-gray-200 hover:border-indigo-600"
      )}
    >
      <div className="flex-1 text-left">
        <h4 className="text-sm font-semibold text-gray-900">
          {layout.title}
        </h4>
        <p className="mt-1 text-xs text-gray-500">
          {layout.description}
        </p>
      </div>
      <div className={cn(
        "ml-4 w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1",
        isSelected
          ? "border-indigo-600 bg-indigo-600"
          : "border-gray-300"
      )}>
        {isSelected && (
          <span className="block w-2 h-2 bg-white rounded-full m-auto" />
        )}
      </div>
    </button>
  );
}