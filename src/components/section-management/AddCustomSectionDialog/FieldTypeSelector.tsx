import React from 'react';
import { FieldType } from './types';
import { 
  Type, 
  AlignLeft, 
  Calendar, 
  Mail, 
  Link, 
  List 
} from 'lucide-react';
import { cn } from '../../../utils/cn';

interface FieldTypeSelectorProps {
  value: FieldType;
  onChange: (type: FieldType) => void;
}

const fieldTypes: { type: FieldType; label: string; icon: React.ComponentType; description: string }[] = [
  {
    type: 'text',
    label: 'Short Text',
    icon: Type,
    description: 'Single line of text'
  },
  {
    type: 'textarea',
    label: 'Long Text',
    icon: AlignLeft,
    description: 'Multiple lines of text'
  },
  {
    type: 'date',
    label: 'Date',
    icon: Calendar,
    description: 'Date picker'
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email address'
  },
  {
    type: 'url',
    label: 'URL',
    icon: Link,
    description: 'Website or link'
  },
  {
    type: 'list',
    label: 'List',
    icon: List,
    description: 'Multiple items'
  }
];

export function FieldTypeSelector({ value, onChange }: FieldTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {fieldTypes.map(({ type, label, icon: Icon, description }) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={cn(
            "flex items-start p-3 border rounded-lg transition-all text-left",
            value === type
              ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
              : "border-gray-200 hover:border-indigo-600"
          )}
        >
          <Icon className={cn(
            "w-5 h-5 mr-3 mt-0.5",
            value === type ? "text-indigo-600" : "text-gray-400"
          )} />
          <div>
            <div className="font-medium text-sm text-gray-900">{label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}