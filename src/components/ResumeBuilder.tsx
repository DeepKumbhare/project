import React, { useState } from 'react';
import { Editor } from './Editor';
import { ResumePreview } from './preview/ResumePreview';
import { PreviewModal } from './preview/PreviewModal';
import { SectionManager } from './section-management/SectionManager';
import { SettingsPanel } from './settings/SettingsPanel';
import { useResumeStore } from '../store/useResumeStore';
import { Eye } from 'lucide-react';

export function ResumeBuilder() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { activeSection } = useResumeStore();

  return (
    <div className="container-fluid relative pb-20 md:pb-0">
      {/* Preview Button - Fixed on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden z-30">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          <Eye className="w-5 h-5 mr-2" />
          Preview Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Sidebar - Section Management */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3">
          <div className="sticky top-6">
            <SectionManager onPreviewClick={() => setIsPreviewOpen(true)} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-8 lg:col-span-9">
          <div className="space-y-6">
            {/* Preview Button - Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview Resume
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              {activeSection === 'settings' ? (
                <SettingsPanel />
              ) : (
                <Editor />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Section Manager */}
        <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-20">
          <SectionManager onPreviewClick={() => setIsPreviewOpen(true)} />
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
      >
        <ResumePreview />
      </PreviewModal>
    </div>
  );
}