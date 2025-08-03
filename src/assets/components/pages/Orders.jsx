import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';

// Sample orders data with more customers
const orders = [
  {
    id: 1,
    customer: 'Maria Santos',
    orderNumber: '#ORD-2024-001',
    status: 'Pending',
    items: 'Pizza Margherita x2, Coke x1',
    total: '₱650.00',
    date: '2025-08-02',
  },
  {
    id: 2,
    customer: 'John Dela Cruz',
    orderNumber: '#ORD-2024-002',
    status: 'Preparing',
    items: 'Burger Combo x1, Fries x2',
    total: '₱450.00',
    date: '2025-08-02',
  },
  {
    id: 3,
    customer: 'Anna Reyes',
    orderNumber: '#ORD-2024-003',
    status: 'Delivered',
    items: 'Chicken Wings x1, Rice x2',
    total: '₱380.00',
    date: '2025-08-01',
  },
  {
    id: 4,
    customer: 'Robert Garcia',
    orderNumber: '#ORD-2024-004',
    status: 'Cancelled',
    items: 'Pasta Carbonara x1, Garlic Bread x1',
    total: '₱520.00',
    date: '2025-08-01',
  },
  {
    id: 5,
    customer: 'Sofia Mendoza',
    orderNumber: '#ORD-2024-005',
    status: 'Delivered',
    items: 'Lechon Kawali x1, Steamed Rice x2',
    total: '₱720.00',
    date: '2025-08-02',
  },
  {
    id: 6,
    customer: 'Miguel Torres',
    orderNumber: '#ORD-2024-006',
    status: 'Preparing',
    items: 'Adobo Chicken x1, Pancit x1, Lumpia x5',
    total: '₱580.00',
    date: '2025-08-03',
  },
  {
    id: 7,
    customer: 'Carmen Lopez',
    orderNumber: '#ORD-2024-007',
    status: 'Pending',
    items: 'Sinigang na Baboy x1, Rice x3',
    total: '₱450.00',
    date: '2025-08-03',
  },
  {
    id: 8,
    customer: 'Luis Fernandez',
    orderNumber: '#ORD-2024-008',
    status: 'Delivered',
    items: 'Grilled Bangus x1, Garlic Rice x2',
    total: '₱390.00',
    date: '2025-08-02',
  },
  {
    id: 9,
    customer: 'Isabella Cruz',
    orderNumber: '#ORD-2024-009',
    status: 'Preparing',
    items: 'Bicol Express x1, Rice x2, Halo-halo x1',
    total: '₱520.00',
    date: '2025-08-03',
  },
  {
    id: 10,
    customer: 'Carlos Villanueva',
    orderNumber: '#ORD-2024-010',
    status: 'Cancelled',
    items: 'Kare-kare x1, Bagoong x1, Rice x2',
    total: '₱680.00',
    date: '2025-08-01',
  },
  {
    id: 11,
    customer: 'Rosario Bautista',
    orderNumber: '#ORD-2024-011',
    status: 'Delivered',
    items: 'Crispy Pata x1, Rice x3, San Miguel x2',
    total: '₱890.00',
    date: '2025-08-02',
  },
  {
    id: 12,
    customer: 'Eduardo Ramos',
    orderNumber: '#ORD-2024-012',
    status: 'Pending',
    items: 'Sisig x1, Rice x1, Red Horse x1',
    total: '₱320.00',
    date: '2025-08-03',
  },
];

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
    <Header />
    <div className="flex w-full">
      <SideMenu />
      <div className="flex-1 flex flex-col justify-start items-start p-11">
        <div className="w-full py-6">
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
                  {orders.map((order, index) => (
                    <tr 
                      key={order.id} 
                      className={`${index < orders.length - 1 ? 'border-b border-gray-300' : ''}`}
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
  </div>
);

export default Orders;