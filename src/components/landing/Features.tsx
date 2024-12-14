import React from 'react';
import { 
  FileText, 
  Zap, 
  Download, 
  Layout, 
  CheckCircle, 
  RefreshCw 
} from 'lucide-react';

const features = [
  {
    name: 'Professional Templates',
    description: 'Choose from a variety of ATS-optimized templates designed by HR experts.',
    icon: Layout,
  },
  {
    name: 'Smart Formatting',
    description: 'Our AI automatically formats your content for the best visual presentation.',
    icon: Zap,
  },
  {
    name: 'Multiple Formats',
    description: 'Export your resume in PDF, DOCX, or TXT formats with a single click.',
    icon: Download,
  },
  {
    name: 'ATS-Friendly',
    description: 'Ensure your resume passes Applicant Tracking Systems with optimized formatting.',
    icon: CheckCircle,
  },
  {
    name: 'Real-time Preview',
    description: 'See changes instantly as you build your resume with live preview.',
    icon: RefreshCw,
  },
  {
    name: 'Version History',
    description: 'Keep track of all versions and easily revert to previous iterations.',
    icon: FileText,
  },
];

export function Features() {
  return (
    <div id="features" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build a perfect resume
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools and features you need to create a professional, ATS-friendly resume.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="h-full bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all">
                  <div>
                    <div className="absolute -top-4 left-4">
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-md">
                        <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
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