import React from 'react';
import { 
  Zap, 
  Clock, 
  FileCheck, 
  Download 
} from 'lucide-react';

const benefits = [
  {
    title: 'ATS-Optimized',
    description: 'Our resumes are designed to pass through Applicant Tracking Systems with ease.',
    icon: FileCheck,
  },
  {
    title: 'One-Click Formatting',
    description: 'Instantly format your entire resume with professional styling.',
    icon: Zap,
  },
  {
    title: 'Multiple Formats',
    description: 'Download your resume in PDF, DOCX, or TXT formats.',
    icon: Download,
  },
  {
    title: 'Quick Updates',
    description: 'Make changes and see updates in real-time with our live preview.',
    icon: Clock,
  },
];

export function Benefits() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Benefits
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why choose our resume builder?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Create professional resumes quickly and easily with our powerful features.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <benefit.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}