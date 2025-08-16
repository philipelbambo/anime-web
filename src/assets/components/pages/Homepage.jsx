import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
// Added FaImage for the Gallery icon and FaMoon for dark mode
import { FaHome, FaUtensils, FaEnvelope, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram, FaClock, FaBullhorn, FaImage, FaMoon } from 'react-icons/fa';

const CoffeeShopLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);

  const coffeeProducts = [
    { id: 1, name: 'Espresso', image: 'https://static.vecteezy.com/system/resources/thumbnails/047/312/174/small_2x/coffee-beans-and-grounds-png.png' },
    { id: 2, name: 'Cappuccino', image: 'https://www.pngall.com/wp-content/uploads/2016/03/Bread-PNG-7.png' },
    { id: 3, name: 'Latte', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Latte.png' },
    { id: 4, name: 'Americano', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Americano.png' },
    { id: 5, name: 'Mocha', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Mocha.png' },
    { id: 6, name: 'Macchiato', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Macchiato.png' },
    { id: 7, name: 'Flat White', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Flat+White.png' },
    { id: 8, name: 'Irish Coffee', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Irish+Coffee.png' },
    { id: 9, name: 'Iced Coffee', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Iced+Coffee.png' },
    { id: 10, name: 'Affogato', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Affogato.png' },
    { id: 11, name: 'Cold Brew', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Cold+Brew.png' },
    { id: 12, name: 'Turkish Coffee', image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Turkish+Coffee.png' }
  ];

  const desserts = [
    { id: 7, name: 'Croissant', price: 2.50, image: 'https://pngimg.com/d/croissant_PNG46653.png' },
    { id: 8, name: 'Muffin', price: 3.00, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Muffin.png' },
    { id: 9, name: 'Cheesecake', price: 4.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Cheesecake.png' },
    { id: 10, name: 'Crème brûlée', price: 5.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Creme-Brulee.png' },
    { id: 11, name: 'Brownie', price: 3.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Brownie.png' },
    { id: 12, name: 'Macaron', price: 2.75, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Macaron.png' },
    { id: 13, name: 'Tiramisu', price: 4.75, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Tiramisu.png' },
    { id: 14, name: 'Donut', price: 2.25, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Donut.png' }
  ];

  // Gallery images organized in 3 rows
  const galleryRows = [
    // Row 1 - moves left to right
    [
      "/SliderGallery/cup1.png",
      "/SliderGallery/cup2.png",
      "/SliderGallery/cup3.png",
      "/SliderGallery/cup4.png",
      "/SliderGallery/cup5.png",
      "/SliderGallery/cup6.png"
    ],
    // Row 2 - moves right to left
    [
      "/SliderGallery/cup7.png",
      "/SliderGallery/cup8.png",
      "/SliderGallery/cup9.png",
      "/SliderGallery/cup10.png",
      "/SliderGallery/cup11.png",
      "/SliderGallery/cup12.png"
    ],
    // Row 3 - moves left to right
    [
      "/SliderGallery/cup13.png",
      "/SliderGallery/cup14.png",
      "/SliderGallery/cup15.png",
      "/SliderGallery/cup16.png",
      "/SliderGallery/cup17.png",
      "/SliderGallery/cup18.png"
    ],
    // Row 4 - moves right to left
    [
      "/SliderGallery/bread1.png",
      "/SliderGallery/bread2.png",
      "/SliderGallery/bread3.png",
      "/SliderGallery/bread4.png",
      "/SliderGallery/bread5.png",
      "/SliderGallery/bread6.png"
    ],
  ];

  // Generate coffee beans for falling animation
  const generateCoffeeBeans = () => {
    const beans = [];
    for (let i = 0; i < 25; i++) {
      beans.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
        size: 20 + Math.random() * 15,
      });
    }
    return beans;
  };

  const coffeeBeans = generateCoffeeBeans();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .slide-left {
          animation: slide-left 20s linear infinite;
        }
        
        .slide-right {
          animation: slide-right 20s linear infinite;
        }
        
        .coffee-bean {
          position: fixed;
          pointer-events: none;
          z-index: 1;
          animation: fall linear infinite;
        }
        
        .coffee-bean {
            position: relative;
            width: 40px;
            height: 20px;
            margin: 50px auto;
          }

          .coffee-bean::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(140deg, #6f3a00 0%, #4b2600 50%, #8B4513 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            box-shadow: 
              inset -6px 4px 10px rgba(0, 0, 0, 0.6),
              inset 2px -2px 5px rgba(255, 255, 255, 0.2),
              0 4px 8px rgba(0, 0, 0, 0.3);
            
            /* 3D effect via transform */
            transform: rotate(15deg) scale(1);
            transform-origin: center;
            transition: transform 0.3s ease;
          }

          /* Optional: Add a highlight for more depth */
          .coffee-bean::after {
            content: '';
            position: absolute;
            width: 25%;
            height: 40%;
            top: 30%;
            left: 25%;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            transform: rotate(-20deg);
            opacity: 0.8;
          }

          /* Background image styles - REMOVED OVERLAY */
          .main-background {
            background-image: url('/Gallery3/BackgroundLogin.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: calc(100vh - 80px); /* Adjust based on header height */
          }

          /* REMOVED THE OVERLAY - No ::before pseudo-element anymore */
      `}
      </style>

      {/* Falling Coffee Seeds Animation - only when coffee mode is active */}
      {coffeeMode && (
        <div className="fixed inset-0 pointer-events-none z-1">
          {coffeeBeans.map((bean) => (
            <div
              key={bean.id}
              className="coffee-bean"
              style={{
                left: `${bean.left}%`,
                animationDelay: `${bean.animationDelay}s`,
                animationDuration: `${bean.animationDuration}s`,
                fontSize: `${bean.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header - separate from background */}
      <header className={`relative border-b z-50 ${coffeeMode ? 'border-b-lime-950 bg-[#4C4B16]' : 'border-white bg-white'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 border rounded-lg transition-colors ${coffeeMode ? ' text-amber-50 hover:bg-amber-700 bg-[#4C4B16]' : 'bg-black text-white hover:bg-gray-500 border-black'}`}
            >
              <Menu size={24} />
            </button>
            {/* Logo and Brand Name on the right side */}
            <div className="flex items-center space-x-4 ml-auto">
              <h1 className={`text-2xl font-bold ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>Brew-Coffee</h1>
              <img
                src="/Gallery3/coffee.png"
                alt="Coffee Shop Logo"
                className="w-12 h-12"
              />
            </div>
            {/* Spacer */}
            <div className="w-12"></div>
          </div>
        </div>

        {/* Slide-out Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-blur bg-opacity-50">
            <div className={`absolute left-0 top-0 h-full w-50 shadow-lg ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">
                <img src="/Gallery3/coffee.png" alt="Logo" className="h-10 w-auto" />
              </h3>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className={`p-2 transition-colors ${coffeeMode ? 'hover:bg-amber-800 text-amber-50' : 'hover:bg-gray-100 text-black'}`}
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-6">
                    <li>
                      <a
                        href="#home"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-black hover:text-gray-800'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaHome className="mr-2" /> Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#menu"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-black hover:text-gray-800'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUtensils className="mr-2" /> Menu
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-black hover:text-gray-800'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaEnvelope className="mr-2" /> Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-black hover:text-gray-800'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaInfoCircle className="mr-2" /> About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#gallery"
                        className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-black hover:text-gray-800'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaImage className="mr-2" /> Gallery
                      </a>
                      {/* Coffee Mode toggle below Gallery */}
                      <div className="flex items-center space-x-2 mt-3 ml-2">
                        <FaMoon className={`text-lg ${coffeeMode ? 'text-amber-200' : 'text-gray-600'}`} />
                        <button
                          onClick={() => setCoffeeMode(!coffeeMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${coffeeMode ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with background */}
      <div className={`main-background relative ${coffeeMode ? 'coffee-mode' : ''}`}>
        <section id="home" className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center  md:text-left">
              <img
                src="/Gallery3/animecafe.png"
                alt="Coffee Logo"
                className="mx-auto md:mx-0 mb-0 w-70 h-70 object-contain"
              />
              <h2 className={`text-6xl font-bold leading-tight -mt-2 ${coffeeMode ? 'text-lime-950' : 'text-black'}`}>
                Take A Break<br />
                Have The Best Coffee
              </h2>
              <a href="/order">
                <button className={`rounded-lg px-8 py-4 text-lg transition-colors mt-6 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50 hover:bg-amber-600' : 'bg-black text-white hover:bg-gray-800'}`}>
                  ORDER NOW
                </button>
              </a>
            </div>
            <div className="flex justify-center relative">
              <div className="relative w-[600px] h-[600px] rounded-full">
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                  <div
                    className="absolute w-115 h-115"
                    style={{
                      top: '18%',
                      left: '18%',
                      transform: 'translateX(80px) translateY(-50%)',
                      transformOrigin: '-80px 50%',
                    }}
                  >
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/023/742/327/small_2x/latte-coffee-isolated-illustration-ai-generative-free-png.png"
                      alt="Coffee Cup"
                      className="w-full h-full object-contain animate-spin"
                      style={{
                        animationDuration: '8s',
                        animationDirection: 'reverse',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rest of content with original background */}
      <div className={`transition-colors duration-300 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'text-black bg-white'}`}>
        {/* Coffee Menu */}
        <section id="menu" className="container mx-auto px-4 py-16 relative z-10">
          <h3 className={`text-4xl font-bold text-center mb-12 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>Our Coffee</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {coffeeProducts.map(coffee => (
              <div
                key={coffee.id}
                className={`text-center border p-6 transition-colors group ${coffeeMode ? 'border-b-lime-950 hover:bg-amber-800 hover:text-amber-50 text-amber-50 bg-[#4C4B16]' : 'border-white hover:bg-gray-400 hover:text-black text-black bg-white'}`}
              >
                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h4 className="text-xl font-semibold">{coffee.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://png.pngtree.com/png-vector/20241015/ourmid/pngtree-latte-coffee-art-in-a-cup-png-image_14096762.png"
                alt="Coffee Shop Interior"
                className="w-135 h-135"
              />
            </div>
            <div>
              <h3 className={`text-4xl font-bold mb-6 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>About Us</h3>
              <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>
                Welcome to BrewMaster, where passion meets perfection in every cup. Since 2010, we've been dedicated to serving the finest coffee experience in the city.
              </p>
              <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>
                Our advantages include:
              </p>
              <ul className={`text-lg space-y-2 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>
                <li>• Premium quality beans sourced directly from farmers</li>
                <li>• Expert baristas with years of experience</li>
                <li>• Cozy atmosphere perfect for work or relaxation</li>
                <li>• Freshly roasted coffee daily</li>
                <li>• Sustainable and ethical sourcing practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Desserts */}
        <section className={`container mx-auto px-4 py-16 relative z-10 ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-white'}`}>
          <h3 className={`text-4xl font-bold text-center mb-12 ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>Sweet Treats</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {desserts.map(dessert => (
              <div key={dessert.id} className={`text-center border p-4 transition-colors group ${coffeeMode ? ' bg-[#4C4B16] hover:bg-lime-950 hover:text-amber-50 text-amber-50' : 'bg-white border-white hover:bg-gray-400 hover:text-white text-black'}`}>
                <img
                  src={dessert.image}
                  alt={dessert.name}
                  className="w-full h-42 object-contain mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">{dessert.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Our Gallery */}
        <section id="gallery" className="py-16 overflow-hidden relative z-10">
          <div className="container mx-auto px-4 mb-12">
            <h3 className={`text-4xl font-bold text-center ${coffeeMode ? 'text-amber-50' : 'text-black'}`}>Our Gallery</h3>
          </div>
          <div className="space-y-6">
            {galleryRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative w-full overflow-hidden">
                <div className={`flex space-x-6 ${rowIndex % 2 === 0 ? 'slide-left' : 'slide-right'}`}>
                  {[...row, ...row, ...row].map((imageUrl, imageIndex) => (
                    <div key={imageIndex} className="flex-shrink-0">
                      <div className={`w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-2 ${coffeeMode ? 'bg-[#4C4B16]' : 'bg-white'}`}>
                        <img
                          src={imageUrl}
                          alt={`Gallery ${rowIndex + 1}-${imageIndex + 1}`}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer - separate from background */}
      <footer id="contact" className={`py-12 relative z-10 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'bg-[#4B352A] text-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-6">
              <img
                src="/Gallery3/coffee.png"
                alt="Coffee Shop Logo"
                className="w-30 h-30"
              />
              <div className="ml-24">
                <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                  <FaClock />
                  <span>Opening Hours</span>
                </h4>
                <ul className={`space-y-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                  <li>
                    <p className="font-semibold">Monday - Friday:</p>
                    <p>7:00 AM - 9:00 PM</p>
                  </li>
                  <li>
                    <p className="font-semibold">Saturday:</p>
                    <p>8:00 AM - 10:00 PM</p>
                  </li>
                  <li>
                    <p className="font-semibold">Sunday:</p>
                    <p>8:00 AM - 6:00 PM</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <FaInfoCircle />
                <span>Contact Information</span>
              </h4>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>456 Maple Avenue</p>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Vancouver, BC V5K 0A1</p>
              <p className={`mb-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Phone: (604) 987-6543</p>
              <p className={`${coffeeMode ? 'text-amber-50' : 'text-white'}`}>Email: info@brewmaster.com</p>
            </div>
            <div className="ml-20">
              <h4 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <FaBullhorn />
                <span>Follow Us</span>
              </h4>
              <div className={`flex space-x-4 ${coffeeMode ? 'text-amber-50' : 'text-white'}`}>
                <a href="https://facebook.com" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                  <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className={`border-t mt-5 pt-5 text-center ${coffeeMode ? 'border-white text-amber-50' : 'border-white text-white'}`}>
            <p>&copy; 2025 Brew-Coffee Shop. Build by: PhilipElbambo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoffeeShopLanding;