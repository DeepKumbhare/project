import React from 'react';

type SummaryPreviewProps = {
  summary: string;
};

export function SummaryPreview({ summary }: SummaryPreviewProps) {
  if (!summary) return null;

  return (
    <div className="text-sm text-gray-700 leading-relaxed">
      {summary}
    </div>
  );
}