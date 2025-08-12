import React, { useState, useEffect, useRef } from 'react';
import { Package, MapPin, Clock, CheckCircle, AlertCircle, Truck, Home, Building, Navigation, ArrowLeft, Phone, MessageCircle, Star } from 'lucide-react';

const LazadaParcelTracker = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingMarkers, setTrackingMarkers] = useState([]);
  const [activeTab, setActiveTab] = useState('tracking');
  const [mapType, setMapType] = useState('roadmap');

  // Sample orders data matching Lazada's tracking system
  const [orders] = useState([
    {
      id: 'LGS240812001',
      customerName: 'Juan Dela Cruz',
      phone: '+639123456789',
      items: [
        { name: 'Naruto Uzumaki Hokage Hoodie', size: 'L', color: 'Orange', price: 1299, image: '🧡' },
        { name: 'Akatsuki Cloud T-Shirt', size: 'M', color: 'Black', price: 799, image: '⚫' }
      ],
      status: 'out_for_delivery',
      trackingNumber: 'SPXPH024681357902',
      orderDate: '2025-08-10',
      estimatedDelivery: 'Today by 6:00 PM',
      deliveryFee: 49,
      courier: 'SPX Express',
      courierPhone: '+639876543210',
      currentLocation: { lat: 8.4742, lng: 124.6420 },
      destination: { lat: 8.4542, lng: 124.6319 },
      route: [
        { 
          lat: 8.4803, 
          lng: 124.6498, 
          status: 'completed', 
          time: '10:00 AM, Aug 10', 
          location: 'Anime Paradise Store',
          description: 'Your parcel has been picked up by courier',
          icon: 'store'
        },
        { 
          lat: 8.4742, 
          lng: 124.6420, 
          status: 'completed', 
          time: '11:30 AM, Aug 10', 
          location: 'SPX Sorting Facility - CDO',
          description: 'Parcel processed at sorting facility',
          icon: 'facility'
        },
        { 
          lat: 8.4665, 
          lng: 124.6380, 
          status: 'completed', 
          time: '2:15 PM, Aug 12', 
          location: 'Last Mile Hub - Lapasan',
          description: 'Parcel arrived at delivery hub',
          icon: 'hub'
        },
        { 
          lat: 8.4600, 
          lng: 124.6350, 
          status: 'active', 
          time: '4:30 PM, Aug 12', 
          location: 'Out for Delivery',
          description: 'Your parcel is on the way to you!',
          icon: 'truck'
        },
        { 
          lat: 8.4542, 
          lng: 124.6319, 
          status: 'pending', 
          time: 'ETA: 6:00 PM Today', 
          location: 'Purok 5, Lapasan, CDO',
          description: 'Final destination - Your address',
          icon: 'destination'
        }
      ]
    },
    {
      id: 'LGS240811002',
      customerName: 'Maria Santos',
      phone: '+639987654321',
      items: [
        { name: 'One Piece Straw Hat Pants', size: 'XL', color: 'Navy Blue', price: 999, image: '🔵' },
        { name: 'Luffy Gear 5 Premium T-Shirt', size: 'L', color: 'White', price: 1199, image: '⚪' }
      ],
      status: 'delivered',
      trackingNumber: 'SPXPH024681357901',
      orderDate: '2025-08-09',
      estimatedDelivery: 'Delivered Aug 11',
      deliveryFee: 49,
      courier: 'SPX Express',
      courierPhone: '+639876543211',
      currentLocation: { lat: 8.4622, lng: 124.6201 },
      destination: { lat: 8.4622, lng: 124.6201 },
      rating: 5,
      route: [
        { 
          lat: 8.4803, 
          lng: 124.6498, 
          status: 'completed', 
          time: '9:00 AM, Aug 9', 
          location: 'Anime Paradise Store',
          description: 'Your parcel has been picked up by courier',
          icon: 'store'
        },
        { 
          lat: 8.4742, 
          lng: 124.6420, 
          status: 'completed', 
          time: '10:30 AM, Aug 9', 
          location: 'SPX Sorting Facility - CDO',
          description: 'Parcel processed at sorting facility',
          icon: 'facility'
        },
        { 
          lat: 8.4665, 
          lng: 124.6380, 
          status: 'completed', 
          time: '12:00 PM, Aug 11', 
          location: 'Last Mile Hub - Carmen',
          description: 'Parcel arrived at delivery hub',
          icon: 'hub'
        },
        { 
          lat: 8.4622, 
          lng: 124.6201, 
          status: 'delivered', 
          time: '2:30 PM, Aug 11', 
          location: 'Delivered to Carmen Residential',
          description: 'Successfully delivered to recipient',
          icon: 'delivered'
        }
      ]
    }
  ]);

  // Initialize Google Maps with Lazada-style configuration
  useEffect(() => {
    const initMap = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=geometry,places&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.head.appendChild(script);
        return;
      }

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 8.4803, lng: 124.6498 },
        zoom: 12,
        mapTypeId: mapType,
        tilt: 45,
        heading: 0,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: mapType === 'roadmap' ? [
          {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          }
        ] : []
      });

      setMap(mapInstance);
    };

    initMap();
  }, [mapType]);

  // Update map markers and route
  useEffect(() => {
    if (map && selectedOrder) {
      trackingMarkers.forEach(marker => marker.setMap(null));
      
      const newMarkers = [];
      const bounds = new window.google.maps.LatLngBounds();

      // Create custom marker icons
      const getMarkerIcon = (point) => {
        let color, size;
        switch (point.status) {
          case 'completed':
            color = '#00B14F';
            size = 12;
            break;
          case 'active':
            color = '#FF6D00';
            size = 16;
            break;
          case 'delivered':
            color = '#00B14F';
            size = 18;
            break;
          default:
            color = '#CCCCCC';
            size = 10;
        }

        return {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: size,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3
        };
      };

      // Add route markers
      selectedOrder.route.forEach((point, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          icon: getMarkerIcon(point),
          title: point.location,
          zIndex: point.status === 'active' ? 1000 : point.status === 'delivered' ? 999 : 500
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px; font-family: 'Segoe UI', sans-serif;">
              <div style="font-weight: 600; color: #333; margin-bottom: 4px;">${point.location}</div>
              <div style="color: #666; font-size: 12px; margin-bottom: 4px;">${point.time}</div>
              <div style="color: #888; font-size: 11px;">${point.description}</div>
              <div style="margin-top: 6px; padding: 2px 6px; background-color: ${
                point.status === 'delivered' ? '#E8F5E8' :
                point.status === 'active' ? '#FFF3E0' :
                point.status === 'completed' ? '#E8F5E8' : '#F5F5F5'
              }; color: ${
                point.status === 'delivered' ? '#2E7D32' :
                point.status === 'active' ? '#E65100' :
                point.status === 'completed' ? '#2E7D32' : '#757575'
              }; border-radius: 4px; font-size: 10px; text-align: center; font-weight: 500;">
                ${point.status.toUpperCase().replace('_', ' ')}
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        newMarkers.push(marker);
        bounds.extend({ lat: point.lat, lng: point.lng });
      });

      // Add route polyline
      const routePath = selectedOrder.route.map(point => ({ lat: point.lat, lng: point.lng }));
      const routeLine = new window.google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: '#FF6D00',
        strokeOpacity: 1,
        strokeWeight: 4
      });
      routeLine.setMap(map);
      newMarkers.push(routeLine);

      // Add animated truck marker for active delivery
      if (selectedOrder.status === 'out_for_delivery') {
        const activePoint = selectedOrder.route.find(p => p.status === 'active');
        if (activePoint) {
          const truckMarker = new window.google.maps.Marker({
            position: { lat: activePoint.lat, lng: activePoint.lng },
            map: map,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="8" width="12" height="8" rx="1" fill="#FF6D00"/>
                  <circle cx="6" cy="18" r="2" fill="#333"/>
                  <circle cx="16" cy="18" r="2" fill="#333"/>
                  <rect x="14" y="10" width="6" height="6" rx="1" fill="#FF6D00"/>
                  <rect x="16" y="12" width="2" height="2" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 16)
            },
            zIndex: 2000
          });
          newMarkers.push(truckMarker);
        }
      }

      setTrackingMarkers(newMarkers);
      map.fitBounds(bounds);
      
      setTimeout(() => {
        const currentZoom = map.getZoom();
        if (currentZoom > 16) map.setZoom(16);
      }, 500);
    }
  }, [map, selectedOrder]);

  const getStatusBadge = (status) => {
    const styles = {
      'out_for_delivery': 'bg-orange-100 text-orange-800 border-orange-200',
      'delivered': 'bg-green-100 text-green-800 border-green-200',
      'processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'in_transit': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    const labels = {
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'processing': 'Processing',
      'in_transit': 'In Transit'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lazada-style Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Track Your Order</h1>
              <p className="text-sm text-gray-500">Anime Paradise Store</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List - Lazada Style */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Your Orders</h2>
              </div>
              <div className="divide-y">
                {orders.map(order => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedOrder?.id === order.id ? 'bg-orange-50 border-r-4 border-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-lg">
                            {item.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.color} | {item.size}</p>
                          </div>
                          <span className="text-xs font-medium text-gray-900">₱{item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{order.courier}</span>
                      <span>{order.estimatedDelivery}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map and Tracking Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Summary Card - Lazada Style */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order {selectedOrder.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {selectedOrder.orderDate}</p>
                    </div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                      <p className="text-sm font-medium">{selectedOrder.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Courier</p>
                      <p className="text-sm font-medium">{selectedOrder.courier}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Estimated Delivery</p>
                      <p className="text-sm font-medium text-orange-600">{selectedOrder.estimatedDelivery}</p>
                    </div>
                  </div>

                  {selectedOrder.status === 'out_for_delivery' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Truck className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">Your order is out for delivery!</span>
                      </div>
                      <p className="text-xs text-orange-700">The courier is on the way to your address.</p>
                      <div className="flex space-x-3 mt-3">
                        <button className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium hover:bg-orange-200">
                          <Phone className="w-3 h-3" />
                          <span>Call Courier</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium hover:bg-orange-200">
                          <MessageCircle className="w-3 h-3" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedOrder.status === 'delivered' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Successfully Delivered!</span>
                        </div>
                        {selectedOrder.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(selectedOrder.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-green-700 mt-1">Thank you for shopping with us!</p>
                    </div>
                  )}
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Live Tracking</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setMapType('roadmap')}
                          className={`px-3 py-1 text-xs rounded ${mapType === 'roadmap' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          Map
                        </button>
                        <button
                          onClick={() => setMapType('satellite')}
                          className={`px-3 py-1 text-xs rounded ${mapType === 'satellite' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          Satellite
                        </button>
                        <button
                          onClick={() => map && map.setTilt(map.getTilt() === 0 ? 45 : 0)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center space-x-1"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>3D</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div ref={mapRef} className="h-96 w-full" />
                </div>

                {/* Delivery Timeline */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Delivery Timeline</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {selectedOrder.route.map((point, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              point.status === 'delivered' ? 'bg-green-500' :
                              point.status === 'active' ? 'bg-orange-500' :
                              point.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {point.status === 'delivered' ? (
                                <CheckCircle className="w-3 h-3 text-white" />
                              ) : point.status === 'active' ? (
                                <Truck className="w-3 h-3 text-white" />
                              ) : point.status === 'completed' ? (
                                <CheckCircle className="w-3 h-3 text-white" />
                              ) : (
                                <Clock className="w-3 h-3 text-white" />
                              )}
                            </div>
                            {index < selectedOrder.route.length - 1 && (
                              <div className="absolute left-3 top-6 w-px h-12 bg-gray-200"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{point.location}</h4>
                              <span className="text-xs text-gray-500">{point.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{point.description}</p>
                            {point.status === 'active' && (
                              <div className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></div>
                                In Progress
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order to Track</h3>
                <p className="text-gray-500">Choose an order from the list to view its tracking details and location on the map.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazadaParcelTracker;