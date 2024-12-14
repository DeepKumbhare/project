import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useResumeStore } from '../../store/useResumeStore';
import { generatePDF, getResumeFileName } from '../../utils/export/exportService';
import { cn } from '../../utils/cn';

type ExportButtonProps = {
  className?: string;
};

export function ExportButton({ className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { resumeData } = useResumeStore();
  const contactInfo = resumeData.sections.contact.content;

  const handleExport = async () => {
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) {
      return;
    }

    setIsExporting(true);

    try {
      const pdfBlob = await generatePDF(resumeElement, contactInfo, resumeData.layout);
      const fileName = getResumeFileName(contactInfo, resumeData.layout);
      saveAs(pdfBlob, fileName);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}