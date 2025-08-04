import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';

// Sample data for charts
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, revenue: 24000 },
  { month: 'Feb', sales: 3000, orders: 198, revenue: 22000 },
  { month: 'Mar', sales: 5000, orders: 300, revenue: 32000 },
  { month: 'Apr', sales: 4500, orders: 278, revenue: 28000 },
  { month: 'May', sales: 6000, orders: 389, revenue: 38000 },
  { month: 'Jun', sales: 5500, orders: 349, revenue: 35000 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#666' },
  { name: 'Clothing', value: 25, color: '#888' },
  { name: 'Books', value: 20, color: '#555' },
  { name: 'Home & Garden', value: 15, color: '#777' },
  { name: 'Sports', value: 5, color: '#999' },
];

const topProducts = [
  { name: 'iPhone 15 Pro', sales: 1200, revenue: 1200000 },
  { name: 'MacBook Air M2', sales: 850, revenue: 850000 },
  { name: 'Nike Air Max', sales: 650, revenue: 97500 },
  { name: 'Samsung Galaxy S24', sales: 580, revenue: 580000 },
  { name: 'iPad Pro', sales: 420, revenue: 420000 },
];

const revenueData = [
  { day: 'Mon', revenue: 12000 },
  { day: 'Tue', revenue: 15000 },
  { day: 'Wed', revenue: 8000 },
  { day: 'Thu', revenue: 18000 },
  { day: 'Fri', revenue: 22000 },
  { day: 'Sat', revenue: 25000 },
  { day: 'Sun', revenue: 19000 },
];

// Neumorphic style object
const neumorphicStyle = {
  background: '#e0e0e0',
  boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff',
  border: 'none',
};

const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-200">
        {/* Main Content Container */}
        <div className="flex-1 flex w-full flex-col justify-start items-start">
          {/* Responsive container extending to sidemenu boundary */}
          <div className="w-full py-5 px-5">
            <BreadcrumbSearch />

            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">E-commerce Dashboard</h1>
              <p className="text-black opacity-80">Overview of your store performance</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Revenue', value: '$179,000', change: '+12.5%', icon: DollarSign },
                { title: 'Total Orders', value: '1,754', change: '+8.2%', icon: ShoppingCart },
                { title: 'Active Customers', value: '12,847', change: '-2.1%', icon: Users },
                { title: 'Products Sold', value: '3,642', change: '+15.3%', icon: Package },
              ].map((card, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg"
                  style={neumorphicStyle}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black opacity-70">{card.title}</p>
                      <p className="text-2xl font-bold text-black">{card.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp
                          className={`w-4 h-4 mr-1 ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                        />
                        <span
                          className={`text-sm ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {card.change}
                        </span>
                      </div>
                    </div>
                    <card.icon className="w-12 h-12 text-black" />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Trend Chart */}
              <div
                className="p-6 rounded-lg"
                style={neumorphicStyle}
              >
                <h3 className="text-lg font-semibold text-black mb-4">Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#000" />
                    <YAxis stroke="#000" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#000" strokeWidth={3} />
                    <Line type="monotone" dataKey="orders" stroke="#555" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div
                className="w-full p-6 rounded-lg"
                style={neumorphicStyle}
              >
                <h3 className="text-lg font-semibold text-black mb-4">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#000"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Products */}
            <div
              className="h-fit w-full p-6 rounded-lg mb-8"
              style={neumorphicStyle}
            >
              <h3 className="text-lg font-semibold text-black mb-4">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-300 pb-2"
                  >
                    <div>
                      <p className="font-medium text-black text-sm">{product.name}</p>
                      <p className="text-xs text-black opacity-70">{product.sales} units sold</p>
                    </div>
                    <p className="font-semibold text-black text-sm">
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Performance Bar Chart */}
            <div
              className="p-6 rounded-lg mb-8"
              style={neumorphicStyle}
            >
              <h3 className="text-lg font-semibold text-black mb-4">Monthly Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#666" name="Revenue ($)" />
                  <Bar dataKey="orders" fill="#888" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;