import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';
import { customers } from '../../../utils/constants';


const Customers = () => (
  <div className="min-h-screen bg-gray-200 p-5">
    <div className="w-full">
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
);

export default Customers;