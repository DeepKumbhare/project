import React from 'react';
import { ResumeBuilder } from '../components/ResumeBuilder';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ResumeBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">QuickResume</h1>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResumeBuilder />
      </main>
    </div>
  );
}