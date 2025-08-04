import React, { useState } from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';

// Simple emoji list for picker
const emojiList = [
  { char: '😀', code: '1f600' },
  { char: '😂', code: '1f602' },
  { char: '😍', code: '1f60d' },
  { char: '😎', code: '1f60e' },
  { char: '👍', code: '1f44d' },
  { char: '🙏', code: '1f64f' },
  { char: '🎉', code: '1f389' },
  { char: '🥳', code: '1f973' },
  { char: '😢', code: '1f622' },
  { char: '😡', code: '1f621' },
  { char: '🔥', code: '1f525' },
  { char: '💯', code: '1f4af' },
  { char: '❤️', code: '2764' },
  { char: '😆', code: '1f606' },
  { char: '😅', code: '1f605' },
  { char: '😇', code: '1f607' },
  { char: '😜', code: '1f61c' },
  { char: '🤩', code: '1f929' },
  { char: '😱', code: '1f631' },
  { char: '🤔', code: '1f914' },
];

// Sample client data with order-related conversations
const initialClients = [
  {
    id: 1,
    name: 'Maria Santos',
    avatar: 'MS',
    orderNumber: '#ORD-2024-001',
    orderStatus: 'pending',
    orderItems: 'Pizza Margherita x2, Coke x1',
    totalAmount: '₱650.00',
    recipient: 'admin',
    lastMessage: 'Hi! When will my order be ready?',
    timestamp: '2 minutes ago',
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: 'Client',
        message: 'Hi! I just placed an order #ORD-2024-001',
        timestamp: '2025-08-02 09:00',
        orderInfo: {
          orderNumber: '#ORD-2024-001',
          items: 'Pizza Margherita x2, Coke x1',
          total: '₱650.00'
        }
      },
      {
        id: 2,
        sender: 'Client',
        message: 'Hi! When will my order be ready?',
        timestamp: '2025-08-02 09:05',
      },
    ]
  },
  {
    id: 2,
    name: 'John Dela Cruz',
    avatar: 'JD',
    orderNumber: '#ORD-2024-002',
    orderStatus: 'preparing',
    orderItems: 'Burger Combo x1, Fries x2',
    totalAmount: '₱450.00',
    recipient: 'rider',
    lastMessage: 'Where are you now? I\'m waiting at the gate.',
    timestamp: '5 minutes ago',
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: 'Admin',
        message: 'Your order #ORD-2024-002 is now being prepared! Estimated time: 15 minutes.',
        timestamp: '2025-08-02 08:45',
      },
      {
        id: 2,
        sender: 'Client',
        message: 'Okay, thank you! Please update me when the rider is on the way.',
        timestamp: '2025-08-02 08:46',
      },
      {
        id: 3,
        sender: 'Admin',
        message: 'Your order is ready and our rider is now on the way to your location!',
        timestamp: '2025-08-02 08:55',
      },
      {
        id: 4,
        sender: 'Client',
        message: 'Where are you now? I\'m waiting at the gate.',
        timestamp: '2025-08-02 09:00',
      },
    ]
  },
  {
    id: 3,
    name: 'Anna Reyes',
    avatar: 'AR',
    orderNumber: '#ORD-2024-003',
    orderStatus: 'delivered',
    orderItems: 'Chicken Wings x1, Rice x2',
    totalAmount: '₱380.00',
    recipient: 'admin',
    lastMessage: 'Thank you! The food was delicious!',
    timestamp: '1 hour ago',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'Client',
        message: 'Hi! I have a concern about my order #ORD-2024-003',
        timestamp: '2025-08-02 08:00',
      },
      {
        id: 2,
        sender: 'Admin',
        message: 'Hello! What seems to be the issue with your order?',
        timestamp: '2025-08-02 08:01',
      },
      {
        id: 3,
        sender: 'Client',
        message: 'The chicken wings were a bit cold when delivered. Can you help?',
        timestamp: '2025-08-02 08:02',
      },
      {
        id: 4,
        sender: 'Admin',
        message: 'I apologize for that! We\'ll send you a replacement order right away, no charge.',
        timestamp: '2025-08-02 08:03',
      },
      {
        id: 5,
        sender: 'Client',
        message: 'Thank you! The food was delicious!',
        timestamp: '2025-08-02 08:30',
      },
    ]
  },
  {
    id: 4,
    name: 'Robert Garcia',
    avatar: 'RG',
    orderNumber: '#ORD-2024-004',
    orderStatus: 'cancelled',
    orderItems: 'Pasta Carbonara x1, Garlic Bread x1',
    totalAmount: '₱520.00',
    recipient: 'admin',
    lastMessage: 'Can I get a refund for my cancelled order?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: 'Client',
        message: 'I need to cancel my order #ORD-2024-004. Something came up.',
        timestamp: '2025-08-02 06:00',
      },
      {
        id: 2,
        sender: 'Admin',
        message: 'Sure! I\'ve cancelled your order. Your refund will be processed within 24 hours.',
        timestamp: '2025-08-02 06:01',
      },
      {
        id: 3,
        sender: 'Client',
        message: 'Can I get a refund for my cancelled order?',
        timestamp: '2025-08-02 06:30',
      },
    ]
  },
];

const Message = () => {
  const [clients, setClients] = useState(initialClients);
  const [activeClientId, setActiveClientId] = useState(1);
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRecipient, setFilterRecipient] = useState('all'); // all, admin, rider
  const activeClient = clients.find(client => client.id === activeClientId);
  const activeMessages = activeClient ? activeClient.messages : [];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRecipient === 'all' || client.recipient === filterRecipient;
    return matchesSearch && matchesFilter;
  });

  const handleSend = () => {
    if (input.trim() === '' || !activeClient) return;
    const newMessage = {
      id: activeMessages.length + 1,
      sender: 'Admin',
      message: input,
      timestamp: new Date().toLocaleString(),
    };
    setClients(clients.map(client => 
      client.id === activeClientId 
        ? { 
            ...client, 
            messages: [...client.messages, newMessage],
            lastMessage: input,
            timestamp: 'now',
            unreadCount: 0
          }
        : client
    ));
    setInput('');
  };

  const handleClientSelect = (clientId) => {
    setActiveClientId(clientId);
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, unreadCount: 0 }
        : client
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'out_for_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-600';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const getRecipientColor = (recipient) => {
    return recipient === 'admin' ? 'text-blue-600' : 'text-green-600';
  };

  return (
    <div className="h-full bg-gray-200 p-5 overflow-y-hidden">
          <div className="h-full w-full">
            <BreadcrumbSearch />
            <div 
              className="w-full rounded-lg flex h-[650px]" 
              style={{ 
                background: '#e0e0e0',
                boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
              }}
            >
              {/* Client List Sidebar */}
              <div 
                className="w-200 border-r border-gray-200 flex flex-col"
                style={{ 
                  background: '#e0e0e0',
                  boxShadow: 'inset 8px 8px 15px #a3b1c6, inset -8px -8px 15px #ffffff'
                }}
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800" style={{ color: '#000000' }}>
                      Order Messages
                    </h2>
                    <div className="flex gap-2">
                      <select 
                        className="text-sm border rounded px-2 py-1"
                        value={filterRecipient}
                        onChange={(e) => setFilterRecipient(e.target.value)}
                        style={{ 
                          background: '#e0e0e0',
                          boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff',
                          color: '#000000'
                        }}
                      >
                        <option value="all">All Messages</option>
                        <option value="admin">To Admin</option>
                        <option value="rider">To Rider</option>
                      </select>
                    </div>
                  </div>
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search orders or customers..."
                      className="w-full pl-10 pr-4 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ 
                        background: '#e0e0e0',
                        boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
                        color: '#000000'
                      }}
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                {/* Client List */}
                <div className="flex-1 h-full overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-4 cursor-pointer transition-colors border-b border-gray-100 ${
                        activeClientId === client.id 
                          ? 'border-r-2 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleClientSelect(client.id)}
                      style={activeClientId === client.id ? {
                        background: '#e0e0e0',
                        boxShadow: 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
                      } : {}}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ 
                              background: '#4f46e5',
                              boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                            }}
                          >
                            {client.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(client.orderStatus)}`}></div>
                        </div>
                        {/* Client Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm" style={{ color: '#000000' }}>
                              {client.name}
                            </h3>
                            <span className="text-xs text-gray-500" style={{ color: '#000000' }}>
                              {client.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-gray-700" style={{ color: '#000000' }}>
                              {client.orderNumber}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(client.orderStatus)}`}>
                              {getStatusText(client.orderStatus)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate" style={{ color: '#000000' }}>
                            {client.orderItems}
                          </p>
                          <p className="text-xs font-semibold text-green-600 mt-1" style={{ color: '#000000' }}>
                            {client.totalAmount}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs font-medium ${getRecipientColor(client.recipient)}`} style={{ color: '#000000' }}>
                              → {client.recipient === 'admin' ? 'Admin' : 'Rider'}
                            </span>
                            {client.unreadCount > 0 && (
                              <div 
                                className="text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                                style={{ 
                                  background: '#ef4444',
                                  boxShadow: '2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff'
                                }}
                              >
                                {client.unreadCount}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1 italic" style={{ color: '#000000' }}>
                            "{client.lastMessage}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Chat Area */}
              <div 
                className="flex-1 h-full flex flex-col"
                style={{ 
                  background: '#e0e0e0',
                  boxShadow: 'inset 8px 8px 15px #a3b1c6, inset -8px -8px 15px #ffffff'
                }}
              >
                {activeClient ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ 
                                background: '#4f46e5',
                                boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                              }}
                            >
                              {activeClient.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(activeClient.orderStatus)}`}></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900" style={{ color: '#000000' }}>
                              {activeClient.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600" style={{ color: '#000000' }}>
                                {activeClient.orderNumber}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(activeClient.orderStatus)}`}>
                                {getStatusText(activeClient.orderStatus)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Order Summary */}
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600" style={{ color: '#000000' }}>
                            {activeClient.totalAmount}
                          </p>
                          <p className={`text-xs ${getRecipientColor(activeClient.recipient)}`} style={{ color: '#000000' }}>
                            Messages to: {activeClient.recipient === 'admin' ? 'Admin' : 'Rider'}
                          </p>
                        </div>
                      </div>
                      {/* Order Details */}
                      <div 
                        className="mt-3 p-3 rounded-lg"
                        style={{ 
                          background: '#e0e0e0',
                          boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
                        }}
                      >
                        <p className="text-sm text-gray-700" style={{ color: '#000000' }}>
                          <span className="font-medium">Order Items:</span> {activeClient.orderItems}
                        </p>
                      </div>
                    </div>
                    {/* Messages */}
                    <div 
                      className="flex-1 overflow-y-auto p-4"
                      style={{ 
                        background: '#e0e0e0',
                        boxShadow: 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
                      }}
                    >
                      {activeMessages.map((msg) => (
                        <div key={msg.id} className={`mb-4 flex ${msg.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                          <div 
                            className={`max-w-md px-4 py-2 rounded-2xl text-white ${
                              msg.sender === 'Admin' 
                                ? 'text-white' 
                                : 'text-gray-900 border border-gray-200'
                            }`} 
                            style={{ 
                              wordBreak: 'break-word',
                              background: msg.sender === 'Admin' ? '#4f46e5' : '#e0e0e0',
                              boxShadow: msg.sender === 'Admin' 
                                ? '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                                : '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                            }}
                          >
                            {msg.orderInfo && (
                              <div 
                                className="mb-2 p-2 rounded text-blue-800 text-xs"
                                style={{ 
                                  background: '#dbeafe',
                                  boxShadow: 'inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff',
                                  color: '#000000'
                                }}
                              >
                                <div className="font-semibold" style={{ color: '#000000' }}>
                                  {msg.orderInfo.orderNumber}
                                </div>
                                <div style={{ color: '#000000' }}>{msg.orderInfo.items}</div>
                                <div className="font-semibold" style={{ color: '#000000' }}>
                                  {msg.orderInfo.total}
                                </div>
                              </div>
                            )}
                            <div className="text-sm" style={{ color: '#000000' }}>
                              {msg.message}
                            </div>
                            <div className={`text-xs mt-1 ${msg.sender === 'Admin' ? 'text-blue-100' : 'text-gray-500'}`} style={{ color: '#000000' }}>
                              {msg.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Message Input */}
                    <div 
                      className="p-4 border-t border-gray-200"
                      style={{ 
                        background: '#e0e0e0'
                      }}
                    >
                      <div className="mb-2 text-xs text-gray-600" style={{ color: '#000000' }}>
                        Responding as: <span className="font-semibold" style={{ color: '#000000' }}>Admin</span> 
                        {activeClient.recipient === 'rider' && (
                          <span className="ml-2 text-orange-600" style={{ color: '#000000' }}>
                            (This message is intended for Rider)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 relative">
                        <button 
                          className="p-2 rounded-full"
                          style={{ 
                            background: '#e0e0e0',
                            boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="flex-1 border-0 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder={`Reply to ${activeClient.name}...`}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                          style={{ 
                            background: '#e0e0e0',
                            boxShadow: 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
                            color: '#000000'
                          }}
                        />
                        <button
                          type="button"
                          className="p-2 rounded-full text-xl"
                          onClick={() => setShowEmojis(!showEmojis)}
                          title="Choose emoji"
                          style={{ 
                            background: '#e0e0e0',
                            boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                          }}
                        >
                          😊
                        </button>
                        {showEmojis && (
                          <div 
                            className="absolute bottom-14 right-0 border rounded-lg p-1 grid grid-cols-4 gap-1 w-24 max-h-32 overflow-y-auto z-10"
                            style={{ 
                              background: '#e0e0e0',
                              boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
                            }}
                          >
                            {emojiList.map((emoji, idx) => (
                              <button
                                key={idx}
                                type="button"
                                className="p-0.5 rounded flex items-center justify-center w-5 h-5"
                                onClick={() => {
                                  setInput(input + emoji.char);
                                  setShowEmojis(false);
                                }}
                                title={emoji.char}
                                style={{ 
                                  background: '#e0e0e0',
                                  boxShadow: '2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff'
                                }}
                              >
                                <img
                                  src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${emoji.code}.png`}
                                  alt={emoji.char}
                                  style={{ width: '12px', height: '12px' }}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                        <button
                          className="text-white p-2 rounded-full transition"
                          onClick={handleSend}
                          style={{ 
                            background: '#4f46e5',
                            boxShadow: '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-lg" style={{ color: '#000000' }}>
                        Select an order to view messages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  );
};

export default Message;