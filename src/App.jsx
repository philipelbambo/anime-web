// App.js
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoadingPage = lazy(() => import('./assets/components/pages/LoadingPage'));
const MainLayout = lazy(() => import('./assets/components/layouts/MainLayout'));
const NotFoundPage = lazy(() => import('./assets/components/pages/NotFoundPage'));

const Dashboard = lazy(() => import('./assets/components/pages/Dashboard'));
const ProductsPage = lazy(() => import('./assets/components/pages/ManageProduct'));
const MessagePage = lazy(() => import('./assets/components/pages/Message'));
const OrdersPage = lazy(() => import('./assets/components/pages/Orders'));

import "./App.css"; // Assuming you have a global CSS file
import Login from "./assets/components/pages/login";
import Header from "./assets/components/pages/header";
import Breadcrumbs from "./assets/components/pages/BreadcrumbSearch"; // Importing the SideMenu component
import Homepage from './assets/components/pages/Homepage';
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
        <Route path="/header" element={<Header />} />
        <Route path="/breadcrumbs" element={<Breadcrumbs />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/summary" element={<Summary />} />
        
        <Route path='/user' element={<Suspense fallback={<LoadingPage />}><MainLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<LoadingPage />}><Dashboard /></Suspense>} />
          <Route path='products' element={<Suspense fallback={<LoadingPage />}><ProductsPage /></Suspense>}/>
          <Route path='message' element={<Suspense fallback={<LoadingPage />}><MessagePage /></Suspense>}/>
          <Route path='orders' element={<Suspense fallback={<LoadingPage />}><OrdersPage /></Suspense>}/>
        </Route>

        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;