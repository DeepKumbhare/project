import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Section } from '../../types/resume';

type DraggableSectionProps = {
  section: Section;
  isActive: boolean;
  onClick: () => void;
};

export function DraggableSection({ section, isActive, onClick }: DraggableSectionProps) {
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
        "flex items-center w-full rounded-md transition-all duration-200",
        isDragging ? "opacity-50 bg-gray-50 shadow-lg" : "",
        isActive 
          ? "bg-indigo-50 border-l-4 border-indigo-600" 
          : "hover:bg-gray-50 border-l-4 border-transparent"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="p-2 cursor-grab active:cursor-grabbing touch-none"
        title="Drag to reorder"
      >
        <GripVertical className={cn(
          "h-5 w-5",
          isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"
        )} />
      </div>
      
      <button
        onClick={onClick}
        className={cn(
          "group flex items-center justify-between flex-1 px-3 py-2.5 text-sm font-medium text-left transition-colors focus:outline-none rounded-r-md",
          isActive 
            ? "text-indigo-700" 
            : "text-gray-700 hover:text-gray-900"
        )}
      >
        <span>{section.title}</span>
        <ChevronRight className={cn(
          "h-4 w-4 transition-opacity",
          isActive 
            ? "text-indigo-500 opacity-100" 
            : "text-gray-400 opacity-0 group-hover:opacity-100"
        )} />
      </button>
    </div>
  );
}