import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';
import { ordersData } from '../../../utils/constants';


const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-500 text-white';
    case 'Preparing': return 'bg-blue-500 text-white';
    case 'Delivered': return 'bg-green-500 text-white';
    case 'Cancelled': return 'bg-red-500 text-white';
    default: return 'bg-gray-300 text-gray-800';
  }
};

const neumorphismStyle = {
  background: '#e0e0e0',
  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
};

const neumorphismInsetStyle = {
  background: '#e0e0e0',
  boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
};

const Orders = () => (
  <div className="min-h-screen bg-gray-200">
      <div className="flex-1 flex flex-col justify-start items-start p-5">
        <div className="w-full">
          <BreadcrumbSearch />
          <div
            className="w-full rounded-lg p-6"
            style={neumorphismStyle}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-gray-800 p-4 rounded-lg"
              style={{ ...neumorphismStyle, color: '#000000' }}
            >
              Orders
            </h2>
            <div 
              className="rounded-lg overflow-hidden"
              style={neumorphismInsetStyle}
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr 
                    className="rounded-lg"
                    style={neumorphismStyle}
                  >
                    <th 
                      className="py-3 px-4 rounded-tl-lg font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Order #
                    </th>
                    <th 
                      className="py-3 px-4 font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Customer
                    </th>
                    <th 
                      className="py-3 px-4 font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Items
                    </th>
                    <th 
                      className="py-3 px-4 font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Total
                    </th>
                    <th 
                      className="py-3 px-4 font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Date
                    </th>
                    <th 
                      className="py-3 px-4 rounded-tr-lg font-semibold text-gray-700"
                      style={{ ...neumorphismStyle, color: '#000000' }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order, index) => (
                    <tr 
                      key={order.id} 
                      className={`${index < ordersData.length - 1 ? 'border-b border-gray-300' : ''}`}
                    >
                      <td className="py-3 px-4 font-semibold" style={{ color: '#000000' }}>
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4" style={{ color: '#000000' }}>
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: '#000000' }}>
                        {order.items}
                      </td>
                      <td className="py-3 px-4 font-bold" style={{ color: '#000000' }}>
                        {order.total}
                      </td>
                      <td className="py-3 px-4 text-xs" style={{ color: '#000000' }}>
                        {order.date}
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          className={`py-2 px-3 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                          style={{
                            ...neumorphismStyle,
                            background: order.status === 'Pending' ? '#fbbf24' :
                                       order.status === 'Preparing' ? '#3b82f6' :
                                       order.status === 'Delivered' ? '#10b981' :
                                       order.status === 'Cancelled' ? '#ef4444' : '#6b7280',
                            color: '#000000'
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
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

export default Orders;