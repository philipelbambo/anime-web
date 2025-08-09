import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Star } from 'lucide-react';

// Mock imports for demonstration
const SideMenu = () => null;
const Header = () => null;
const BreadcrumbSearch = () => (
  <div className="flex items-center space-x-2 mb-6">
    <span className="text-black font-medium">Dashboard</span>
    <span className="text-gray-500">/</span>
    <span className="text-black font-medium">Orders</span>
  </div>
);

// Comprehensive orders data for anime merchandise business
const ordersData = [
  {
    id: 1,
    orderNumber: '#ORD-001',
    customer: 'Alex Rodriguez',
    items: 'One Piece Luffy T-Shirt (L), Straw Hat Crew Hoodie (L)',
    total: '$89.98',
    date: '2024-08-01',
    status: 'Delivered',
    anime: 'One Piece',
    productType: 'T-Shirt, Hoodie',
    rating: 5
  },
  {
    id: 2,
    orderNumber: '#ORD-002',
    customer: 'Sarah Chen',
    items: 'Jujutsu Kaisen Gojo T-Shirt (M), JJK Sukuna Pants (S)',
    total: '$74.99',
    date: '2024-08-02',
    status: 'Preparing',
    anime: 'Jujutsu Kaisen',
    productType: 'T-Shirt, Pants',
    rating: null
  },
  {
    id: 3,
    orderNumber: '#ORD-003',
    customer: 'Mike Johnson',
    items: 'Hunter x Hunter Gon T-Shirt (XL)',
    total: '$34.99',
    date: '2024-08-03',
    status: 'Pending',
    anime: 'Hunter x Hunter',
    productType: 'T-Shirt',
    rating: null
  },
  {
    id: 4,
    orderNumber: '#ORD-004',
    customer: 'Emma Wilson',
    items: 'Mushoku Tensei Roxy Hoodie (M), MT Magic Academy Pants (M)',
    total: '$94.98',
    date: '2024-08-04',
    status: 'Delivered',
    anime: 'Mushoku Tensei',
    productType: 'Hoodie, Pants',
    rating: 4
  },
  {
    id: 5,
    orderNumber: '#ORD-005',
    customer: 'David Kim',
    items: 'Naruto Hokage T-Shirt (L), Akatsuki Hoodie (L), Shinobi Pants (L)',
    total: '$124.97',
    date: '2024-08-05',
    status: 'Delivered',
    anime: 'Naruto',
    productType: 'T-Shirt, Hoodie, Pants',
    rating: 5
  },
  {
    id: 6,
    orderNumber: '#ORD-006',
    customer: 'Lisa Martinez',
    items: 'Demon Slayer Tanjiro T-Shirt (S), Nezuko Pants (S)',
    total: '$69.98',
    date: '2024-08-06',
    status: 'Preparing',
    anime: 'Demon Slayer',
    productType: 'T-Shirt, Pants',
    rating: null
  },
  {
    id: 7,
    orderNumber: '#ORD-007',
    customer: 'James Thompson',
    items: 'One Piece Zoro T-Shirt (XL), Grand Line Hoodie (XL)',
    total: '$89.98',
    date: '2024-07-30',
    status: 'Delivered',
    anime: 'One Piece',
    productType: 'T-Shirt, Hoodie',
    rating: 4
  },
  {
    id: 8,
    orderNumber: '#ORD-008',
    customer: 'Ashley Davis',
    items: 'Jujutsu Kaisen Nobara Hoodie (M)',
    total: '$54.99',
    date: '2024-07-29',
    status: 'Delivered',
    anime: 'Jujutsu Kaisen',
    productType: 'Hoodie',
    rating: 5
  },
  {
    id: 9,
    orderNumber: '#ORD-009',
    customer: 'Ryan Lee',
    items: 'Hunter x Hunter Killua T-Shirt (L), Phantom Troupe Pants (L)',
    total: '$74.98',
    date: '2024-07-28',
    status: 'Cancelled',
    anime: 'Hunter x Hunter',
    productType: 'T-Shirt, Pants',
    rating: null
  },
  {
    id: 10,
    orderNumber: '#ORD-010',
    customer: 'Jessica Brown',
    items: 'Demon Slayer Hashira T-Shirt (M), Demon Corps Hoodie (M), Tanjiro Pants (M)',
    total: '$129.97',
    date: '2024-07-27',
    status: 'Delivered',
    anime: 'Demon Slayer',
    productType: 'T-Shirt, Hoodie, Pants',
    rating: 5
  },
  {
    id: 11,
    orderNumber: '#ORD-011',
    customer: 'Kevin Garcia',
    items: 'Naruto Sage Mode T-Shirt (XL), Konoha Pants (XL)',
    total: '$79.98',
    date: '2024-07-26',
    status: 'Delivered',
    anime: 'Naruto',
    productType: 'T-Shirt, Pants',
    rating: 4
  },
  {
    id: 12,
    orderNumber: '#ORD-012',
    customer: 'Amanda White',
    items: 'Mushoku Tensei Sylphiette T-Shirt (S)',
    total: '$34.99',
    date: '2024-07-25',
    status: 'Pending',
    anime: 'Mushoku Tensei',
    productType: 'T-Shirt',
    rating: null
  },
  {
    id: 13,
    orderNumber: '#ORD-013',
    customer: 'Carlos Mendez',
    items: 'One Piece Ace Hoodie (L), Marine Pants (L)',
    total: '$94.98',
    date: '2024-07-24',
    status: 'Preparing',
    anime: 'One Piece',
    productType: 'Hoodie, Pants',
    rating: null
  },
  {
    id: 14,
    orderNumber: '#ORD-014',
    customer: 'Nicole Taylor',
    items: 'Jujutsu Kaisen Maki T-Shirt (M), Cursed Energy Hoodie (M)',
    total: '$89.98',
    date: '2024-07-23',
    status: 'Delivered',
    anime: 'Jujutsu Kaisen',
    productType: 'T-Shirt, Hoodie',
    rating: 5
  },
  {
    id: 15,
    orderNumber: '#ORD-015',
    customer: 'Brandon Clark',
    items: 'Hunter x Hunter Kurapika Pants (L)',
    total: '$39.99',
    date: '2024-07-22',
    status: 'Delivered',
    anime: 'Hunter x Hunter',
    productType: 'Pants',
    rating: 4
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'Preparing': return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'Delivered': return 'bg-green-100 text-green-800 border border-green-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 border border-red-200';
    default: return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const getAnimeIcon = (anime) => {
  const iconStyle = {
    width: '32px',
    height: '32px',
    objectFit: 'contain'
  };
  
  switch (anime) {
    case 'One Piece': 
      return <img src="https://images.seeklogo.com/logo-png/61/1/one-piece-skull-logo-png_seeklogo-613212.png" alt="One Piece" style={iconStyle} />;
    case 'Jujutsu Kaisen': 
      return <img src="https://i.pinimg.com/236x/9a/f0/a7/9af0a768ebdc4d470ad6e013bbbd4fbf.jpg" alt="Jujutsu Kaisen" style={iconStyle} />;
    case 'Hunter x Hunter': 
      return <img src="https://www.faddynative.com/wp-content/uploads/2023/02/hunter_X_logo_sticker_comicsense.jpg" alt="Hunter x Hunter" style={iconStyle} />;
    case 'Mushoku Tensei': 
      return <img src="https://cdn.creazilla.com/cliparts/7826678/mushoku-tensei-logo-int-clipart-xl.png" alt="Mushoku Tensei" style={iconStyle} />;
    case 'Naruto': 
      return <img src="https://pngimg.com/uploads/naruto/small/naruto_PNG62.png" alt="Naruto" style={iconStyle} />;
    case 'Demon Slayer': 
      return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiYBtWyduqX1RG6x-emtaKzyWm_VXu0kLn0Q&s" alt="Demon Slayer" style={iconStyle} />;
    default: 
      return <div style={{...iconStyle, backgroundColor: '#f3f4f6', borderRadius: '4px'}}></div>;
  }
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.anime.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-start items-start p-6">
        <div className="w-full">
          <BreadcrumbSearch />
          
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"> 
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="border border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Add Order
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by customer, order #, or anime series..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white min-w-[150px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-bold text-black">Order Details</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Customer</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Anime Series</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Products</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Total</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Rating</th>
                    <th className="text-left py-4 px-6 font-bold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr 
                      key={order.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}
                    >
                      <td className="py-6 px-6">
                        <div>
                          <div className="font-bold text-black text-lg">{order.orderNumber}</div>
                          <div className="text-sm text-gray-600">{order.date}</div>
                        </div>
                      </td>
                      
                      <td className="py-6 px-6">
                        <div className="font-semibold text-black">{order.customer}</div>
                      </td>
                      
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          {getAnimeIcon(order.anime)}
                          <span className="font-medium text-black">{order.anime}</span>
                        </div>
                      </td>
                      
                      <td className="py-6 px-6">
                        <div className="text-sm text-black max-w-xs">
                          {order.items}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Type: {order.productType}
                        </div>
                      </td>
                      
                      <td className="py-6 px-6">
                        <span className="font-bold text-black text-lg">{order.total}</span>
                      </td>
                      
                      <td className="py-6 px-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      
                      <td className="py-6 px-6">
                        {order.rating ? (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < order.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                            <span className="text-sm text-black ml-1">({order.rating})</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No rating</span>
                        )}
                      </td>
                      
                      <td className="py-6 px-6">
                        <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-black">{ordersData.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black mb-2">Delivered</h3>
              <p className="text-3xl font-bold text-green-600">
                {ordersData.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black mb-2">Preparing</h3>
              <p className="text-3xl font-bold text-blue-600">
                {ordersData.filter(o => o.status === 'Preparing').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;