import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';

// Sample customers data
const customers = [
  {
    id: 1,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '09171234567',
    orders: 3,
    lastOrder: '2025-08-02',
    totalSpent: '₱2,100.00',
    items: 'Anime Shirt, Hoodie, Cap',
  },
  {
    id: 2,
    name: 'John Dela Cruz',
    email: 'john.delacruz@email.com',
    phone: '09181234567',
    orders: 2,
    lastOrder: '2025-08-01',
    totalSpent: '₱1,200.00',
    items: 'Anime Shirt, Keychain',
  },
  {
    id: 3,
    name: 'Anna Reyes',
    email: 'anna.reyes@email.com',
    phone: '09191234567',
    orders: 1,
    lastOrder: '2025-07-30',
    totalSpent: '₱650.00',
    items: 'Anime Hoodie',
  },
  {
    id: 4,
    name: 'Robert Garcia',
    email: 'robert.garcia@email.com',
    phone: '09201234567',
    orders: 4,
    lastOrder: '2025-08-02',
    totalSpent: '₱2,800.00',
    items: 'Anime Shirt, Cap, Hoodie, Socks',
  },
  {
    id: 5,
    name: 'Sarah Kim',
    email: 'sarah.kim@email.com',
    phone: '09211234567',
    orders: 2,
    lastOrder: '2025-07-31',
    totalSpent: '₱1,450.00',
    items: 'Anime Poster, Stickers',
  },
  {
    id: 6,
    name: 'Michael Torres',
    email: 'michael.torres@email.com',
    phone: '09221234567',
    orders: 5,
    lastOrder: '2025-08-03',
    totalSpent: '₱3,200.00',
    items: 'Anime Shirt, Hoodie, Cap, Poster, Keychain',
  },
  {
    id: 7,
    name: 'Jenny Lim',
    email: 'jenny.lim@email.com',
    phone: '09231234567',
    orders: 1,
    lastOrder: '2025-07-29',
    totalSpent: '₱890.00',
    items: 'Anime Figurine',
  },
  {
    id: 8,
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '09241234567',
    orders: 3,
    lastOrder: '2025-08-01',
    totalSpent: '₱2,350.00',
    items: 'Anime Hoodie, Poster, Bag',
  },
  {
    id: 9,
    name: 'Lisa Chan',
    email: 'lisa.chan@email.com',
    phone: '09251234567',
    orders: 2,
    lastOrder: '2025-07-28',
    totalSpent: '₱1,100.00',
    items: 'Anime Shirt, Socks',
  },
  {
    id: 10,
    name: 'David Rodriguez',
    email: 'david.rodriguez@email.com',
    phone: '09261234567',
    orders: 4,
    lastOrder: '2025-08-02',
    totalSpent: '₱2,750.00',
    items: 'Anime Hoodie, Cap, Keychain, Stickers',
  },
  {
    id: 11,
    name: 'Grace Tan',
    email: 'grace.tan@email.com',
    phone: '09271234567',
    orders: 1,
    lastOrder: '2025-07-27',
    totalSpent: '₱520.00',
    items: 'Anime Poster',
  },
  {
    id: 12,
    name: 'Antonio Cruz',
    email: 'antonio.cruz@email.com',
    phone: '09281234567',
    orders: 6,
    lastOrder: '2025-08-03',
    totalSpent: '₱4,100.00',
    items: 'Anime Shirt, Hoodie, Cap, Poster, Figurine, Bag',
  },
];

const Customers = () => (
  <div className="min-h-screen bg-gray-200">
    <Header />
    <div className="flex w-full">
      <SideMenu />
      <div className="flex-1 flex flex-col justify-start items-start p-11">
        <div className="w-full py-6">
          <BreadcrumbSearch />
          <div
            className="w-full rounded-lg p-6"
            style={{
              background: '#e0e0e0',
              boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-black">Customers</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 rounded-tl-lg text-black">Name</th>
                  <th className="py-2 px-4 text-black">Email</th>
                  <th className="py-2 px-4 text-black">Phone</th>
                  <th className="py-2 px-4 text-black">Orders</th>
                  <th className="py-2 px-4 text-black">Last Order</th>
                  <th className="py-2 px-4 text-black">Total Spent</th>
                  <th className="py-2 px-4 rounded-tr-lg text-black">Items</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className="border-b last:border-b-0">
                    <td className="py-2 px-4 font-semibold text-black">{customer.name}</td>
                    <td className="py-2 px-4 text-sm text-black">{customer.email}</td>
                    <td className="py-2 px-4 text-sm text-black">{customer.phone}</td>
                    <td className="py-2 px-4 text-center font-bold text-black">{customer.orders}</td>
                    <td className="py-2 px-4 text-xs text-black">{customer.lastOrder}</td>
                    <td className="py-2 px-4 font-bold text-black">{customer.totalSpent}</td>
                    <td className="py-2 px-4 text-xs text-black">{customer.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Customers;