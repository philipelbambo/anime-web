import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, ShoppingCart, Clock, Heart, X, MessageCircle, Plus, Minus, Trash2, User, MapPin, CreditCard } from 'lucide-react';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [saleTimeLeft, setSaleTimeLeft] = useState({ days: 2, hours: 14, minutes: 32 });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState({});
  const [toasts, setToasts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Burger menu state
  const [checkoutForm, setCheckoutForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Show toast function
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  // Remove toast function
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Hero slider images
  const heroSlides = [
    './Gallery1/background3.jpg',
    './Gallery1/background2.jpg',
    './Gallery1/background.jpg'
  ];

  // Expanded product data
  const categories = [
    {
      name: 'General Items',
      products: [
        { id: 1, name: 'Premium T-Shirt', price: 25.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.5, reviews: 128, onSale: true },
        { id: 2, name: 'Comfort Pants', price: 45.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', rating: 4.3, reviews: 89, onSale: false },
        { id: 3, name: 'Cozy Hoodie', price: 55.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 203, onSale: true },
        { id: 4, name: 'Classic Jacket', price: 75.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.4, reviews: 156, onSale: false },
        { id: 5, name: 'Casual Denim Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', rating: 4.6, reviews: 177, onSale: false },
        { id: 6, name: 'Summer Linen Shirt', price: 34.99, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop', rating: 4.2, reviews: 95, onSale: true },
        { id: 7, name: 'Winter Beanie', price: 18.99, image: 'https://images.unsplash.com/photo-1519857805476-2b308d7f8a58?w=300&h=300&fit=crop', rating: 4.8, reviews: 210, onSale: true },
        { id: 8, name: 'Leather Belt', price: 32.99, image: 'https://images.unsplash.com/photo-1608042314381-678d822779dd?w=300&h=300&fit=crop', rating: 4.5, reviews: 134, onSale: false },
        { id: 9, name: 'Sport Running Shoes', price: 89.99, image: 'https://images.unsplash.com/photo-1460353581600-c01a715b9a8d?w=300&h=300&fit=crop', rating: 4.7, reviews: 305, onSale: true },
        { id: 10, name: 'Casual Sneakers', price: 69.99, image: 'https://images.unsplash.com/photo-1542291026-7eec26e15c62?w=300&h=300&fit=crop', rating: 4.6, reviews: 267, onSale: false },
        { id: 11, name: 'Formal Dress Shirt', price: 42.99, image: 'https://images.unsplash.com/photo-1507019729592-f98f7854f1d9?w=300&h=300&fit=crop', rating: 4.4, reviews: 142, onSale: false },
        { id: 12, name: 'Sun Sunglasses', price: 29.99, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop', rating: 4.9, reviews: 188, onSale: true },
        { id: 13, name: 'Wool Scarf', price: 26.99, image: 'https://images.unsplash.com/photo-1525144243991-98ce943165d0?w=300&h=300&fit=crop', rating: 4.6, reviews: 123, onSale: true },
        { id: 14, name: 'Backpack Bag', price: 54.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a6a?w=300&h=300&fit=crop', rating: 4.7, reviews: 241, onSale: false },
      ]
    },
    {
      name: 'One Piece',
      products: [
        { id: 15, name: "Luffy's Straw Hat Replica", price: 35.99, image: 'https://images.unsplash.com/photo-1517420455584-3c66299b9e59?w=300&h=300&fit=crop', rating: 4.9, reviews: 520, onSale: true },
        { id: 16, name: "Zoro's Wado Ichimonji Katana", price: 129.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.8, reviews: 450, onSale: false },
        { id: 17, name: "Nami's Log Pose", price: 24.99, image: 'https://images.unsplash.com/photo-1582218456209-e37435f1f91b?w=300&h=300&fit=crop', rating: 4.7, reviews: 310, onSale: true },
        { id: 18, name: "Chopper Beanie Hat", price: 29.99, image: 'https://images.unsplash.com/photo-1519857805476-2b308d7f8a58?w=300&h=300&fit=crop', rating: 4.9, reviews: 600, onSale: true },
        { id: 19, name: "Going Merry Ship Model", price: 89.99, image: 'https://images.unsplash.com/photo-1518779644626-d1d8a39e992b?w=300&h=300&fit=crop', rating: 4.8, reviews: 380, onSale: false },
        { id: 20, name: "Ace's Flame-Flame Fruit Hoodie", price: 59.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 290, onSale: true },
        { id: 21, name: "Thousand Sunny Ship Model", price: 99.99, image: 'https://images.unsplash.com/photo-1568285579998-f222384a5a54?w=300&h=300&fit=crop', rating: 4.9, reviews: 410, onSale: false },
        { id: 22, name: "Sanji's All Blue Apron", price: 22.99, image: 'https://images.unsplash.com/photo-1620942544258-0d1a4a4b494f?w=300&h=300&fit=crop', rating: 4.6, reviews: 150, onSale: true },
        { id: 23, name: "Brook's Soul Solid Cane Sword", price: 79.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.7, reviews: 240, onSale: false },
        { id: 24, name: "Usopp's Kabuto Slingshot Replica", price: 39.99, image: 'https://images.unsplash.com/photo-1596782531398-e7c6b5b5c928?w=300&h=300&fit=crop', rating: 4.5, reviews: 190, onSale: true },
      ]
    },
    {
      name: 'Hunter x Hunter',
      products: [
        { id: 25, name: "Gon's Fishing Rod Replica", price: 49.99, image: 'https://images.unsplash.com/photo-1596782531398-e7c6b5b5c928?w=300&h=300&fit=crop', rating: 4.8, reviews: 280, onSale: false },
        { id: 26, name: "Killua's Yo-Yo Replica", price: 39.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6d02?w=300&h=300&fit=crop', rating: 4.7, reviews: 210, onSale: true },
        { id: 27, name: "Hisoka Playing Cards Set", price: 19.99, image: 'https://images.unsplash.com/photo-1620942544258-0d1a4a4b494f?w=300&h=300&fit=crop', rating: 4.9, reviews: 350, onSale: true },
        { id: 28, name: "Kurapika's Chain Jail Bracelet", price: 29.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.6, reviews: 180, onSale: false },
        { id: 29, name: "Phantom Troupe Spider Tattoo Shirt", price: 27.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.8, reviews: 260, onSale: true },
        { id: 30, name: "Leorio's Suit & Tie", price: 65.99, image: 'https://images.unsplash.com/photo-1594966624838-89c5660b64d0?w=300&h=300&fit=crop', rating: 4.4, reviews: 110, onSale: false },
        { id: 31, name: "Netero's Bodhisattva Hand T-Shirt", price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.7, reviews: 220, onSale: true },
        { id: 32, name: "Meruem vs Netero Poster", price: 16.99, image: 'https://images.unsplash.com/photo-1535992132-792500b4db85?w=300&h=300&fit=crop', rating: 4.9, reviews: 300, onSale: true },
        { id: 33, name: "Chrollo Lucifer Bookmark Set", price: 12.99, image: 'https://images.unsplash.com/photo-1608042314381-678d822779dd?w=300&h=300&fit=crop', rating: 4.5, reviews: 95, onSale: false },
      ]
    },
    {
      name: 'Mushoku Tensei',
      products: [
        { id: 34, name: "Rudeus Greyrat Staff Replica", price: 79.99, image: 'https://images.unsplash.com/photo-1616555620977-854737d9b736?w=300&h=300&fit=crop', rating: 4.7, reviews: 150, onSale: false },
        { id: 35, name: "Sylphiette's Green Hair Wig", price: 34.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.5, reviews: 90, onSale: true },
        { id: 36, name: "Roxy Migurdia Figure", price: 59.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.9, reviews: 200, onSale: true },
        { id: 37, name: "Eris Boreas Greyrat Sword Replica", price: 89.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.8, reviews: 175, onSale: false },
        { id: 38, name: "Paul Greyrat Training Outfit", price: 55.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.6, reviews: 80, onSale: false },
        { id: 39, name: "Ghiselaine Dedoldia Sword Replica", price: 99.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.9, reviews: 160, onSale: false },
      ]
    },
    {
      name: 'Naruto',
      products: [
        { id: 40, name: "Naruto Headband", price: 19.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.8, reviews: 400, onSale: true },
        { id: 41, name: "Akatsuki Cloud Cloak", price: 79.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.7, reviews: 350, onSale: false },
        { id: 42, name: "Sharingan Contact Lenses", price: 29.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.9, reviews: 500, onSale: true },
        { id: 43, name: "Jiraiya's Toad Sage Scroll", price: 45.99, image: 'https://images.unsplash.com/photo-1535992132-792500b4db85?w=300&h=300&fit=crop', rating: 4.6, reviews: 280, onSale: true },
        { id: 44, name: "Kunai and Shuriken Set", price: 25.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.7, reviews: 310, onSale: false },
        { id: 45, name: "Kakashi's Anbu Mask", price: 34.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.8, reviews: 290, onSale: true },
        { id: 46, name: "Sasuke's Mangekyou Sharingan Hoodie", price: 54.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.7, reviews: 330, onSale: false },
        { id: 47, name: "Itachi Uchiha Funko Pop", price: 14.99, image: 'https://images.unsplash.com/photo-1607083206968-1441150a83b4?w=300&h=300&fit=crop', rating: 4.9, reviews: 450, onSale: true },
        { id: 48, name: "Hidden Leaf Village Backpack", price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a6a?w=300&h=300&fit=crop', rating: 4.6, reviews: 200, onSale: false },
      ]
    },
    {
      name: 'Demon Slayer',
      products: [
        { id: 49, name: "Tanjiro's Hanafuda Earrings", price: 21.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.9, reviews: 650, onSale: true },
        { id: 50, name: "Nezuko Bamboo Muzzle Replica", price: 15.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.8, reviews: 420, onSale: true },
        { id: 51, name: "Zenitsu's Nichirin Sword Replica", price: 99.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.7, reviews: 390, onSale: false },
        { id: 52, name: "Inosuke's Pig Head Mask", price: 39.99, image: 'https://images.unsplash.com/photo-1519857805476-2b308d7f8a58?w=300&h=300&fit=crop', rating: 4.6, reviews: 250, onSale: true },
        { id: 53, name: "Giyu Tomioka Haori", price: 69.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.9, reviews: 480, onSale: false },
        { id: 54, name: "Rengoku Kyojuro Katana Replica", price: 109.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.8, reviews: 360, onSale: false },
        { id: 55, name: "Shinobu Kocho Butterfly Hair Clip", price: 18.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.7, reviews: 210, onSale: true },
        { id: 56, name: "Muzan Kibutsuji Hat", price: 29.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.5, reviews: 150, onSale: false },
      ]
    },
    {
      name: 'Attack on Titan',
      products: [
        { id: 57, name: "Scout Regiment Jacket", price: 89.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', rating: 4.8, reviews: 550, onSale: true },
        { id: 58, name: "Eren Yeager's Key Necklace", price: 29.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.7, reviews: 320, onSale: false },
        { id: 59, name: "3D Maneuver Gear Replica", price: 199.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.9, reviews: 700, onSale: false },
        { id: 60, name: "Levi Ackerman Funko Pop", price: 14.99, image: 'https://images.unsplash.com/photo-1607083206968-1441150a83b4?w=300&h=300&fit=crop', rating: 4.8, reviews: 410, onSale: true },
        { id: 61, name: "Colossal Titan Poster", price: 16.99, image: 'https://images.unsplash.com/photo-1535992132-792500b4db85?w=300&h=300&fit=crop', rating: 4.6, reviews: 230, onSale: false },
        { id: 62, name: "Mikasa Ackerman Scarf", price: 24.99, image: 'https://images.unsplash.com/photo-1525144243991-98ce943165d0?w=300&h=300&fit=crop', rating: 4.7, reviews: 300, onSale: true },
        { id: 63, name: "Armin Arlert Plush Toy", price: 21.99, image: 'https://images.unsplash.com/photo-1607083206968-1441150a83b4?w=300&h=300&fit=crop', rating: 4.5, reviews: 180, onSale: false },
        { id: 64, name: "Titan Serum Syringe Replica", price: 39.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.6, reviews: 150, onSale: false },
      ]
    },
    {
      name: 'Jujutsu Kaisen',
      products: [
        { id: 65, name: "Gojo Satoru T-Shirt", price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.8, reviews: 245, onSale: true },
        { id: 66, name: "Ryomen Sukuna Hoodie", price: 49.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', rating: 4.9, reviews: 312, onSale: false },
        { id: 67, name: "Yuji Itadori Funko Pop", price: 12.99, image: 'https://images.unsplash.com/photo-1607083206968-1441150a83b4?w=300&h=300&fit=crop', rating: 4.7, reviews: 180, onSale: true },
        { id: 68, name: "Megumi Fushiguro Cursed Technique T-Shirt", price: 27.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', rating: 4.7, reviews: 198, onSale: true },
        { id: 69, name: "Nobara Kugisaki Hammer Replica", price: 34.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6d02?w=300&h=300&fit=crop', rating: 4.6, reviews: 120, onSale: false },
        { id: 70, name: "Maki Zenin Playful Cloud Weapon", price: 59.99, image: 'https://images.unsplash.com/photo-1569707255938-1a5c61a1a2b1?w=300&h=300&fit=crop', rating: 4.8, reviews: 165, onSale: false },
        { id: 71, name: "Toge Inumaki Cursed Speech Mask", price: 19.99, image: 'https://images.unsplash.com/photo-1519857805476-2b308d7f8a58?w=300&h=300&fit=crop', rating: 4.6, reviews: 154, onSale: true },
        { id: 72, name: "Panda Plush Toy", price: 22.99, image: 'https://images.unsplash.com/photo-1607083206968-1441150a83b4?w=300&h=300&fit=crop', rating: 4.9, reviews: 277, onSale: false },
        { id: 73, name: "Gojo's Blindfold Replica", price: 15.99, image: 'https://images.unsplash.com/photo-1583391478872-f758f59e6e1a?w=300&h=300&fit=crop', rating: 4.5, reviews: 112, onSale: true },
        { id: 74, name: "Sukuna's Finger Pendant", price: 28.99, image: 'https://images.unsplash.com/photo-1599669571417-3a73d179e35a?w=300&h=300&fit=crop', rating: 4.8, reviews: 203, onSale: true },
        { id: 75, name: "Jujutsu High School Backpack", price: 58.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a6a?w=300&h=300&fit=crop', rating: 4.8, reviews: 210, onSale: true },
        { id: 76, name: "Domain Expansion Poster", price: 17.99, image: 'https://images.unsplash.com/photo-1535992132-792500b4db85?w=300&h=300&fit=crop', rating: 4.7, reviews: 98, onSale: false },
        { id: 77, name: "Cursed Spirit Mug", price: 14.99, image: 'https://images.unsplash.com/photo-1583315734955-46215e2e6e1a?w=300&h=300&fit=crop', rating: 4.6, reviews: 176, onSale: false },
        { id: 78, name: "Choso Blood Manipulation T-Shirt", price: 31.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', rating: 4.5, reviews: 109, onSale: true },
      ]
    }
  ];

  // Add to cart function
  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      size: selectedSize,
      quantity: quantity
    };
    setCart(prev => [...prev, cartItem]);
    showToast(`${product.name} added to cart!`, 'success');
    setSelectedProduct(null);
  };

  // Buy now function
  const buyNow = (product) => {
    addToCart(product);
    setShowCart(true);
    showToast('Proceed to checkout!', 'info');
  };

  // Remove from cart
  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from cart', 'info');
  };

  // Update cart quantity
  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Add review function
  const addReview = (productId) => {
    if (!newReview.comment.trim()) {
      showToast('Please write a review comment', 'error');
      return;
    }
    const review = {
      id: Date.now(),
      rating: newReview.rating,
      comment: newReview.comment,
      author: 'Anonymous User',
      date: new Date().toLocaleDateString()
    };
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
    setNewReview({ rating: 5, comment: '' });
    showToast('Review added successfully!', 'success');
  };

  // Handle checkout
  const handleCheckout = () => {
    const required = ['email', 'firstName', 'lastName', 'address', 'city', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'];
    const missing = required.filter(field => !checkoutForm[field]);
    if (missing.length > 0) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    showToast('Order placed successfully! Thank you for your purchase.', 'success');
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setCheckoutForm({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    });
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Timer effect for sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSaleTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide hero carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const ProductSlider = ({ products, categoryName }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scroll = (direction) => {
      const container = document.getElementById(`slider-${categoryName}`);
      const scrollAmount = 300;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    };
    return (
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
        <div
          id={`slider-${categoryName}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-72 bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-3"
                />
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    SALE
                  </div>
                )}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <Heart size={20} />
                </button>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
              <p className="text-lg font-bold text-gray-900">₱{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Header with Burger Menu */}
      <div className="bg-white shadow-sm borde-white border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Burger Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-black">Store</h1>
          </div>

          {/* Right: Cart Button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
{/* Sidebar Menu (Slide-in from left) */}
        {menuOpen && (
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-blur z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col p-6 space-y-6 h-full">
              <div className="flex justify-between items-center">
                <img 
                  src="./Gallery1/luffy1.png" 
                  alt="MENU" 
                  className="h-12 w-auto"
                />
                <button onClick={() => setMenuOpen(false)} className="text-black">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6 mt-4 flex-1">
                <a
                  href="/home"
                  className="text-black text-xl hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-black text-xl hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-black text-xl hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="/map"
                  className="text-black text-xl hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Map
                </a>
              </nav>
            </div>
          </div>
        )}

      {/* Hero Slider */}
      <div className="relative w-full h-[500px] bg-white">
        <div className="relative mx-auto max-w-7xl h-full px-4">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                } hover:bg-white transition`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="w-full px-10 py-20">
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">{category.name}</h2>
            <ProductSlider products={category.products} categoryName={category.name} />
          </div>
        ))}
      </div>

      {/* Modals: Product, Review, Cart, Checkout */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover rounded-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-4">₱{selectedProduct.price.toFixed(2)}</p>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Size:</label>
                    <div className="flex gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded w-fit">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <button onClick={() => buyNow(selectedProduct)} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
                      BUY NOW
                    </button>
                    <button onClick={() => addToCart(selectedProduct)} className="w-full border border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
                      <ShoppingCart size={20} /> ADD TO CART
                    </button>
                  </div>
                  <button onClick={() => showToast('Message sent to admin!', 'info')} className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> MESSAGE ADMIN
                  </button>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button onClick={() => setShowReviews(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Write a Review
                  </button>
                </div>
                <div className="space-y-4">
                  {(reviews[selectedProduct.id] || []).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">John D.</span>
                    </div>
                    <p className="text-gray-700">Great quality product! Fits perfectly and arrived quickly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviews && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Write a Review</h3>
              <button onClick={() => setShowReviews(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} onClick={() => setNewReview(prev => ({ ...prev, rating }))} className="text-2xl">
                      <Star className={rating <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Write your review..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addReview(selectedProduct.id);
                    setShowReviews(false);
                  }}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit Review
                </button>
                <button onClick={() => setShowReviews(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="ml-auto w-96 bg-white h-full overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shopping Cart ({cart.length})</h3>
                <button onClick={() => setShowCart(false)}><X size={20} /></button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.cartId} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                          <p className="text-sm font-bold">₱{item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Minus size={12} />
                          </button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-bold">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ₱{cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button onClick={() => setShowCheckout(false)}><X size={24} /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>₱{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping & Payment</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name *</label>
                        <input
                          type="text"
                          value={checkoutForm.firstName}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={checkoutForm.lastName}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={18} /> Shipping Address</h4>
                      <input
                        type="text"
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Street Address"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <input
                          type="text"
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="City"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <input
                          type="text"
                          value={checkoutForm.state}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, state: e.target.value }))}
                          placeholder="State"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <input
                          type="text"
                          value={checkoutForm.zipCode}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, zipCode: e.target.value }))}
                          placeholder="ZIP Code"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <select
                          value={checkoutForm.country}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">UK</option>
                          <option value="AU">Australia</option>
                          <option value="PH">Philippines</option>
                        </select>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment Info</h4>
                      <input
                        type="text"
                        value={checkoutForm.cardName}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardName: e.target.value }))}
                        placeholder="Cardholder Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                      <input
                        type="text"
                        value={checkoutForm.cardNumber}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="Card Number"
                        className="w-full p-2 border border-gray-300 rounded mt-4"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <input
                          type="text"
                          value={checkoutForm.expiryDate}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <input
                          type="text"
                          value={checkoutForm.cvv}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="CVV"
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                      >
                        Complete Order (₱{cartTotal.toFixed(2)})
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Style */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  </div>
  );
}

export default Homepage;