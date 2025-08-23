import React, { useState, useRef } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Smartphone, FileText, Upload, X, ArrowLeft } from 'lucide-react';

const DessertOrderingSystem = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showDessertModal, setShowDessertModal] = useState(false);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  // Sample dessert data with images
  const desserts = [
    {
      id: 1,
      name: "Chocolate Lava Cake",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      description: "Indulge in our signature Chocolate Lava Cake, a decadent masterpiece that's sure to satisfy your deepest chocolate cravings.",
      ingredients: [
        "Premium Belgian dark chocolate",
        "Fresh farm eggs",
        "Unsalted butter",
        "Heavy cream",
        "All-purpose flour",
        "Granulated sugar",
        "Vanilla bean ice cream",
        "Fresh raspberries",
        "Powdered sugar",
        "Fresh mint"
      ],
      nutritionalInfo: {
        calories: "520 kcal",
        fat: "32g",
        carbs: "58g",
        protein: "8g",
        sugar: "45g"
      },
      allergens: ["Eggs", "Dairy", "Gluten", "May contain nuts"],
      servingSize: "1 slice (150g)",
      preparationTime: "25 minutes",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Strawberry Cheesecake",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop",
      description: "Experience the perfect balance of creamy and fruity with our classic New York-style Strawberry Cheesecake.",
      ingredients: [
        "Philadelphia cream cheese",
        "Fresh strawberries",
        "Graham crackers",
        "Unsalted butter",
        "Fresh eggs",
        "Pure vanilla extract",
        "Granulated sugar",
        "Sour cream",
        "Heavy whipping cream",
        "Strawberry compote"
      ],
      nutritionalInfo: {
        calories: "450 kcal",
        fat: "28g",
        carbs: "42g",
        protein: "9g",
        sugar: "35g"
      },
      allergens: ["Dairy", "Eggs", "Gluten"],
      servingSize: "1 slice (120g)",
      preparationTime: "4 hours (including chill time)",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Tiramisu",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop",
      description: "Transport yourself to Italy with our authentic Tiramisu, a beloved classic that perfectly captures the essence of Italian dolce vita.",
      ingredients: [
        "Ladyfinger cookies (Savoiardi)",
        "Mascarpone cheese",
        "Fresh egg yolks",
        "Premium espresso coffee",
        "Coffee liqueur",
        "Marsala wine",
        "Granulated sugar",
        "Heavy cream",
        "Unsweetened cocoa powder",
        "Dark chocolate shavings"
      ],
      nutritionalInfo: {
        calories: "380 kcal",
        fat: "24g",
        carbs: "32g",
        protein: "7g",
        sugar: "28g"
      },
      allergens: ["Dairy", "Eggs", "Gluten", "Contains alcohol"],
      servingSize: "1 portion (100g)",
      preparationTime: "6 hours (including chill time)",
      difficulty: "Medium"
    },
    {
      id: 4,
      name: "Ice Cream Sundae",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop",
      description: "Relive childhood memories with our spectacular Ice Cream Sundae, a towering treat that's as beautiful as it is delicious.",
      ingredients: [
        "House-made vanilla ice cream",
        "Madagascar vanilla beans",
        "Fresh heavy cream",
        "Chocolate fudge sauce",
        "Whipped cream",
        "Toasted almonds",
        "Rainbow sprinkles",
        "Maraschino cherry",
        "Wafer cookie",
        "Whole milk"
      ],
      nutritionalInfo: {
        calories: "620 kcal",
        fat: "38g",
        carbs: "68g",
        protein: "12g",
        sugar: "58g"
      },
      allergens: ["Dairy", "Nuts", "Gluten", "May contain eggs"],
      servingSize: "1 sundae (250g)",
      preparationTime: "10 minutes",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Apple Pie",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=300&h=300&fit=crop",
      description: "Savor the taste of home with our traditional Apple Pie, made from a cherished family recipe that's been passed down through generations.",
      ingredients: [
        "Granny Smith apples",
        "Honeycrisp apples",
        "All-purpose flour",
        "Unsalted butter",
        "Brown sugar",
        "Ground cinnamon",
        "Ground nutmeg",
        "Salt",
        "Ice water",
        "Vanilla ice cream"
      ],
      nutritionalInfo: {
        calories: "410 kcal",
        fat: "18g",
        carbs: "62g",
        protein: "4g",
        sugar: "35g"
      },
      allergens: ["Gluten", "Dairy"],
      servingSize: "1 slice (140g)",
      preparationTime: "1.5 hours",
      difficulty: "Medium"
    },
    {
      id: 6,
      name: "Chocolate Brownie",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop",
      description: "Treat yourself to our Ultimate Chocolate Brownie, a fudgy, decadent square of pure chocolate heaven.",
      ingredients: [
        "Dark chocolate",
        "Semi-sweet chocolate",
        "Unsalted butter",
        "Fresh eggs",
        "Brown sugar",
        "All-purpose flour",
        "California walnuts",
        "Salted caramel sauce",
        "Sea salt flakes",
        "Vanilla extract"
      ],
      nutritionalInfo: {
        calories: "480 kcal",
        fat: "26g",
        carbs: "58g",
        protein: "7g",
        sugar: "42g"
      },
      allergens: ["Dairy", "Eggs", "Gluten", "Nuts"],
      servingSize: "1 brownie (110g)",
      preparationTime: "45 minutes",
      difficulty: "Easy"
    }
  ];

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
    gcashNumber: '09123456789' // Your GCash number
  });

  const addToCart = (dessert) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dessert.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dessert.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dessert, quantity: 1 }];
    });
  };

  const openDessertModal = (dessert) => {
    setSelectedDessert(dessert);
    setShowDessertModal(true);
  };

  const closeDessertModal = () => {
    setShowDessertModal(false);
    setSelectedDessert(null);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentScreenshot(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCheckout = () => {
    // Validate required fields
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone || 
        !customerDetails.address || !customerDetails.city || !customerDetails.zipCode || 
        !customerDetails.paymentMethod) {
      alert('Please fill in all required fields');
      return;
    }
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: cart,
      total: getTotalPrice(),
      customer: customerDetails,
      paymentScreenshot
    };
    setOrderDetails(order);
    setShowReceipt(true);
    setShowCheckout(false);
    setCart([]);
  };

  const printReceipt = () => {
    window.print();
  };

  const startNewOrder = () => {
    setShowReceipt(false);
    setShowCart(false);
    setOrderDetails(null);
    setCustomerDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      paymentMethod: '',
      gcashNumber: '09123456789'
    });
    setPaymentScreenshot(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              style={{color: '#4C4B16'}}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold" style={{color: '#4C4B16'}}>Sweet Delights</h1>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative text-white p-3 rounded-full hover:opacity-80 transition-colors"
            style={{backgroundColor: '#4C4B16'}}
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#4C4B16'}}>Our Delicious Desserts</h2>
          <p className="text-xl" style={{color: '#4C4B16'}}>Satisfy your sweet tooth with our premium desserts</p>
        </div>

        {/* Dessert Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {desserts.map(dessert => (
            <div key={dessert.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => openDessertModal(dessert)}
              />
              <div className="p-4">
                <h3 
                  className="text-xl font-bold mb-3 cursor-pointer hover:opacity-80 transition-colors"
                  style={{color: '#4C4B16'}}
                  onClick={() => openDessertModal(dessert)}
                >
                  {dessert.name}
                </h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-2xl font-bold" style={{color: '#4C4B16'}}>₱{dessert.price}</span>
                  <button
                    onClick={() => addToCart(dessert)}
                    className="text-white px-4 py-2 rounded-lg hover:opacity-80 transition-colors flex items-center gap-2 text-sm"
                    style={{backgroundColor: '#4C4B16'}}
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && (
      <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center py-8" style={{color: '#4C4B16'}}>Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold" style={{color: '#4C4B16'}}>{item.name}</h3>
                        <p style={{color: '#4C4B16'}}>₱{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold" style={{color: '#4C4B16'}}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span style={{color: '#4C4B16'}}>Total: ₱{getTotalPrice()}</span>
                      <button
                        onClick={() => {
                          setShowCart(false);
                          setShowCheckout(true);
                        }}
                        className="text-white px-6 py-3 rounded-lg hover:opacity-80 transition-colors"
                        style={{backgroundColor: '#4C4B16'}}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dessert Detail Modal */}
      {showDessertModal && selectedDessert && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#4C4B16'}}>{selectedDessert.name}</h2>
                <button
                  onClick={closeDessertModal}
                  className="hover:opacity-70"
                  style={{color: '#4C4B16'}}
                >
                  <X size={24} />
                </button>
              </div>

              <img
                src={selectedDessert.image}
                alt={selectedDessert.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="space-y-6">
                <div>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#4C4B16'}}>{selectedDessert.description}</p>
                </div>

                {/* Ingredients Section */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Ingredients</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDessert.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#4C4B16'}}></span>
                        <span className="text-sm" style={{color: '#4C4B16'}}>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nutritional Information */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Nutritional Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Calories:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.nutritionalInfo.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Fat:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.nutritionalInfo.fat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Carbs:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.nutritionalInfo.carbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Protein:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.nutritionalInfo.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Sugar:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.nutritionalInfo.sugar}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Dessert Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Serving Size:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.servingSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Preparation Time:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.preparationTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium" style={{color: '#4C4B16'}}>Difficulty:</span>
                      <span style={{color: '#4C4B16'}}>{selectedDessert.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Allergens */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Allergen Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDessert.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm text-white"
                        style={{backgroundColor: '#4C4B16'}}
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-3xl font-bold" style={{color: '#4C4B16'}}>₱{selectedDessert.price}</span>
                  <button
                    onClick={() => {
                      addToCart(selectedDessert);
                      closeDessertModal();
                    }}
                    className="text-white px-8 py-3 rounded-lg hover:opacity-80 transition-colors flex items-center gap-2"
                    style={{backgroundColor: '#4C4B16'}}
                  >
                    <Plus size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Complete Address"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                />

                <input
                  type="text"
                  placeholder="ZIP Code"
                  required
                  className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={customerDetails.zipCode}
                  onChange={(e) => setCustomerDetails({...customerDetails, zipCode: e.target.value})}
                />

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4" style={{color: '#4C4B16'}}>Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gcash"
                        required
                        className="form-radio"
                        onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                      />
                      <Smartphone className="text-blue-600" size={20} />
                      <span style={{color: '#4C4B16'}}>GCash</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        required
                        className="form-radio"
                        onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                      />
                      <CreditCard className="text-green-600" size={20} />
                      <span style={{color: '#4C4B16'}}>Cash on Delivery</span>
                    </label>
                  </div>

                  {/* GCash Number Display */}
                  {customerDetails.paymentMethod === 'gcash' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2" style={{color: '#4C4B16'}}>Send Payment to:</h4>
                      <p className="text-xl font-bold" style={{color: '#4C4B16'}}>{customerDetails.gcashNumber}</p>
                      <p className="text-sm mt-1" style={{color: '#4C4B16'}}>Total Amount: ₱{getTotalPrice()}</p>
                    </div>
                  )}

                  {/* Optional Screenshot Upload */}
                  <div className="space-y-3">
                    <h4 className="font-semibold mb-3" style={{color: '#4C4B16'}}>Payment Screenshot (Optional)</h4>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Upload size={20} />
                        Upload Screenshot
                      </button>
                      {paymentScreenshot && (
                        <button
                          type="button"
                          onClick={removeScreenshot}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                    {paymentScreenshot && (
                      <img
                        src={paymentScreenshot}
                        alt="Payment Screenshot"
                        className="max-w-xs max-h-32 object-contain border rounded-lg"
                      />
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3" style={{color: '#4C4B16'}}>Order Summary</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between mb-2">
                      <span style={{color: '#4C4B16'}}>{item.name} x{item.quantity}</span>
                      <span style={{color: '#4C4B16'}}>₱{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span style={{color: '#4C4B16'}}>Total</span>
                      <span style={{color: '#4C4B16'}}>₱{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-80 transition-colors"
                  style={{backgroundColor: '#4C4B16'}}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && orderDetails && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6" id="receipt">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold" style={{color: '#4C4B16'}}>Sweet Delights</h2>
                <p style={{color: '#4C4B16'}}>Order Receipt</p>
              </div>

                <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold" style={{color: '#4C4B16'}}>Order ID:</span>
                  <span style={{color: '#4C4B16'}}>{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold" style={{color: '#4C4B16'}}>Date:</span>
                  <span style={{color: '#4C4B16'}}>{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold" style={{color: '#4C4B16'}}>Time:</span>
                  <span style={{color: '#4C4B16'}}>{orderDetails.time}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Customer Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold" style={{color: '#4C4B16'}}>Name:</span> <span style={{color: '#4C4B16'}}>{orderDetails.customer.name}</span></p>
                  <p><span className="font-semibold" style={{color: '#4C4B16'}}>Email:</span> <span style={{color: '#4C4B16'}}>{orderDetails.customer.email}</span></p>
                  <p><span className="font-semibold" style={{color: '#4C4B16'}}>Phone:</span> <span style={{color: '#4C4B16'}}>{orderDetails.customer.phone}</span></p>
                  <p><span className="font-semibold" style={{color: '#4C4B16'}}>Address:</span> <span style={{color: '#4C4B16'}}>{orderDetails.customer.address}, {orderDetails.customer.city}, {orderDetails.customer.zipCode}</span></p>
                  <p><span className="font-semibold" style={{color: '#4C4B16'}}>Payment Method:</span> <span style={{color: '#4C4B16'}}>{orderDetails.customer.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</span></p>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-bold text-lg mb-3" style={{color: '#4C4B16'}}>Order Items</h3>
                {orderDetails.items.map(item => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span style={{color: '#4C4B16'}}>{item.name} x{item.quantity}</span>
                    <span style={{color: '#4C4B16'}}>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span style={{color: '#4C4B16'}}>Total</span>
                    <span style={{color: '#4C4B16'}}>₱{orderDetails.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={printReceipt}
                  className="flex-1 text-white py-3 rounded-lg hover:opacity-80 transition-colors flex items-center justify-center gap-2"
                  style={{backgroundColor: '#4C4B16'}}
                >
                  <FileText size={20} />
                  Print Receipt
                </button>
                <button
                  onClick={startNewOrder}
                  className="flex-1 text-white py-3 rounded-lg hover:opacity-80 transition-colors"
                  style={{backgroundColor: '#4C4B16'}}
                >
                  New Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DessertOrderingSystem;