import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface SummaryProps {
  content: string;
}

export function Summary({ content }: SummaryProps) {
  const { theme } = useTheme();
  if (!content) return null;

  // Parse the HTML content and remove any <p> tags while preserving the text
  const cleanContent = content.replace(/<\/?p>/g, '');

  return (
    <section className="space-y-2">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Summary
      </h2>
      <div 
        className="text-sm leading-relaxed"
        style={{ color: theme.colors.text }}
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    </section>
  );
}