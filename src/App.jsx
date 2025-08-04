// App.js
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoadingPage = lazy(() => import('./assets/components/pages/LoadingPage'));
const MainLayout = lazy(() => import('./assets/components/layouts/MainLayout'));

const Dashboard = lazy(() => import('./assets/components/pages/Dashboard'));

import "./App.css"; // Assuming you have a global CSS file
import Login from "./assets/components/pages/login";
import Header from "./assets/components/pages/header";
import Breadcrumbs from "./assets/components/pages/BreadcrumbSearch"; // Importing the SideMenu component
import CustomerOrderList from './assets/components/pages/CustomerOrderList';
import ManageProduct from './assets/components/pages/ManageProduct';
import Homepage from './assets/components/pages/Homepage';
import Message from './assets/components/pages/Message';
import Orders from './assets/components/pages/Orders';
import Customers from './assets/components/pages/Customers';
import Reports from './assets/components/pages/Reports';
import Summary from './assets/components/pages/Summary';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          
         <Route path="/" element={<Homepage />} />
         <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/header" element={<Header />} />
        <Route path="/breadcrumbs" element={<Breadcrumbs />} />
        <Route path="/customer-orders" element={<CustomerOrderList />} />
        <Route path="/manageproduct" element={<ManageProduct />} />
        <Route path="/message" element={<Message />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/summary" element={<Summary />} />
        
        <Route path='/user' element={<Suspense fallback={<LoadingPage />}><MainLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<LoadingPage />}></Suspense>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;