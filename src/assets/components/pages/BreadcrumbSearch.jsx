import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

export default function BreadcrumbSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Electronics', href: '#' },
    { label: 'Smartphones', href: '#' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full" style={{paddingRight: '8px'}}>
      {/* Breadcrumb Container with Neumorphism */}
      <div
        className="bg-gray-300 rounded-lg mb-6 flex items-center justify-between px-6 py-4"
        style={{
          background: '#e0e0e0',
          boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
        }}
      >
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-1">
          <ol className="flex items-center space-x-2 w-1/3 min-w-[120px]">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </a>
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1.5" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Search Bar */}
        <form className="flex items-center relative flex-1 justify-end min-w-[350px] max-w-[600px] w-full" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-9 pr-18 py-1.5 rounded-md border-none outline-none text-gray-700 placeholder-gray-500 text-sm w-full"
            style={{
              background: '#e0e0e0',
              boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-2.5 py-1 rounded text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
            style={{
              background: '#e0e0e0',
              boxShadow: '2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff'
            }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
} 