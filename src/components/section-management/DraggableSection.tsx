import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Section } from '../../types/resume';

type DraggableSectionProps = {
  section: Section;
  progress: number;
  isActive: boolean;
  onClick: () => void;
  onToggleVisibility: () => void;
  onDelete?: () => void;
};

export function DraggableSection({ 
  section, 
  progress,
  isActive, 
  onClick,
  onToggleVisibility,
  onDelete 
}: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer relative overflow-hidden",
        isActive 
          ? "border-indigo-200 bg-indigo-50"
          : section.enabled
          ? "border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50"
          : "border-gray-100 bg-gray-50",
        isDragging && "opacity-50"
      )}
    >
      {/* Progress Bar Background */}
      {section.enabled && (
        <div 
          className="absolute inset-0 bg-indigo-50 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}

      <div 
        className="flex items-center min-w-0 flex-1 relative"
        onClick={onClick}
      >
        <div
          {...attributes}
          {...listeners}
          className="p-1 cursor-grab active:cursor-grabbing touch-none"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="ml-2 min-w-0">
          <h3 className={cn(
            "text-sm font-medium truncate",
            section.enabled ? "text-gray-900" : "text-gray-500"
          )}>
            {section.title}
          </h3>
          {section.enabled && (
            <p className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            section.enabled 
              ? "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              : "text-gray-400 hover:text-gray-500 hover:bg-gray-50"
          )}
          title={section.enabled ? "Hide section" : "Show section"}
        >
          {section.enabled ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}