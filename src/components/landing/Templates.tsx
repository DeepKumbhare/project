import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const categories = [
  'All',
  'Professional',
  'Creative',
  'Academic',
  'Modern',
  'Simple',
];

const templates = [
  {
    id: 1,
    name: 'Executive Pro',
    category: 'Professional',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Creative Studio',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  // Add more templates...
];

export function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = templates.filter(
    template => activeCategory === 'All' || template.category === activeCategory
  );

  return (
    <div id="templates" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Templates
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose from our professional templates
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Select from our collection of professionally designed templates, perfect for any industry or career level.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md",
                  activeCategory === category
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {template.category}
                          </p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                          Use Template
                        </button>
                      </div>
                    </div>
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