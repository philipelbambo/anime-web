import React from "react";

const orders = [
  {
    customer: "Yuki Tanaka",
    anime: "One Piece",
    size: "M",
    quantity: 2,
    status: "Shipped",
    img: "https://m.media-amazon.com/images/I/71QKQy1g1lL._AC_UX679_.jpg"
  },
  {
    customer: "Haruto Sato",
    anime: "Naruto",
    size: "L",
    quantity: 1,
    status: "Processing",
    img: "https://m.media-amazon.com/images/I/61Qe1b6hKjL._AC_UX679_.jpg"
  },
  {
    customer: "Aoi Suzuki",
    anime: "Attack on Titan",
    size: "S",
    quantity: 3,
    status: "Delivered",
    img: "https://m.media-amazon.com/images/I/71wQKQy1g1L._AC_UX679_.jpg"
  },
  {
    customer: "Ren Yamamoto",
    anime: "Demon Slayer",
    size: "XL",
    quantity: 1,
    status: "Pending",
    img: "https://m.media-amazon.com/images/I/81QKQy1g1lL._AC_UX679_.jpg"
  }
];

const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);

export default function CustomerOrderList() {
  return (
    <div className="bg-[#e0e0e0] rounded-xl p-8 shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff] w-full mb-8">
      <h2 className="text-[#555] font-bold text-2xl mb-6">Customer Orders (Anime T-Shirts)</h2>
      <div className="mb-4 text-right text-lg text-[#444] font-semibold">
        Total T-Shirts Sold: <span className="text-blue-600">{totalQuantity}</span>
      </div>
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#f5f5f5] text-gray-700 text-sm">
            <th className="pb-3 px-2">Customer</th>
            <th className="pb-3 px-2">Anime</th>
            <th className="pb-3 px-2">T-Shirt</th>
            <th className="pb-3 px-2">Size</th>
            <th className="pb-3 px-2">Quantity</th>
            <th className="pb-3 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-b border-gray-300 last:border-b-0 hover:bg-[#f0f4fa] transition">
              <td className="py-3 px-2 font-semibold text-gray-800">{order.customer}</td>
              <td className="py-3 px-2">{order.anime}</td>
              <td className="py-3 px-2">
                <img src={order.img} alt={order.anime + ' T-shirt'} className="w-16 h-16 object-cover rounded shadow" />
              </td>
              <td className="py-3 px-2">{order.size}</td>
              <td className="py-3 px-2 font-bold text-blue-700">{order.quantity}</td>
              <td className="py-3 px-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === "Delivered" ? "bg-green-200 text-green-700" : order.status === "Shipped" ? "bg-blue-200 text-blue-700" : order.status === "Processing" ? "bg-yellow-200 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  