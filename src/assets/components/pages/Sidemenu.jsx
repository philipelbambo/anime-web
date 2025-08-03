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
    { icon: LayoutDashboard, text: "Dashboard", href: "/Dashboard" },
    { icon: Database, text: "Manage Product", href: "/manageproduct" },
    { icon: MessageSquare, text: "Message", href: "/message" },
    { icon: ShoppingCart, text: "Orders", href: "/orders" },
    { icon: Users, text: "Customers", href: "/customers" },
    { icon: BarChart3, text: "Reports", href: "/reports" }
  ];

  return (
    <div
      className="w-64 h-screen py-5 flex flex-col fixed left-0 top-0 mt-15"
      style={{
        background: '#e0e0e0',
        boxShadow: 'none'
      }}
    >
      <div className="px-5 pb-5 mb-5">
        <div
          className="p-4 rounded-lg flex justify-center items-center"
          style={{
            background: '#e0e0e0',
            boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
          }}
        >
          <img
            src="./Gallery2/logo6.png"
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
                  className="flex items-center text-black no-underline py-3 px-4 text-base transition-all duration-300 ease-in-out hover:text-black rounded-full group"
                  style={{
                    background: '#e0e0e0',
                    boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = 'inset 8px 8px 15px #a3b1c6, inset -8px -8px 15px #ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff';
                  }}
                >
                  <IconComponent size={18} className="mr-3 group-hover:text-black" />
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