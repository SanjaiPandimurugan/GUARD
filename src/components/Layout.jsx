import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../contexts/LanguageContext';
import logoImage from '../assets/logo6.png';

const Layout = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Fertile Future Logo" 
                className="h-12 w-12"
              />
              <Link to="/" className="text-xl font-bold text-green-800 whitespace-nowrap">
                Fertile Future30
              </Link>
            </div>

            {/* Navigation Links - Centered */}
            <div className="flex-1 flex items-center justify-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/soil-analysis" className="text-gray-600 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Soil Analysis
              </Link>
              <Link to="/step1" className="text-gray-600 hover:text-green-800 px-3 py-2 text-sm font-medium">
                Calculator
              </Link>
            </div>

            {/* Language Selector - Right aligned */}
            <div className="flex items-center">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="px-3 py-1 border rounded-md bg-gray-50 text-sm font-medium"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 