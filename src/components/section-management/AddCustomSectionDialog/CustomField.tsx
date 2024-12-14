import React from 'react';
import { CustomField } from './types';
import { Trash2 } from 'lucide-react';
import { FieldTypeSelector } from './FieldTypeSelector';
import { cn } from '../../../utils/cn';

interface CustomFieldProps {
  field: CustomField;
  onChange: (updated: CustomField) => void;
  onRemove: () => void;
  error?: string;
}

export function CustomFieldEditor({ field, onChange, onRemove, error }: CustomFieldProps) {
  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Field Name
            </label>
            <input
              type="text"
              value={field.name}
              onChange={(e) => onChange({ ...field, name: e.target.value })}
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
                error ? "border-red-300" : "border-gray-300"
              )}
              placeholder="e.g., Project Title, Organization Name"
            />
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Field Type
            </label>
            <FieldTypeSelector
              value={field.type}
              onChange={(type) => onChange({ ...field, type })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Placeholder Text
            </label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a helpful placeholder text..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`required-${field.id}`}
              checked={field.required}
              onChange={(e) => onChange({ ...field, required: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`required-${field.id}`}
              className="ml-2 block text-sm text-gray-700"
            >
              This field is required
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-gray-500"
          title="Remove field"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}