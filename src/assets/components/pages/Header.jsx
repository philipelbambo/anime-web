import React, { useState } from 'react';
import { Menu, LogOut, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Spinner component
const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
    <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
  </div>
);

const Header = () => {
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const requestLogout = () => {
    setRightMenuOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setIsLoggingOut(true);
    setShowLogoutModal(false);
    setTimeout(() => {
      console.log('Logging out...');
      navigate('/login');
      setIsLoggingOut(false);
    }, 2000);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="w-full sticky top-0 z-100">
      <header className="flex items-center justify-between px-6 py-2 text-white bg-gray-900">
        <div className="w-10"></div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setRightMenuOpen(!rightMenuOpen)}
            className="p-3 rounded-lg transition-all duration-200 hover:bg-gray-800 focus:outline-none"
          >
            {rightMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {rightMenuOpen && (
        <div className="absolute right-6 top-16 w-64 text-white rounded-lg p-4 z-40 bg-gray-900">
          <div className="space-y-2">
            <a href="#" className="block py-2 px-4 rounded hover:bg-white hover:bg-opacity-10 transition-colors">
              Settings
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-white hover:bg-opacity-10 transition-colors">
              Profile
            </a>
            <button
              onClick={requestLogout}
              className="w-full text-left py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {rightMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setRightMenuOpen(false);
          }}
        />
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={cancelLogout}></div>
          <div className="relative w-full max-w-sm rounded-lg p-6 text-white text-center bg-gray-900">
            <div className="flex flex-col items-center justify-center space-y-4">
              <AlertCircle size={48} className="text-red-400" />
              <h2 className="text-xl font-bold">Confirm Logout</h2>
              <p className="text-gray-300">Are you sure you want to log out?</p>
              <div className="flex space-x-4 w-full justify-center mt-4">
                <button
                  onClick={confirmLogout}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoggingOut && <Spinner />}
    </div>
  );
};

export default Header;
