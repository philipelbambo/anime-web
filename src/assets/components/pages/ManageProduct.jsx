import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Grid, List, Package, Filter } from 'lucide-react';

const BreadcrumbSearch = () => (
  <nav className="mb-6">
    <ol className="flex space-x-2 text-sm text-black">
      <li><a href="/Dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a></li>
      <li>/</li>
      <li><a href="/manageproduct" className="hover:text-blue-600 transition-colors">Manage Product</a></li>
    </ol>
  </nav>
);

const AddProductModal = ({ show, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 't-shirt',
    anime: 'One Piece',
    price: '',
    stock: '',
    status: 'active'
  });

  const categories = ['t-shirt', 'hoodie', 'pants'];
  const animes = [
    'One Piece', 'Hunter x Hunter', 'Jujutsu Kaisen', 'Mushoku Tensei', 
    'Naruto', 'Attack on Titan', 'Demon Slayer', 'Chainsaw Man'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.stock) {
      onAdd({
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        image: `/placeholder-${newProduct.category}.png`
      });
      setNewProduct({
        name: '',
        category: 't-shirt',
        anime: 'One Piece',
        price: '',
        stock: '',
        status: 'active'
      });
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h2 className="text-xl font-bold text-black mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Category</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">Anime</label>
              <select
                value={newProduct.anime}
                onChange={(e) => setNewProduct({...newProduct, anime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                {animes.map(anime => (
                  <option key={anime} value={anime}>{anime}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Price (₱)</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">Stock</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageProduct = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Comprehensive anime store inventory
  const [products, setProducts] = useState([
    // One Piece
    { id: 1, name: "Luffy Straw Hat T-Shirt", category: "t-shirt", anime: "One Piece", price: 29.99, stock: 50, image: "/OnePieceAlbum/shirt1.png", status: "active" },
    { id: 2, name: "Zoro Three Swords Hoodie", category: "hoodie", anime: "One Piece", price: 54.99, stock: 30, image: "/OnePieceAlbum/hoodie1.png", status: "active" },
    { id: 3, name: "Sanji Cook Pants", category: "pants", anime: "One Piece", price: 39.99, stock: 25, image: "/OnePieceAlbum/pants1.png", status: "active" },
    { id: 4, name: "Ace Fire Fist T-Shirt", category: "t-shirt", anime: "One Piece", price: 32.99, stock: 40, image: "/OnePieceAlbum/shirt2.png", status: "active" },
    
    // Hunter x Hunter
    { id: 5, name: "Gon Freecss T-Shirt", category: "t-shirt", anime: "Hunter x Hunter", price: 31.99, stock: 35, image: "/HunterAlbum/shirt1.png", status: "active" },
    { id: 6, name: "Killua Zoldyck Hoodie", category: "hoodie", anime: "Hunter x Hunter", price: 52.99, stock: 28, image: "/HunterAlbum/hoodie1.png", status: "active" },
    { id: 7, name: "Kurapika Chain Pants", category: "pants", anime: "Hunter x Hunter", price: 42.99, stock: 20, image: "/HunterAlbum/pants1.png", status: "active" },
    
    // Jujutsu Kaisen
    { id: 8, name: "Yuji Itadori T-Shirt", category: "t-shirt", anime: "Jujutsu Kaisen", price: 34.99, stock: 45, image: "/JujutsuKaisenAlbum/shirt1.png", status: "active" },
    { id: 9, name: "Gojo Satoru Hoodie", category: "hoodie", anime: "Jujutsu Kaisen", price: 59.99, stock: 22, image: "/JujutsuKaisenAlbum/hoodie1.png", status: "active" },
    { id: 10, name: "Megumi Fushiguro Pants", category: "pants", anime: "Jujutsu Kaisen", price: 44.99, stock: 18, image: "/JujutsuKaisenAlbum/pants1.png", status: "active" },
    { id: 11, name: "Sukuna King of Curses T-Shirt", category: "t-shirt", anime: "Jujutsu Kaisen", price: 36.99, stock: 33, image: "/JujutsuKaisenAlbum/shirt2.png", status: "active" },
    
    // Mushoku Tensei
    { id: 12, name: "Rudeus Greyrat T-Shirt", category: "t-shirt", anime: "Mushoku Tensei", price: 33.99, stock: 38, image: "/MushokuTenseiAlbum/shirt1.png", status: "active" },
    { id: 13, name: "Eris Boreas Hoodie", category: "hoodie", anime: "Mushoku Tensei", price: 51.99, stock: 26, image: "/MushokuTenseiAlbum/hoodie1.png", status: "active" },
    { id: 14, name: "Sylphiette Magic Pants", category: "pants", anime: "Mushoku Tensei", price: 41.99, stock: 24, image: "/MushokuTenseiAlbum/pants1.png", status: "active" },
    
    // Naruto
    { id: 15, name: "Naruto Uzumaki T-Shirt", category: "t-shirt", anime: "Naruto", price: 30.99, stock: 55, image: "/NarutoAlbum/shirt1.png", status: "active" },
    { id: 16, name: "Sasuke Uchiha Hoodie", category: "hoodie", anime: "Naruto", price: 53.99, stock: 32, image: "/NarutoAlbum/hoodie1.png", status: "active" },
    { id: 17, name: "Kakashi Sensei Pants", category: "pants", anime: "Naruto", price: 40.99, stock: 27, image: "/NarutoAlbum/pants1.png", status: "active" },
    { id: 18, name: "Itachi Akatsuki T-Shirt", category: "t-shirt", anime: "Naruto", price: 35.99, stock: 29, image: "/NarutoAlbum/shirt2.png", status: "active" },
    
    // Attack on Titan
    { id: 19, name: "Eren Yeager T-Shirt", category: "t-shirt", anime: "Attack on Titan", price: 32.99, stock: 42, image: "/AttackOnTitanAlbum/shirt1.png", status: "active" },
    { id: 20, name: "Survey Corps Hoodie", category: "hoodie", anime: "Attack on Titan", price: 56.99, stock: 24, image: "/AttackOnTitanAlbum/hoodie1.png", status: "active" },
    { id: 21, name: "Levi Ackerman Pants", category: "pants", anime: "Attack on Titan", price: 43.99, stock: 21, image: "/AttackOnTitanAlbum/pants1.png", status: "active" },
    { id: 22, name: "Mikasa Wings T-Shirt", category: "t-shirt", anime: "Attack on Titan", price: 34.99, stock: 36, image: "/AttackOnTitanAlbum/shirt2.png", status: "active" },
    
    // Demon Slayer
    { id: 23, name: "Tanjiro Kamado T-Shirt", category: "t-shirt", anime: "Demon Slayer", price: 33.99, stock: 47, image: "/DemonSlayerAlbum/shirt1.png", status: "active" },
    { id: 24, name: "Zenitsu Thunder Hoodie", category: "hoodie", anime: "Demon Slayer", price: 54.99, stock: 29, image: "/DemonSlayerAlbum/hoodie1.png", status: "active" },
    { id: 25, name: "Inosuke Boar Pants", category: "pants", anime: "Demon Slayer", price: 41.99, stock: 23, image: "/DemonSlayerAlbum/pants1.png", status: "active" },
    { id: 26, name: "Rengoku Flame T-Shirt", category: "t-shirt", anime: "Demon Slayer", price: 37.99, stock: 31, image: "/DemonSlayerAlbum/shirt2.png", status: "active" },
    
    // Chainsaw Man
    { id: 27, name: "Denji Chainsaw T-Shirt", category: "t-shirt", anime: "Chainsaw Man", price: 35.99, stock: 39, image: "/ChainsawManAlbum/shirt1.png", status: "active" },
    { id: 28, name: "Power Blood Devil Hoodie", category: "hoodie", anime: "Chainsaw Man", price: 57.99, stock: 25, image: "/ChainsawManAlbum/hoodie1.png", status: "active" },
    { id: 29, name: "Aki Hayakawa Pants", category: "pants", anime: "Chainsaw Man", price: 44.99, stock: 19, image: "/ChainsawManAlbum/pants1.png", status: "active" },
    { id: 30, name: "Makima Control T-Shirt", category: "t-shirt", anime: "Chainsaw Man", price: 38.99, stock: 28, image: "/ChainsawManAlbum/shirt2.png", status: "active" }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 't-shirt', label: 'T-Shirts' },
    { value: 'hoodie', label: 'Hoodies' },
    { value: 'pants', label: 'Pants' }
  ];

  const animes = [
    { value: 'all', label: 'All Anime' },
    { value: 'One Piece', label: 'One Piece' },
    { value: 'Hunter x Hunter', label: 'Hunter x Hunter' },
    { value: 'Jujutsu Kaisen', label: 'Jujutsu Kaisen' },
    { value: 'Mushoku Tensei', label: 'Mushoku Tensei' },
    { value: 'Naruto', label: 'Naruto' },
    { value: 'Attack on Titan', label: 'Attack on Titan' },
    { value: 'Demon Slayer', label: 'Demon Slayer' },
    { value: 'Chainsaw Man', label: 'Chainsaw Man' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.anime.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesAnime = selectedAnime === 'all' || product.anime === selectedAnime;
    return matchesSearch && matchesCategory && matchesAnime;
  });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleToggleStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 py-6">
        <BreadcrumbSearch />
      {/* Page Header */}
      <div className="flex justify-end mb-8"> 
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#e0e0e0] border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-black">{totalProducts}</p>
              </div>
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-[#e0e0e0] border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-black">{activeProducts}</p>
              </div>
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-[#e0e0e0] border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inventory Value</p>
                <p className="text-2xl font-bold text-black">₱{totalValue.toLocaleString()}</p>
              </div>
              <Filter className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products or anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedAnime}
                onChange={(e) => setSelectedAnime(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black min-w-[180px]"
              >
                {animes.map(anime => (
                  <option key={anime.value} value={anime.value}>
                    {anime.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg bg-gray-100"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {product.status}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-black text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{product.anime}</p>
                  <p className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded inline-block">{product.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-xl text-black">₱{product.price}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' :
                      product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Eye size={16} />
                      <span className="text-sm">View</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                      <Edit size={16} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Anime</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3EImg%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div>
                            <div className="font-medium text-black">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-black capitalize bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-black">{product.anime}</td>
                      <td className="px-6 py-4 text-sm font-bold text-black">₱{product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm px-2 py-1 rounded ${
                          product.stock > 20 ? 'bg-green-100 text-green-800' :
                          product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
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

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {totalProducts} products
            </p>
          </div>
        )}

        {/* Add Product Modal */}
        <AddProductModal 
          show={showAddModal} 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default ManageProduct;