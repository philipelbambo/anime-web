import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Coffee,
  CreditCard,
  Smartphone,
  Truck,
  Upload,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

const BrewCoffeeOrderSystem = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedDesserts, setSelectedDesserts] = useState({});

  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    shippingAddress: '',
    region: '',
    paymentMethod: '',
    paymentScreenshot: null,
  });

  // Coffee products
  const coffeeProducts = [
    {
      id: 1,
      name: 'Espresso',
      price: 195.0,
      fullDescription:
        'A concentrated coffee beverage brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans. Our espresso is made from premium Arabica beans, delivering an intense flavor with a thick, golden crema on top. Perfect for coffee purists who appreciate the authentic taste of coffee.',
      image: '/SliderGallery/cup1.png',
      category: 'Hot',
      ingredients: ['Premium Arabica Beans', 'Hot Water'],
      caffeine: 'High',
      size: '2 oz',
    },
    {
      id: 2,
      name: 'Americano',
      price: 220.0,
      fullDescription:
        'A simple yet elegant coffee drink made by diluting espresso with hot water. This creates a drink similar in strength to drip coffee but with a distinctly different flavor profile. Our Americano maintains the rich flavor of espresso while providing a smoother, less intense drinking experience.',
      image: '/SliderGallery/cup2.png',
      category: 'Hot',
      ingredients: ['Espresso', 'Hot Water'],
      caffeine: 'High',
      size: '8 oz',
    },
    {
      id: 3,
      name: 'Cappuccino',
      price: 250.0,
      fullDescription:
        'A perfect balance of rich espresso, steamed milk, and velvety microfoam. Our cappuccino is crafted with equal parts espresso, steamed milk, and milk foam, creating a harmonious blend that\'s both creamy and bold. Traditionally served in a 6oz cup for the perfect coffee-to-milk ratio.',
      image: '/SliderGallery/cup3.png',
      category: 'Hot',
      ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
      caffeine: 'Medium',
      size: '6 oz',
    },
    {
      id: 4,
      name: 'Latte',
      price: 280.0,
      fullDescription:
        'A creamy and mild coffee drink made with espresso and steamed milk, topped with a thin layer of milk foam. Our latte is perfect for those who enjoy coffee with a smooth, creamy texture. The milk\'s sweetness balances the espresso\'s intensity, creating a comforting and satisfying beverage.',
      image: '/SliderGallery/cup4.png',
      category: 'Hot',
      ingredients: ['Espresso', 'Steamed Milk', 'Light Foam'],
      caffeine: 'Medium',
      size: '12 oz',
    },
    {
      id: 5,
      name: 'Mocha',
      price: 310.0,
      fullDescription:
        'The perfect marriage of coffee and chocolate. Our mocha combines rich espresso with premium chocolate syrup and steamed milk, topped with whipped cream. It\'s like drinking a liquid chocolate bar with the perfect coffee kick. Ideal for those who want to indulge their sweet tooth.',
      image: '/SliderGallery/cup5.png',
      category: 'Hot',
      ingredients: ['Espresso', 'Chocolate Syrup', 'Steamed Milk', 'Whipped Cream'],
      caffeine: 'Medium',
      size: '12 oz',
    },
    {
      id: 6,
      name: 'Cold Brew',
      price: 240.0,
      fullDescription:
        'Coffee brewed with cold water over 12-24 hours, resulting in a smooth, less acidic beverage with a naturally sweet flavor. Our cold brew is made from coarsely ground coffee beans steeped in cold water, creating a concentrate that\'s diluted to perfection. Refreshing and energizing.',
      image: '/SliderGallery/cup6.png',
      category: 'Cold',
      ingredients: ['Cold Brew Concentrate', 'Water', 'Ice'],
      caffeine: 'High',
      size: '16 oz',
    },
    {
      id: 7,
      name: 'Iced Latte',
      price: 295.0,
      fullDescription:
        'A refreshing take on the classic latte, served over ice. Our iced latte combines rich espresso with cold milk and ice, creating a smooth and creamy beverage perfect for warm days. The cold temperature brings out different flavor notes in the coffee while maintaining that creamy texture you love.',
      image: '/SliderGallery/cup7.png',
      category: 'Cold',
      ingredients: ['Espresso', 'Cold Milk', 'Ice'],
      caffeine: 'Medium',
      size: '16 oz',
    },
    {
      id: 8,
      name: 'Frappé',
      price: 335.0,
      fullDescription:
        'A decadent blended coffee drink that\'s part beverage, part dessert. Our frappé combines espresso with milk, ice, and sugar, blended to a smooth, frothy consistency and topped with whipped cream. It\'s the ultimate indulgent coffee treat that\'s both refreshing and satisfying.',
      image: '/SliderGallery/cup8.png',
      category: 'Cold',
      ingredients: ['Espresso', 'Milk', 'Ice', 'Sugar', 'Whipped Cream'],
      caffeine: 'Medium',
      size: '16 oz',
    },
  ];

  // Desserts
  const desserts = [
    {
      id: 'dessert1',
      name: 'Chocolate Cake',
      price: 150.0,
      image: '/SliderGallery/bread1.png',
    },
    {
      id: 'dessert2',
      name: 'Croissant',
      price: 95.0,
      image: '/SliderGallery/bread2.png',
    },
    {
      id: 'dessert3',
      name: 'Cookie',
      price: 60.0,
      image: '/SliderGallery/bread3.png',
    },
  ];

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay via GCash mobile wallet',
      number: '+63 917 123 4567',
      accountName: 'Brew Coffee Shop',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Truck className="w-5 h-5" />,
      description: 'Pay when your order arrives',
    },
  ];

  const regions = [
    'Metro Manila',
    'Calabarzon',
    'Central Luzon',
    'Western Visayas',
    'Central Visayas',
    'Northern Mindanao',
    'Davao Region',
    'Soccsksargen',
    'Ilocos Region',
    'Cagayan Valley',
    'Bicol Region',
    'Eastern Visayas',
    'Zamboanga Peninsula',
    'Caraga',
    'Mimaropa',
    'Cordillera Administrative Region',
    'Bangsamoro Autonomous Region',
  ];

  // Add coffee + desserts to cart
  const addToCart = (coffee) => {
    const cartItem = {
      ...coffee,
      id: `${coffee.id}-${Date.now()}`, // unique ID for cart item
      quantity: 1,
      desserts: Object.keys(selectedDesserts).map((dessertId) => {
        const dessert = desserts.find((d) => d.id === dessertId);
        const qty = selectedDesserts[dessertId];
        return { ...dessert, quantity: qty };
      }),
    };
    setCart((prev) => [...prev, cartItem]);
    setSelectedDesserts({});
    setIsAddingToCart(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const updateDessertQuantity = (cartItemId, dessertId, newQty) => {
    if (newQty <= 0) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id !== cartItemId) return item;
          return {
            ...item,
            desserts: item.desserts.filter((d) => d.id !== dessertId),
          };
        })
      );
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id !== cartItemId) return item;
          return {
            ...item,
            desserts: item.desserts.map((d) =>
              d.id === dessertId ? { ...d, quantity: newQty } : d
            ),
          };
        })
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const coffeeTotal = item.price * item.quantity;
      const dessertTotal = item.desserts?.reduce(
        (sum, d) => sum + d.price * d.quantity,
        0
      ) || 0;
      return total + coffeeTotal + dessertTotal;
    }, 0).toFixed(2);
  };

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => {
      const dessertCount = item.desserts?.reduce((sum, d) => sum + d.quantity, 0) || 0;
      return total + item.quantity + dessertCount;
    }, 0);
  };

  const handleFormChange = (field, value) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCheckoutForm((prev) => ({ ...prev, paymentScreenshot: file }));
    }
  };

  const validateForm = () => {
    const required = [
      'firstName',
      'lastName',
      'email',
      'contactNumber',
      'shippingAddress',
      'region',
      'paymentMethod',
    ];
    return required.every((field) => checkoutForm[field].trim() !== '');
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(
      `Order placed successfully! \n\nOrder Details:\n- Total: ${formatPrice(
        getTotalPrice()
      )}\n- Items: ${getTotalItems()}\n- Payment Method: ${
        paymentMethods.find((p) => p.id === checkoutForm.paymentMethod)?.name
      }\n- Customer: ${checkoutForm.firstName} ${checkoutForm.lastName}\n\nThank you for your order!`
    );

    setCart([]);
    setCheckoutForm({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      shippingAddress: '',
      region: '',
      paymentMethod: '',
      paymentScreenshot: null,
    });
    setIsCheckoutOpen(false);
  };

  const CoffeeImage = ({ coffee }) => (
    <div className="w-full h-60 mb-4 rounded-xl overflow-hidden">
      {coffee.image ? (
        <img
          src={coffee.image}
          alt={coffee.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-gray-300">
          <div className="text-center text-gray-500">
            <Coffee className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Add your PNG image</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#4C4B16]">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-[#4C4B16]" />
          </button>

          <div className="flex items-center space-x-3">
            <Coffee className="w-8 h-8 text-[#4C4B16]" />
            <h1 className="text-3xl font-bold text-[#4C4B16]">Brew Coffee</h1>
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#4C4B16] hover:bg-[#3a3912] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({getTotalItems()})</span>
              {getTotalItems() > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold animate-pulse">
                  {getTotalItems()}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-bold mb-4">Premium Coffee Experience</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Handcrafted beverages made with the finest beans from around the world
        </p>
      </section>

      {/* Coffee Grid */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {coffeeProducts.map((coffee) => (
            <div
              key={coffee.id}
              className=" p-6  transform transition-all duration-300 hover:scale-105 cursor-pointer "
              onClick={() => setSelectedCoffee(coffee)}
            >
              <CoffeeImage coffee={coffee} />
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-0">{coffee.name}</h3>
                <p className="text-gray-600 mb-1 text-sm">{coffee.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#4C4B16]">{formatPrice(coffee.price)}</span>
                  <span className="bg-[#4C4B16] text-white px-3 py-1 rounded-full text-sm">
                    {coffee.category}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAddingToCart(coffee);
                  }}
                  className="w-full mt-3 bg-[#4C4B16] hover:bg-[#3a3912] text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coffee Details Modal */}
      {selectedCoffee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="relative">
            <div className="h-64 flex items-center justify-center">
              {selectedCoffee.image ? (
                <img
                  src={selectedCoffee.image}
                  alt={selectedCoffee.name}
                  className="w-60 h-60 object-cover rounded-lg "
                />
              ) : (
                <div className="w-60 h-60 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg">
                  <Coffee className="w-24 h-24 text-gray-500" />
                </div>
              )}
            </div>
              <button
                onClick={() => setSelectedCoffee(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-[#4C4B16] text-white px-4 py-2 rounded-full font-semibold">
                  {selectedCoffee.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCoffee.name}</h2>
                  <p className="text-lg text-gray-600">{selectedCoffee.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#4C4B16]">{formatPrice(selectedCoffee.price)}</span>
                  <p className="text-sm text-gray-500">{selectedCoffee.size}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCoffee.fullDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Coffee className="w-5 h-5 mr-2 text-[#4C4B16]" />
                    Ingredients
                  </h4>
                  <ul className="space-y-1">
                    {selectedCoffee.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Coffee Info</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Caffeine Level:</span>
                      <span className="font-medium">{selectedCoffee.caffeine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Serving Size:</span>
                      <span className="font-medium">{selectedCoffee.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedCoffee.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Modal (Coffee + Desserts) */}
      {isAddingToCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Add Desserts</h3>
            <p className="text-gray-600 mb-6">Would you like to add desserts to your {isAddingToCart.name}?</p>

            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {desserts.map((dessert) => (
                <div key={dessert.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={dessert.image} alt={dessert.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="font-medium">{dessert.name}</p>
                      <p className="text-sm text-gray-500">{formatPrice(dessert.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setSelectedDesserts((prev) => ({
                          ...prev,
                          [dessert.id]: Math.max(0, (prev[dessert.id] || 0) - 1),
                        }))
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded w-8 text-center"
                    >
                      <Minus className="w-4 h-4 mx-auto" />
                    </button>
                    <span className="w-8 text-center font-semibold">{selectedDesserts[dessert.id] || 0}</span>
                    <button
                      onClick={() =>
                        setSelectedDesserts((prev) => ({
                          ...prev,
                          [dessert.id]: (prev[dessert.id] || 0) + 1,
                        }))
                      }
                      className="bg-[#4C4B16] hover:bg-[#3a3912] text-white p-1 rounded w-8 text-center"
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsAddingToCart(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#4C4B16] py-3 rounded-lg font-semibold"
              >
                Skip
              </button>
              <button
                onClick={() => addToCart(isAddingToCart)}
                className="flex-1 bg-[#4C4B16] hover:bg-[#3a3912] text-white py-3 rounded-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="bg-[#4C4B16] text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6" />
                <span>Your Cart</span>
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-[#4C4B16] font-bold">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-[#4C4B16] hover:bg-[#3a3912] text-white p-2 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desserts */}
                      {item.desserts && item.desserts.length > 0 && (
                        <div className="ml-20 mt-3 space-y-2 border-t pt-3">
                          <p className="text-sm font-semibold text-gray-700">With Desserts:</p>
                          {item.desserts.map((d) => (
                            <div key={d.id} className="flex justify-between items-center text-sm">
                              <span>
                                {d.name} x{d.quantity}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateDessertQuantity(item.id, d.id, d.quantity - 1)}
                                  className="bg-gray-200 hover:bg-gray-300 p-1 rounded w-6"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-medium">{formatPrice(d.price * d.quantity)}</span>
                                <button
                                  onClick={() => updateDessertQuantity(item.id, d.id, d.quantity + 1)}
                                  className="bg-[#4C4B16] hover:bg-[#3a3912] text-white p-1 rounded w-6"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: {formatPrice(getTotalPrice())}</span>
                  <span className="text-gray-600">({getTotalItems()} items)</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-[#4C4B16] hover:bg-[#3a3912] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-[#4C4B16] text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
                <CheckCircle className="w-7 h-7" />
                <span>Complete Your Order</span>
              </h2>
            </div>

            <div className="p-6 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        value={checkoutForm.firstName}
                        onChange={(e) => handleFormChange('firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={checkoutForm.lastName}
                        onChange={(e) => handleFormChange('lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={checkoutForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      value={checkoutForm.contactNumber}
                      onChange={(e) => handleFormChange('contactNumber', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                    <textarea
                      value={checkoutForm.shippingAddress}
                      onChange={(e) => handleFormChange('shippingAddress', e.target.value)}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                      placeholder="Enter complete shipping address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Region *</label>
                    <select
                      value={checkoutForm.region}
                      onChange={(e) => handleFormChange('region', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#4C4B16] focus:outline-none focus:ring-2 focus:ring-[#4C4B16]/20"
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Payment & Summary */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Payment Method *</h3>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-[#4C4B16] transition-colors"
                      >
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={checkoutForm.paymentMethod === method.id}
                            onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                            className="mt-1 text-[#4C4B16] focus:ring-[#4C4B16]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {method.icon}
                              <span className="font-medium">{method.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                            {method.id === 'gcash' && checkoutForm.paymentMethod === 'gcash' && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-medium text-blue-900 mb-2">GCash Payment Details:</h4>
                                <div className="text-sm text-blue-800">
                                  <p><strong>GCash Number:</strong> {method.number}</p>
                                  <p><strong>Account Name:</strong> {method.accountName}</p>
                                  <p className="mt-2 text-blue-700">Please send your payment and upload a screenshot below (optional).</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {checkoutForm.paymentMethod === 'gcash' && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">
                        Payment Screenshot{' '}
                        <span className="text-gray-500">(Optional)</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#4C4B16] transition-colors">
                        <input
                          type="file"
                          id="paymentScreenshot"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="paymentScreenshot" className="cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-600 mb-2">
                            {checkoutForm.paymentScreenshot
                              ? checkoutForm.paymentScreenshot.name
                              : 'Click to upload payment screenshot'}
                          </p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="border-b pb-2">
                          <div className="flex justify-between font-medium">
                            <span>{item.name} x{item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                          {item.desserts?.map((d) => (
                            <div key={d.id} className="text-sm text-gray-600 ml-4">
                              {d.name} x{d.quantity} = {formatPrice(d.price * d.quantity)}
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-2xl font-bold text-[#4C4B16]">{formatPrice(getTotalPrice())}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">({getTotalItems()} items)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-[#4C4B16] py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={!validateForm()}
                  className={`flex-2 py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    validateForm()
                      ? 'bg-[#4C4B16] hover:bg-[#3a3912] text-white transform hover:scale-105 shadow'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Place Order - {formatPrice(getTotalPrice())}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrewCoffeeOrderSystem;