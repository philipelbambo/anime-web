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
          className="p-4 rounded-lg min-h-[95px] flex flex-col justify-center items-center"
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
                  className="flex items-center text-white py-3 px-4 text-base rounded-lg transition-all duration-200 hover:bg-[#6E6C22] active:bg-[#4C4B16]"
                  style={{
                    background: '#5E5D1D' // lighter green-brown button
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
    </div>
  );
};

export default SideMenu;
