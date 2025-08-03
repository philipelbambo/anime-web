import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// Import the default React-Toastify CSS directly here
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added back showPassword state
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate login process
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      // Temporary credentials for admin
      const tempEmail = 'elbambo@gmail.com';
      const tempPassword = 'elbambo06';
      if (email === tempEmail && password === tempPassword) {
        console.log('Login successful:', { email, rememberMe });
        // Use Toastify for success
        toast.success('Login successful! Welcome back.');
        // Redirect after a short delay to allow toast to be seen
        setTimeout(() => {
          window.location.href = 'Dashboard'; // Demo redirect
        }, 1000);
      } else {
        setError('Invalid credentials. Please contact administrator for access.');
        // Use Toastify for error
        toast.error('Invalid credentials. Please contact administrator for access.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      // Use Toastify for general login failure
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      {/* Add ToastContainer here */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-lg animate-spin"></div>
        </div>
      )}
      {/* Left Half - Large Image */}
      <div className="w-1/2 h-full flex items-center justify-center p-8 relative">
        <img
          src="./Gallery2/luffy.png" // Replace this with the new image URL
          alt="Large display image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Right Half - New Login Form Design */}
      <div className="w-1/2 h-full flex items-center justify-center p-8" style={{background: '#e0e0e0'}}>
        {/* Centered Login Container */}
        <div className="w-full max-w-md p-8 rounded-2xl" style={{
          background: '#e0e0e0',
          boxShadow: '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff'
        }}>
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src="/Gallery2/logo.png" // Replace with your logo path
              alt="Logo" 
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <p className="text-gray-500">Enter your credentials to access your account.</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full !bg-blue-700 hover:bg-blue-600 text-white font-medium py-4 px-4 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Custom styles for the Toastify container and toasts */
        .custom-toast-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          top: 20px;
          z-index: 9999;
        }
        .custom-toast {
          padding: 20px;
          font-size: 1.2rem;
          min-height: 80px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          margin-bottom: 15px;
        }
        .Toastify__toast--success {
          background-color: #4CAF50 !important;
          color: white !important;
        }
        .Toastify__toast--error {
          background-color: #F44336 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Login;