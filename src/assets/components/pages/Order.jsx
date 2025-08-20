    import React, { useState } from 'react';

    // Main component for the admin coffee order dashboard.
    // It displays a list of coffee orders and a detailed view of the selected order.
    const App = () => {
    // Sample data to simulate a list of coffee orders.
    // In a real application, this data would be fetched from an API.
    const sampleCoffeeOrders = [
        {
        id: 'C-001',
        customer: { name: 'Sarah Chen', email: 'sarah.c@example.com' },
        status: 'Ready',
        date: '2024-05-20',
        items: [
            { name: 'Iced Latte', size: 'Large', quantity: 1, price: 5.50 },
            { name: 'Blueberry Muffin', quantity: 1, price: 3.00 },
        ],
        },
        {
        id: 'C-002',
        customer: { name: 'Alex Miller', email: 'alex.m@example.com' },
        status: 'Brewing',
        date: '2024-05-19',
        items: [
            { name: 'Espresso Shot', quantity: 2, price: 2.50 },
        ],
        },
        {
        id: 'C-003',
        customer: { name: 'Emily White', email: 'emily.w@example.com' },
        status: 'Delivered',
        date: '2024-05-18',
        items: [
            { name: 'Cappuccino', quantity: 1, price: 4.50 },
            { name: 'Croissant', quantity: 1, price: 2.75 },
        ],
        },
        {
        id: 'C-004',
        customer: { name: 'David Lee', email: 'david.l@example.com' },
        status: 'Ready',
        date: '2024-05-17',
        items: [
            { name: 'Cold Brew', size: 'Medium', quantity: 1, price: 4.75 },
        ],
        },
    ];

    // State to manage the currently selected order.
    const [selectedOrder, setSelectedOrder] = useState(null);
    // State for the search term to filter orders.
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered orders based on the search term.
    const filteredOrders = sampleCoffeeOrders.filter(order =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white text-black w-full h-full font-sans">
        {/* Breadcrumb and Search Bar Container */}
        <div className="w-full px-8 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-600">
            <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-sm font-medium">Dashboard </span>
            {selectedOrder && (
                <>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span
                    className="text-sm font-medium text-black hover:text-gray-800 cursor-pointer transition-colors duration-200"
                    onClick={() => setSelectedOrder(null)}
                >
                    Orders
                </span>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span className="text-sm font-semibold text-gray-800">
                    {selectedOrder.customer.name}
                </span>
                </>
            )}
            </div>
            <div className="relative w-full sm:w-64">
            <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* A simple magnifying glass icon (optional) */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.9 14.32a8 8 0 111.414-1.414l4.586 4.586a1 1 0 01-1.414 1.414l-4.586-4.586zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
            </div>
            </div>
        </div>
        
        {/* Main Content Area */}
        <div className="w-full mx-auto p-8 h-full bg-gray-100 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
            {/* Left column: List of coffee orders */}
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-4 shadow-sm flex-shrink-0">
            <h2 className="text-xl font-bold text-black mb-4">Coffee Orders</h2>
            <div className="space-y-3 max-h-[80vh] overflow-y-auto">
                {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`
                        p-4 rounded-md shadow-sm cursor-pointer transition-all duration-200
                        ${selectedOrder?.id === order.id ? 'bg-gray-200 ring-2 ring-black' : 'bg-white hover:bg-gray-50'}
                    `}
                    >
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-black">Order #{order.id}</span>
                        <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${order.status === 'Delivered' && 'bg-black text-white'}
                        ${order.status === 'Ready' && 'bg-gray-400 text-black'}
                        ${order.status === 'Brewing' && 'bg-gray-600 text-white'}
                        `}>
                        {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">{order.customer.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Ordered on: {order.date}
                    </p>
                    </div>
                ))
                ) : (
                <div className="text-center text-gray-500 p-4">
                    No orders found.
                </div>
                )}
            </div>
            </div>

            {/* Right column: Details of the selected order */}
            <div className="w-full md:w-2/3 bg-gray-50 rounded-lg p-6 shadow-sm flex-grow">
            {selectedOrder ? (
                <div>
                <h2 className="text-xl font-bold text-black mb-4">Order Details - Coffee Shop</h2>

                {/* Customer Information Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Info</h3>
                    <p className="text-gray-600">
                    <span className="font-medium">Name:</span> {selectedOrder.customer.name}
                    </p>
                    <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {selectedOrder.customer.email}
                    </p>
                </div>

                {/* Order Items Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
                    <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
                        <div className="flex-1">
                            <p className="font-medium text-black">{item.name}</p>
                            {item.size && (
                            <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                            </p>
                        </div>
                        <p className="font-semibold text-black">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Summary</h3>
                    <div className="flex justify-between items-center text-gray-600">
                    <span className="font-medium">Order Status:</span>
                    <span className={`
                        text-sm font-medium px-3 py-1 rounded-full
                        ${selectedOrder.status === 'Delivered' && 'bg-black text-white'}
                        ${selectedOrder.status === 'Ready' && 'bg-gray-400 text-black'}
                        ${selectedOrder.status === 'Brewing' && 'bg-gray-600 text-white'}
                    `}>
                        {selectedOrder.status}
                    </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 mt-2">
                    <span className="font-medium">Order Date:</span>
                    <span>{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-black font-bold mt-4 border-t pt-4 border-gray-200">
                    <span>Total:</span>
                    <span>
                        ${selectedOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                    </div>
                </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                <p>Select a coffee order from the list to view its details.</p>
                </div>
            )}
            </div>
        </div>
        </div>
    );
    };

    export default App;