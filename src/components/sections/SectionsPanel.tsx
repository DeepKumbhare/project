import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableSection } from './DraggableSection';
import { Plus, Settings } from 'lucide-react';
import { AddCustomSectionDialog } from '../section-management/AddCustomSectionDialog';
import { cn } from '../../utils/cn';

export function SectionsPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { resumeData, activeSection, setActiveSection, reorderSections } = useResumeStore();
  
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
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h2>
      
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-1 mb-6">
          <SortableContext
            items={sections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <DraggableSection
                key={section.id}
                section={section}
                isActive={section.id === activeSection}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <div className="space-y-3">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </button>
        <button 
          onClick={() => setActiveSection('settings')}
          className={cn(
            "w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors",
            activeSection === 'settings'
              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
        >
          <Settings className="h-4 w-4 mr-2" />
          Resume Settings
        </button>
      </div>

      <AddCustomSectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}