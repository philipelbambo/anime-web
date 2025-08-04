import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Grid, List } from 'lucide-react';
import BreadcrumbSearch from './BreadcrumbSearch';

const ManageProduct = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Luffy T-Shirt",
      category: "t-shirt",
      anime: "One Piece",
      price: 29.99,
      stock: 50,
      image: "/OnePieceAlbum/shirt1.png",
      status: "active"
    },
    {
      id: 2,
      name: "Naruto Hoodie",
      category: "hoodie",
      anime: "Naruto",
      price: 49.99,
      stock: 25,
      image: "/NarutoAlbum/hoodie1.png",
      status: "active"
    },
    {
      id: 3,
      name: "Demon Slayer Pants",
      category: "pants",
      anime: "Demon Slayer",
      price: 39.99,
      stock: 30,
      image: "/DemonSlayerAlbum/pants1.png",
      status: "active"
    },
    {
      id: 4,
      name: "Jujutsu Kaisen T-Shirt",
      category: "t-shirt",
      anime: "Jujutsu Kaisen",
      price: 34.99,
      stock: 40,
      image: "/JujutsuKaisenAlbum/shirt1.png",
      status: "active"
    },
    {
      id: 5,
      name: "Hunter x Hunter Hoodie",
      category: "hoodie",
      anime: "Hunter x Hunter",
      price: 54.99,
      stock: 20,
      image: "/HunterAlbum/hoodie1.png",
      status: "active"
    },
    {
      id: 6,
      name: "Mushoku Tensei Pants",
      category: "pants",
      anime: "Mushoku Tensei",
      price: 44.99,
      stock: 35,
      image: "/MushokuTenseiAlbum/pants1.png",
      status: "active"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 't-shirt', label: 'T-Shirts' },
    { value: 'hoodie', label: 'Hoodies' },
    { value: 'pants', label: 'Pants' }
  ];

  const animes = [
    'One Piece', 'Naruto', 'Demon Slayer', 'Jujutsu Kaisen', 
    'Hunter x Hunter', 'Mushoku Tensei'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.anime.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/Dashboard' },
    { label: 'Manage Product', href: '/manageproduct' }
  ];

  return (
    <div className="h-full w-full bg-[#e0e0e0] p-5">
      {/* Breadcrumb */}
      <BreadcrumbSearch />

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
          <p className="text-gray-600">Manage your anime merchandise inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300"
          style={{
            background: '#4a6cf7',
            boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
          }}
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="min-w-[200px]">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-none outline-none"
          style={{
            background: '#e0e0e0',
            boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
          }}
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
          <div>
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 py-5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'
              }`}
              style={{
                background: '#e0e0e0',
                boxShadow: viewMode === 'grid' 
                  ? 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
                  : '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
              }}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'
              }`}
              style={{
                background: '#e0e0e0',
                boxShadow: viewMode === 'list' 
                  ? 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
                  : '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
              }}
            >
              <List size={20} />
            </button>
          </div>
        </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-[#e0e0e0] rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.anime}</p>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">₱{product.price}</span>
                  <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                    <Eye size={16} />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                    <Edit size={16} />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="bg-[#e0e0e0] rounded-xl overflow-hidden"
          style={{
            boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Anime</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.anime}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">₱{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ManageProduct; 