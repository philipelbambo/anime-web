import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Coffee, Phone, Facebook, Instagram, Twitter, MessageCircle, Mail } from 'lucide-react';

const BrewCoffeeHomepage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      comment: "The best coffee I've ever had! The atmosphere is perfect for working and relaxing."
    },
    {
      name: "Mike Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      comment: "Amazing quality and service. My morning isn't complete without my daily brew from here!"
    },
    {
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      comment: "Love the variety of coffee options. The baristas really know their craft!"
    },
    {
      name: "Alex Rivera",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      comment: "Great place to meet friends. Coffee is excellent and the staff is so friendly!"
    }
  ];

  const menuItems = [
    {
      name: "Espresso",
      price: "₱3.50",
      image: "/OurCoffee/coffee1.png"
    },
    {
      name: "Cappuccino",
      price: "₱4.25",
      image: "/OurCoffee/coffee2.png "
    },
    {
      name: "Latte",
      price: "₱4.75",
      image: " /OurCoffee/coffee3.png"
    },
    {
      name: "Americano",
      price: "₱3.25",
      image: "/OurCoffee/coffee4.png"
    },
    {
      name: "Mocha",
      price: "₱5.00",
      image: " /OurCoffee/coffee5.png"
    },
    {
      name: "Cold Brew",
      price: "₱4.00",
      image: "/OurCoffee/coffee6.png "
    },
    {
      name: "Macchiato",
      price: "₱4.50",
      image: "/OurCoffee/coffee7.png "
    },
    {
      name: "Frappé",
      price: "₱5.25",
      image: "/OurCoffee/coffee5.png "
    },
    {
      name: "Turkish Coffee",
      price: "₱3.75",
      image: "/OurCoffee/coffee9.png "
    },
    {
      name: "Flat White",
      price: "₱4.25",
      image: "/OurCoffee/coffee10.png "
    },
    {
      name: "Affogato",
      price: "₱5.50",
      image: "/OurCoffee/coffee12.png "
    },
    {
      name: "Irish Coffee",
      price: "₱6.00",
      image: "/OurCoffee/coffee5.png"
    }
  ];


  const galleryImages = [
    "/SliderGallery/cup1.png",
    "/SliderGallery/cup2.png",
    "/SliderGallery/cup3.png ",
    "/SliderGallery/cup4.png",
    "/SliderGallery/cup5.png",
    "/SliderGallery/cup6.png",
    "/SliderGallery/cup7.png",
    "/SliderGallery/cup8.png",
    "/SliderGallery/cup9.png",
    "/SliderGallery/cup10.png",
    "/SliderGallery/cup11.png",
    "/SliderGallery/cup12.png"
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-between px-8 lg:px-16" style={{backgroundColor: '#4C4B16'}}>
      <div className="flex-1 text-white text-center lg:text-left">
        {/* Image Above the Heading */}
        <img 
          src="/Gallery3/animecafe.png" 
          alt="Coffee Decoration"
          className="mx-auto lg:mx-0 mb-6 w-40 h-auto"
        />

        <h1 className="text-3xl lg:text-6xl font-bold mb-6 leading-snug tracking-wide max-w-3xl">
          Take A Break, Have The Best Coffee
        </h1>

        <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
          <button className="bg-white hover:bg-amber-100 text-black px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
            Order Now
          </button>
          <button className="border border-white hover:bg-white hover:text-gray-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img 
          src="/Gallery3/coffeeP-v1.png" 
          alt="Coffee Cup PNG"
          className="w-140 h-140 max-w-full drop-shadow-2xl"
        />
      </div>
    </section>

      {/* About Us Section */}
      <section className="min-h-screen bg-white py-16 px-8 lg:px-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">About Us</h2>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 pr-12">
            <img 
              src="Gallery3/animecafe-v3.png" 
              alt="Coffee Shop PNG"
              className="w-100 h-100 object-contain rounded-full  "
            />
          </div>
          <div className="flex-1 pl-12">
            <p className="text-lg text-black leading-relaxed mb-6">
              Welcome to Brew Coffee, where passion meets perfection in every cup. Since our establishment, 
              we have been dedicated to sourcing the finest coffee beans from around the world and crafting 
              exceptional beverages that awaken your senses.
            </p>
            <p className="text-lg text-black leading-relaxed mb-6">
              Our skilled baristas combine traditional brewing methods with modern techniques to create 
              unique flavor profiles that cater to every coffee lover's palate. We believe that great 
              coffee brings people together, creating moments of connection and joy.
            </p>
            <p className="text-lg text-black leading-relaxed">
              From our cozy atmosphere to our commitment to sustainability, every aspect of Brew Coffee 
              is designed to provide you with an unforgettable coffee experience. Come join our community 
              of coffee enthusiasts and discover your new favorite brew.
            </p>
          </div>
        </div>
      </section>

      {/* Our Menu Section */}
      <section className="min-h-screen py-16 px-8 lg:px-16" style={{backgroundColor: '#4C4B16'}}>
        <h2 className="text-5xl font-bold text-center mb-16 text-white">Our Menu</h2>
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {menuItems.map((item, index) => (
            <div key={index} className=" overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-64 object-contain"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-3xl font-bold text-white">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Testimonials Section */}
    <section className="min-h-screen bg-white py-20 px-8 lg:px-16">
      <h2 className="text-6xl font-bold text-center mb-20 text-black">Testimonials</h2>
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gray-50 rounded-lg p-16 shadow-xl min-h-96">
          <div className="text-center">
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name}
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-6"
              style={{ borderColor: "#4C4B16" }}
            />
            <p className="text-2xl text-black italic mb-8 leading-relaxed max-w-4xl mx-auto">
              "{testimonials[currentTestimonial].comment}"
            </p>
            <h4 className="text-3xl font-bold text-black">
              {testimonials[currentTestimonial].name}
            </h4>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-4 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: "#4C4B16" }}
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-4 rounded-full transition-colors duration-300 shadow-lg"
            style={{ backgroundColor: "#4C4B16" }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
        
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentTestimonial ? 'active-dot' : 'bg-gray-300'
              }`}
              style={index === currentTestimonial ? { backgroundColor: "#4C4B16" } : {}}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Gallery Section */}
      <section className="bg-white py-16 px-8 lg:px-16 overflow-hidden">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">Gallery</h2>
        <div className="space-y-8">
          {/* First Row - Sliding Left */}
          <div className="w-full overflow-hidden">
            <div className="flex animate-pulse hover:animate-none" style={{
              animation: 'slideLeft 40s linear infinite',
              width: 'calc(100% * 3)'
            }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                <div key={`left-${index}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={image} 
                    alt={`Gallery ${(index % galleryImages.length) + 1}`}
                    className="w-64 h-64 object-contain shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Second Row - Sliding Right */}
          <div className="w-full overflow-hidden">
            <div className="flex hover:animate-none" style={{
              animation: 'slideRight 40s linear infinite',
              width: 'calc(100% * 3)',
              transform: 'translateX(-33.333%)'
            }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
                <div key={`right-${index}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={image} 
                    alt={`Gallery ${(index % galleryImages.length) + 1}`}
                    className="w-64 h-64 object-contain shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          
          @keyframes slideRight {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>
      {/* Contact Us Section */}
      <section className="bg-white py-16 px-8 lg:px-16">
        <h2 className="text-5xl font-bold text-center mb-16 text-black">Contact Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Info and Social Media */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-amber-600" size={24} />
                <span className="text-lg text-gray-700">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="text-amber-600" size={24} />
                <span className="text-lg text-gray-700">info@brewcoffee.com</span>
              </div>
            </div>

            <h4 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-300">
                <Coffee size={24} />
              </a>
              <a href="#" className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors duration-300">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                  Email Account
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none text-lg resize-vertical"
                  placeholder="Enter your message"
                />
              </div>
              
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#4C4B16] hover:bg-green-600 text-white py-4 px-6 rounded-lg text-xl font-semibold transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrewCoffeeHomepage;