import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function BreadcrumbSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation().pathname;

  function setLocation() {
    if (location === '/user') {
      return "Dashboard";
    } else if (location === '/user/products') {
      return "Products";
    } else if (location === '/user/message') {
      return "Messages";
    } else if (location === '/user/orders') {
      return "Orders";
    } else if (location === '/user/customers') {
      return "Customers";
    } else if (location === '/user/summary') {
      return "Summary";
    } else if (location === '/user/reports') {
      return "Reports";
    }
    return "";
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full" style={{ paddingRight: '8px' }}>
      {/* Breadcrumb Container - Plain White */}
      <div
        className="bg-white rounded-lg mb-3 flex items-center justify-between px-6 py-4"
      >
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-1">
          <ol className="flex items-center space-x-2 w-1/3 min-w-[120px]">
            <li className="flex items-center gap-3">
              <a
                href=""
                className="text-black hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
              >
                {setLocation()}
              </a>
              <ChevronRight size={15} />
            </li>
          </ol>
        </nav>

        {/* Search Bar */}
        <form
          className="flex items-center relative flex-1 justify-end min-w-[350px] max-w-[600px] w-full"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-9 pr-18 py-1.5 rounded-md border border-gray-300 outline-none text-black placeholder-gray-500 text-sm w-full bg-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-2.5 py-1 rounded text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-white border border-gray-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
