import React, { useState, useEffect, useRef } from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Navigation, Phone, MessageSquare, Star, RefreshCw } from 'lucide-react';

const GoogleMapsOrderTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 8.2280, lng: 124.2452 }); // Iligan City
  const [driverPosition, setDriverPosition] = useState({ lat: 8.2180, lng: 124.2352 });
  const [estimatedTime, setEstimatedTime] = useState("15 mins");
  const [trackingStep, setTrackingStep] = useState(3);
  const [isMapLoaded, setIsMapLoaded] = useState(true);
  const [route, setRoute] = useState([]);
  const mapContainerRef = useRef(null);

  // Sample tracking data with real coordinates
  const trackingSteps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      location: "Shopee Warehouse, Iligan",
      coordinates: { lat: 8.2080, lng: 124.2252 },
      time: "2024-08-11 09:00 AM",
      status: "completed",
      icon: <Package className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Picked up by Courier",
      description: "Package picked up and on the way to sorting facility",
      location: "Sorting Facility, Tibanga",
      coordinates: { lat: 8.2180, lng: 124.2352 },
      time: "2024-08-11 11:30 AM",
      status: "completed",
      icon: <Truck className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Your rider is on the way to your location",
      location: "En route to delivery address",
      coordinates: { lat: 8.2180, lng: 124.2352 },
      time: "2024-08-11 02:20 PM",
      status: "active",
      icon: <Navigation className="w-4 h-4" />
    },
    {
      id: 4,
      title: "Delivered",
      description: "Package successfully delivered",
      location: "Your Address, Iligan City",
      coordinates: { lat: 8.2280, lng: 124.2452 },
      time: "Expected: 2024-08-11 03:00 PM",
      status: "pending",
      icon: <CheckCircle className="w-4 h-4" />
    }
  ];

  const orderInfo = {
    orderId: "SP240811001",
    productName: "Premium Wireless Headphones - Sony WH-1000XM5",
    customerAddress: "123 Main Street, Poblacion, Iligan City",
    customerPhone: "+63 912 345 6789",
    estimatedDelivery: "Today, 3:00 PM",
    courierName: "Juan dela Cruz",
    courierPhone: "+63 998 765 4321",
    courierRating: 4.8,
    vehicleType: "Motorcycle",
    deliveryFee: "₱49.00"
  };

  // Simulate real-time driver position updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      
      // Update estimated time randomly
      const times = ["12 mins", "13 mins", "14 mins", "15 mins", "16 mins"];
      setEstimatedTime(times[Math.floor(Math.random() * times.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate route points for visualization
  useEffect(() => {
    const routePoints = [
      { lat: 8.2180, lng: 124.2352 },
      { lat: 8.2200, lng: 124.2380 },
      { lat: 8.2220, lng: 124.2400 },
      { lat: 8.2250, lng: 124.2430 },
      { lat: 8.2280, lng: 124.2452 }
    ];
    setRoute(routePoints);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-500';
      case 'active': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Track Your Order</h1>
                <p className="text-sm text-gray-600">Order #{orderInfo.orderId}</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Google Maps Container */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Live Tracking</h2>
                  <p className="text-blue-100 text-sm">Real-time delivery updates</p>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">LIVE</span>
                </div>
              </div>
            </div>

            <div ref={mapContainerRef} className="relative h-96 lg:h-[450px] bg-gradient-to-br from-green-50 to-blue-50">
              {/* Simulated Google Maps Interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50">
                {/* Map Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute border-gray-300" 
                         style={{
                           width: '100%',
                           height: '1px',
                           top: `${i * 5}%`,
                           borderTop: '1px solid #cbd5e1'
                         }} />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute border-gray-300" 
                         style={{
                           height: '100%',
                           width: '1px',
                           left: `${i * 5}%`,
                           borderLeft: '1px solid #cbd5e1'
                         }} />
                  ))}
                </div>

                {/* Roads/Paths */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  {/* Main Route */}
                  <path
                    d="M 20% 80% Q 40% 60% 60% 50% T 80% 20%"
                    stroke="url(#routeGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                  {/* Secondary roads */}
                  <path d="M 0% 90% L 100% 85%" stroke="#94a3b8" strokeWidth="2" fill="none" />
                  <path d="M 0% 60% L 100% 55%" stroke="#94a3b8" strokeWidth="2" fill="none" />
                  <path d="M 0% 30% L 100% 25%" stroke="#94a3b8" strokeWidth="2" fill="none" />
                </svg>

                {/* Pickup Location */}
                <div className="absolute top-[78%] left-[18%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Pickup Point
                    </div>
                  </div>
                </div>

                {/* Driver Current Position */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-3000 ease-in-out"
                  style={{ 
                    top: '50%', 
                    left: '60%',
                  }}
                >
                  <div className="relative">
                    {/* Delivery truck with animation */}
                    <div className="bg-orange-500 p-2 rounded-full shadow-lg animate-bounce">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    {/* Pulsing circle */}
                    <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                    {/* Driver info tooltip */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-max border">
                      <div className="text-xs font-medium text-gray-900">{orderInfo.courierName}</div>
                      <div className="text-xs text-gray-600">ETA: {estimatedTime}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="absolute top-[18%] left-[78%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      Your Location
                    </div>
                  </div>
                </div>

                {/* Google Maps Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="bg-white shadow-lg rounded p-2 hover:bg-gray-50 transition-colors">
                    <span className="text-xl font-bold text-gray-600">+</span>
                  </button>
                  <button className="bg-white shadow-lg rounded p-2 hover:bg-gray-50 transition-colors">
                    <span className="text-xl font-bold text-gray-600">−</span>
                  </button>
                </div>

                {/* Map Type Toggle */}
                <div className="absolute bottom-4 right-4">
                  <select className="bg-white border rounded px-2 py-1 text-xs shadow">
                    <option>Roadmap</option>
                    <option>Satellite</option>
                    <option>Hybrid</option>
                    <option>Terrain</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Status Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Progress</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                ETA: {estimatedTime}
              </span>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 top-6 w-full h-0.5 bg-gray-200"></div>
              <div className="absolute left-0 top-6 h-0.5 bg-blue-500 transition-all duration-1000"
                   style={{ width: `${(trackingStep / trackingSteps.length) * 100}%` }}></div>
              
              <div className="relative flex justify-between">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'active' ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="mt-2 text-center max-w-24">
                      <p className={`text-xs font-medium ${getStatusColor(step.status)}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{step.time.split(' ')[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Driver Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Delivery Partner</h3>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {orderInfo.courierName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{orderInfo.courierName}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{orderInfo.courierRating}</span>
                  <span className="text-sm text-gray-400">• {orderInfo.vehicleType}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Chat</span>
              </button>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{orderInfo.productName}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium text-green-600">{orderInfo.deliveryFee}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">{orderInfo.customerAddress}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="text-sm text-gray-600">Expected: {orderInfo.estimatedDelivery}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
            
            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-100 text-green-600' :
                    step.status === 'active' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-sm ${getStatusColor(step.status)}`}>
                        {step.title}
                      </h4>
                      {step.status === 'active' && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{step.location}</span>
                      <span className="text-xs text-gray-400">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsOrderTracking;