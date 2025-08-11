import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, AlertTriangle, Shirt, Box } from 'lucide-react';

// Custom component for the Philippine Peso icon
const PhilippinePesoIcon = () => (
  <div className="w-20 h-20 flex items-center justify-center text-white font-bold text-5xl">
    ₱
  </div>
);

// Sample data for daily sales
const dailySalesData = [
  { day: 'Mon', tshirts: 45, hoodies: 23, pants: 15, total: 83 },
  { day: 'Tue', tshirts: 52, hoodies: 31, pants: 18, total: 101 },
  { day: 'Wed', tshirts: 38, hoodies: 19, pants: 12, total: 69 },
  { day: 'Thu', tshirts: 67, hoodies: 41, pants: 25, total: 133 },
  { day: 'Fri', tshirts: 89, hoodies: 56, pants: 34, total: 179 },
  { day: 'Sat', tshirts: 124, hoodies: 78, pants: 45, total: 247 },
  { day: 'Sun', tshirts: 98, hoodies: 62, pants: 38, total: 198 },
];

// Sample data for monthly sales
const monthlySalesData = [
  { month: 'Jan', tshirts: 1200, hoodies: 800, pants: 450, revenue: 28500 },
  { month: 'Feb', tshirts: 1100, hoodies: 720, pants: 420, revenue: 26200 },
  { month: 'Mar', tshirts: 1450, hoodies: 950, pants: 580, revenue: 34800 },
  { month: 'Apr', tshirts: 1380, hoodies: 890, pants: 540, revenue: 33200 },
  { month: 'May', tshirts: 1620, hoodies: 1100, pants: 670, revenue: 39800 },
  { month: 'Jun', tshirts: 1550, hoodies: 1050, pants: 640, revenue: 38100 },
];

// Anime category distribution
const animeCategories = [
  { name: 'Naruto', value: 22, color: '#FF6B35' },
  { name: 'One Piece', value: 20, color: '#F7931E' },
  { name: 'Jujutsu Kaisen', value: 18, color: '#1F4E79' },
  { name: 'Demon Slayer', value: 16, color: '#DC143C' },
  { name: 'Hunter x Hunter', value: 14, color: '#228B22' },
  { name: 'Mushoku Tensei', value: 10, color: '#8A2BE2' },
];

// Stock data
const stockData = [
  {
    product: 'Naruto T-Shirts',
    sizes: { S: 45, M: 32, L: 28, XL: 15, XXL: 8 },
    totalStock: 128,
    lowStock: false,
    reorderLevel: 50
  },
  {
    product: 'One Piece Hoodies',
    sizes: { S: 23, M: 18, L: 12, XL: 8, XXL: 5 },
    totalStock: 66,
    lowStock: false,
    reorderLevel: 40
  },
  {
    product: 'Jujutsu Kaisen Pants',
    sizes: { S: 8, M: 12, L: 15, XL: 6, XXL: 4 },
    totalStock: 45,
    lowStock: true,
    reorderLevel: 50
  },
  {
    product: 'Demon Slayer T-Shirts',
    sizes: { S: 18, M: 25, L: 22, XL: 12, XXL: 7 },
    totalStock: 84,
    lowStock: false,
    reorderLevel: 50
  },
  {
    product: 'Hunter x Hunter Hoodies',
    sizes: { S: 15, M: 20, L: 18, XL: 10, XXL: 5 },
    totalStock: 68,
    lowStock: false,
    reorderLevel: 40
  },
  {
    product: 'Mushoku Tensei T-Shirts',
    sizes: { S: 12, M: 16, L: 14, XL: 8, XXL: 5 },
    totalStock: 55,
    lowStock: false,
    reorderLevel: 50
  },
];

// Top selling products
const topProducts = [
  { name: 'Naruto Uzumaki T-Shirt', sales: 245, revenue: 6125, type: 'T-Shirt' },
  { name: 'Luffy Straw Hat Hoodie', sales: 189, revenue: 9450, type: 'Hoodie' },
  { name: 'Gojo Satoru T-Shirt', sales: 167, revenue: 4175, type: 'T-Shirt' },
  { name: 'Tanjiro Kamado Hoodie', sales: 156, revenue: 7800, type: 'Hoodie' },
  { name: 'Killua Zoldyck Pants', sales: 134, revenue: 4690, type: 'Pants' },
];

const BreadcrumbSearch = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search products..."
          className="px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('daily');
  const totalStock = stockData.reduce((sum, item) => sum + item.totalStock, 0);
  const lowStockItems = stockData.filter(item => item.lowStock || item.totalStock <= item.reorderLevel).length;

  return (
    <div className="h-screen bg-white p-5">
      <BreadcrumbSearch />
      {/* Dashboard Header */}
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Daily Revenue', value: '₱4,247', change: '+18.2%', icon: PhilippinePesoIcon },
          { title: 'Items Sold Today', value: '198', change: '+12.5%', icon: Shirt },
          { title: 'Total Stock', value: totalStock.toLocaleString(), change: '-5.2%', icon: Package },
          { title: 'Low Stock Alerts', value: lowStockItems.toString(), change: '+2', icon: AlertTriangle },
        ].map((card, index) => (
          <div key={index} className="p-6 rounded-lg bg-black">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-70">{card.title}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <div className="flex items-center mt-2">
                  {card.change.startsWith('+') ? (
                    <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1 text-red-600" />
                  )}
                  <span className={`text-sm ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                </div>
              </div>
              {React.createElement(card.icon, { className: `text-black ${card.title === 'Low Stock Alerts' && lowStockItems > 0 ? 'text-red-500' : ''}` })}
            </div>
          </div>
        ))}
      </div>
      {/* Sales Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily/Monthly Sales Chart */}
        <div className="p-6 rounded-lg bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Product Sales</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'daily' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
              >
                Daily
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'monthly' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
              >
                Monthly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {viewMode === 'daily' ? (
              <AreaChart data={dailySalesData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="tshirts" stackId="1" stroke="#FF6B35" fill="#FF6B35" name="T-Shirts" />
                <Area type="monotone" dataKey="hoodies" stackId="1" stroke="#F7931E" fill="#F7931E" name="Hoodies" />
                <Area type="monotone" dataKey="pants" stackId="1" stroke="#1F4E79" fill="#1F4E79" name="Pants" />
              </AreaChart>
            ) : (
              <BarChart data={monthlySalesData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Legend />
                <Bar dataKey="tshirts" fill="#FF6B35" name="T-Shirts" />
                <Bar dataKey="hoodies" fill="#F7931E" name="Hoodies" />
                <Bar dataKey="pants" fill="#1F4E79" name="Pants" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        {/* Anime Category Distribution */}
        <div className="p-6 rounded-lg bg-white">
          <h3 className="text-lg font-semibold text-black mb-4">Popular Anime Series</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={animeCategories}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#000"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {animeCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Stock Management and Top Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Management */}
        <div className="p-6 rounded-lg bg-white">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Box className="w-5 h-5 mr-2" />
            Inventory Status
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {stockData.map((item, index) => (
              <div key={index} className="border-b border-gray-300 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-black text-sm">{item.product}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.lowStock || item.totalStock <= item.reorderLevel
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.totalStock} units
                    </span>
                    {(item.lowStock || item.totalStock <= item.reorderLevel) && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  {Object.entries(item.sizes).map(([size, count]) => (
                    <div key={size} className="text-center">
                      <div className="text-gray-600">{size}</div>
                      <div className="font-medium">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Top Products */}
        <div className="p-6 rounded-lg bg-white border-white">
          <h3 className="text-lg font-semibold text-black mb-4">Best Sellers</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b border-white pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-black text-sm">{product.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-black opacity-70">{product.sales} sold</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.type === 'T-Shirt' ? 'bg-orange-100 text-orange-800' :
                        product.type === 'Hoodie' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {product.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-black text-sm">
                  ₱{product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Revenue Trend */}
      <div className="p-6 rounded-lg mb-8 bg-white border-white">
        <h3 className="text-lg font-semibold text-black mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySalesData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={3}
              dot={{ fill: '#000', strokeWidth: 2, r: 6 }}
              name="Monthly Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
