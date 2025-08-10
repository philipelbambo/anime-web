import BreadcrumbSearch from './BreadcrumbSearch';

// Updated summary data for anime apparel store
const summaryData = {
  highlights: [
    {
      title: "Anime T-Shirts",
      description: "Premium quality cotton tees featuring iconic anime characters and series. From classic shounen heroes to slice-of-life favorites.",
      count: 150,
      unit: "designs"
    },
    {
      title: "Anime Pants & Joggers", 
      description: "Comfortable streetwear-inspired pants with subtle anime motifs. Perfect for casual wear and conventions.",
      count: 75,
      unit: "styles"
    },
    {
      title: "Anime Hoodies",
      description: "Cozy hoodies with vibrant anime artwork. Featuring both minimalist designs and bold character prints.",
      count: 90,
      unit: "collections"
    }
  ],
  featured: [
    {
      name: "T-Shirts",
      product: "Demon Slayer Tanjiro Edition",
      sold: 342,
      revenue: "₱68,400"
    },
    {
      name: "Hoodies",
      product: "Attack on Titan Survey Corps",
      sold: 189,
      revenue: "₱113,400"
    },
    {
      name: "Pants",
      product: "Naruto Hidden Leaf Joggers",
      sold: 156,
      revenue: "₱46,800"
    },
    {
      name: "T-Shirts",
      product: "One Piece Straw Hat Crew",
      sold: 298,
      revenue: "₱59,600"
    },
    {
      name: "Hoodies",
      product: "My Hero Academia All Might",
      sold: 167,
      revenue: "₱100,200"
    }
  ],
  customerFeedback: [
    {
      customer: "Akira M.",
      feedback: "The fabric quality is amazing! My Jujutsu Kaisen hoodie has been through multiple washes and still looks brand new."
    },
    {
      customer: "Sarah L.",
      feedback: "Love the attention to detail on the prints. The colors are vibrant and the designs are authentic to the anime style."
    },
    {
      customer: "Miguel R.",
      feedback: "Fast shipping and excellent customer service. The sizing chart was spot-on for the joggers I ordered."
    },
    {
      customer: "Emma K.",
      feedback: "Finally found a store that understands anime fashion! The designs are tasteful and not too flashy for everyday wear."
    },
    {
      customer: "Jake T.",
      feedback: "Great quality merch at reasonable prices. Will definitely be ordering more for the upcoming anime convention."
    }
  ]
};

const Summary = () => (
  <div className="min-h-screen bg-white p-5">
    <div className="flex-1 flex flex-col justify-start items-start">
      <div className="w-full">
        <BreadcrumbSearch />
        <div className="w-full rounded-lg p-6 bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-black">Otaku Threads Store Summary</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-black">Product Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {summaryData.highlights.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm text-center">
                  <div className="text-lg font-semibold text-black mb-2">{item.title}</div>
                  <div className="text-sm text-gray-700 mb-3 leading-relaxed">{item.description}</div>
                  <div className="text-2xl font-bold text-black">
                    {item.count} <span className="text-base font-normal text-gray-600">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-black">Top Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold text-black">Category</th>
                    <th className="py-3 px-4 font-semibold text-black">Product Name</th>
                    <th className="py-3 px-4 font-semibold text-black">Units Sold</th>
                    <th className="py-3 px-4 font-semibold text-black">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.featured.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-25">
                      <td className="py-3 px-4 font-semibold text-black">{item.name}</td>
                      <td className="py-3 px-4 text-gray-800">{item.product}</td>
                      <td className="py-3 px-4 text-center font-bold text-black">{item.sold}</td>
                      <td className="py-3 px-4 font-bold text-black">{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Scrollable Store Overview Summary */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">Store Overview</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-96 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                    <h4 className="text-lg font-semibold text-black mb-3">About Otaku Threads</h4>
                    <p className="text-gray-800 leading-relaxed">
                      Welcome to your premier destination for authentic anime apparel! We specialize in high-quality 
                      clothing that lets you express your passion for anime in style.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-semibold text-black mb-2">T-Shirt Collection</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Premium 100% cotton tees featuring your favorite characters from popular series like 
                        Demon Slayer, Attack on Titan, and One Piece. Available in sizes XS-3XL with fade-resistant prints.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-semibold text-black mb-2">Hoodie Collection</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Cozy and stylish hoodies perfect for conventions or everyday wear. Features embroidered details 
                        and vibrant prints from series like My Hero Academia and Jujutsu Kaisen.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-semibold text-black mb-2">Pants & Joggers</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Comfortable streetwear with subtle anime-inspired designs. Perfect blend of style and comfort 
                        for the modern otaku lifestyle.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                    <h5 className="font-semibold text-black mb-3">Why Choose Us?</h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Officially licensed merchandise
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Fast and secure shipping
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        30-day return guarantee
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Sizes for every body type
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        New arrivals every month
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <h5 className="font-semibold text-black mb-3">Store Statistics</h5>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-black">500+</div>
                        <div className="text-xs text-gray-600">Happy Customers</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-black">315</div>
                        <div className="text-xs text-gray-600">Unique Designs</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-black">98%</div>
                        <div className="text-xs text-gray-600">Satisfaction Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-black">24/7</div>
                        <div className="text-xs text-gray-600">Customer Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Scrollable Customer Feedback */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">What Our Customers Say</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-96 overflow-y-auto p-4">
                <div className="space-y-4">
                  {summaryData.customerFeedback.map((fb, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                      <div className="text-black">
                        <span className="font-semibold text-black">{fb.customer}:</span>
                        <span className="ml-2 text-gray-800">{fb.feedback}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Summary;