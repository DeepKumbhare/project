import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Settings, Plus, Eye as PreviewIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { AddCustomSectionDialog } from './AddCustomSectionDialog';
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableSection } from './DraggableSection';

type SectionManagerProps = {
  onPreviewClick?: () => void;
};

export function SectionManager({ onPreviewClick }: SectionManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { resumeData, toggleSection, setActiveSection, deleteSection, reorderSections } = useResumeStore();
  
  const sections = Object.values(resumeData.sections)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id);
      const newIndex = sections.findIndex(section => section.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  const getSectionProgress = (section: any) => {
    if (!section.content) return 0;

    if (typeof section.content === 'string') {
      return section.content.trim() ? 100 : 0;
    }

    if (Array.isArray(section.content)) {
      return section.content.length > 0 ? 100 : 0;
    }

    if (typeof section.content === 'object') {
      const fields = Object.values(section.content);
      if (fields.length === 0) return 0;

      const filledFields = fields.filter(value => {
        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return value !== null && value !== undefined;
      });

      return (filledFields.length / fields.length) * 100;
    }

    return 0;
  };

  const totalProgress = sections.reduce((sum, section) => sum + getSectionProgress(section), 0);
  const overallProgress = sections.length > 0 ? totalProgress / sections.length : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Progress Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="text-gray-900 font-medium">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Section List */}
      <div className="p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sections.map((section) => {
                const progress = getSectionProgress(section);
                return (
                  <DraggableSection
                    key={section.id}
                    section={section}
                    progress={progress}
                    isActive={section.id === resumeData.activeSection}
                    onClick={() => setActiveSection(section.id)}
                    onToggleVisibility={() => toggleSection(section.id)}
                    onDelete={section.isCustom ? () => deleteSection(section.id) : undefined}
                  />
                );
              })}

              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full flex items-center justify-center px-4 py-3 mt-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Section
              </button>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <AddCustomSectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}