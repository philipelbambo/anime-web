// App.js
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoadingPage = lazy(() => import('./assets/components/pages/LoadingPage'));
const MainLayout = lazy(() => import('./assets/components/layouts/MainLayout'));
const NotFoundPage = lazy(() => import('./assets/components/pages/NotFoundPage'));
const AdminOrders = lazy(() => import('./assets/components/pages/Order'));
const Dashboard = lazy(() => import('./assets/components/pages/dashboard'));
const ProductsPage = lazy(() => import('./assets/components/pages/ManageProduct'));
const MessagePage = lazy(() => import('./assets/components/pages/Message'));
const CustomersPage = lazy(() => import('./assets/components/pages/Customers'));
const SummaryPage = lazy(() => import('./assets/components/pages/Summary'));
const ReportsPage = lazy(() => import('./assets/components/pages/Reports'));
const OrderNow = lazy(() => import('./assets/components/pages/OrderNow'));
const OrderDesert = lazy(() => import('./assets/components/pages/OrderingDesert'));



import "./App.css"; // Assuming you have a global CSS file
import Login from "./assets/components/pages/Login";
import Header from "./assets/components/pages/Header";
import Breadcrumbs from "./assets/components/pages/BreadcrumbSearch"; // Importing the SideMenu component
import Homepage from './assets/components/pages/Homepage';


 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/header" element={<Header />} />
        <Route path="/breadcrumbs" element={<Breadcrumbs />} />
        
        <Route path='/user' element={<Suspense fallback={<LoadingPage />}><MainLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<LoadingPage />}><Dashboard /></Suspense>} />
          <Route path='products' element={<Suspense fallback={<LoadingPage />}><ProductsPage /></Suspense>}/>
          <Route path='message' element={<Suspense fallback={<LoadingPage />}><MessagePage /></Suspense>}/>
          <Route path='orders' element={<Suspense fallback={<LoadingPage />}><AdminOrders /></Suspense>}/>
          <Route path='customers' element={<Suspense fallback={<LoadingPage />}><CustomersPage /></Suspense>}/>
          <Route path='summary' element={<Suspense fallback={<LoadingPage />}><SummaryPage /></Suspense>}/>
          <Route path='reports' element={<Suspense fallback={<LoadingPage />}><ReportsPage /></Suspense>}/>
          

        </Route>

          <Route path='/OrderNow' element={<Suspense fallback={<LoadingPage />}><OrderNow /></Suspense>}/>
          <Route path='/OrderDesert' element={<Suspense fallback={<LoadingPage />}><OrderDesert /></Suspense>}/>
        <Route path='*' element={<NotFoundPage />}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;