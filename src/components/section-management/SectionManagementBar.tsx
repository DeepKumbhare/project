import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Eye, Settings } from 'lucide-react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableSection } from './DraggableSection';
import { AddCustomSectionDialog } from './AddCustomSectionDialog';
import { cn } from '../../utils/cn';

type SectionManagementBarProps = {
  onPreviewClick: () => void;
};

export function SectionManagementBar({ onPreviewClick }: SectionManagementBarProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { resumeData, setActiveSection, activeSection, reorderSections } = useResumeStore();
  
  const sections = Object.values(resumeData.sections)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id);
      const newIndex = sections.findIndex(section => section.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreviewClick}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-1.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-1.5" />
              Settings
            </button>
          </div>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-wrap gap-2">
            <SortableContext
              items={sections.map(section => section.id)}
              strategy={horizontalListSortingStrategy}
            >
              {sections.map((section) => (
                <DraggableSection
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </SortableContext>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Section
            </button>
          </div>
        </DndContext>
      </div>

      <AddCustomSectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}