import React from 'react';
import {
  BarChart3,
  Database,
  MessageSquare,
  ShoppingCart,
  Users,
  FileText,
  LayoutDashboard
} from 'lucide-react';

const SideMenu = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", href: "/user" },
    { icon: Database, text: "Manage Product", href: "/user/products" },
    { icon: MessageSquare, text: "Message", href: "/user/message" },
    { icon: ShoppingCart, text: "Orders", href: "/user/orders" },
    { icon: Users, text: "Customers", href: "/user/customers" },
    { icon: FileText, text: "Summary", href: "/user/summary" },
    { icon: BarChart3, text: "Reports", href: "/user/reports" }
  ];

  return (
    <div 
      className="w-64 h-full py-5 flex flex-col sticky top-0 left-0"
      style={{
        background: '#4C4B16' // main sidebar color
      }}
    >
      {/* Admin Panel Header */}
      <div className="px-5 pb-5 mb-5">
        <div 
          className="p-4 rounded-full min-h-[95px] flex flex-col justify-center items-center"
          style={{
            background: '#3A3A10' // darker shade
          }}
        >
          <LayoutDashboard size={40} className="text-white mb-2" />
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="menu-items px-3 flex-1">
        <ul className="list-none p-0 m-0 space-y-3">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center text-white py-3 px-4 text-base rounded-full transition-all duration-200 neumorphic-button"
                  style={{
                    background: '#5E5D1D', // lighter green-brown button
                    boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.1), inset 2px 2px 6px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <IconComponent size={22} className="mr-3 text-white" />
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logo at bottom with 3D animation */}
      <div className="px-5 pt-5 flex justify-center">
        <div 
          className="logo-container p-4 rounded-full"
          style={{
            background: '#3A3A10' // same as header circle
          }}
        >
          <img 
            src="../Gallery1/animecat.png" 
            alt="Logo" 
            className="w-24 h-24 object-contain logo-3d"
          />
        </div>
      </div>

      <style jsx>{`
        .neumorphic-button:hover {
          background: #6E6C22 !important; /* hover state */
          box-shadow: -2px -2px 8px rgba(255, 255, 255, 0.15), 2px 2px 8px rgba(0, 0, 0, 0.5) !important;
          transform: translateY(-1px);
        }
        
        .neumorphic-button:active {
          background: #4C4B16 !important;
          box-shadow: inset -1px -1px 3px rgba(255, 255, 255, 0.1), inset 1px 1px 3px rgba(0, 0, 0, 0.5) !important;
          transform: translateY(0px);
        }
        
        .logo-container {
          perspective: 1000px;
        }
        
        .logo-3d {
          animation: rotate3D 4s infinite ease-in-out;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .logo-3d:hover {
          animation-play-state: paused;
          transform: rotateY(180deg) scale(1.1);
        }
        
        @keyframes rotate3D {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(10deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SideMenu;
