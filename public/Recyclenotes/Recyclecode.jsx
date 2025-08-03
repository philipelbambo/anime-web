Homepage.jsx

import React, { useState } from 'react';

const Homepage = () => {
  const [email, setEmail] = useState('');
  const [toasts, setToasts] = useState([]);

  // Custom toast implementation since react-toastify isn't available
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const sendWelcomeEmail = (userEmail) => {
    // Frontend-only solution using mailto
    const subject = encodeURIComponent('Welcome to One Piece Cafe!');
    const body = encodeURIComponent(`Dear Valued Customer,

Thank you for subscribing to One Piece Cafe newsletter!

We're excited to have you join our crew! Get ready for amazing updates about:
• New menu items inspired by your favorite characters
• Special events and themed nights  
• Exclusive offers and discounts
• Behind-the-scenes content from our kitchen

Set sail with us on this delicious adventure!

Best regards,
The One Piece Cafe Team 🏴‍☠️

---
One Piece Cafe Las Vegas
5600 Spring Mountain Rd Ste A
Las Vegas, NV 89146`);

    // Create mailto link and trigger it
    const mailtoLink = `mailto:${userEmail}?subject=${subject}&body=${body}`;
    
    // Try to open the user's email client
    try {
      window.location.href = mailtoLink;
      return { success: true };
    } catch (error) {
      console.error('Error opening email client:', error);
      return { success: false };
    }
  };

  const handleEmailSubmit = () => {
    // Validate that email contains @
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address with @', 'error');
      return;
    }

    // Basic email validation
    if (email.trim()) {
      // Store email in memory for the session (using a simple array instead of sessionStorage)
      const subscribers = JSON.parse(sessionStorage.getItem('subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        sessionStorage.setItem('subscribers', JSON.stringify(subscribers));
      }
      
      // Trigger email client with welcome message
      const emailResult = sendWelcomeEmail(email);
      
      if (emailResult.success) {
        showToast('Thank you for subscribing! Your email client will open with a welcome message 📧', 'success');
        setEmail('');
      } else {
        showToast('Subscription recorded! Please manually send welcome email', 'error');
      }
    } else {
      showToast('Please enter a valid email address with @', 'error');
    }
  };

  return (
    <div className="w-screen h-screen overflow-y-auto overflow-x-hidden" style={{ background: '#e0e0e0' }}>
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-pulse ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            style={{
              animation: 'slideInRight 0.3s ease-out',
              maxWidth: '400px'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {toast.type === 'success' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Header Navigation */}
      <header className="w-full bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Logo on the left */}
            <div className="flex items-center">
              <img 
                src="./Gallery2/luffy.png" // Replace with your logo image URL
                alt="One Piece Cafe Logo" 
                className="h-16 w-auto"
              />
            </div>
            
            {/* Navigation links on the right */}
            <div className="flex space-x-9">
              <a href="/" className="flex items-center space-x-2 text-black font-bold text-xl hover:text-yellow-600 transition-colors duration-300">
                <svg className="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span>Home</span>
              </a>
              <a href="/Contact" className="flex items-center space-x-2 text-black font-bold text-xl hover:text-yellow-600 transition-colors duration-300">
                <svg className="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>Contact</span>
              </a>
              <a href="/About" className="flex items-center space-x-2 text-black font-bold text-xl hover:text-yellow-600 transition-colors duration-300">
                <svg className="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span>About</span>
              </a>
              <a href="/Gallery" className="flex items-center space-x-2 text-black font-bold text-xl hover:text-yellow-600 transition-colors duration-300">
                <svg className="w-6 h-6 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                </svg>
                <span>Gallery</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Wallpaper */}
      <div 
        className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-between px-16"
        style={{
          backgroundImage: "url('./Gallery1/background3.jpg')", // Replace with your wallpaper image URL
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Left Side - Image */}
        <div className="flex-1 flex justify-start items-center pl-8">
          <img 
            src="/Gallery1/luffyhat.png" // Replace with your image URL
            alt="One Piece Character" 
            className="max-w-md max-h-96 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex-1 text-center text-white">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg"></h1>
          <p className="text-2xl drop-shadow-md"></p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-screen py-20 px-8" style={{ background: '#e0e0e0' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 uppercase tracking-wide">
            THE FIRST-EVER OFFICIAL ONE PIECE CAFE IN THE U.S.
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-16">
            One Piece-themed cafe in the U.S. Dive into a world where food meets adventure, 
            and every meal is a celebration of friendship, flavor, and the spirit of the Grand Line.
          </p>
        </div>

        {/* Bottom Section with Images and Info */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Two Large Images */}
            <div className="space-y-6">
              <div 
                className="h-96 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: "url('./Gallery1/luffy1.jpg')", // Replace with your image URL
                  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                }}
              ></div>
              <div 
                className="h-96 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: "url('./Gallery1/luffy2.jpg')",
                  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                }}
              ></div>
            </div>

            {/* Right Side - Store Information */}
            <div className="space-y-8">
              {/* Store Hours */}
              <div 
                className="p-8 rounded-lg"
                style={{
                  background: '#e0e0e0',
                  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800 uppercase">Store Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Mon - Wed</span>
                    <div className="text-gray-600">
                      <span>11:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Thurs - Sun</span>
                    <div className="text-gray-600">
                      <span>11:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div 
                className="p-8 rounded-lg"
                style={{
                  background: '#e0e0e0',
                  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-800 uppercase">Address</h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className="font-semibold text-lg">One Piece Cafe Las Vegas</p>
                  <p>5600 Spring Mountain Rd Ste A</p>
                  <p>Las Vegas, NV 89146</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Section - Menu and Merchandise */}
        <div className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Menu Picture */}
              <div className="text-center">
                <a href="/Menu">
                  <div 
                    className="h-80 bg-cover bg-center rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: "url('Gallery1/luffymenu.jpg')", // Replace with your menu image URL
                      boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                    }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <h3 className="text-4xl font-bold text-black drop-shadow-lg">MENU</h3>
                    </div>
                  </div>
                </a>
              </div>

              {/* Right Side - Merchandise Picture */}
              <div className="text-center">
                <a href="/Merchandise">
                  <div 
                    className="h-80 bg-cover bg-center rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: "url('Gallery1/luffymerchandise.jpg')", // Replace with your merchandise image URL
                      boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                    }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <h3 className="text-4xl font-bold text-white drop-shadow-lg">MERCHANDISE</h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-16" style={{ background: '#e0e0e0' }}>
        <div className="max-w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Get in Touch Section */}
            <div 
              className="space-y-6 p-12 rounded-lg h-80 flex flex-col"
              style={{
                background: '#e0e0e0',
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">Get in Touch</h3>
              <p className="text-black leading-relaxed flex-grow">
                Enjoy exclusive perks and stay in the loop on our latest delights! Join our community to receive updates about new menu items, special events, and exclusive offers available only to our subscribers.
              </p>
              <div className="flex items-center space-x-2 mt-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-r-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Links Section */}
            <div 
              className="space-y-6 p-12 rounded-lg h-80 flex flex-col"
              style={{
                background: '#e0e0e0',
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">Quick Links</h3>
              <div className="space-y-4 flex-grow">
                <a href="/" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Home
                </a>
                <a href="/About" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  About
                </a>
                <a href="/Contact" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Contact
                </a>
                <a href="/Gallery" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Gallery
                </a>
              </div>
            </div>

            {/* Policy Pages Section */}
            <div 
              className="space-y-6 p-12 rounded-lg h-80 flex flex-col"
              style={{
                background: '#e0e0e0',
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">Policy Pages</h3>
              <div className="space-y-4 flex-grow">
                <a href="/privacy-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Privacy Policy
                </a>
                <a href="/refund-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Refund Policy
                </a>
                <a href="/shipping-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Shipping Policy
                </a>
                <a href="/terms-of-service" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">
                  Terms of Service
                </a>
              </div>
            </div>

            {/* About Us Section */}
            <div 
              className="space-y-6 p-12 rounded-lg h-80 flex flex-col"
              style={{
                background: '#e0e0e0',
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">About Us</h3>
              
              <p className="text-black leading-relaxed flex-grow">
                Experience the world of One Piece like never before at our themed cafe.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-500 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>

              {/* Logo */}
              <div className="mt-auto">
                <img 
                  src="./Gallery2/luffy.png" // Replace with your logo image URL
                  alt="One Piece Cafe Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div 
            className="mt-12 pt-8 text-center p-12 rounded-lg"
            style={{
              background: '#e0e0e0',
              boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
            }}
          >
            <p className="text-black">
              © 1999 One Piece Cafe. All rights reserved. Shakabra 🤙
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );  
};

export default Homepage;