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
        background: '#131419',
        boxShadow: 'none'
      }}
    >
      <div className="px-5 pb-5 mb-5">
        <div
          className="p-4 rounded-lg min-h-[95px] flex justify-center items-center"
          style={{
            background: '#131419',
            boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8)'
          }}
        >
          <img
            src="/public/Gallery2/logo6.png"
            alt="Logo"
            className="max-w-full h-auto max-h-16"
          />
        </div>
      </div>
      <nav className="menu-items px-3">
        <ul className="list-none p-0 m-0 space-y-3">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center text-white no-underline py-3 px-4 text-base transition-all duration-300 ease-in-out hover:text-white rounded-full group"
                  style={{
                    background: '#131419',
                    boxShadow: 'inset -2px -2px 6px rgba(255, 255, 255, 0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = 'inset 8px 8px 15px rgba(0, 0, 0, 0.8), inset -8px -8px 15px rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'inset -2px -2px 6px rgba(255, 255, 255, 0.05), inset 2px 2px 6px rgba(0, 0, 0, 0.8)';
                  }}
                >
                  <IconComponent size={18} className="mr-3 group-hover:text-white" />
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
