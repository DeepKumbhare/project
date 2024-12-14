import React from 'react';
import { ResumeLayout } from '../../../types/resume';
import { LayoutPreview } from './LayoutPreview';

type LayoutListProps = {
  layouts: Array<{
    id: ResumeLayout;
    title: string;
    description: string;
  }>;
  selectedLayout: ResumeLayout;
  onLayoutSelect: (layout: ResumeLayout) => void;
};

export function LayoutList({ layouts, selectedLayout, onLayoutSelect }: LayoutListProps) {
  return (
    <div className="space-y-3">
      {layouts.map((layout) => (
        <LayoutPreview
          key={layout.id}
          layout={layout}
          isSelected={selectedLayout === layout.id}
          onClick={() => onLayoutSelect(layout.id)}
        />
      ))}
    </div>
  );
}