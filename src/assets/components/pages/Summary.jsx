import React from 'react';
import SideMenu from './Sidemenu';
import Header from './header';
import BreadcrumbSearch from './BreadcrumbSearch';
import { summaryData } from '../../../utils/constants';


const Summary = () => (
  <div className="min-h-screen bg-gray-200 p-5">
    <div className="flex-1 flex flex-col justify-start items-start">
      <div className="w-full">
        <BreadcrumbSearch />
        <div
          className="w-full rounded-lg p-6"
          style={{
            background: '#e0e0e0',
            boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Store Summary</h2>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Product Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {summaryData.highlights.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-5 shadow text-center">
                  <div className="text-lg font-semibold text-blue-700">{item.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{item.description}</div>
                  <div className="text-2xl font-bold text-green-600">{item.count} <span className="text-base font-normal text-gray-500">{item.unit}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Featured Products</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 rounded-tl-lg">Type</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Sold</th>
                  <th className="py-2 px-4 rounded-tr-lg">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.featured.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-2 px-4 font-semibold text-blue-700">{item.name}</td>
                    <td className="py-2 px-4">{item.product}</td>
                    <td className="py-2 px-4 text-center font-bold text-green-600">{item.sold}</td>
                    <td className="py-2 px-4 font-bold text-orange-600">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Feedback</h3>
            <ul className="list-disc pl-6">
              {summaryData.customerFeedback.map((fb, idx) => (
                <li key={idx} className="mb-2 text-gray-700">
                  <span className="font-semibold text-blue-700">{fb.customer}:</span> {fb.feedback}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Summary;
