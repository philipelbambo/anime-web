import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronLeft, ChevronRight, ShoppingCart, X, Plus, Minus } from 'lucide-react';

const AnimeHomepage = () => {
  // Slider state for each anime section
  const [sliderPositions, setSliderPositions] = useState({
    mushokuTensei: 0,
    jujutsuKaisen: 0,
    onePiece: 0,
    hunterXHunter: 0,
    naruto: 0,
    demonSlayer: 0
  });

  // Shopping cart state
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Product categories and sizes
  const productTypes = [
    { id: 'tshirt', name: 'T-Shirt', basePrice: 25 },
    { id: 'hoodie', name: 'Hoodie', basePrice: 45 },
    { id: 'pants', name: 'Pants', basePrice: 35 },
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Anime data
  const animeData = {
    mushokuTensei: {
      title: "Mushoku Tensei",
      images: [
        "./MushokuTenseiAlbum/shirt1.png",
        "./MushokuTenseiAlbum/shirt2.png",
        "./MushokuTenseiAlbum/shirt3.png",
        "./MushokuTenseiAlbum/shirt4.png",
        "./MushokuTenseiAlbum/shirt5.png",
        "./MushokuTenseiAlbum/hoodie1.png",
        "./MushokuTenseiAlbum/hoodie2.png",
        "./MushokuTenseiAlbum/hoodie3.png",
        "./MushokuTenseiAlbum/pants1.png",
        "./MushokuTenseiAlbum/pants2.png"
      ],
      largeImage: "./MushokuTenseiAlbum/profile.png"
    },
    jujutsuKaisen: {
      title: "Jujutsu Kaisen",
      images: [
        "./JujutsuKaisenAlbum/shirt1.png",
        "./JujutsuKaisenAlbum/shirt2.png",
        "./JujutsuKaisenAlbum/shirt3.png",
        "./JujutsuKaisenAlbum/shirt4.png",
        "./JujutsuKaisenAlbum/hoodie1.png",
        "./JujutsuKaisenAlbum/hoodie2.png",
        "./JujutsuKaisenAlbum/hoodie3.png",
        "./JujutsuKaisenAlbum/hoodie4.png",
        "./JujutsuKaisenAlbum/pants1.png",
        "./JujutsuKaisenAlbum/pants2.png"
      ],
      largeImage: "public/jujutsuKaisenAlbum/gojosukuna.png"
    },
    onePiece: {
      title: "One Piece",
      images: [
        "./OnePieceAlbum/shirt1.png",
        "./OnePieceAlbum/shirt2.png",
        "./OnePieceAlbum/shirt3.png",
        "./OnePieceAlbum/shirt4.png",
        "./OnePieceAlbum/hoodie1.png",
        "./OnePieceAlbum/hoodie2.png",
        "./OnePieceAlbum/hoodie3.png",
        "./OnePieceAlbum/hoodie4.png",
        "./OnePieceAlbum/pants1.png",
        "./OnePieceAlbum/pants2.png"
      ],
      largeImage: "./OnePieceAlbum/profile.png"
    },
    hunterXHunter: {
      title: "Hunter x Hunter",
      images: [
        "./HunterAlbum/shirt1.png",
        "./HunterAlbum/shirt2.png",
        "./HunterAlbum/shirt3.png",
        "./HunterAlbum/shirt4.png",
        "./HunterAlbum/hoodie1.png",
        "./HunterAlbum/hoodie2.png",
        "./HunterAlbum/hoodie3.png",
        "./HunterAlbum/hoodie4.png",
        "./HunterAlbum/pants1.png",
        "./HunterAlbum/pants2.png"
      ],
      largeImage: "./HunterAlbum/hunter2.png"
    },
    naruto: {
      title: "Naruto",
      images: [
        "./NarutoAlbum/shirt1.png",
        "./NarutoAlbum/shirt2.png",
        "./NarutoAlbum/shirt3.png",
        "./NarutoAlbum/shirt4.png",
        "./NarutoAlbum/hoodie1.png",
        "./NarutoAlbum/hoodie2.png",
        "./NarutoAlbum/hoodie3.png",
        "./NarutoAlbum/hoodie4.png",
        "./NarutoAlbum/pants1.png",
        "./NarutoAlbum/pants2.png",
      ],
      largeImage: "./NarutoAlbum/profile.png"
    },
    demonSlayer: {
      title: "Demon Slayer",
      images: [
        "./DemonSlayerAlbum/shirt1.png",
        "./DemonSlayerAlbum/shirt2.png",
        "./DemonSlayerAlbum/shirt3.png",
        "./DemonSlayerAlbum/shirt4.png",
        "./DemonSlayerAlbum/hoodie1.png",
        "./DemonSlayerAlbum/hoodie2.png",
        "./DemonSlayerAlbum/hoodie3.png",
        "./DemonSlayerAlbum/hoodie4.png",
        "./DemonSlayerAlbum/pants1.png",
        "./DemonSlayerAlbum/pants2.png",
      ],
      largeImage: "./DemonSlayerAlbum/profile.png"
    }
  };

  const slideLeft = (anime) => {
    setSliderPositions(prev => ({
      ...prev,
      [anime]: Math.max(0, prev[anime] - 1)
    }));
  };

  const slideRight = (anime) => {
    const maxPosition = animeData[anime].images.length - 3; // Now 3 visible instead of 4
    setSliderPositions(prev => ({
      ...prev,
      [anime]: Math.min(maxPosition, prev[anime] + 1)
    }));
  };

  const handleProductClick = (image, animeTitle, characterName) => {
    setSelectedProduct({
      image,
      animeTitle,
      characterName,
      selectedType: productTypes[0],
      selectedSize: 'M',
      quantity: 1
    });
  };

  const addToCart = () => {
    if (selectedProduct) {
      const cartItem = {
        id: Date.now(),
        ...selectedProduct,
        totalPrice: selectedProduct.selectedType.basePrice * selectedProduct.quantity
      };
      setCart(prev => [...prev, cartItem]);
      setSelectedProduct(null);
      toast.success("✅ Item added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored"
      });
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, totalPrice: item.selectedType.basePrice * newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const neumorphismStyle = {
    background: '#e0e0e0',
    boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
  };

  const neumorphismInsetStyle = {
    background: '#e0e0e0',
    boxShadow: 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
  };

  // Header and sidebar styles
  const headerStyle = {
    ...neumorphismStyle,
    height: '80px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backdropFilter: 'blur(10px)'
  };

  const sidebarStyle = {
    ...neumorphismStyle,
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: isMenuOpen ? '0' : '-250px',
    zIndex: 1000,
    transition: 'left 0.3s ease-in-out',
    paddingTop: '80px'
  };

  const sidebarLinkStyle = {
    display: 'block',
    padding: '16px 24px',
    color: '#222',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    borderBottom: '1px solid #ccc'
  };

  // Anime Slider Component
  const AnimeSlider = ({ animeKey, data, isLeft }) => (
    <div className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-20`}>
      {/* Slider - Half screen */}
      <div className="w-1/2">
        <div className="relative p-6 rounded-3xl" style={neumorphismStyle}>
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">{data.title}</h2>
          <button
            onClick={() => slideLeft(animeKey)}
            disabled={sliderPositions[animeKey] === 0}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 p-3 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={sliderPositions[animeKey] === 0 ? neumorphismInsetStyle : neumorphismStyle}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${sliderPositions[animeKey] * (100 / 3)}%)`
              }}
            >
              {data.images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-1/3">
                  <div
                    className="p-4 rounded-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                    style={neumorphismStyle}
                    onClick={() => handleProductClick(image, data.title, `Character ${index + 1}`)}
                  >
                    <div className="rounded-xl p-2 transition-all duration-300" style={neumorphismInsetStyle}>
                      <img
                        src={image}
                        alt={`Character ${index + 1}`}
                        className="w-full h-80 object-cover rounded-lg transition-all duration-300 group-hover:brightness-110"
                      />
                    </div>
                    <p className="text-center mt-2 text-gray-600 font-medium">Click to Shop</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => slideRight(animeKey)}
            disabled={sliderPositions[animeKey] >= animeData[animeKey].images.length - 3}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 p-3 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
            style={sliderPositions[animeKey] >= animeData[animeKey].images.length - 3 ? neumorphismInsetStyle : neumorphismStyle}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Large Image - Half screen */}
      <div className="w-1/2">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={data.largeImage}
            alt={`${data.title} Collection`}
            className="w-full h-[500px] object-cover rounded-3xl transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );

  // Email submission handler
  const handleEmailSubmit = () => {
    if (email) {
      toast.info(`✅ Thank you! ${email} has been subscribed.`, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored"
      });
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#e0e0e0' }}>
      {/* 3D Spinning Logo Animation */}
      <style jsx>{`
        .spinning-logo {
          animation: spinY 10s linear infinite;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          display: block;
          filter: drop-shadow(0 4px 15px rgba(0, 100, 255, 0.25)) brightness(1.1);
          transform-origin: center;
        }
        @keyframes spinY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .spinning-logo:hover {
          animation-play-state: paused;
          transform: rotateY(360deg);
          filter: drop-shadow(0 6px 20px rgba(0, 120, 255, 0.4)) brightness(1.3);
        }
      `}</style>

      {/* Header */}
      <header style={headerStyle}>
        <div className="flex items-center justify-between h-full px-6">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-3 rounded-full transition-all hover:scale-110"
            style={neumorphismStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-grow flex justify-center items-center">
            <img
              src="./Gallery2/luffy.png"
              alt="Anime World Logo"
              className="h-12 object-contain spinning-logo"
            />
          </div>
          <div className="w-[48px]"></div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <div style={sidebarStyle}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full"
          style={neumorphismStyle}
        >
          <X size={20} />
        </button>
        <nav>
          <a href="#home" style={sidebarLinkStyle} onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" style={sidebarLinkStyle} onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" style={sidebarLinkStyle} onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="#gallery" style={sidebarLinkStyle} onClick={() => setIsMenuOpen(false)}>Gallery</a>
        </nav>
      </div>

      {/* Fixed Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed top-4 right-4 z-50 p-4 rounded-full text-gray-700 transition-all duration-300 hover:scale-110"
        style={neumorphismStyle}
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cart.length}
          </span>
        )}
      </button>

      {/* Hero Section */}
      <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-8 pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-xl animate-pulse opacity-50" style={neumorphismStyle}></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-xl animate-pulse delay-1000 opacity-50" style={neumorphismStyle}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-xl animate-pulse delay-500 opacity-50" style={neumorphismStyle}></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-8 transition-all duration-500">
            <img
              src="./Gallery1/background3.jpg"
              alt="Anime World"
              className="w-[1400px] h-[600px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute top-1/2 left-20 transform -translate-y-1/2">
              <img
                src="./Gallery1/luffyhat2.png"
                alt="Profile"
                className="w-96 h-96 object-cover rounded-full shadow-xl transition-all duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Anime Sliders Section */}
      <div id="gallery" className="relative py-20 px-8">
        <div className="relative z-10 space-y-20">
          {Object.entries(animeData).map(([key, data], index) => (
            <AnimeSlider key={key} animeKey={key} data={data} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="w-full py-16" style={{ background: '#e0e0e0' }}>
        <div className="max-w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-6 p-12 rounded-lg h-80 flex flex-col" style={neumorphismStyle}>
              <h3 className="text-xl font-bold mb-4 text-black">Get in Touch</h3>
              <p className="text-black leading-relaxed flex-grow">
                Enjoy exclusive perks and stay in the loop on our latest delights! Join in our community to receive updates about new menu items, special events, and exclusive offers available only to our subscribers.
              </p>
              <div className="flex items-center space-x-2 mt-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-200 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-r-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-6 p-12 rounded-lg h-80 flex flex-col" style={neumorphismStyle}>
              <h3 className="text-xl font-bold mb-4 text-black">Quick Links</h3>
              <div className="space-y-4 flex-grow">
                <a href="#home" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Home</a>
                <a href="#about" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">About</a>
                <a href="#contact" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Contact</a>
                <a href="#gallery" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Gallery</a>
              </div>
            </div>
            <div className="space-y-6 p-12 rounded-lg h-80 flex flex-col" style={neumorphismStyle}>
              <h3 className="text-xl font-bold mb-4 text-black">Policy Pages</h3>
              <div className="space-y-4 flex-grow">
                <a href="/privacy-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Privacy Policy</a>
                <a href="/refund-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Refund Policy</a>
                <a href="/shipping-policy" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Shipping Policy</a>
                <a href="/terms-of-service" className="block text-black hover:text-yellow-600 transition-colors duration-300 text-lg">Terms of Service</a>
              </div>
            </div>
            <div className="space-y-6 p-12 rounded-lg h-80 flex flex-col" style={neumorphismStyle}>
              <h3 className="text-xl font-bold mb-4 text-black">About Us</h3>
              <p className="text-black leading-relaxed flex-grow">
                Experience the world of One Piece like never before at our themed cafe.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-500 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.689-.069 4.948-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              <div className="mt-auto">
                <img src="./Gallery2/luffy.png" alt="One Piece Cafe Logo" className="h-16 w-auto" />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 text-center p-12 rounded-lg" style={neumorphismStyle}>
            <p className="text-black">© 1999 One Piece Cafe. All rights reserved. Shakabra 🤙</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full p-8 rounded-3xl max-h-[90vh] overflow-y-auto" style={neumorphismStyle}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Product Details</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-full text-gray-600 hover:scale-110 transition-all"
                style={neumorphismStyle}
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.characterName}
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">{selectedProduct.characterName}</h3>
                  <p className="text-gray-600">{selectedProduct.animeTitle} Collection</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Product Type</label>
                  <select
                    value={selectedProduct.selectedType.id}
                    onChange={(e) => {
                      const type = productTypes.find(t => t.id === e.target.value);
                      setSelectedProduct(prev => ({ ...prev, selectedType: type }));
                    }}
                    className="w-full p-3 rounded-xl border-none text-gray-700"
                    style={neumorphismInsetStyle}
                  >
                    {productTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name} - ₱{type.basePrice}
                      </option>
                    ))}
                  </select>
                </div>
                {['tshirt', 'hoodie', 'pants'].includes(selectedProduct.selectedType.id) && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Size</label>
                    <select
                      value={selectedProduct.selectedSize}
                      onChange={(e) => setSelectedProduct(prev => ({ ...prev, selectedSize: e.target.value }))}
                      className="w-full p-3 rounded-xl border-none text-gray-700"
                      style={neumorphismInsetStyle}
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedProduct(prev => ({
                        ...prev,
                        quantity: Math.max(1, prev.quantity - 1)
                      }))}
                      className="p-2 rounded-xl text-gray-600"
                      style={neumorphismStyle}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-semibold text-gray-700 min-w-[2rem] text-center">
                      {selectedProduct.quantity}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(prev => ({
                        ...prev,
                        quantity: prev.quantity + 1
                      }))}
                      className="p-2 rounded-xl text-gray-600"
                      style={neumorphismStyle}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-300">
                  <p className="text-2xl font-bold text-gray-700">
                    Total: ₱{selectedProduct.selectedType.basePrice * selectedProduct.quantity}
                  </p>
                </div>
                <button
                  onClick={addToCart}
                  className="w-full py-4 rounded-xl text-gray-700 font-semibold text-lg transition-all hover:scale-105"
                  style={neumorphismStyle}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full p-8 rounded-3xl max-h-[90vh] overflow-y-auto" style={neumorphismStyle}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Shopping Cart ({cart.length})</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full text-gray-600 hover:scale-110 transition-all"
                style={neumorphismStyle}
              >
                <X size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-center text-gray-600 py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl" style={neumorphismInsetStyle}>
                      <img
                        src={item.image}
                        alt={item.characterName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700">{item.characterName}</h4>
                        <p className="text-gray-600">{item.animeTitle}</p>
                        <p className="text-gray-600">{item.selectedType.name} {item.selectedSize && `- ${item.selectedSize}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg text-gray-600"
                          style={neumorphismStyle}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg text-gray-600"
                          style={neumorphismStyle}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-semibold text-gray-700 min-w-[4rem] text-right">₱{item.totalPrice}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg text-red-500 hover:scale-110 transition-all"
                        style={neumorphismStyle}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-700">Total: ₱{getTotalPrice()}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (cart.length === 0) {
                        toast.warn("🛒 Your cart is empty!", {
                          position: "bottom-right",
                          autoClose: 3000,
                          theme: "colored"
                        });
                        return;
                      }
                      toast.success(`✅ Ready to checkout!\nTotal: ₱${getTotalPrice()}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        bodyClassName: "whitespace-pre-line font-medium",
                        theme: "colored"
                      });
                      console.log("Checkout initiated with:", cart);
                      // Optional: redirect to checkout page
                      // window.location.href = "/checkout";
                    }}
                    className="w-full py-4 rounded-xl text-gray-700 font-semibold text-lg transition-all hover:scale-105"
                    style={neumorphismStyle}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AnimeHomepage;