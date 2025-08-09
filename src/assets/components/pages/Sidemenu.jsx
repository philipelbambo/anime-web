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
    <div className="w-64 h-full py-5 flex flex-col sticky top-0 left-0 bg-gray-900">
      {/* Admin Panel Header */}
      <div className="px-5 pb-5 mb-5">
        <div className="p-4 rounded-lg min-h-[95px] flex flex-col justify-center items-center bg-gray-900">
          <LayoutDashboard size={32} className="text-white mb-2" />
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
                  className="flex items-center text-white py-3 px-4 text-base rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                >
                  <IconComponent size={18} className="mr-3" />
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logo at bottom with 3D animation */}
      <div className="px-5 pt-5 flex justify-center">
        <div className="logo-container">
          <img 
            src="../Gallery1/animecat.png" 
            alt="Logo" 
            className="w-24 h-24 object-contain logo-3d"
          />
        </div>
      </div>

      <style jsx>{`
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