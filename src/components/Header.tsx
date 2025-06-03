import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-800" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">TechInfo AI</h1>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-gray-500">
              Your Technology & Information Assistant
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;