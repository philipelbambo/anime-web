import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Calendar,
  Filter,
  Download,
  Eye,
} from 'lucide-react';

// Enhanced sample data for clothing store
const reportData = {
  topProducts: [
    { name: 'Anime Graphic T-Shirts', category: 'T-Shirts', sold: 45, revenue: 13500.0, profit: 6750.0, trend: 'up', stock: 25, lowStock: false },
    { name: 'Oversized Hoodies', category: 'Hoodies', sold: 28, revenue: 11200.0, profit: 5600.0, trend: 'up', stock: 8, lowStock: true },
    { name: 'Cargo Pants', category: 'Pants', sold: 22, revenue: 8800.0, profit: 4400.0, trend: 'stable', stock: 15, lowStock: false },
    { name: 'Vintage Band T-Shirts', category: 'T-Shirts', sold: 35, revenue: 8750.0, profit: 4375.0, trend: 'up', stock: 3, lowStock: true },
    { name: 'Streetwear Joggers', category: 'Pants', sold: 18, revenue: 7200.0, profit: 3600.0, trend: 'down', stock: 32, lowStock: false },
    { name: 'Designer Caps', category: 'Accessories', sold: 24, revenue: 4800.0, profit: 2400.0, trend: 'up', stock: 12, lowStock: false },
  ],
  inventoryAlerts: [
    { product: 'Oversized Hoodies', currentStock: 8, reorderLevel: 10, status: 'low' },
    { product: 'Vintage Band T-Shirts', currentStock: 3, reorderLevel: 15, status: 'critical' },
    { product: 'Graphic Tees - Limited Edition', currentStock: 0, reorderLevel: 5, status: 'outofstock' },
  ],
  recentOrders: [
    { orderNumber: '#ORD-2024-156', customer: 'Maria Santos', items: 'Anime T-Shirt, Cargo Pants', total: 1250.0, date: '2025-08-05', status: 'Pending', priority: 'high' },
    { orderNumber: '#ORD-2024-155', customer: 'John Dela Cruz', items: 'Oversized Hoodie', total: 850.0, date: '2025-08-05', status: 'Processing', priority: 'medium' },
    { orderNumber: '#ORD-2024-154', customer: 'Anna Reyes', items: 'Vintage Band T-Shirt, Cap', total: 650.0, date: '2025-08-04', status: 'Shipped', priority: 'low' },
    { orderNumber: '#ORD-2024-153', customer: 'Robert Garcia', items: 'Streetwear Joggers', total: 980.0, date: '2025-08-04', status: 'Delivered', priority: 'medium' },
    { orderNumber: '#ORD-2024-152', customer: 'Lisa Wong', items: 'Anime T-Shirt x2, Hoodie', total: 1450.0, date: '2025-08-03', status: 'Cancelled', priority: 'high' },
  ],
  topCustomers: [
    { name: 'Maria Santos', orders: 8, spent: 4250.0, lastOrder: '2025-08-05' },
    { name: 'John Dela Cruz', orders: 6, spent: 3200.0, lastOrder: '2025-08-04' },
    { name: 'Anna Reyes', orders: 5, spent: 2850.0, lastOrder: '2025-08-02' },
    { name: 'Robert Garcia', orders: 4, spent: 2100.0, lastOrder: '2025-07-30' },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
    default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  }
};

const Reports = () => {
  const [timeFilter, setTimeFilter] = useState('6months');
  const [selectedView, setSelectedView] = useState('overview');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // ✅ Export to CSV Function
  const exportToCSV = () => {
    const headers = [
      'Type',
      'Field',
      'Value'
    ].join(",");

    let rows = [headers];

    // Add Top Products
    reportData.topProducts.forEach((product) => {
      rows.push([
        'Top Product',
        product.name,
        `${product.category} | Sold: ${product.sold} | Revenue: ${formatCurrency(product.revenue)} | Profit: ${formatCurrency(product.profit)} | Stock: ${product.stock} (${product.lowStock ? 'Low' : 'OK'}) | Trend: ${product.trend}`
      ].map(field => `"${field}"`).join(","));
    });

    // Add Recent Orders
    reportData.recentOrders.forEach((order) => {
      rows.push([
        'Recent Order',
        order.orderNumber,
        `${order.customer} | Items: ${order.items} | Total: ${formatCurrency(order.total)} | Date: ${order.date} | Status: ${order.status} | Priority: ${order.priority}`
      ].map(field => `"${field}"`).join(","));
    });

    // Add Top Customers
    reportData.topCustomers.forEach((customer) => {
      rows.push([
        'Top Customer',
        customer.name,
        `Orders: ${customer.orders} | Total Spent: ${formatCurrency(customer.spent)} | Last Order: ${customer.lastOrder}`
      ].map(field => `"${field}"`).join(","));
    });

    // Add Summary Stats
    const stats = [
      ['Metric', 'Value'],
      ['Total Top Products', reportData.topProducts.length],
      ['Low Stock Alerts', reportData.inventoryAlerts.filter(a => a.status !== 'outofstock').length],
      ['Out of Stock Items', reportData.inventoryAlerts.filter(a => a.status === 'outofstock').length],
      ['Recent Orders Count', reportData.recentOrders.length],
      ['Top Customers Count', reportData.topCustomers.length],
    ];

    stats.slice(1).forEach(([key, value]) => {
      rows.push([
        'Summary',
        key,
        value
      ].map(field => `"${field}"`).join(","));
    });

    // Generate CSV
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `store-report-${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, icon: Icon, growth, growthLabel }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {growth && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(growth)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {growthLabel && (
        <p className="text-xs text-gray-500 mt-1">{growthLabel}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Analytics</h1>
              <p className="text-gray-600">Comprehensive insights for your clothing business</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
              </select>
              {/* ✅ Export Button with Function */}
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['overview', 'products', 'customers', 'orders'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  selectedView === view
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Low Stock Items"
            value="8"
            icon={Package}
            growth={-12.5}
            growthLabel="items need reorder"
          />
          <StatCard
            title="Return Rate"
            value="2.3%"
            icon={TrendingDown}
            growth={-15.2}
            growthLabel="vs last period"
          />
          <StatCard
            title="Customer Retention"
            value="68%"
            icon={Users}
            growth={12.1}
            growthLabel="repeat customers"
          />
          <StatCard
            title="Profit Margin"
            value="42.5%"
            icon={DollarSign}
            growth={3.2}
            growthLabel="vs last period"
          />
        </div>

        {/* Inventory Alerts & Customer Satisfaction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Inventory Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Alerts</h3>
            <div className="space-y-4">
              {reportData.inventoryAlerts.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'critical' ? 'bg-red-500' : 
                      item.status === 'low' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.product}</div>
                      <div className="text-sm text-gray-600">
                        {item.status === 'outofstock' ? 'Out of Stock' : 
                         item.status === 'critical' ? 'Critical Level' : 'Low Stock'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.currentStock} units</div>
                    <div className="text-xs text-gray-500">Reorder at {item.reorderLevel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.7</div>
              <div className="text-sm text-gray-600 mb-4">Average Rating</div>
              <div className="flex justify-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <div key={star} className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: '5 stars', percent: 70, color: 'bg-green-500' },
                  { label: '4 stars', percent: 20, color: 'bg-green-400' },
                  { label: '3 stars', percent: 7, color: 'bg-yellow-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Top Performing Products</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Units Sold</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Profit</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Stock Level</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900">{product.name}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">{product.sold}</td>
                    <td className="py-4 px-4 text-right font-bold text-gray-900">{formatCurrency(product.revenue)}</td>
                    <td className="py-4 px-4 text-right font-bold text-orange-600">{formatCurrency(product.profit)}</td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.lowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock} units
                        {product.lowStock && <span className="ml-1">⚠️</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">{getTrendIcon(product.trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders & Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {reportData.recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(order.priority)}`}></div>
                    <div>
                      <div className="font-semibold text-blue-600">{order.orderNumber}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                      <div className="text-xs text-gray-500 mt-1">{order.items}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(order.total)}</div>
                    <div className="text-xs text-gray-500">{order.date}</div>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border mt-1 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Top Customers</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {reportData.topCustomers.map((customer, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.orders} orders</div>
                      <div className="text-xs text-gray-500">Last: {customer.lastOrder}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{formatCurrency(customer.spent)}</div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;