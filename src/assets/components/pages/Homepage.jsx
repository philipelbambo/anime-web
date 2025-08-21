import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
// Added FaImage for the Gallery icon and FaMoon for dark mode
import { FaHome, FaUtensils, FaEnvelope, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram, FaClock, FaBullhorn, FaImage, FaMoon } from 'react-icons/fa';
import { motion } from "framer-motion";

const CoffeeShopLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);

  const coffeeProducts = [
    { 
      id: 1, 
      name: 'Espresso', 
      image: '/OurCoffee/coffee1.png',
      description: 'A strong, concentrated coffee shot made by forcing hot water through finely-ground beans.'
    },
    { 
      id: 2, 
      name: 'Cappuccino', 
      image: '/OurCoffee/coffee2.png',
      description: 'Espresso topped with equal parts steamed milk and milk foam, rich and balanced.'
    },
    { 
      id: 3, 
      name: 'Latte', 
      image: '/OurCoffee/coffee3.png',
      description: 'Espresso with lots of steamed milk and a thin layer of foam, smooth and creamy.'
    },
    { 
      id: 4, 
      name: 'Americano', 
      image: '/OurCoffee/coffee4.png',
      description: 'Espresso diluted with hot water, giving it a lighter taste similar to drip coffee.'
    },
    { 
      id: 5, 
      name: 'Mocha', 
      image: '/OurCoffee/coffee5.png',
      description: 'A sweet mix of espresso, steamed milk, and chocolate, often topped with whipped cream.'
    },
    { 
      id: 6, 
      name: 'Macchiato', 
      image: '/OurCoffee/coffee6.png',
      description: 'Espresso "stained" with a small amount of milk or milk foam for a bold flavor.'
    },
    { 
      id: 7, 
      name: 'Flat White', 
      image: '/OurCoffee/coffee7.png',
      description: 'Espresso with velvety microfoam milk, smoother than cappuccino but stronger than latte.'
    },
    { 
      id: 8, 
      name: 'Irish Coffee', 
      image: '/OurCoffee/coffee8.png',
      description: 'A warming blend of hot coffee, Irish whiskey, sugar, topped with cream.'
    },
    { 
      id: 9, 
      name: 'Iced Coffee', 
      image: '/OurCoffee/coffee9.png',
      description: 'Brewed coffee served over ice, refreshing and versatile with milk or sweeteners.'
    },
    { 
      id: 10, 
      name: 'Affogato', 
      image: '/OurCoffee/coffee10.png',
      description: 'A scoop of vanilla ice cream "drowned" in a shot of hot espresso.'
    },
    { 
      id: 11, 
      name: 'Cold Brew', 
      image: '/OurCoffee/coffee11.png',
      description: 'Coffee brewed slowly with cold water for a smooth, less acidic taste.'
    },
    { 
      id: 12, 
      name: 'Turkish Coffee', 
      image: '/OurCoffee/coffee12.png',
      description: 'Finely ground coffee simmered in a cezve, served unfiltered with bold flavors.'
    }
  ];
  // Gallery images organized in 3 rows
  const galleryRows = [
    // Row 1 - moves right to left
    [
      "/SliderGallery/cup7.png",
      "/SliderGallery/cup8.png",
      "/SliderGallery/cup9.png",
      "/SliderGallery/cup10.png",
      "/SliderGallery/cup11.png",
      "/SliderGallery/cup12.png"
    ],
    // Row 2 - moves left to right
    [
      "/SliderGallery/cup13.png",
      "/SliderGallery/cup14.png",
      "/SliderGallery/cup15.png",
      "/SliderGallery/cup16.png",
      "/SliderGallery/cup17.png",
      "/SliderGallery/cup18.png"
    ],
    // Row 3 - moves right to left
    [
      "/SliderGallery/bread1.png",
      "/SliderGallery/bread2.png",
      "/SliderGallery/bread3.png",
      "/SliderGallery/bread4.png",
      "/SliderGallery/bread5.png",
      "/SliderGallery/bread6.png"
    ],
  ];
  // Coffee & Dessert names (match the images in galleryRows)
    const galleryNames = [
      // Row 1 names
      ["Espresso", "Cappuccino", "Latte", "Americano", "Mocha", "Macchiato"],
      // Row 2 names
      ["Flat White", "Irish Coffee", "Affogato", "Ristretto", "Cortado", "Vienna Coffee"],
      // Row 3 names (Desserts)
      ["Croissant", "Cinnamon Roll", "Blueberry Muffin", "Chocolate Donut", "Cheesecake", "Brownie"],
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
        
        @keyframes autoRotate3D {
          0% {
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          25% {
            transform: perspective(1000px) rotateX(15deg) rotateY(90deg) rotateZ(5deg);
          }
          50% {
            transform: perspective(1000px) rotateX(0deg) rotateY(180deg) rotateZ(0deg);
          }
          75% {
            transform: perspective(1000px) rotateX(-15deg) rotateY(270deg) rotateZ(-5deg);
          }
          100% {
            transform: perspective(1000px) rotateX(0deg) rotateY(360deg) rotateZ(0deg);
          }
        }
        
        @keyframes slowRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
        
        .auto-rotating-preview {
          animation: simple3DRotate 8s linear infinite;
          transform-style: preserve-3d;
          transform-origin: center center;
          perspective: 1000px;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3));
          will-change: transform;
        }
        
        .slow-spin {
          animation: slowRotate 6s linear infinite;
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

          /* Background color styles */
          .main-background {
            background-color: #4C4B16;
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
              className={`p-2 border rounded-lg transition-colors ${coffeeMode ? ' text-amber-50 hover:bg-amber-700 bg-[#4C4B16]' : 'bg-[#4C4B16] text-white hover:bg-[#5a5221] border-[#4C4B16]'}`}
            >
              <Menu size={24} />
            </button>
            {/* Logo and Brand Name on the right side */}
            <div className="flex items-center space-x-4 ml-auto">
              <h1 className={`text-2xl font-bold ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>Brew-Coffee</h1>
              <img
                src="/Gallery3/catcoffeeC.png"
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
                <img src="/Gallery3/catcoffeeC.png" alt="Logo" className="h-10 w-auto" />
              </h3>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className={`p-2 transition-colors ${coffeeMode ? 'hover:bg-amber-800 text-amber-50' : 'hover:bg-gray-100 text-[#4C4B16]'}`}
                  >
                    <X size={24} />
                  </button>
                </div>
                  <nav>
                    <ul className="space-y-6">
                      <li>
                        <a
                          href="#home"
                          className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaHome className="mr-2 text-2xl" /> Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="#menu"
                          className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaUtensils className="mr-2 text-2xl" /> Menu
                        </a>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaEnvelope className="mr-2 text-2xl" /> Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="#about"
                          className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaInfoCircle className="mr-2 text-2xl" /> About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="#gallery"
                          className={`flex items-center text-lg transition-colors py-2 ${coffeeMode ? 'text-amber-50 hover:text-amber-200' : 'text-[#4C4B16] hover:text-[#5a5221]'}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaImage className="mr-2 text-2xl" /> Gallery
                        </a>

                        {/* Coffee Mode toggle below Gallery */}
                        <div className="flex items-center space-x-2 mt-3 ml-2">
                          <FaMoon className={`text-2xl ${coffeeMode ? 'text-amber-200' : 'text-[#4C4B16]'}`} />
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
                src="/Gallery3/mingming-v2.png"
                alt="Coffee Logo"
                className="mx-auto md:mx-0 mb-0 w-70 h-70 object-contain"
              />
              <h2 className={`text-6xl font-bold leading-tight -mt-2 ${coffeeMode ? 'text-white' : 'text-white'}`}>
                Take A Break<br />
                Have The Best Coffee
              </h2>

              {/* Coffee Quote */}
              <p className={`mt-4 text-lg italic ${coffeeMode ? 'text-gray-200' : 'text-gray-300'}`}>
                "Every cup of coffee is more than a drink — it's a moment to pause and enjoy.  
                At Brew-Coffee, we craft each blend with care and passion.  
                Because the best breaks deserve the best brew."
              </p>

              {/* Author */}
              <p className={`mt-2 text-md font-semibold ${coffeeMode ? 'text-white' : 'text-white'}`}>
                — Philip Elbambo
              </p>
              <a href="/OrderNow" className="inline-block">
              <button
                className={`rounded-lg px-6 py-3 text-xl font-extrabold tracking-wide uppercase shadow-md transition-all mt-6
                  ${coffeeMode 
                    ? 'bg-white text-[#4C4B16] hover:bg-[#3a3411] hover:text-white' 
                    : 'bg-white text-[#4C4B16] hover:bg-[#3a3411] hover:text-white'
                  }`}
              >
                Shop Now
              </button>
              </a>
            </div>
            <div className="flex justify-center relative">
              <div 
                className="relative w-[600px] h-[600px] flex items-center justify-center"
                style={{
                  perspective: '1500px',
                  perspectiveOrigin: '50% 50%'
                }}
              >
                <img
                  src="/Gallery3/download.png"
                  alt="Coffee Cup"
                  className="w-[560px] h-[560px] object-contain auto-rotating-preview"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rest of content with original background */}
      <div className={`transition-colors duration-300 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'text-[#4C4B16] bg-white'}`}>
        {/* Coffee Menu */}
        
      {/* Coffee Menu */}
      <section id="menu" className="container mx-auto px-4 py-16 relative z-10">
        <h3
          className={`text-4xl font-bold text-center mb-6 ${
            coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'
          }`}
        >
          Our Coffee
        </h3>

     {/* Full-width description with fade-in + stylish font */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`text-lg md:text-xl font-semibold tracking-wide text-center mb-12 w-full font-serif ${
          coffeeMode ? 'text-amber-100' : 'text-[#4C4B16]'
        }`}
      >
        At BrewMaster, every cup is crafted to bring warmth and comfort. 
        We roast our beans with care, brew with precision, and serve 
        with passion—so you can enjoy rich flavors, smooth textures, 
        and the perfect aroma in every sip.
      </motion.p>
      
        <div className="grid md:grid-cols-4 gap-8">
          {coffeeProducts.map((coffee) => (
          <div
            key={coffee.id}
            className={`text-center border p-6 transition-colors group ${
              coffeeMode
                ? 'border-b-lime-950 hover:bg-amber-800 hover:text-amber-50 text-amber-50 bg-[#4C4B16]'
                : 'border-white hover:bg-[#4C4B16] hover:text-white text-[#4C4B16] bg-white'
            }`}
          >
            <img
              src={coffee.image}
              alt={coffee.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">{coffee.name}</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>
              {coffee.description}
            </p>
          </div>

          ))}
        </div>
      </section>

   {/* About Us */}
      <section id="about" className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/Gallery3/mingming-v3.jpg" alt="Coffee Shop Interior" className="w-135 h-135" />
          </div>
          <div>
            <h3 className={`text-4xl font-bold mb-6 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
              About Us
            </h3>
            <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
              Welcome to BrewMaster — where the coffee is slow, the vibes are warm, and every cup is made with heart. 
              Since 2010, we've been your neighborhood corner for a quiet moment, a good chat, and a really, really good brew.
            </p>
            <p className={`text-lg mb-4 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
              This is what we stand by:
            </p>
            <ul className={`text-lg space-y-2 ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>
              <li>• Beans we know by name — sourced straight from farmers we trust.</li>
              <li>• Baristas who treat espresso like an art, not a rush job.</li>
              <li>• A space that feels like your favorite sweater — soft, familiar, and cozy.</li>
              <li>• Coffee roasted fresh every morning, never yesterday's batch.</li>
              <li>• A commitment to people and planet, from seed to sip.</li>
            </ul>
          </div>
        </div>
      </section>
    
{/* Desserts */}
<section
  className={`container mx-auto px-4 py-16 relative z-10 ${
    coffeeMode ? "bg-[#4C4B16]" : "bg-white"
  }`}
>
  <h3
    className={`text-4xl font-bold text-center mb-8 ${
      coffeeMode ? "text-amber-50" : "text-[#4C4B16]"
    }`}
  >
    Sweet Treats
  </h3>

  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Left Side: Quotes/Description */}
    <div className="space-y-6 text-lg leading-relaxed">
      <p className={coffeeMode ? "text-amber-100" : "text-[#4C4B16]"}>
        "Life is short, eat dessert first," and when you taste ours, you'll
        never forget the name — <span className="font-semibold">Philip Elbambo</span>.
      </p>
      <p className={coffeeMode ? "text-amber-100" : "text-[#4C4B16]"}>
        Each dessert is crafted to melt in your mouth, turning every bite into
        "a sweet memory you'll always crave."
      </p>
      <p className={coffeeMode ? "text-amber-100" : "text-[#4C4B16]"}>
        "Good food is all the sweeter when shared with good friends," so bring
        someone along and let <span className="font-semibold">Philip Elbambo's</span> desserts speak for themselves.
      </p>
      <p className={coffeeMode ? "text-amber-100" : "text-[#4C4B16]"}>
        From rich chocolate to creamy cheesecakes, every slice whispers, "this
        is the flavor of joy."
      </p>
      <p className={coffeeMode ? "text-amber-100" : "text-[#4C4B16]"}>
        Because "dessert is the fairy tale of the kitchen," and in every story
        worth telling, the name <span className="font-semibold">Philip Elbambo</span> lingers like the perfect sweet ending.
      </p>
    </div>

    {/* Right Side: Large PNG + Order CTA */}
    <div className="flex flex-col items-center text-center">
      {/* Dessert Showcase Picture */}
      <img
        src="SliderGallery/bread1.png"
        alt="Dessert Showcase"
        className="w-110 h-110 object-contain mb-6 slow-spin"
      />

      {/* Order CTA */}
      <h4
        className={`text-2xl font-bold mb-4 ${
          coffeeMode ? "text-amber-50" : "text-[#4C4B16]"
        }`}
      >
        Order Your Favorite Dessert
      </h4>
      <a
        href="#order-section"
        className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
          coffeeMode
            ? "bg-amber-100 text-[#4C4B16] hover:bg-amber-200"
            : "bg-[#4C4B16] text-white hover:bg-lime-900"
        }`}
      >
        Start Ordering
      </a>
    </div>
  </div>
</section>


        {/* Our Gallery */}
        <section id="gallery" className="py-16 overflow-hidden relative z-10">
          <div className="container mx-auto px-4 mb-12">
            <h3 className={`text-4xl font-bold text-center ${coffeeMode ? 'text-amber-50' : 'text-[#4C4B16]'}`}>Our Gallery</h3>
          </div>
          <div className="space-y-6">
            {galleryRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative w-full overflow-hidden">
                <div className={`flex space-x-6 ${rowIndex % 2 === 0 ? 'slide-left' : 'slide-right'}`}>
                  {[...row, ...row, ...row].map((imageUrl, imageIndex) => (
                    <div key={imageIndex} className="flex-shrink-0">
                      <div className="w-80 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-2 flex flex-col items-center bg-white">
                        <img
                          src={imageUrl}
                          alt={`Gallery ${rowIndex + 1}-${imageIndex + 1}`}
                          className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                        />
                        {/* Name under the image */}
                        <p className="mt-2 text-xl font-semibold" style={{ color: "#4C4B16" }}>
                          {galleryNames[rowIndex][imageIndex % row.length]}
                        </p>
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
      <footer id="contact" className={`py-12 relative z-10 ${coffeeMode ? 'bg-[#4C4B16] text-amber-50' : 'bg-[#4C4B16] text-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-6">
              <img
                src="/Gallery3/catcoffeeC.png"
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