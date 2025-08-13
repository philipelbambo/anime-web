import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
// Corrected import statement - all icons from react-icons/fa on one line
import { FaHome, FaUtensils, FaEnvelope, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram, FaClock, FaBullhorn } from 'react-icons/fa';

const CoffeeShopLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const coffeeProducts = [
    { id: 1, name: 'Espresso', price: 3.50, image: 'https://static.vecteezy.com/system/resources/thumbnails/047/312/174/small_2x/coffee-beans-and-grounds-png.png' },
    { id: 2, name: 'Cappuccino', price: 4.25, image: 'https://www.pngall.com/wp-content/uploads/2016/03/Bread-PNG-7.png' },
    { id: 3, name: 'Latte', price: 4.50, image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Latte.png' },
    { id: 4, name: 'Americano', price: 3.75, image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Americano.png' },
    { id: 5, name: 'Mocha', price: 5.00, image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Mocha.png' },
    { id: 6, name: 'Macchiato', price: 4.75, image: 'https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Macchiato.png' }
  ];

  const desserts = [
    { id: 7, name: 'Croissant', price: 2.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Croissant.png' },
    { id: 8, name: 'Muffin', price: 3.00, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Muffin.png' },
    { id: 9, name: 'Cheesecake', price: 4.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Cheesecake.png' },
    { id: 10, name: 'Crème brûlée', price: 5.50, image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Creme-Brulee.png' }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="relative border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>

          
      {/* Logo and Brand Name on the right side */}
      <div className="flex items-center space-x-4 ml-auto">
        <h1 className="text-2xl font-bold">BrewMaster</h1>
        <img
          src="https://www.freeiconspng.com/thumbs/coffee-icon-png/coffee-icon-png-3.png"
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
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Menu</h3>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-6">
                    <li>
                      <a
                        href="#home"
                        className="flex items-center text-lg hover:text-gray-600 transition-colors py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaHome className="mr-2" /> Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#menu"
                        className="flex items-center text-lg hover:text-gray-600 transition-colors py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaUtensils className="mr-2" /> Menu
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="flex items-center text-lg hover:text-gray-600 transition-colors py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaEnvelope className="mr-2" /> Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        className="flex items-center text-lg hover:text-gray-600 transition-colors py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FaInfoCircle className="mr-2" /> About Us
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Take A Break<br />
              Have The Best Coffee
            </h2>
            <button className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 transition-colors">
              ORDER NOW
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="https://png.pngtree.com/png-clipart/20240810/original/pngtree-flying-cup-of-coffee-with-splash-and-png-image_15739217.png"
              alt="Coffee Cup"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Coffee Menu */}
      <section id="menu" className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center mb-12">Our Coffee</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {coffeeProducts.map(coffee => (
            <div key={coffee.id} className="text-center border border-white p-6 hover:bg-gray-400 hover:text-white transition-colors group">
              <img
                src={coffee.image}
                alt={coffee.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">{coffee.name}</h4>
              <p className="text-lg">${coffee.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/047/312/174/small_2x/coffee-beans-and-grounds-png.png"
              alt="Coffee Shop Interior"
              className="w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-6">About Us</h3>
            <p className="text-lg mb-4">
              Welcome to BrewMaster, where passion meets perfection in every cup. Since 2010, we've been dedicated to serving the finest coffee experience in the city.
            </p>
            <p className="text-lg mb-4">
              Our advantages include:
            </p>
            <ul className="text-lg space-y-2">
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
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <h3 className="text-4xl font-bold text-center mb-12">Sweet Treats</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {desserts.map(dessert => (
            <div key={dessert.id} className="text-center bg-white border border-black p-4 hover:bg-black hover:text-white transition-colors group">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-32 object-contain mb-4"
              />
              <h4 className="text-lg font-semibold mb-2">{dessert.name}</h4>
              <p>${dessert.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Gallery */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center mb-12">Our Gallery</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            "https://static.vecteezy.com/system/resources/thumbnails/047/312/174/small_2x/coffee-beans-and-grounds-png.png",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
            "https://images.unsplash.com/photo-1520975922219-79d5f6fc1a2e",
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
            "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
          ].map((url, i) => (
            <div key={i} className="aspect-square">
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-[#e0e0e0] text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo and Opening Hours */}
            <div className="flex items-start space-x-6">
              {/* Logo */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/6030/6030268.png"
                alt="Coffee Shop Logo"
                className="w-30 h-30"
              />

            {/* Opening Hours */}
            <div className="ml-24"> {/* Bigger space from the logo */}
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <FaClock />
                <span>Opening Hours</span>
              </h4>
              <ul className="space-y-2">
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
            {/* Contact Info */}
            <div className="flex flex-col items-center text-center">
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <FaInfoCircle />
                <span>Contact Information</span>
              </h4>
              <p className="mb-2">123 Coffee Street</p>
              <p className="mb-2">City, State 12345</p>
              <p className="mb-2">Phone: (555) 123-4567</p>
              <p>Email: info@brewmaster.com</p>
            </div>

            {/* Social Links */}
            <div className="ml-20">
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <FaBullhorn />
                <span>Follow Us</span>
              </h4>
              <div className="flex space-x-4">
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

          <div className="border-t border-gray-400 mt-8 pt-8 text-center">
            <p>&copy; 2025 BrewMaster Coffee Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoffeeShopLanding;