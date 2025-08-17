import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Upload, Check, Coffee, Cookie, Palette, ChevronLeft } from 'lucide-react';

const BrewCoffeeOrder = () => {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('menu');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [showCupCustomizer, setShowCupCustomizer] = useState(false);

  // Updated images: full product, PNG-style, transparent background
  const coffeeProducts = [
    {
      id: 1,
      name: 'Americano',
      price: 120,
      image: 'https://img.freepik.com/free-psd/coffee-cup-isolated-transparent-background_191095-21677.jpg?w=500&h=500&fit=crop',
      category: 'coffee'
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 150,
      image: '  https://img.freepik.com/free-psd/cappuccino-coffee-cup-transparent-background_191095-21678.jpg?w=500&h=500&fit=crop',
      category: 'coffee'
    },
    {
      id: 3,
      name: 'Latte',
      price: 160,
      image: '  https://img.freepik.com/free-psd/latte-coffee-cup-transparent-background_191095-21679.jpg?w=500&h=500&fit=crop',
      category: 'coffee'
    },
    {
      id: 4,
      name: 'Mocha',
      price: 180,
      image: '  https://img.freepik.com/free-psd/mocha-coffee-cup-transparent-background_191095-21680.jpg?w=500&h=500&fit=crop',
      category: 'coffee'
    }
  ];

  const dessertProducts = [
    {
      id: 5,
      name: 'Chocolate Cake',
      price: 200,
      image: '  https://img.freepik.com/free-psd/delicious-chocolate-cake-transparent_141793-12705.jpg?w=500&h=500&fit=crop',
      category: 'dessert'
    },
    {
      id: 6,
      name: 'Cheesecake',
      price: 220,
      image: '  https://img.freepik.com/free-psd/cheesecake-transparent-background_141793-12706.jpg?w=500&h=500&fit=crop',
      category: 'dessert'
    },
    {
      id: 7,
      name: 'Croissant',
      price: 80,
      image: '  https://img.freepik.com/free-psd/croissant-transparent-background_141793-12707.jpg?w=500&h=500&fit=crop',
      category: 'dessert'
    },
    {
      id: 8,
      name: 'Muffin',
      price: 90,
      image: '  https://img.freepik.com/free-psd/blueberry-muffin-transparent_141793-12708.jpg?w=500&h=500&fit=crop',
      category: 'dessert'
    }
  ];

  const sizes = [
    { name: 'Small', price: 0 },
    { name: 'Medium', price: 20 },
    { name: 'Large', price: 40 }
  ];

  const addOns = [
    { name: 'Extra Shot', price: 25 },
    { name: 'Whipped Cream', price: 15 },
    { name: 'Extra Foam', price: 10 },
    { name: 'Caramel Syrup', price: 20 },
    { name: 'Vanilla Syrup', price: 20 }
  ];

  const cupTypes = [
    { name: 'Paper Cup', price: 0 },
    { name: 'Ceramic Mug', price: 30 },
    { name: 'Travel Tumbler', price: 50 }
  ];

  const cupColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Orange', value: '#F97316' }
  ];

  const cupDesigns = [
    { name: 'Plain', pattern: 'none' },
    { name: 'Polka Dots', pattern: 'polka-dots' },
    { name: 'Stripes', pattern: 'stripes' },
    { name: 'Hearts', pattern: 'hearts' },
    { name: 'Stars', pattern: 'stars' },
    { name: 'Flowers', pattern: 'flowers' }
  ];

  const [productConfig, setProductConfig] = useState({
    quantity: 1,
    size: sizes[0],
    addOns: [],
    cupType: cupTypes[0],
    customization: '',
    cupDesign: {
      color: cupColors[0],
      pattern: cupDesigns[0],
      text: ''
    }
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductConfig({
      quantity: 1,
      size: sizes[0],
      addOns: [],
      cupType: cupTypes[0],
      customization: '',
      cupDesign: {
        color: cupColors[0],
        pattern: cupDesigns[0],
        text: ''
      }
    });
    setCurrentView('customize');
  };

  const handleQuantityChange = (change) => {
    setProductConfig(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }));
  };

  const handleSizeChange = (size) => {
    setProductConfig(prev => ({
      ...prev,
      size
    }));
  };

  const handleAddOnToggle = (addOn) => {
    setProductConfig(prev => ({
      ...prev,
      addOns: prev.addOns.find(a => a.name === addOn.name)
        ? prev.addOns.filter(a => a.name !== addOn.name)
        : [...prev.addOns, addOn]
    }));
  };

  const handleCupTypeChange = (cupType) => {
    setProductConfig(prev => ({
      ...prev,
      cupType
    }));
  };

  const handleCupColorChange = (color) => {
    setProductConfig(prev => ({
      ...prev,
      cupDesign: { ...prev.cupDesign, color }
    }));
  };

  const handleCupPatternChange = (pattern) => {
    setProductConfig(prev => ({
      ...prev,
      cupDesign: { ...prev.cupDesign, pattern }
    }));
  };

  const handleCupTextChange = (text) => {
    setProductConfig(prev => ({
      ...prev,
      cupDesign: { ...prev.cupDesign, text }
    }));
  };

  const calculateItemTotal = () => {
    if (!selectedProduct) return 0;
    const basePrice = selectedProduct.price;
    const sizePrice = productConfig.size.price;
    const addOnsPrice = productConfig.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
    const cupPrice = productConfig.cupType.price;
    return (basePrice + sizePrice + addOnsPrice + cupPrice) * productConfig.quantity;
  };

  const addToCart = () => {
    const cartItem = {
      id: Date.now(),
      product: selectedProduct,
      quantity: productConfig.quantity,
      size: productConfig.size,
      addOns: productConfig.addOns,
      cupType: productConfig.cupType,
      customization: productConfig.customization,
      cupDesign: productConfig.cupDesign,
      total: calculateItemTotal()
    };
    setCart(prev => [...prev, cartItem]);
    setCurrentView('menu');
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentScreenshot(file.name);
    }
  };

  const confirmPayment = () => {
    if (paymentMethod) {
      alert('Order confirmed! Thank you for choosing Brew Coffee.');
      setCart([]);
      setCurrentView('menu');
      setPaymentMethod('');
      setPaymentScreenshot(null);
    } else {
      alert('Please select a payment method.');
    }
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  // ✅ Cup Preview Component
  const CupPreview = ({ design, size = "w-12 h-16" }) => (
    <div
      className={`${size} rounded-lg border relative`}
      style={{
        backgroundColor: design.color.value,
        borderColor: '#4C4B16'
      }}
    >
      {design.pattern.pattern === 'polka-dots' && (
        <div
          className="absolute inset-0 rounded-lg opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '8px 8px'
          }}
        />
      )}
      {design.pattern.pattern === 'stripes' && (
        <div
          className="absolute inset-0 rounded-lg opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white, white 2px, transparent 2px, transparent 8px)'
          }}
        />
      )}
      {design.text && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold" style={{ color: '#4C4B16' }}>
            {design.text}
          </span>
        </div>
      )}
    </div>
  );

  // ✅ CartSidebar Component
  const CartSidebar = () => (
    <div className="w-64 bg-white border-l border-gray-200 p-4 h-screen overflow-y-auto fixed right-0 top-0 md:block hidden">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5" style={{ color: '#4C4B16' }} />
        <h3 className="text-lg font-semibold" style={{ color: '#4C4B16' }}>Your Cart</h3>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <CupPreview design={item.cupDesign} size="w-8 h-12" />
                    <h4 className="font-medium text-sm" style={{ color: '#4C4B16' }}>{item.product.name}</h4>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ×
                  </button>
                </div>
                <div className="text-xs space-y-1" style={{ color: '#4C4B16' }}>
                  <p>Size: {item.size.name}</p>
                  <p>Cup: {item.cupType.name}</p>
                  <p>Color: {item.cupDesign.color.name}</p>
                  {item.addOns.length > 0 && (
                    <p>Add-ons: {item.addOns.map(a => a.name).join(', ')}</p>
                  )}
                  <p>Qty: {item.quantity}</p>
                  <p className="font-semibold">₱{item.total}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between font-bold" style={{ color: '#4C4B16' }}>
              <span>Total: ₱{getCartTotal()}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('checkout')}
            className="w-full py-2 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: '#4C4B16' }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );

  // ✅ Cup Customizer Modal
  const CupCustomizer = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold" style={{ color: '#4C4B16' }}>Customize Your Cup</h3>
          <button
            onClick={() => setShowCupCustomizer(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <CupPreview design={productConfig.cupDesign} size="w-24 h-32" />
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2" style={{ color: '#4C4B16' }}>Cup Color</h4>
          <div className="grid grid-cols-4 gap-2">
            {cupColors.map(color => (
              <button
                key={color.name}
                onClick={() => handleCupColorChange(color)}
                className={`w-12 h-12 rounded-full border-2 ${
                  productConfig.cupDesign.color.name === color.name ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>

        {/* Pattern Selection */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2" style={{ color: '#4C4B16' }}>Pattern</h4>
          <div className="grid grid-cols-2 gap-2">
            {cupDesigns.map(design => (
              <button
                key={design.name}
                onClick={() => handleCupPatternChange(design)}
                className={`p-2 border rounded-lg text-sm ${
                  productConfig.cupDesign.pattern.name === design.name
                    ? 'border-gray-800 bg-gray-100'
                    : 'border-gray-300'
                }`}
                style={{ color: '#4C4B16' }}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Text */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2" style={{ color: '#4C4B16' }}>Custom Text</h4>
          <input
            type="text"
            value={productConfig.cupDesign.text}
            onChange={(e) => handleCupTextChange(e.target.value)}
            placeholder="Add text (max 10)"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ color: '#4C4B16' }}
            maxLength="10"
          />
        </div>

        <button
          onClick={() => setShowCupCustomizer(false)}
          className="w-full py-2 rounded-lg font-semibold text-white"
          style={{ backgroundColor: '#4C4B16' }}
        >
          Done Customizing
        </button>
      </div>
    </div>
  );

  // ✅ Menu View
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-4xl font-bold flex items-center gap-3" style={{ color: '#4C4B16' }}>
            <Coffee className="w-10 h-10" />
            Brew Coffee
          </h1>
        </div>

        <div className="flex">
          <div className="flex-1 p-6 md:mr-64">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#4C4B16' }}>
                <Coffee className="w-8 h-8" />
                Our Coffee
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coffeeProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain p-4 bg-gray-50 rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold" style={{ color: '#4C4B16' }}>{product.name}</h3>
                      <p className="font-bold text-lg" style={{ color: '#4C4B16' }}>₱{product.price}</p>
                      <button
                        className="w-full mt-3 py-2 rounded-lg transition-colors text-white font-semibold"
                        style={{ backgroundColor: '#4C4B16' }}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#4C4B16' }}>
                <Cookie className="w-8 h-8" />
                Desserts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dessertProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain p-4 bg-gray-50 rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold" style={{ color: '#4C4B16' }}>{product.name}</h3>
                      <p className="font-bold text-lg" style={{ color: '#4C4B16' }}>₱{product.price}</p>
                      <button
                        className="w-full mt-3 py-2 rounded-lg transition-colors text-white font-semibold"
                        style={{ backgroundColor: '#4C4B16' }}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <CartSidebar />
        </div>
      </div>
    );
  }

  // ✅ Customize View
  if (currentView === 'customize' && selectedProduct) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex">
          <div className="flex-1 p-6 md:mr-64">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                {/* Header with Left Arrow Back Button */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                    style={{ color: '#4C4B16' }}
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-2xl font-bold" style={{ color: '#4C4B16' }}>
                    Customize {selectedProduct.name}
                  </h1>
                </div>

                <div className="text-center mb-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-32 h-32 object-contain mx-auto mb-4 bg-gray-50 p-2 rounded-xl"
                  />
                  <h2 className="text-2xl font-bold" style={{ color: '#4C4B16' }}>{selectedProduct.name}</h2>
                  <p className="font-bold text-xl" style={{ color: '#4C4B16' }}>₱{selectedProduct.price}</p>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 text-white rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#4C4B16' }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold w-8 text-center" style={{ color: '#4C4B16' }}>
                      {productConfig.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 text-white rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#4C4B16' }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Size */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Size</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes.map(size => (
                      <button
                        key={size.name}
                        onClick={() => handleSizeChange(size)}
                        className={`p-3 border rounded-lg text-center ${
                          productConfig.size.name === size.name
                            ? 'border-gray-800 bg-gray-100'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ color: '#4C4B16' }}
                      >
                        <div className="font-semibold">{size.name}</div>
                        {size.price > 0 && <div className="text-sm">+₱{size.price}</div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Add-ons</h3>
                  <div className="space-y-2">
                    {addOns.map(addOn => (
                      <label
                        key={addOn.name}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={productConfig.addOns.some(a => a.name === addOn.name)}
                          onChange={() => handleAddOnToggle(addOn)}
                          className="w-4 h-4"
                        />
                        <span className="flex-1" style={{ color: '#4C4B16' }}>{addOn.name}</span>
                        <span className="font-semibold" style={{ color: '#4C4B16' }}>+₱{addOn.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cup Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Cup Type</h3>
                  <div className="space-y-2">
                    {cupTypes.map(cup => (
                      <label
                        key={cup.name}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="cupType"
                          checked={productConfig.cupType.name === cup.name}
                          onChange={() => handleCupTypeChange(cup)}
                          className="w-4 h-4"
                        />
                        <span className="flex-1" style={{ color: '#4C4B16' }}>{cup.name}</span>
                        {cup.price > 0 && <span className="font-semibold" style={{ color: '#4C4B16' }}>+₱{cup.price}</span>}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cup Customization */}
                <div className="mb-6 flex flex-col items-center">
                  <button
                    onClick={() => setShowCupCustomizer(true)}
                    className="w-full p-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                    style={{ borderColor: '#4C4B16', color: '#4C4B16' }}
                  >
                    <Palette className="w-5 h-5" />
                    Customize Your Cup Design
                  </button>
                  <div className="mt-4">
                    <CupPreview design={productConfig.cupDesign} size="w-16 h-20" />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Special Requests</h3>
                  <textarea
                    value={productConfig.customization}
                    onChange={(e) => setProductConfig(prev => ({ ...prev, customization: e.target.value }))}
                    placeholder="Any special requests..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                    style={{ color: '#4C4B16' }}
                    rows="3"
                  />
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold" style={{ color: '#4C4B16' }}>Total:</span>
                    <span className="text-xl font-bold" style={{ color: '#4C4B16' }}>₱{calculateItemTotal()}</span>
                  </div>
                  <button
                    onClick={addToCart}
                    className="w-full py-3 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: '#4C4B16' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CartSidebar />
          {showCupCustomizer && <CupCustomizer />}
        </div>
      </div>
    );
  }

  // ✅ Checkout View
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex">
          <div className="flex-1 p-6 md:mr-64">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                {/* Header with Left Arrow Back Button */}
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                    style={{ color: '#4C4B16' }}
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-2xl font-bold" style={{ color: '#4C4B16' }}>
                    Checkout
                  </h1>
                </div>

                <h2 className="text-2xl font-bold mb-6" style={{ color: '#4C4B16' }}>Order Summary</h2>

                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-2">
                        <CupPreview design={item.cupDesign} size="w-8 h-12" />
                        <span style={{ color: '#4C4B16' }}>
                          {item.product.name} x{item.quantity}
                        </span>
                      </div>
                      <span style={{ color: '#4C4B16' }}>₱{item.total}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span style={{ color: '#4C4B16' }}>Total:</span>
                    <span style={{ color: '#4C4B16' }}>₱{getCartTotal()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>Payment Method</h3>
                  <div className="space-y-2">
                    {['PayMaya', 'GCash', 'Cash on Delivery'].map(method => (
                      <label
                        key={method}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span style={{ color: '#4C4B16' }}>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {paymentMethod && paymentMethod !== 'Cash on Delivery' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: '#4C4B16' }}>
                      Upload Payment Screenshot (Optional)
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="payment-screenshot"
                      />
                      <label
                        htmlFor="payment-screenshot"
                        className="cursor-pointer hover:underline"
                        style={{ color: '#4C4B16' }}
                      >
                        Click to upload screenshot
                      </label>
                      {paymentScreenshot && (
                        <p className="text-green-600 mt-2 flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          {paymentScreenshot} uploaded
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={confirmPayment}
                  className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#4C4B16' }}
                >
                  <Check className="w-5 h-5" />
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>

          <CartSidebar />
        </div>
      </div>
    );
  }

  return null;
};

export default BrewCoffeeOrder;