import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { ExportButton } from '../export/ExportButton';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function PreviewModal({ isOpen, onClose, children }: PreviewModalProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
            <div className="flex items-center space-x-4">
              <ExportButton />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div 
            className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]" 
            ref={previewRef}
          >
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}