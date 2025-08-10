import React, { useState, useRef, useEffect } from 'react';

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
  { char: '🍕', code: '1f355' },
  { char: '🚗', code: '1f697' },
  { char: '📱', code: '1f4f1' },
  { char: '✅', code: '2705' },
];

// AI Chatbot responses
const aiResponses = {
  greetings: [
    "Hello! I'm your AI assistant. How can I help you manage your orders today?",
    "Hi there! Ready to assist you with order management and customer service!",
    "Welcome! I'm here to help streamline your messaging and order processes."
  ],
  orderStatus: [
    "I can help you check order statuses. Which order would you like me to look into?",
    "Let me assist you with order tracking. Please provide the order number.",
    "I'm ready to help with order updates. What specific information do you need?"
  ],
  customerService: [
    "For customer service issues, I recommend being empathetic and solution-focused. What's the situation?",
    "I can help you craft appropriate responses to customer concerns. What's the issue?",
    "Customer satisfaction is key! Tell me about the problem and I'll suggest the best approach."
  ],
  riderCommunication: [
    "I can help you communicate effectively with riders. What information needs to be shared?",
    "For rider coordination, clear and timely communication is essential. What's the update?",
    "I'll help you send clear instructions to the rider. What details should be included?"
  ],
  suggestions: [
    "Here are some quick actions you might want to take:",
    "I suggest prioritizing urgent orders and responding to customer concerns first.",
    "Consider sending proactive updates to customers about their order status."
  ]
};

// Sample data
const initialConversations = [
  {
    id: 'ai-assistant',
    type: 'ai',
    name: 'AI Assistant',
    avatar: 'AI',
    lastMessage: 'Hello! How can I assist you today?',
    timestamp: 'Active',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'AI',
        message: 'Hello! I\'m your AI assistant ready to help you manage orders and communications efficiently. How can I assist you today?',
        timestamp: new Date().toLocaleString(),
        type: 'ai'
      }
    ]
  },
  {
    id: 1,
    type: 'customer',
    name: 'Maria Santos',
    avatar: 'MS',
    orderNumber: '#ORD-2024-001',
    orderStatus: 'pending',
    orderItems: 'Pizza Margherita x2, Coke x1',
    totalAmount: '₱650.00',
    lastMessage: 'Hi! When will my order be ready?',
    timestamp: '2 minutes ago',
    unreadCount: 1,
    phone: '+63 912 345 6789',
    address: '123 Main St, Cagayan de Oro',
    messages: [
      {
        id: 1,
        sender: 'Customer',
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
        sender: 'Customer',
        message: 'Hi! When will my order be ready?',
        timestamp: '2025-08-02 09:05',
      },
    ]
  },
  {
    id: 'rider-1',
    type: 'rider',
    name: 'Carlos Rodriguez',
    avatar: 'CR',
    status: 'available',
    currentOrders: ['#ORD-2024-002', '#ORD-2024-005'],
    location: 'Downtown Area',
    lastMessage: 'Ready for next delivery!',
    timestamp: '1 minute ago',
    unreadCount: 0,
    phone: '+63 920 123 4567',
    vehicle: 'Motorcycle - ABC 123',
    rating: 4.8,
    messages: [
      {
        id: 1,
        sender: 'Rider',
        message: 'Good morning! I\'ve completed the morning deliveries.',
        timestamp: '2025-08-02 09:00',
      },
      {
        id: 2,
        sender: 'Admin',
        message: 'Great job! Please proceed to pickup order #ORD-2024-002.',
        timestamp: '2025-08-02 09:01',
      },
      {
        id: 3,
        sender: 'Rider',
        message: 'Ready for next delivery!',
        timestamp: '2025-08-02 09:15',
      },
    ]
  },
  {
    id: 2,
    type: 'customer',
    name: 'John Dela Cruz',
    avatar: 'JD',
    orderNumber: '#ORD-2024-002',
    orderStatus: 'out_for_delivery',
    orderItems: 'Burger Combo x1, Fries x2',
    totalAmount: '₱450.00',
    lastMessage: 'Thank you for the update!',
    timestamp: '5 minutes ago',
    unreadCount: 0,
    phone: '+63 915 678 9012',
    address: '456 Oak Ave, Cagayan de Oro',
    messages: [
      {
        id: 1,
        sender: 'Admin',
        message: 'Your order #ORD-2024-002 is now being prepared! Estimated time: 15 minutes.',
        timestamp: '2025-08-02 08:45',
      },
      {
        id: 2,
        sender: 'Customer',
        message: 'Okay, thank you! Please update me when the rider is on the way.',
        timestamp: '2025-08-02 08:46',
      },
      {
        id: 3,
        sender: 'Admin',
        message: 'Your order is ready and our rider Carlos is now on the way to your location!',
        timestamp: '2025-08-02 08:55',
      },
      {
        id: 4,
        sender: 'Customer',
        message: 'Thank you for the update!',
        timestamp: '2025-08-02 09:00',
      },
    ]
  },
  {
    id: 'rider-2',
    type: 'rider',
    name: 'Miguel Santos',
    avatar: 'MS',
    status: 'busy',
    currentOrders: ['#ORD-2024-003'],
    location: 'Uptown District',
    lastMessage: 'Customer not answering, trying again.',
    timestamp: '10 minutes ago',
    unreadCount: 1,
    phone: '+63 918 234 5678',
    vehicle: 'Motorcycle - XYZ 789',
    rating: 4.9,
    messages: [
      {
        id: 1,
        sender: 'Admin',
        message: 'Please deliver order #ORD-2024-003 to Anna Reyes at 789 Pine St.',
        timestamp: '2025-08-02 08:30',
      },
      {
        id: 2,
        sender: 'Rider',
        message: 'On my way to the pickup location.',
        timestamp: '2025-08-02 08:35',
      },
      {
        id: 3,
        sender: 'Rider',
        message: 'Customer not answering, trying again.',
        timestamp: '2025-08-02 08:50',
      },
    ]
  }
];

const BreadcrumbSearch = () => (
  <div className="flex items-center justify-between mb-6">
    <nav className="flex items-center space-x-2 text-sm text-black">
      <span>Dashboard</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-black font-medium">Messages</span>
    </nav>
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Global search..."
          className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          style={{ 
            background: '#f8fafc',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
          }}
        />
        <svg className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </div>
);

const EnhancedMessage = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState('ai-assistant');
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, customer, rider, ai
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const activeConversation = conversations.find(conv => conv.id === activeConversationId);
  const activeMessages = activeConversation ? activeConversation.messages : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (conv.orderNumber && conv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
    } else if (message.includes('order') || message.includes('status')) {
      return aiResponses.orderStatus[Math.floor(Math.random() * aiResponses.orderStatus.length)];
    } else if (message.includes('customer') || message.includes('complaint') || message.includes('issue')) {
      return aiResponses.customerService[Math.floor(Math.random() * aiResponses.customerService.length)];
    } else if (message.includes('rider') || message.includes('delivery') || message.includes('driver')) {
      return aiResponses.riderCommunication[Math.floor(Math.random() * aiResponses.riderCommunication.length)];
    } else {
      return aiResponses.suggestions[Math.floor(Math.random() * aiResponses.suggestions.length)];
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || !activeConversation) return;

    const newMessage = {
      id: activeMessages.length + 1,
      sender: 'Admin',
      message: input,
      timestamp: new Date().toLocaleString(),
    };

    setConversations(conversations.map(conv => 
      conv.id === activeConversationId 
        ? { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            lastMessage: input,
            timestamp: 'now',
            unreadCount: 0
          }
        : conv
    ));

    const userInput = input;
    setInput('');
    
    if (activeConversation.type === 'ai') {
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse = {
          id: activeMessages.length + 2,
          sender: 'AI',
          message: generateAIResponse(userInput),
          timestamp: new Date().toLocaleString(),
          type: 'ai'
        };
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, aiResponse],
                lastMessage: aiResponse.message,
                timestamp: 'now'
              }
            : conv
        ));
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    setConversations(conversations.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
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
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
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
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const getConversationIcon = (type) => {
    switch(type) {
      case 'ai':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'customer':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'rider':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white p-5 overflow-y-hidden">
      <div className="h-full w-full">
        <BreadcrumbSearch />
        <div 
          className="w-full rounded-lg flex h-[730px]" 
          style={{ 
            background: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {/* Conversations Sidebar */}
          <div 
            className="w-80 border-r border-gray-300 flex flex-col"
            style={{ 
              background: '#f3f3f3',
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-black flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Messages
                </h2>
                <select 
                  className="text-sm border border-gray-400 rounded px-3 py-1 text-black"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ background: 'white' }}
                >
                  <option value="all">All</option>
                  <option value="ai">AI Assistant</option>
                  <option value="customer">Customers</option>
                  <option value="rider">Riders</option>
                </select>
              </div>
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'white' }}
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {/* Conversations List */}
            <div className="flex-1 h-full overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-200 hover:bg-gray-200 ${
                    activeConversationId === conv.id 
                      ? 'bg-gray-300 border-r-4 border-black' 
                      : ''
                  }`}
                  onClick={() => handleConversationSelect(conv.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${
                          conv.type === 'ai' ? 'bg-black text-white' :
                          conv.type === 'rider' ? 'bg-gray-800 text-white' :
                          'bg-gray-800 text-white'
                        }`}
                        style={{ 
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                      >
                        {conv.avatar}
                      </div>
                      {conv.type !== 'ai' && (
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          conv.type === 'rider' ? getStatusColor(conv.status) : getStatusColor(conv.orderStatus)
                        }`}></div>
                      )}
                      <div className="absolute -top-1 -left-1 text-white">
                        {getConversationIcon(conv.type)}
                      </div>
                    </div>
                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-black text-sm truncate">
                          {conv.name}
                        </h3>
                        <span className="text-xs text-gray-600">
                          {conv.timestamp}
                        </span>
                      </div>
                      {conv.type === 'customer' && (
                        <>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-gray-700">
                              {conv.orderNumber}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(conv.orderStatus)}`}>
                              {getStatusText(conv.orderStatus)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {conv.orderItems}
                          </p>
                          <p className="text-xs font-semibold text-gray-800 mt-1">
                            {conv.totalAmount}
                          </p>
                        </>
                      )}
                      {conv.type === 'rider' && (
                        <>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(conv.status)}`}>
                              {getStatusText(conv.status)}
                            </span>
                            <span className="text-xs text-gray-600">
                              {conv.location}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Orders: {conv.currentOrders?.join(', ') || 'None'}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-gray-600">{conv.rating}</span>
                            <span className="text-xs text-gray-500">• {conv.vehicle}</span>
                          </div>
                        </>
                      )}
                      {conv.type === 'ai' && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-600">AI Active</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-700 truncate italic">
                          "{conv.lastMessage}"
                        </p>
                        {conv.unreadCount > 0 && (
                          <div 
                            className="text-white text-xs rounded-full h-5 w-5 flex items-center justify-center bg-black"
                            style={{ 
                              boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                            }}
                          >
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
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
              background: '#ffffff',
            }}
          >
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div 
                  className="p-4 border-b border-gray-300"
                  style={{ 
                    background: '#f9f9f9',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                            activeConversation.type === 'ai' ? 'bg-black text-white' :
                            activeConversation.type === 'rider' ? 'bg-gray-800 text-white' :
                            'bg-gray-800 text-white'
                          }`}
                          style={{ 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                          }}
                        >
                          {activeConversation.avatar}
                        </div>
                        {activeConversation.type !== 'ai' && (
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            activeConversation.type === 'rider' ? getStatusColor(activeConversation.status) : getStatusColor(activeConversation.orderStatus)
                          }`}></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {activeConversation.name}
                          {getConversationIcon(activeConversation.type)}
                        </h3>
                        {activeConversation.type === 'customer' && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {activeConversation.orderNumber}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(activeConversation.orderStatus)}`}>
                              {getStatusText(activeConversation.orderStatus)}
                            </span>
                          </div>
                        )}
                        {activeConversation.type === 'rider' && (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getStatusColor(activeConversation.status)}`}>
                              {getStatusText(activeConversation.status)}
                            </span>
                            <span className="text-sm text-gray-600">{activeConversation.location}</span>
                          </div>
                        )}
                        {activeConversation.type === 'ai' && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600">AI Ready</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Contact Info */}
                    <div className="text-right">
                      {activeConversation.type === 'customer' && (
                        <>
                          <p className="text-sm font-semibold text-gray-800">
                            {activeConversation.totalAmount}
                          </p>
                          <p className="text-xs text-gray-500">
                            📱 {activeConversation.phone}
                          </p>
                        </>
                      )}
                      {activeConversation.type === 'rider' && (
                        <>
                          <p className="text-sm font-semibold text-gray-800">
                            ⭐ {activeConversation.rating}
                          </p>
                          <p className="text-xs text-gray-500">
                            📱 {activeConversation.phone}
                          </p>
                        </>
                      )}
                      {activeConversation.type === 'ai' && (
                        <div className="flex items-center gap-2">
                          <div className="text-xs bg-black text-white px-2 py-1 rounded">
                            AI Assistant
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Additional Info */}
                  {activeConversation.type === 'customer' && (
                    <div 
                      className="mt-3 p-3 rounded-lg bg-gray-100 border border-gray-300"
                    >
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Order Items:</span> {activeConversation.orderItems}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        📍 {activeConversation.address}
                      </p>
                    </div>
                  )}
                  {activeConversation.type === 'rider' && (
                    <div 
                      className="mt-3 p-3 rounded-lg bg-gray-100 border border-gray-300"
                    >
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Vehicle:</span> {activeConversation.vehicle}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Current Orders:</span> {activeConversation.currentOrders?.join(', ') || 'None'}
                      </p>
                    </div>
                  )}
                </div>
                {/* Messages */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ 
                    background: '#fafafa'
                  }}
                >
                  {activeMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${
                      msg.sender === 'Admin' ? 'justify-end' : 'justify-start'
                    }`}>
                      <div 
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          msg.sender === 'Admin' 
                            ? 'bg-black text-white' 
                            : msg.sender === 'AI'
                            ? 'bg-gray-800 text-white'
                            : 'bg-white text-gray-900 border border-gray-300'
                        }`} 
                        style={{ 
                          wordBreak: 'break-word',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        {msg.orderInfo && (
                          <div 
                            className="mb-2 p-2 rounded bg-gray-200 text-gray-800 text-xs border border-gray-300"
                          >
                            <div className="font-semibold">
                              {msg.orderInfo.orderNumber}
                            </div>
                            <div>{msg.orderInfo.items}</div>
                            <div className="font-semibold">
                              {msg.orderInfo.total}
                            </div>
                          </div>
                        )}
                        {msg.sender === 'AI' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium">AI Assistant</span>
                          </div>
                        )}
                        <div className="text-sm">
                          {msg.message}
                        </div>
                        <div className={`text-xs mt-2 ${
                          msg.sender === 'Admin' || msg.sender === 'AI' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && activeConversation.type === 'ai' && (
                    <div className="flex justify-start">
                      <div 
                        className="bg-gray-800 text-white px-4 py-3 rounded-2xl"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-xs">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {/* Message Input */}
                <div 
                  className="p-4 border-t border-gray-300"
                  style={{ 
                    background: '#f9f9f9',
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      Messaging as: <span className="font-semibold text-black">Admin</span>
                      {activeConversation.type === 'customer' && (
                        <span className="ml-2 text-gray-700">
                          → Customer Service
                        </span>
                      )}
                      {activeConversation.type === 'rider' && (
                        <span className="ml-2 text-gray-700">
                          → Rider Coordination
                        </span>
                      )}
                      {activeConversation.type === 'ai' && (
                        <span className="ml-2 text-gray-700">
                          → AI Assistant
                        </span>
                      )}
                    </div>
                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      {activeConversation.type === 'customer' && (
                        <>
                          <button 
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                            onClick={() => setInput("Your order is ready for pickup! 🎉")}
                          >
                            Order Ready
                          </button>
                          <button 
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                            onClick={() => setInput("Your order is out for delivery! Our rider will contact you shortly. 🚗")}
                          >
                            Out for Delivery
                          </button>
                        </>
                      )}
                      {activeConversation.type === 'rider' && (
                        <>
                          <button 
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                            onClick={() => setInput("Please proceed to pickup the next order. Location details attached. 📍")}
                          >
                            New Pickup
                          </button>
                          <button 
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                            onClick={() => setInput("Great job on the delivery! Please confirm completion. ✅")}
                          >
                            Confirm Delivery
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <button 
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      title="Attach file"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
                      placeholder={`Message ${activeConversation.name}...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                      style={{ background: 'white' }}
                    />
                    <button
                      type="button"
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-xl relative"
                      onClick={() => setShowEmojis(!showEmojis)}
                      title="Choose emoji"
                    >
                      😊
                    </button>
                    {showEmojis && (
                      <div 
                        className="absolute bottom-14 right-16 border rounded-lg p-2 grid grid-cols-6 gap-1 w-48 max-h-40 overflow-y-auto z-10 bg-white shadow-xl"
                      >
                        {emojiList.map((emoji, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="p-1 rounded hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8"
                            onClick={() => {
                              setInput(input + emoji.char);
                              setShowEmojis(false);
                            }}
                            title={emoji.char}
                          >
                            <img
                              src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${emoji.code}.png`}
                              alt={emoji.char}
                              style={{ width: '20px', height: '20px' }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      className="text-white p-3 rounded-full transition-all hover:scale-105"
                      onClick={handleSend}
                      disabled={!input.trim()}
                      style={{ 
                        background: input.trim() ? '#000' : '#ccc',
                        boxShadow: input.trim() ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
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
                  <div className="w-20 h-20 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-800">
                    Select a conversation to start messaging
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Chat with customers, coordinate with riders, or get help from AI
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

export default EnhancedMessage;