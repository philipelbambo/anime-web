import React, { useState } from 'react';
import SideMenu from './Sidemenu';
import Header from './Header';
import BreadcrumbSearch from './BreadcrumbSearch';
import { customers } from '../../../utils/constants';

const Customers = () => {
  // Enhanced mock data with order details and statuses
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'John Smith',
      email: 'john@email.com',
      phone: '+1 234-567-8901',
      orderDate: '2024-08-09',
      items: 'Premium Coffee Beans (2kg), Espresso Cups Set',
      totalAmount: '₱89.99',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1 234-567-8902',
      orderDate: '2024-08-08',
      items: 'Organic Tea Collection, Honey Sticks (50pcs)',
      totalAmount: '₱64.50',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      customerName: 'Mike Davis',
      email: 'mike@email.com',
      phone: '+1 234-567-8903',
      orderDate: '2024-08-07',
      items: 'French Press, Coffee Grinder, Dark Roast (1kg)',
      totalAmount: '₱124.99',
      status: 'accepted',
      priority: 'high'
    },
    {
      id: 4,
      customerName: 'Emily Wilson',
      email: 'emily@email.com',
      phone: '+1 234-567-8904',
      orderDate: '2024-08-06',
      items: 'Herbal Tea Mix, Ceramic Mugs (4pcs)',
      totalAmount: '₱45.25',
      status: 'rejected',
      priority: 'low'
    },
    {
      id: 5,
      customerName: 'David Brown',
      email: 'david@email.com',
      phone: '+1 234-567-8905',
      orderDate: '2024-08-09',
      items: 'Cold Brew Kit, Medium Roast (500g)',
      totalAmount: '₱78.00',
      status: 'pending',
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    return `px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`;
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-blue-50 text-blue-700 border-blue-200',
      low: 'bg-gray-50 text-gray-700 border-gray-200'
    };

    return `px-2 py-1 rounded text-xs font-medium border ${priorityStyles[priority]}`;
  };

  const filteredOrders = orders.filter(order =>
    filter === 'all' || order.status === filter
  );

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
    rejected: orders.filter(o => o.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <div className="w-full">
        {/* Improved Breadcrumbs - Clean and Modern */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-black">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Dashboard</span>
            <span>/</span>
            <span className="text-black font-medium">Customer Orders</span>
          </div>
        </nav>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          </div>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#e0e0e0] rounded-lg shadow-sm  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Pending Orders</div>
                  <div className="text-2xl font-bold text-yellow-600">{orderCounts.pending}</div>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-[#e0e0e0] rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Accepted Today</div>
                  <div className="text-2xl font-bold text-green-600">{orderCounts.accepted}</div>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-[#e0e0e0] rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Rejected Orders</div>
                  <div className="text-2xl font-bold text-red-600">{orderCounts.rejected}</div>
                </div>
                <div className="bg-red-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-1">
            <div className="flex space-x-1">
              {[
                { key: 'all', label: 'All Orders', count: orderCounts.all },
                { key: 'pending', label: 'Pending', count: orderCounts.pending },
                { key: 'accepted', label: 'Accepted', count: orderCounts.accepted },
                { key: 'rejected', label: 'Rejected', count: orderCounts.rejected }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    filter === tab.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Order Details</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Priority</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-600">{order.email}</div>
                        <div className="text-sm text-gray-600">{order.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{order.items}</div>
                        <div className="text-xs text-gray-500">Ordered: {order.orderDate}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-lg font-bold text-gray-900">{order.totalAmount}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={getPriorityBadge(order.priority)}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {order.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcceptOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectOrder(order.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {order.status === 'accepted' ? '✓ Processed' : '✗ Declined'}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No orders found</div>
              <div className="text-gray-500 text-sm">
                {filter === 'all' ? 'No orders available' : `No ${filter} orders at the moment`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
