# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





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













import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, ShoppingCart, Clock, Heart } from 'lucide-react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [saleTimeLeft, setSaleTimeLeft] = useState({ days: 2, hours: 14, minutes: 32 });

  // Hero slider images
  const heroSlides = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'
  ];

  // Sample product data
  const categories = [
    {
      name: 'General Items',
      products: [
        { id: 1, name: 'Premium T-Shirt', price: 25.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.5, reviews: 128, onSale: true },
        { id: 2, name: 'Comfort Pants', price: 45.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.3, reviews: 89, onSale: false },
        { id: 3, name: 'Cozy Hoodie', price: 55.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 203, onSale: true },
        { id: 4, name: 'Classic Jacket', price: 75.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.4, reviews: 156, onSale: false },
        { id: 5, name: 'Cotton T-Shirt', price: 22.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.2, reviews: 95, onSale: true },
        { id: 6, name: 'Denim Pants', price: 52.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.6, reviews: 142, onSale: false },
        { id: 7, name: 'Warm Hoodie', price: 48.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&bg=gray', rating: 4.8, reviews: 187, onSale: true },
        { id: 8, name: 'Sport Jacket', price: 68.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', rating: 4.5, reviews: 119, onSale: false }
      ]
    },
    {
      name: 'Jujutsu Kaisen',
      products: [
        { id: 9, name: 'Gojo T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.8, reviews: 245, onSale: true },
        { id: 10, name: 'Sukuna Pants', price: 39.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.6, reviews: 187, onSale: true },
        { id: 11, name: 'Yuji Hoodie', price: 49.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.9, reviews: 312, onSale: false },
        { id: 12, name: 'Megumi T-Shirt', price: 27.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.7, reviews: 198, onSale: true },
        { id: 13, name: 'Nobara Pants', price: 42.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.4, reviews: 134, onSale: false },
        { id: 14, name: 'Domain Hoodie', price: 54.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.9, reviews: 267, onSale: true },
        { id: 15, name: 'Cursed Energy Jacket', price: 72.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', rating: 4.6, reviews: 156, onSale: false }
      ]
    },
    {
      name: 'Hunter x Hunter',
      products: [
        { id: 16, name: 'Gon T-Shirt', price: 27.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.5, reviews: 98, onSale: true },
        { id: 17, name: 'Killua Hoodie', price: 52.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 156, onSale: false },
        { id: 18, name: 'Kurapika Pants', price: 38.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.3, reviews: 89, onSale: true },
        { id: 19, name: 'Leorio T-Shirt', price: 25.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.4, reviews: 76, onSale: false },
        { id: 20, name: 'Phantom Troupe Hoodie', price: 58.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.8, reviews: 201, onSale: true },
        { id: 21, name: 'Hunter Badge Jacket', price: 69.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.6, reviews: 143, onSale: false }
      ]
    },
    {
      name: 'Mushoku Tensei',
      products: [
        { id: 22, name: 'Rudeus T-Shirt', price: 26.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.4, reviews: 76, onSale: true },
        { id: 23, name: 'Magic Hoodie', price: 48.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.6, reviews: 134, onSale: false },
        { id: 24, name: 'Eris Pants', price: 41.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.5, reviews: 112, onSale: true },
        { id: 25, name: 'Roxy T-Shirt', price: 28.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.7, reviews: 165, onSale: false },
        { id: 26, name: 'Demon Continent Hoodie', price: 51.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.3, reviews: 98, onSale: true },
        { id: 27, name: 'Mana Crystal Jacket', price: 65.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', rating: 4.5, reviews: 127, onSale: false }
      ]
    },
    {
      name: 'Naruto',
      products: [
        { id: 28, name: 'Naruto T-Shirt', price: 28.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.8, reviews: 289, onSale: true },
        { id: 29, name: 'Sasuke Hoodie', price: 51.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 198, onSale: false },
        { id: 30, name: 'Sakura Pants', price: 37.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.4, reviews: 145, onSale: true },
        { id: 31, name: 'Kakashi T-Shirt', price: 30.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.9, reviews: 312, onSale: false },
        { id: 32, name: 'Akatsuki Hoodie', price: 56.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.8, reviews: 267, onSale: true },
        { id: 33, name: 'Hidden Leaf Jacket', price: 73.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.6, reviews: 189, onSale: false },
        { id: 34, name: 'Nine Tails Pants', price: 44.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.5, reviews: 176, onSale: true }
      ]
    },
    {
      name: 'Demon Slayer',
      products: [
        { id: 35, name: 'Tanjiro T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.9, reviews: 356, onSale: true },
        { id: 36, name: 'Zenitsu Hoodie', price: 53.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.8, reviews: 267, onSale: false },
        { id: 37, name: 'Inosuke Pants', price: 40.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.6, reviews: 178, onSale: true },
        { id: 38, name: 'Nezuko T-Shirt', price: 27.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.7, reviews: 234, onSale: false },
        { id: 39, name: 'Hashira Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.8, reviews: 289, onSale: true },
        { id: 40, name: 'Demon Corps Jacket', price: 71.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', rating: 4.7, reviews: 198, onSale: false },
        { id: 41, name: 'Breathing Style Pants', price: 43.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.4, reviews: 156, onSale: true }
      ]
    },
    {
      name: 'Attack on Titan',
      products: [
        { id: 42, name: 'Eren T-Shirt', price: 31.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.7, reviews: 234, onSale: true },
        { id: 43, name: 'Survey Corps Hoodie', price: 56.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.8, reviews: 345, onSale: false },
        { id: 44, name: 'Mikasa Pants', price: 42.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.5, reviews: 187, onSale: true },
        { id: 45, name: 'Levi T-Shirt', price: 33.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.9, reviews: 412, onSale: false },
        { id: 46, name: 'Titan Shifter Hoodie', price: 61.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.6, reviews: 267, onSale: true },
        { id: 47, name: 'Wings of Freedom Jacket', price: 74.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.8, reviews: 298, onSale: false },
        { id: 48, name: 'Military Police Pants', price: 45.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.3, reviews: 143, onSale: true }
      ]
    },
    {
      name: 'Chainsaw Man',
      products: [
        { id: 49, name: 'Denji T-Shirt', price: 30.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.6, reviews: 145, onSale: true },
        { id: 50, name: 'Power Hoodie', price: 54.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.5, reviews: 123, onSale: false },
        { id: 51, name: 'Aki Pants', price: 41.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.4, reviews: 98, onSale: true },
        { id: 52, name: 'Makima T-Shirt', price: 32.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.7, reviews: 187, onSale: false },
        { id: 53, name: 'Devil Hunter Hoodie', price: 57.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', rating: 4.6, reviews: 156, onSale: true },
        { id: 54, name: 'Chainsaw Jacket', price: 69.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', rating: 4.5, reviews: 134, onSale: false },
        { id: 55, name: 'Public Safety Pants', price: 46.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.3, reviews: 112, onSale: true }
      ]
    }
  ];

  // Timer effect for sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSaleTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Auto-slide hero carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const ProductSlider = ({ products, categoryName }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const scroll = (direction) => {
      const container = document.getElementById(`slider-${categoryName}`);
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    };

    return (
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
        <div 
          id={`slider-${categoryName}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="min-w-72 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-3"
                />
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    SALE
                  </div>
                )}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Heart size={20} />
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
              <p className="text-lg font-bold text-gray-900">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative w-full h-96 bg-white">
        <div className="relative mx-auto max-w-4xl h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          
          {/* Slider navigation */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white py-6 shadow-sm">
        <div className="w-full px-1">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sale Timer */}
      <div className="bg-red-600 text-white py-3">
        <div className="w-full px-1 text-center">
          <div className="flex items-center justify-center gap-4">
            <Clock size={20} />
            <span className="font-semibold">Sale ends in:</span>
            <div className="flex gap-2">
              <span className="bg-white text-red-600 px-2 py-1 rounded font-bold">{saleTimeLeft.days}d</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded font-bold">{saleTimeLeft.hours}h</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded font-bold">{saleTimeLeft.minutes}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="w-full px-10 py-8">
        {categories.map((category, index) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">{category.name}</h2>
            <ProductSlider products={category.products} categoryName={category.name} />
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 mb-4">${selectedProduct.price}</p>
                  
                  {selectedProduct.onSale && (
                    <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                      <Clock size={16} />
                      <span className="font-semibold">Sale ends in: {saleTimeLeft.days}d {saleTimeLeft.hours}h {saleTimeLeft.minutes}m</span>
                    </div>
                  )}
                  
                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Size:</label>
                    <div className="flex gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded ${
                            selectedSize === size 
                              ? 'bg-black text-white' 
                              : 'bg-white text-black border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded w-fit">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                      BUY NOW
                    </button>
                    <button className="w-full border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">John D.</span>
                    </div>
                    <p className="text-gray-700">Great quality product! Fits perfectly and arrived quickly.</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star size={14} className="text-gray-300" />
                      </div>
                      <span className="font-semibold">Sarah M.</span>
                    </div>
                    <p className="text-gray-700">Good product, but sizing runs a bit small. Order one size up!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;












import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, ShoppingCart, Clock, Heart, X, MessageCircle, Plus, Minus, Trash2, User, MapPin, CreditCard } from 'lucide-react';
import { Home, Info, Phone, Map } from "lucide-react";
// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState({});
  const [toasts, setToasts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    paymentMethod: 'paypal' // Set PayPal as the default
  });
  // Sample payment details - in a real app, these would come from a backend or environment variables
    const gcashNumber = '0917-123-4567';
    const paypalId = 'philipyupatelbambo@gmail.com';
    const gcashMessage = 'Please send your payment to the following GCash number. After payment, take a screenshot and send it to our customer support for verification.';
    const paypalMessage = 'Please send your payment to the following PayPal account. Make sure to use the "Friends and Family" option to avoid transaction fees.';

// [ ... existing useState hooks and other functions ... ]
  const [subscriptionEmail, setSubscriptionEmail] = useState('');

  // Show toast function
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  // Remove toast function
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Hero slider images
  const heroSlides = [
    './Gallery1/chainsawman.jpg',
    './Gallery1/background3.jpg',
    './Gallery1/hunter.jpg',
    './Gallery1/redeus.jpg',
    './Gallery1/naruto.jpg',
    './Gallery1/demonslayer.jpg',
    './Gallery1/eren.jpg',
    './Gallery1/gojo.jpg'
  ];

  // Expanded product data
  const categories = [
    {
      name: 'Chainsaw Man Anime',
      products: [
        { id: 1, name: 'Denji Action Figure', price: 25.99, image: './ChainSawmanAlbum/hoodie1.png', rating: 4.5, reviews: 128, onSale: true },
        { id: 2, name: 'Power Plush Doll', price: 45.99, image: './ChainSawmanAlbum/shirt1.png', rating: 4.3, reviews: 89, onSale: false },
        { id: 3, name: 'Chainsaw Man Hoodie', price: 55.99, image: './ChainSawmanAlbum/hoodie2.png', rating: 4.7, reviews: 203, onSale: true },
        { id: 4, name: 'Makima Jacket', price: 75.99, image: './ChainSawmanAlbum/shirt2.png', rating: 4.4, reviews: 156, onSale: false },
        { id: 5, name: 'Aki Denim Outfit', price: 59.99, image: './ChainSawmanAlbum/hoodie3.png', rating: 4.6, reviews: 177, onSale: false },
        { id: 6, name: 'Chainsaw Man T-Shirt', price: 34.99, image: './ChainSawmanAlbum/shirt3.png', rating: 4.2, reviews: 95, onSale: true },
        { id: 7, name: 'Power Beanie', price: 18.99, image: './ChainSawmanAlbum/hoodie4.png', rating: 4.8, reviews: 210, onSale: true },
        { id: 8, name: 'Chainsaw Man Belt', price: 32.99, image: './ChainSawmanAlbum/shirt4.png', rating: 4.5, reviews: 134, onSale: false },
        { id: 9, name: 'Pochita Running Shoes', price: 89.99, image: './ChainSawmanAlbum/shirt5.png', rating: 4.7, reviews: 305, onSale: true },
        { id: 10, name: 'Denji Sneakers', price: 69.99, image: './ChainSawmanAlbum/pants1.png', rating: 4.6, reviews: 267, onSale: false },
        { id: 11, name: 'Makima Dress Shirt', price: 42.99, image: './ChainSawmanAlbum/pants2.png', rating: 4.4, reviews: 142, onSale: false },
        { id: 12, name: 'Pochita Sunglasses', price: 29.99, image: './ChainSawmanAlbum/pants3.png', rating: 4.9, reviews: 188, onSale: true },
      ]
    },
    {
      name: 'One Piece',
      products: [
        { id: 15, name: "Luffy's Straw Hat Replica", price: 35.99, image: './OnePieceAlbum/shirt1.png', rating: 4.9, reviews: 520, onSale: true },
        { id: 16, name: "Zoro's Wado Ichimonji Katana", price: 129.99, image: './OnePieceAlbum/shirt2.png', rating: 4.8, reviews: 450, onSale: false },
        { id: 17, name: "Nami's Log Pose", price: 24.99, image: './OnePieceAlbum/shirt3.png', rating: 4.7, reviews: 310, onSale: true },
        { id: 18, name: "Chopper Beanie Hat", price: 29.99, image: './OnePieceAlbum/shirt4.png', rating: 4.9, reviews: 600, onSale: true },
        { id: 19, name: "Going Merry Ship Model", price: 89.99, image: './OnePieceAlbum/hoodie1.png', rating: 4.8, reviews: 380, onSale: false },
        { id: 20, name: "Ace's Flame-Flame Fruit Hoodie", price: 59.99, image: './OnePieceAlbum/hoodie2.png', rating: 4.7, reviews: 290, onSale: true },
        { id: 21, name: "Thousand Sunny Ship Model", price: 99.99, image: './OnePieceAlbum/hoodie3.png', rating: 4.9, reviews: 410, onSale: false },
        { id: 22, name: "Sanji's All Blue Apron", price: 22.99, image: './OnePieceAlbum/hoodie4.png', rating: 4.6, reviews: 150, onSale: true },
        { id: 23, name: "Brook's Soul Solid Cane Sword", price: 79.99, image: './OnePieceAlbum/pants1.png', rating: 4.7, reviews: 240, onSale: false },
        { id: 24, name: "Usopp's Kabuto Slingshot Replica", price: 39.99, image: './OnePieceAlbum/pants2.png', rating: 4.5, reviews: 190, onSale: true },
      ]
    },
    {
      name: 'Hunter x Hunter',
      products: [
        { id: 25, name: "Gon's Fishing Rod Replica", price: 49.99, image: './HunterAlbum/shirt1.png', rating: 4.8, reviews: 280, onSale: false },
        { id: 26, name: "Killua's Yo-Yo Replica", price: 39.99, image: './HunterAlbum/shirt2.png', rating: 4.7, reviews: 210, onSale: true },
        { id: 27, name: "Hisoka Playing Cards Set", price: 19.99, image: './HunterAlbum/shirt3.png', rating: 4.9, reviews: 350, onSale: true },
        { id: 28, name: "Kurapika's Chain Jail Bracelet", price: 29.99, image: './HunterAlbum/shirt4.png', rating: 4.6, reviews: 180, onSale: false },
        { id: 29, name: "Phantom Troupe Spider Tattoo Shirt", price: 27.99, image: './HunterAlbum/hoodie1.png', rating: 4.8, reviews: 260, onSale: true },
        { id: 30, name: "Leorio's Suit & Tie", price: 65.99, image: './HunterAlbum/hoodie2.png', rating: 4.4, reviews: 110, onSale: false },
        { id: 31, name: "Netero's Bodhisattva Hand T-Shirt", price: 29.99, image: './HunterAlbum/hoodie3.png', rating: 4.7, reviews: 220, onSale: true },
        { id: 32, name: "Meruem vs Netero Poster", price: 16.99, image: './HunterAlbum/hoodie4.png', rating: 4.9, reviews: 300, onSale: true },
        { id: 33, name: "Chrollo Lucifer Bookmark Set", price: 12.99, image: './HunterAlbum/pants1.png', rating: 4.5, reviews: 95, onSale: false },
        { id: 34, name: "Chrollo Lucifer Bookmark Set", price: 12.99, image: './HunterAlbum/pants2.png', rating: 4.5, reviews: 95, onSale: false },
      ]
    },
    {
      name: 'Mushoku Tensei',
      products: [
        { id: 34, name: "Rudeus Greyrat Staff Replica", price: 79.99, image: './MushokuTenseiAlbum/shirt1.png', rating: 4.7, reviews: 150, onSale: false },
        { id: 35, name: "Sylphiette's Green Hair Wig", price: 34.99, image: './MushokuTenseiAlbum/shirt2.png', rating: 4.5, reviews: 90, onSale: true },
        { id: 36, name: "Roxy Migurdia Figure", price: 59.99, image: './MushokuTenseiAlbum/shirt3.png', rating: 4.9, reviews: 200, onSale: true },
        { id: 37, name: "Eris Boreas Greyrat Sword Replica", price: 89.99, image: './MushokuTenseiAlbum/shirt4.png', rating: 4.8, reviews: 175, onSale: false },
        { id: 38, name: "Paul Greyrat Training Outfit", price: 55.99, image: './MushokuTenseiAlbum/shirt5.png', rating: 4.6, reviews: 80, onSale: false },
        { id: 39, name: "Ghiselaine Dedoldia Sword Replica", price: 99.99, image: './MushokuTenseiAlbum/hoodie1.png', rating: 4.9, reviews: 160, onSale: false },
        { id: 40, name: "Orsted's Battle Cloak", price: 120.00, image: './MushokuTenseiAlbum/hoodie2.png', rating: 4.8, reviews: 110, onSale: true },
        { id: 41, name: "Nanahoshi's Magical Notebook", price: 45.50, image: './MushokuTenseiAlbum/hoodie3.png', rating: 4.6, reviews: 95, onSale: false },
        { id: 42, name: "Cliff Grimoire Replica", price: 70.25, image: './MushokuTenseiAlbum/pants1.png', rating: 4.7, reviews: 130, onSale: true },
        { id: 43, name: "Aisha Greyrat Mini Figure", price: 29.99, image: './MushokuTenseiAlbum/pants2.png', rating: 4.5, reviews: 85, onSale: false },
      ]
    },
    {
      name: 'Naruto',
      products: [
        { id: 40, name: "Naruto Headband", price: 19.99, image: './NarutoAlbum/shirt1.png', rating: 4.8, reviews: 400, onSale: true },
        { id: 41, name: "Akatsuki Cloud Cloak", price: 79.99, image: './NarutoAlbum/shirt2.png', rating: 4.7, reviews: 350, onSale: false },
        { id: 42, name: "Sharingan Contact Lenses", price: 29.99, image: './NarutoAlbum/shirt3.png', rating: 4.9, reviews: 500, onSale: true },
        { id: 43, name: "Jiraiya's Toad Sage Scroll", price: 45.99, image: './NarutoAlbum/shirt4.png', rating: 4.6, reviews: 280, onSale: true },
        { id: 44, name: "Kunai and Shuriken Set", price: 25.99, image: './NarutoAlbum/hoodie1.png', rating: 4.7, reviews: 310, onSale: false },
        { id: 45, name: "Kakashi's Anbu Mask", price: 34.99, image: './NarutoAlbum/hoodie2.png', rating: 4.8, reviews: 290, onSale: true },
        { id: 46, name: "Sasuke's Mangekyou Sharingan Hoodie", price: 54.99, image: './NarutoAlbum/hoodie3.png', rating: 4.7, reviews: 330, onSale: false },
        { id: 47, name: "Itachi Uchiha Funko Pop", price: 14.99, image: './NarutoAlbum/hoodie4.png', rating: 4.9, reviews: 450, onSale: true },
        { id: 48, name: "Hidden Leaf Village Backpack", price: 49.99, image: './NarutoAlbum/pants1.png', rating: 4.6, reviews: 200, onSale: false },
        { id: 48, name: "Hidden Leaf Village Backpack", price: 49.99, image: './NarutoAlbum/pants2.png', rating: 4.6, reviews: 200, onSale: false },
      ]
    },
    {
      name: 'Demon Slayer',
      products: [
        { id: 49, name: "Tanjiro's Hanafuda Earrings", price: 21.99, image: './DemonSlayerAlbum/shirt1.png', rating: 4.9, reviews: 650, onSale: true },
        { id: 50, name: "Nezuko Bamboo Muzzle Replica", price: 15.99, image: './DemonSlayerAlbum/shirt2.png', rating: 4.8, reviews: 420, onSale: true },
        { id: 51, name: "Zenitsu's Nichirin Sword Replica", price: 99.99, image: './DemonSlayerAlbum/shirt3.png', rating: 4.7, reviews: 390, onSale: false },
        { id: 52, name: "Inosuke's Pig Head Mask", price: 39.99, image: './DemonSlayerAlbum/shirt4.png', rating: 4.6, reviews: 250, onSale: true },
        { id: 53, name: "Giyu Tomioka Haori", price: 69.99, image: './DemonSlayerAlbum/hoodie1.png', rating: 4.9, reviews: 480, onSale: false },
        { id: 54, name: "Rengoku Kyojuro Katana Replica", price: 109.99, image: './DemonSlayerAlbum/hoodie2.png', rating: 4.8, reviews: 360, onSale: false },
        { id: 55, name: "Shinobu Kocho Butterfly Hair Clip", price: 18.99, image: './DemonSlayerAlbum/hoodie3.png', rating: 4.7, reviews: 210, onSale: true },
        { id: 56, name: "Muzan Kibutsuji Hat", price: 29.99, image: './DemonSlayerAlbum/hoodie4.png', rating: 4.5, reviews: 150, onSale: false },
        { id: 56, name: "Muzan Kibutsuji Hat", price: 29.99, image: './DemonSlayerAlbum/pants1.png', rating: 4.5, reviews: 150, onSale: false },
        { id: 56, name: "Muzan Kibutsuji Hat", price: 29.99, image: './DemonSlayerAlbum/pants2.png', rating: 4.5, reviews: 150, onSale: false },
      ]
    },
    {
      name: 'Attack on Titan',
      products: [
        { id: 57, name: "Scout Regiment Jacket", price: 89.99, image: './AttackTitanAlbum/hoodie1.png', rating: 4.8, reviews: 550, onSale: true },
        { id: 58, name: "Eren Yeager's Key Necklace", price: 29.99, image: './AttackTitanAlbum/hoodie2.png', rating: 4.7, reviews: 320, onSale: false },
        { id: 59, name: "3D Maneuver Gear Replica", price: 199.99, image: './AttackTitanAlbum/hoodie3.png', rating: 4.9, reviews: 700, onSale: false },
        { id: 60, name: "Levi Ackerman Funko Pop", price: 14.99, image: './AttackTitanAlbum/hoodie4.png', rating: 4.8, reviews: 410, onSale: true },
        { id: 61, name: "Colossal Titan Poster", price: 16.99, image: './AttackTitanAlbum/shirt1.png', rating: 4.6, reviews: 230, onSale: false },
        { id: 62, name: "Mikasa Ackerman Scarf", price: 24.99, image: './AttackTitanAlbum/shirt2.png', rating: 4.7, reviews: 300, onSale: true },
        { id: 63, name: "Armin Arlert Plush Toy", price: 21.99, image: './AttackTitanAlbum/shirt3.png', rating: 4.5, reviews: 180, onSale: false },
        { id: 64, name: "Titan Serum Syringe Replica", price: 39.99, image: './AttackTitanAlbum/shirt4.png', rating: 4.6, reviews: 150, onSale: false },
        { id: 64, name: "Titan Serum Syringe Replica", price: 39.99, image: './AttackTitanAlbum/pants1.png', rating: 4.6, reviews: 150, onSale: false },
        { id: 64, name: "Titan Serum Syringe Replica", price: 39.99, image: './AttackTitanAlbum/pants2.png', rating: 4.6, reviews: 150, onSale: false },
        { id: 64, name: "Titan Serum Syringe Replica", price: 39.99, image: './AttackTitanAlbum/pants3.png', rating: 4.6, reviews: 150, onSale: false },
      ]
    },
    {
      name: 'Jujutsu Kaisen',
      products: [
        { id: 65, name: "Gojo Satoru T-Shirt", price: 29.99, image: './JujutsuKaisenAlbum/shirt1.png', rating: 4.8, reviews: 245, onSale: true },
        { id: 66, name: "Ryomen Sukuna Hoodie", price: 49.99, image: './JujutsuKaisenAlbum/shirt2.png', rating: 4.9, reviews: 312, onSale: false },
        { id: 67, name: "Yuji Itadori Funko Pop", price: 12.99, image: './JujutsuKaisenAlbum/shirt3.png', rating: 4.7, reviews: 180, onSale: true },
        { id: 68, name: "Megumi Fushiguro Cursed Technique T-Shirt", price: 27.99, image: './JujutsuKaisenAlbum/shirt4.png', rating: 4.7, reviews: 198, onSale: true },
        { id: 69, name: "Nobara Kugisaki Hammer Replica", price: 34.99, image: './JujutsuKaisenAlbum/hoodie1.png', rating: 4.6, reviews: 120, onSale: false },
        { id: 70, name: "Maki Zenin Playful Cloud Weapon", price: 59.99, image: './JujutsuKaisenAlbum/hoodie2.png', rating: 4.8, reviews: 165, onSale: false },
        { id: 71, name: "Toge Inumaki Cursed Speech Mask", price: 19.99, image: './JujutsuKaisenAlbum/hoodie3.png', rating: 4.6, reviews: 154, onSale: true },
        { id: 72, name: "Panda Plush Toy", price: 22.99, image: './JujutsuKaisenAlbum/hoodie4.png', rating: 4.9, reviews: 277, onSale: false },
        { id: 73, name: "Gojo's Blindfold Replica", price: 15.99, image: './JujutsuKaisenAlbum/pants1.png', rating: 4.5, reviews: 112, onSale: true },
        { id: 74, name: "Sukuna's Finger Pendant", price: 28.99, image: './JujutsuKaisenAlbum/pants2.png', rating: 4.8, reviews: 203, onSale: true },
      ]
    }
  ];

  // Add to cart function
  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      size: selectedSize,
      quantity: quantity
    };
    setCart(prev => [...prev, cartItem]);
    showToast(`${product.name} added to cart!`, 'success');
    setSelectedProduct(null);
  };

  // Buy now function
  const buyNow = (product) => {
    addToCart(product);
    setShowCart(true);
    showToast('Proceed to checkout!', 'info');
  };

  // Remove from cart
  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from cart', 'info');
  };

  // Update cart quantity
  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Add review function
  const addReview = (productId) => {
    if (!newReview.comment.trim()) {
      showToast('Please write a review comment', 'error');
      return;
    }
    const review = {
      id: Date.now(),
      rating: newReview.rating,
      comment: newReview.comment,
      author: 'Anonymous User',
      date: new Date().toLocaleDateString()
    };
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
    setNewReview({ rating: 5, comment: '' });
    showToast('Review added successfully!', 'success');
  };
// Handle checkout
const handleCheckout = () => {
  const required = ['email', 'firstName', 'lastName', 'address', 'city', 'zipCode'];
  const missing = required.filter(field => !checkoutForm[field]);

  if (missing.length > 0) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  // Provide a confirmation message based on the selected payment method
  if (checkoutForm.paymentMethod === 'cod') {
    showToast('Order placed successfully! Please prepare the exact amount for Cash on Delivery.', 'success');
  } else if (checkoutForm.paymentMethod === 'gcash') {
    showToast('Order placed successfully! Please complete your GCash payment and send us a screenshot for verification.', 'success');
  } else if (checkoutForm.paymentMethod === 'paypal') {
    showToast('Order placed successfully! Please complete your PayPal payment and send us a screenshot of the transaction for verification.', 'success');
  }

  // Reset the cart and close the modals after a successful checkout
  setCart([]);
  setShowCheckout(false);
  setShowCart(false);
  setCheckoutForm({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    paymentMethod: 'cod' // Reset to a default value
  });
};
  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscriptionEmail) {
      showToast('Please enter a valid email', 'error');
      return;
    }
    showToast('Thank you for subscribing!', 'success');
    setSubscriptionEmail('');
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Timer effect for sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSaleTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide hero carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const ProductSlider = ({ products, categoryName }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scroll = (direction) => {
      const container = document.getElementById(`slider-${categoryName}`);
      const scrollAmount = 300;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    };

    return (
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
        <div
          id={`slider-${categoryName}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-72 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-3"
                />
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    SALE
                  </div>
                )}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Heart size={20} />
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
              <p className="text-lg font-bold text-gray-900">₱{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Header with Burger Menu */}
      <div className="bg-white shadow-sm  border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Burger Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-black">Store</h1>
          </div>
          {/* Right: Cart Button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Sidebar Menu (Slide-in from left) */}
        {menuOpen && (
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col p-6 space-y-6 h-full">
              <div className="flex justify-between items-center">
                <img 
                  src="./Gallery1/luffy1.png" 
                  alt="MENU" 
                  className="h-12 w-auto"
                />
                <button onClick={() => setMenuOpen(false)} className="text-black">
                  <X size={24} />
                </button>
                </div>
                <nav className="flex flex-col space-y-6 mt-4 flex-1">
                  <a
                    href="/home"
                    className="flex items-center gap-3 text-black text-xl hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Home size={20} /> Home
                  </a>

                  <a
                    href="/about"
                    className="flex items-center gap-3 text-black text-xl hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Info size={20} /> About
                  </a>

                  <a
                    href="/contact"
                    className="flex items-center gap-3 text-black text-xl hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Phone size={20} /> Contact
                  </a>

                  <a
                    href="/mapping"
                    className="flex items-center gap-3 text-black text-xl hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Map size={20} /> Map
                  </a>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Hero Slider */}
      <div className="relative w-full h-[500px] bg-white">
        <div className="relative mx-auto max-w-7xl h-full px-4">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                } hover:bg-white transition`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="w-full px-10 py-20">
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">{category.name}</h2>
            <ProductSlider products={category.products} categoryName={category.name} />
          </div>
        ))}
      </div>

      {/* Modals: Product, Review, Cart, Checkout */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₱{selectedProduct.price.toFixed(2)}</p>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Size:</label>
                    <div className="flex gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded w-fit">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <button onClick={() => buyNow(selectedProduct)} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                      BUY NOW
                    </button>
                    <button onClick={() => addToCart(selectedProduct)} className="w-full border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
                      <ShoppingCart size={20} /> ADD TO CART
                    </button>
                  </div>
                  <button onClick={() => showToast('Message sent to admin!', 'info')} className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> MESSAGE ADMIN
                  </button>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button onClick={() => setShowReviews(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Write a Review
                  </button>
                </div>
                <div className="space-y-4">
                  {(reviews[selectedProduct.id] || []).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">John D.</span>
                    </div>
                    <p className="text-gray-700">Great quality product! Fits perfectly and arrived quickly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviews && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Write a Review</h3>
              <button onClick={() => setShowReviews(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} onClick={() => setNewReview(prev => ({ ...prev, rating }))} className="text-2xl">
                      <Star className={rating <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Write your review..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addReview(selectedProduct.id);
                    setShowReviews(false);
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit Review
                </button>
                <button onClick={() => setShowReviews(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="ml-auto w-96 bg-white h-full overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shopping Cart ({cart.length})</h3>
                <button onClick={() => setShowCart(false)}><X size={20} /></button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.cartId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                          <p className="text-sm font-bold">₱{item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Minus size={12} />
                          </button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ₱{cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
{/* Checkout Modal */}
{showCheckout && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
        {/* Contact Information */}
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><User size={20} /> Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="email" placeholder="Email" value={checkoutForm.email} onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })} className="p-3 border border-gray-300 rounded-lg" required />
          <input type="tel" placeholder="Phone Number" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} className="p-3 border border-gray-300 rounded-lg" />
        </div>

        {/* Shipping Address */}
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><MapPin size={20} /> Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="First Name" value={checkoutForm.firstName} onChange={(e) => setCheckoutForm({ ...checkoutForm, firstName: e.target.value })} className="p-3 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Last Name" value={checkoutForm.lastName} onChange={(e) => setCheckoutForm({ ...checkoutForm, lastName: e.target.value })} className="p-3 border border-gray-300 rounded-lg" required />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Address" value={checkoutForm.address} onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input type="text" placeholder="City" value={checkoutForm.city} onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })} className="p-3 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="State / Province" value={checkoutForm.state} onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })} className="p-3 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="ZIP Code" value={checkoutForm.zipCode} onChange={(e) => setCheckoutForm({ ...checkoutForm, zipCode: e.target.value })} className="p-3 border border-gray-300 rounded-lg" required />
        </div>
        <div className="mb-6">
          <input type="text" placeholder="Country" value={checkoutForm.country} onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        
        {/* Payment Information */}
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment Method</h3>
        <div className="mb-6 space-y-4">
          <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={checkoutForm.paymentMethod === 'paypal'}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
              className="form-radio h-5 w-5 text-black"
            />
            <span className="font-semibold text-lg">PayPal</span>
          </label>
          <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="gcash"
              checked={checkoutForm.paymentMethod === 'gcash'}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
              className="form-radio h-5 w-5 text-black"
            />
            <span className="font-semibold text-lg">GCash</span>
          </label>
          <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={checkoutForm.paymentMethod === 'cod'}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
              className="form-radio h-5 w-5 text-black"
            />
            <span className="font-semibold text-lg">Cash on Delivery</span>
          </label>
        </div>

        {/* Conditional Payment Details */}
        {checkoutForm.paymentMethod === 'gcash' && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold text-lg mb-2">GCash Payment Details</h4>
            <p className="text-gray-700">{gcashMessage}</p>
            <p className="text-xl font-bold text-green-600 my-2">{gcashNumber}</p>
          </div>
        )}

        {checkoutForm.paymentMethod === 'paypal' && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold text-lg mb-2">PayPal Payment Details</h4>
            <p className="text-gray-700">{paypalMessage}</p>
            <p className="text-xl font-bold text-blue-600 my-2">{paypalId}</p>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
        >
          {checkoutForm.paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Pay'} ₱{cartTotal.toFixed(2)}
        </button>
      </form>
    </div>
  </div>
)}
{/* Footer */}
<footer className="bg-white border-t border-gray-200 py-8 px-8 text-black">
  <div className="max-w-7xl mx-auto">
    {/* 3-column grid: left (Logo & Social), center (Support & Explore), right (Payment & Contact) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Left Column: Logo & Follow Us */}
      <div className="flex flex-col items-center md:items-start space-y-6">
        <img 
          src="./Gallery2/luffy.png" 
          alt="Anime Shop Logo" 
          className="w-24 h-auto"
        />
        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            Follow Us
          </h3>
          <div className="flex gap-3 justify-center md:justify-start">
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Center Column: Support & Explore */}
      <div className="flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
        
        {/* Support Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2.923 3.693l-1.603-.49A1.5 1.5 0 006 13.5v.5a.5.5 0 001 0v-.5a.5.5 0 00.5-.5.5.5 0 011 0v.5a.5.5 0 001 0v-3.5a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-600">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-600">Coupon Codes</a></li>
            <li><a href="#" className="hover:text-gray-600">Free Shipping</a></li>
            <li><a href="#" className="hover:text-gray-600">Refunds & Returns</a></li>
            <li><a href="#" className="hover:text-gray-600">Shipping Info</a></li>
            <li><a href="#" className="hover:text-gray-600">Size Chart</a></li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-600">All Designs</a></li>
            <li><a href="#" className="hover:text-gray-600">Featured Artists</a></li>
            <li><a href="#" className="hover:text-gray-600">Newest Designers</a></li>
            <li><a href="#" className="hover:text-gray-600">Newest T-Shirts</a></li>
          </ul>
        </div>
      </div>

      {/* Right Column: Payment & Contact */}
      <div>
        {/* We Accept & Get in Touch */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* We Accept */}
         <div>
  <h3 className="text-lg font-bold mb-4 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M4 4a2 2 0 00-2 2v2.5A.5.5 0 012.5 9H17.5a.5.5 0 01.5.5V6a2 2 0 00-2-2H4zm13.5 6H2.5a.5.5 0 00-.5.5v2A2.5 2.5 0 004.5 15h11a2.5 2.5 0 002.5-2.5v-2a.5.5 0 00-.5-.5z" />
    </svg>
    We Accept
  </h3>

  <div className="flex gap-4">
    {/* GCash Logo */}
    <img
      src="/Gallery1/Gcash.png" // <-- Your logo path
      alt="GCash"
      className="w-20 h-12 object-contain"
    />

    {/* PayPal Logo */}
    <img
      src="/Gallery1/paypal.png" // <-- Your logo path
      alt="PayPal"
      className="w-20 h-12 object-contain"
    />
  </div>
</div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Get in Touch
            </h3>
           <form onSubmit={handleSubscribe} className="flex gap-2 flex-wrap">
              <input
                type="email"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 border border-gray-300 rounded text-base focus:outline-none focus:border-black w-[500px] max-w-full"
              />
              <button
                type="submit"
                className="bg-black text-white px-5 py-3 rounded text-base hover:bg-gray-800 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer> 
      {/* Animation Style */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Homepage;










import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
// Added FaImage for the Gallery icon and FaMoon for dark mode
import { FaHome, FaUtensils, FaEnvelope, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram, FaClock, FaBullhorn, FaImage, FaMoon } from 'react-icons/fa';
import { motion } from "framer-motion";



const CoffeeShopLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);

  const coffeeProducts = [
    { id: 1, name: 'Espresso', image: '/OurCoffee/coffee1.png' },
    { id: 2, name: 'Cappuccino', image: '/OurCoffee/coffee2.png' },
    { id: 3, name: 'Latte', image: '/OurCoffee/coffee3.png' },
    { id: 4, name: 'Americano', image: '/OurCoffee/coffee4.png' },
    { id: 5, name: 'Mocha', image: '/OurCoffee/coffee5.png' },
    { id: 6, name: 'Macchiato', image: '/OurCoffee/coffee6.png' },
    { id: 7, name: 'Flat White', image: '/OurCoffee/coffee7.png' },
    { id: 8, name: 'Irish Coffee', image: '/OurCoffee/coffee8.png' },
    { id: 9, name: 'Iced Coffee', image: '/OurCoffee/coffee9.png' },
    { id: 10, name: 'Affogato', image: '/OurCoffee/coffee10.png' },
    { id: 11, name: 'Cold Brew', image: '/OurCoffee/coffee11.png' },
    { id: 12, name: 'Turkish Coffee', image: '/OurCoffee/coffee12.png' }
  ];

  const desserts = [
    { id: 7, name: 'Croissant', price: 2.50, image: '/SliderGallery/bread1.png' },
    { id: 8, name: 'Muffin', price: 3.00, image: '/SliderGallery/bread2.png' },
    { id: 9, name: 'Cheesecake', price: 4.50, image: '/SliderGallery/bread3.png' },
    { id: 10, name: 'Crème brûlée', price: 5.50, image: '/SliderGallery/bread4.png' },
    { id: 11, name: 'Brownie', price: 3.50, image: '/SliderGallery/bread5.png' },
    { id: 12, name: 'Macaron', price: 2.75, image: '/SliderGallery/bread8.png' },
    { id: 13, name: 'Tiramisu', price: 4.75, image: '/SliderGallery/bread7.png' },
    { id: 14, name: 'Donut', price: 2.25, image: '/SliderGallery/bread6.png' }
  ];

  // Gallery images organized in 3 rows
  const galleryRows = [
    // Row 1 - moves left to right
    [
      "/SliderGallery/cup1.png",
      "/SliderGallery/cup2.png",
      "/SliderGallery/cup3.png",
      "/SliderGallery/cup4.png",
      "/SliderGallery/cup5.png",
      "/SliderGallery/cup6.png"
    ],
    // Row 2 - moves right to left
    [
      "/SliderGallery/cup7.png",
      "/SliderGallery/cup8.png",
      "/SliderGallery/cup9.png",
      "/SliderGallery/cup10.png",
      "/SliderGallery/cup11.png",
      "/SliderGallery/cup12.png"
    ],
    // Row 3 - moves left to right
    [
      "/SliderGallery/cup13.png",
      "/SliderGallery/cup14.png",
      "/SliderGallery/cup15.png",
      "/SliderGallery/cup16.png",
      "/SliderGallery/cup17.png",
      "/SliderGallery/cup18.png"
    ],
    // Row 4 - moves right to left
    [
      "/SliderGallery/bread1.png",
      "/SliderGallery/bread2.png",
      "/SliderGallery/bread3.png",
      "/SliderGallery/bread4.png",
      "/SliderGallery/bread5.png",
      "/SliderGallery/bread6.png"
    ],
  ];

  // Generate coffee beans for falling animation
  const generateCoffeeBeans = () => {
    const beans = [];
    for (let i = 0; i < 25; i++) {
      beans.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 15,
      });
    }
    return beans;
  };

  const coffeeBeans = generateCoffeeBeans();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .slide-left {
          animation: slide-left 20s linear infinite;
        }
        
        .slide-right {
          animation: slide-right 20s linear infinite;
        }
        
        .coffee-bean {
          position: fixed;
          pointer-events: none;
          z-index: 1;
          animation: fall linear infinite;
        }
        
        .coffee-bean {
            position: relative;
            width: 40px;
            height: 20px;
            margin: 50px auto;
          }

          .coffee-bean::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(140deg, #6f3a00 0%, #4b2600 50%, #8B4513 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            box-shadow: 
              inset -6px 4px 10px rgba(0, 0, 0, 0.6),
              inset 2px -2px 5px rgba(255, 255, 255, 0.2),
              0 4px 8px rgba(0, 0, 0, 0.3);
            
            /* 3D effect via transform */
            transform: rotate(15deg) scale(1);
            transform-origin: center;
            transition: transform 0.3s ease;
          }

          /* Optional: Add a highlight for more depth */
          .coffee-bean::after {
            content: '';
            position: absolute;
            width: 25%;
            height: 40%;
            top: 30%;
            left: 25%;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            transform: rotate(-20deg);
            opacity: 0.8;
          }

          /* Background image styles - REMOVED OVERLAY */
          .main-background {
            background-image: url('/Gallery3/coffeebeans.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: calc(100vh - 80px); /* Adjust based on header height */
          }

          /* REMOVED THE OVERLAY - No ::before pseudo-element anymore */
      `}
      </style>

      {/* Falling Coffee Seeds Animation - only when coffee mode is active */}
      {coffeeMode && (
        <div className="fixed inset-0 pointer-events-none z-1">
          {coffeeBeans.map((bean) => (
            <div
              key={bean.id}
              className="coffee-bean"
              style={{
                left: `${bean.left}%`,
                animationDelay: `${bean.animationDelay}s`,
                animationDuration: `${bean.animationDuration}s`,
                fontSize: `${bean.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header - separate from background */}
      <header className={`relative border-b z-50 ${coffeeMode ? 'border-b-lime-950 bg-[#4C4B16]' : 'border-white bg-white'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 border rounded-lg transition-colors ${coffeeMode ? ' text-amber-50 hover:bg-amber-700 bg-[#4C4B16]' : 'bg-[#4C4B16] text-white hover:bg-[#5a5221] border-[#4C4B16]'}`}
            >
              <Menu size={24} />
            </button>
            {/* Logo and Brand Name on the right side */}
            <div className="flex items-center space-x-4 ml-auto">
              <h1 className={`text-2xl font-bold ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>Brew-Coffee</h1>
              <img
                src="/Gallery3/coffee.png"
                alt="Coffee Shop Logo"
                className="w-12 h-12"
              />
            </div>
            {/* Spacer */}
            <div className="w-12"></div>
          </div>
        </div>

        {/* Slide-out Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-blur bg-opacity-50">
            <div className={`absolute left-0 top-0 h-full w-50 shadow-lg ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-[#e0e0e0]'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">
                <img src="/Gallery3/coffee.png" alt="Logo" className="h-10 w-auto" />
              </h3>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className={`p-2 transition-colors ${coffeeMode ? 'hover:bg-amber-800 text-amber-50' : 'hover:bg-gray-100 text-[#4C4B16]'}`}
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-6">
                    <li>
                      <a
                        href="#home"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaHome className="mr-2" /> Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#menu"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUtensils className="mr-2" /> Menu
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaEnvelope className="mr-2" /> Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaInfoCircle className="mr-2" /> About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#gallery"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaImage className="mr-2" /> Gallery
                      </a>
                      {/* Coffee Mode toggle below Gallery */}
                      <div className="flex items-center space-x-2 mt-3 ml-2">
                        <FaMoon className={`text-lg ${coffeeMode ? 'text-amber-200' : 'text-[#4C4B16]'}`} />
                        <button
                          onClick={() => setCoffeeMode(!coffeeMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${coffeeMode ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with background */}
      <div className={`main-background relative ${coffeeMode ? 'coffee-mode' : ''}`}>
        <section id="home" className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center  md:text-left">
              <img
                src="/Gallery3/animecafe.png"
                alt="Coffee Logo"
                className="mx-auto md:mx-0 mb-0 w-70 h-70 object-contain"
              />
              <h2 className={`text-6xl font-bold leading-tight -mt-2 ${coffeeMode ? 'text-lime-950' : 'text-[#4C4B16]'}`}>
                Take A Break<br />
                Have The Best Coffee
              </h2>
              <a href="/order">
                <button className={`rounded-lg px-8 py-4 text-lg transition-colors mt-6 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50 hover:bg-amber-600' : 'bg-[#4C4B16] text-white hover:bg-[#5a5221]'}`}>
                  ORDER NOW
                </button>
              </a>
            </div>
            <div className="flex justify-center relative">
              <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                <img
                  src="/Gallery3/CoffeeP.png"
                  alt="Coffee Cup"
                  className="w-[460px] h-[460px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rest of content with original background */}
      <div className={`transition-colors duration-300 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'text-[#4C4B16] bg-white'}`}>
        {/* Coffee Menu */}
        
      {/* Coffee Menu */}
      <section id="menu" className="container mx-auto px-4 py-16 relative z-10">
        <h3
          className={`text-4xl font-bold text-center mb-6 ${
            coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'
          }`}
        >
          Our Coffee
        </h3>

     {/* Full-width description with fade-in + stylish font */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-lg md:text-xl font-semibold tracking-wide text-center mb-12 w-full font-serif ${
          coffeeMode ? 'text-amber-100' : 'text-[#4C4B16]'
        }`}
      >
        At BrewMaster, every cup is crafted to bring warmth and comfort. 
        We roast our beans with care, brew with precision, and serve 
        with passion—so you can enjoy rich flavors, smooth textures, 
        and the perfect aroma in every sip.
      </motion.p>
      
        <div className="grid md:grid-cols-4 gap-8">
          {coffeeProducts.map((coffee) => (
            <div
              key={coffee.id}
              className={`text-center border p-6 transition-colors group ${
                coffeeMode
                  ? 'border-b-lime-950 hover:bg-amber-800 hover:text-amber-50 text-amber-50 bg-[#4C4B16]'
                  : 'border-white hover:bg-[#4C4B16] hover:text-white text-[#4C4B16] bg-white'
              }`}
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h4 className="text-xl font-semibold">{coffee.name}</h4>
            </div>
          ))}
        </div>
      </section>

        {/* About Us */}
        <section id="about" className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://png.pngtree.com/png-vector/20241015/ourmid/pngtree-latte-coffee-art-in-a-cup-png-image_14096762.png"
                alt="Coffee Shop Interior"
                className="w-135 h-135"
              />
            </div>
            <div>
              <h3 className={`text-4xl font-bold mb-6 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>About Us</h3>
              <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
                Welcome to BrewMaster, where passion meets perfection in every cup. Since 2010, we've been dedicated to serving the finest coffee experience in the city.
              </p>
              <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
                Our advantages include:
              </p>
              <ul className={`text-lg space-y-2 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
                <li>• Premium quality beans sourced directly from farmers</li>
                <li>• Expert baristas with years of experience</li>
                <li>• Cozy atmosphere perfect for work or relaxation</li>
                <li>• Freshly roasted coffee daily</li>
                <li>• Sustainable and ethical sourcing practices</li>
              </ul>
            </div>
          </div>
        </section>

      {/* Desserts */}
    <section className={`container mx-auto px-4 py-16 relative z-10 ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-white'}`}>
      <h3 className={`text-4xl font-bold text-center mb-8 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>Sweet Treats</h3>
      
      {/* Customer-friendly description */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className={`text-lg leading-relaxed ${coffeeMode ? 'text-amber-100' : 'text-[#4C4B16]'}`}>
          Indulge in our carefully curated collection of decadent desserts, each crafted to provide the perfect sweet ending to your meal. From rich, velvety textures to delightfully crisp bites, our sweet treats are made with premium ingredients and designed to satisfy every craving. Whether you're looking for a classic favorite or something uniquely special, each dessert promises a moment of pure indulgence that will leave you planning your next visit.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {desserts.map(dessert => (
          <div key={dessert.id} className={`text-center border p-4 transition-colors group ${coffeeMode ? ' bg-[#4C4B16] hover:bg-lime-950 hover:text-amber-50 text-amber-50' : 'bg-white border-white hover:bg-[#4C4B16] hover:text-white text-[#4C4B16]'}`}>
            <img
              src={dessert.image}
              alt={dessert.name}
              className="w-full h-42 object-contain mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">{dessert.name}</h4>
          </div>
        ))}
      </div>
    </section>

        {/* Our Gallery */}
        <section id="gallery" className="py-16 overflow-hidden relative z-10">
          <div className="container mx-auto px-4 mb-12">
            <h3 className={`text-4xl font-bold text-center ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>Our Gallery</h3>
          </div>
          <div className="space-y-6">
            {galleryRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative w-full overflow-hidden">
                <div className={`flex space-x-6 ${rowIndex % 2 === 0 ? 'slide-left' : 'slide-right'}`}>
                  {[...row, ...row, ...row].map((imageUrl, imageIndex) => (
                    <div key={imageIndex} className="flex-shrink-0">
                      <div className={`w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-2 ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-white'}`}>
                        <img
                          src={imageUrl}
                          alt={`Gallery ${rowIndex + 1}-${imageIndex + 1}`}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer - separate from background */}
      <footer id="contact" className={`py-12 relative z-10 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'bg-[#4C4B16] text-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-6">
              <img
                src="/Gallery3/coffee.png"
                alt="Coffee Shop Logo"
                className="w-30 h-30"
              />
              <div className="ml-24">
                <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                  <FaClock />
                  <span>Opening Hours</span>
                </h4>
                <ul className={`space-y-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                  <li>
                    <p className="font-semibold">Monday - Friday:</p>
                    <p>7:00 AM - 9:00 PM</p>
                  </li>
                  <li>
                    <p className="font-semibold">Saturday:</p>
                    <p>8:00 AM - 10:00 PM</p>
                  </li>
                  <li>
                    <p className="font-semibold">Sunday:</p>
                    <p>8:00 AM - 6:00 PM</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <FaInfoCircle />
                <span>Contact Information</span>
              </h4>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>456 Maple Avenue</p>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Vancouver, BC V5K 0A1</p>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Phone: (604) 987-6543</p>
              <p className={`${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Email: info@brewmaster.com</p>
            </div>
            <div className="ml-20">
              <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <FaBullhorn />
                <span>Follow Us</span>
              </h4>
              <div className={`flex space-x-4 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <a href="https://facebook.com" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className={`border-t mt-5 pt-5 text-center ${coffeeMode ? 'border-white text-amber-50' : 'border-white text-white'}`}>
            <p>&copy; 2025 Brew-Coffee Shop. Build by: PhilipElbambo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoffeeShopLanding;








import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Coffee, Phone, Facebook, Instagram, Twitter, MessageCircle, Mail } from 'lucide-react';

const BrewCoffeeHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      comment: "The best coffee I've ever had! The atmosphere is perfect for working and relaxing."
    },
    {
      name: "Mike Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      comment: "Amazing quality and service. My morning isn't complete without my daily brew from here!"
    },
    {
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      comment: "Love the variety of coffee options. The baristas really know their craft!"
    },
    {
      name: "Alex Rivera",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      comment: "Great place to meet friends. Coffee is excellent and the staff is so friendly!"
    }
  ];

  const menuItems = [
    {
      name: "Espresso",
      price: "₱3.50",
      image: "/OurCoffee/coffee1.png"
    },
    {
      name: "Cappuccino",
      price: "₱4.25",
      image: "/OurCoffee/coffee2.png "
    },
    {
      name: "Latte",
      price: "₱4.75",
      image: " /OurCoffee/coffee3.png"
    },
    {
      name: "Americano",
      price: "₱3.25",
      image: "/OurCoffee/coffee4.png"
    },
    {
      name: "Mocha",
      price: "₱5.00",
      image: " /OurCoffee/coffee5.png"
    },
    {
      name: "Cold Brew",
      price: "₱4.00",
      image: "/OurCoffee/coffee6.png "
    },
    {
      name: "Macchiato",
      price: "₱4.50",
      image: "/OurCoffee/coffee7.png "
    },
    {
      name: "Frappé",
      price: "₱5.25",
      image: "/OurCoffee/coffee5.png "
    },
    {
      name: "Turkish Coffee",
      price: "₱3.75",
      image: "/OurCoffee/coffee9.png "
    },
    {
      name: "Flat White",
      price: "₱4.25",
      image: "/OurCoffee/coffee10.png "
    },
    {
      name: "Affogato",
      price: "₱5.50",
      image: "/OurCoffee/coffee12.png "
    },
    {
      name: "Irish Coffee",
      price: "₱6.00",
      image: "/OurCoffee/coffee5.png"
    }
  ];


  const galleryImages = [
    "/SliderGallery/cup1.png",
    "/SliderGallery/cup2.png",
    "/SliderGallery/cup3.png ",
    "/SliderGallery/cup4.png",
    "/SliderGallery/cup5.png",
    "/SliderGallery/cup6.png",
    "/SliderGallery/cup7.png",
    "/SliderGallery/cup8.png",
    "/SliderGallery/cup9.png",
    "/SliderGallery/cup10.png",
    "/SliderGallery/cup11.png",
    "/SliderGallery/cup12.png"
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-between px-8 lg:px-16" style={{backgroundColor: '#4C4B16'}}>
      <div className="flex-1 text-white text-center lg:text-left">
        {/* Image Above the Heading */}
        <img 
          src="/Gallery3/miming.png" 
          alt="Coffee Decoration"
          className="mx-auto lg:mx-0 mb-6 w-40 h-auto"
        />

        <h1 className="text-3xl lg:text-6xl font-bold mb-6 leading-snug tracking-wide max-w-3xl">
          Take A Break, Have The Best Coffee
        </h1>

        <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
        <a
          href="/OrderNow"
          className="bg-white hover:bg-amber-100 text-black px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
        >
          Order Now
        </a>
        <button className="border border-white hover:bg-white hover:text-gray-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
          Contact Us
        </button>
      </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img 
          src="/Gallery3/coffeeP-v1.png" 
          alt="Coffee Cup PNG"
          className="w-140 h-140 max-w-full drop-shadow-2xl"
        />
      </div>
    </section>

      {/* About Us Section */}
      <section className="min-h-screen bg-white py-16 px-8 lg:px-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">About Us</h2>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 pr-12">
            <img 
              src="Gallery3/animecafe-v3.png" 
              alt="Coffee Shop PNG"
              className="w-100 h-100 object-contain rounded-full  "
            />
          </div>
          <div className="flex-1 pl-12">
            <p className="text-lg text-black leading-relaxed mb-6">
              Welcome to Brew Coffee, where passion meets perfection in every cup. Since our establishment, 
              we have been dedicated to sourcing the finest coffee beans from around the world and crafting 
              exceptional beverages that awaken your senses.
            </p>
            <p className="text-lg text-black leading-relaxed mb-6">
              Our skilled baristas combine traditional brewing methods with modern techniques to create 
              unique flavor profiles that cater to every coffee lover's palate. We believe that great 
              coffee brings people together, creating moments of connection and joy.
            </p>
            <p className="text-lg text-black leading-relaxed">
              From our cozy atmosphere to our commitment to sustainability, every aspect of Brew Coffee 
              is designed to provide you with an unforgettable coffee experience. Come join our community 
              of coffee enthusiasts and discover your new favorite brew.
            </p>
          </div>
        </div>
      </section>

      {/* Our Menu Section */}
      <section className="min-h-screen py-16 px-8 lg:px-16" style={{backgroundColor: '#4C4B16'}}>
        <h2 className="text-5xl font-bold text-center mb-16 text-white">Our Menu</h2>
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {menuItems.map((item, index) => (
            <div key={index} className=" overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-64 object-contain"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-3xl font-bold text-white">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Testimonials Section */}
    <section className="min-h-screen bg-white py-20 px-8 lg:px-16">
      <h2 className="text-6xl font-bold text-center mb-20 text-black">Testimonials</h2>
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gray-50 rounded-lg p-16 shadow-xl min-h-96">
          <div className="text-center">
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name}
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-6"
              style={{ borderColor: "#4C4B16" }}
            />
            <p className="text-2xl text-black italic mb-8 leading-relaxed max-w-4xl mx-auto">
              "{testimonials[currentTestimonial].comment}"
            </p>
            <h4 className="text-3xl font-bold text-black">
              {testimonials[currentTestimonial].name}
            </h4>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-4 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: "#4C4B16" }}
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-4 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: "#4C4B16" }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
        
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentTestimonial ? 'active-dot' : 'bg-gray-300'
              }`}
              style={index === currentTestimonial ? { backgroundColor: "#4C4B16" } : {}}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Gallery Section */}
      <section className="bg-white py-16 px-8 lg:px-16 overflow-hidden">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">Gallery</h2>
        <div className="space-y-8">
          {/* First Row - Sliding Left */}
          <div className="w-full overflow-hidden">
            <div className="flex animate-pulse hover:animate-none" style={{
              animation: 'slideLeft 40s linear infinite',
              width: 'calc(100% * 3)'
            }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                <div key={`left-${index}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={image} 
                    alt={`Gallery ${(index % galleryImages.length) + 1}`}
                    className="w-64 h-64 object-contain shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Second Row - Sliding Right */}
          <div className="w-full overflow-hidden">
            <div className="flex hover:animate-none" style={{
              animation: 'slideRight 40s linear infinite',
              width: 'calc(100% * 3)',
              transform: 'translateX(-33.333%)'
            }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                <div key={`right-${index}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={image} 
                    alt={`Gallery ${(index % galleryImages.length) + 1}`}
                    className="w-64 h-64 object-contain shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          
          @keyframes slideRight {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>
      {/* Contact Us Section */}
      <section className="bg-white py-16 px-8 lg:px-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">Contact Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Info and Social Media */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-amber-600" size={24} />
                <span className="text-lg text-gray-700">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="text-amber-600" size={24} />
                <span className="text-lg text-gray-700">info@brewcoffee.com</span>
              </div>
            </div>

            <h4 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-300">
                <Coffee size={24} />
              </a>
              <a href="#" className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors duration-300">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                  Email Account
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg resize-vertical"
                  placeholder="Enter your message"
                />
              </div>
              
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#4C4B16] hover:bg-green-600 text-white py-4 px-6 rounded-lg text-xl font-semibold transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrewCoffeeHomepage;