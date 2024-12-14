import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">QuickResume</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign in
            </button>
            <Link
              to="/resume-builder"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}