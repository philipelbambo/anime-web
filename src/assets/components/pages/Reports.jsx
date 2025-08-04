import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';

// Sample report data based on your system
const reportData = {
  totalOrders: 4,
  totalCustomers: 4,
  totalRevenue: '₱4,750.00',
  topProducts: [
    { name: 'Anime Shirt', sold: 5, revenue: '₱1,500.00' },
    { name: 'Hoodie', sold: 3, revenue: '₱1,200.00' },
    { name: 'Cap', sold: 2, revenue: '₱600.00' },
    { name: 'Keychain', sold: 1, revenue: '₱150.00' },
    { name: 'Socks', sold: 1, revenue: '₱100.00' },
  ],
  recentOrders: [
    { orderNumber: '#ORD-2024-001', customer: 'Maria Santos', total: '₱650.00', date: '2025-08-02', status: 'Pending' },
    { orderNumber: '#ORD-2024-002', customer: 'John Dela Cruz', total: '₱450.00', date: '2025-08-02', status: 'Preparing' },
    { orderNumber: '#ORD-2024-003', customer: 'Anna Reyes', total: '₱380.00', date: '2025-08-01', status: 'Delivered' },
    { orderNumber: '#ORD-2024-004', customer: 'Robert Garcia', total: '₱520.00', date: '2025-08-01', status: 'Cancelled' },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-500 text-white';
    case 'Preparing': return 'bg-blue-500 text-white';
    case 'Delivered': return 'bg-green-500 text-white';
    case 'Cancelled': return 'bg-red-500 text-white';
    default: return 'bg-gray-300 text-gray-800';
  }
};

const Reports = () => (
  <div className="min-h-screen bg-gray-200">
      <div className="flex-1 flex flex-col justify-start items-start p-5">
        <div className="w-full">
          <BreadcrumbSearch />
          <div
            className="w-full rounded-lg p-6"
            style={{
              background: '#e0e0e0',
              boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Reports</h2>

            {/* Top Products Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Top Products</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 rounded-tl-lg">Product</th>
                    <th className="py-2 px-4">Sold</th>
                    <th className="py-2 px-4 rounded-tr-lg">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topProducts.map((product, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-2 px-4 font-semibold text-blue-700">{product.name}</td>
                      <td className="py-2 px-4 text-center font-bold text-green-600">{product.sold}</td>
                      <td className="py-2 px-4 font-bold text-orange-600">{product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Orders Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 rounded-tl-lg">Order #</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.recentOrders.map((order, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-2 px-4 font-semibold text-blue-700">{order.orderNumber}</td>
                      <td className="py-2 px-4">{order.customer}</td>
                      <td className="py-2 px-4 font-bold text-green-600">{order.total}</td>
                      <td className="py-2 px-4 text-xs text-gray-500">{order.date}</td>
                      <td className={`py-2 px-4 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
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

export default Reports;