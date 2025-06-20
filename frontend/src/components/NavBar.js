import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">CaptchaLogin</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className={`text-sm font-medium ${
            location.pathname === '/' ? 'text-blue-700' : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`text-sm font-medium ${
            location.pathname === '/register' ? 'text-blue-700' : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
