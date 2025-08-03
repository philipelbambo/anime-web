// App.js
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Dashboard from "./assets/components/pages/dashboard";
import "./App.css"; // Assuming you have a global CSS file
import Login from "./assets/components/pages/login";
import Header from "./assets/components/pages/header";
import Breadcrumbs from "./assets/components/pages/BreadcrumbSearch"; // Importing the SideMenu component
import CustomerOrderList from './assets/components/pages/CustomerOrderList';
import ManageProduct from './assets/components/pages/ManageProduct';
import Homepage from './assets/components/pages/Homepage';
import Message from './assets/components/pages/Message';

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
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;