import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../contexts/LanguageContext';
import logoImage from '../assets/logo6.png';

const Layout = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Fertile Future Logo" 
                className="h-8 w-8 rounded-full bg-white p-1"
              />
              <span className="ml-2 text-base font-semibold text-white">
                Fertile Future
              </span>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex-1 flex items-center justify-center space-x-12">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                          ${location.pathname === '/' 
                            ? 'bg-green-600 text-white' 
                            : 'text-green-50 hover:bg-green-600/70'}`}
              >
                Home
              </Link>
              
              <Link 
                to="/soil-analysis"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                          ${location.pathname === '/soil-analysis' 
                            ? 'bg-green-600 text-white' 
                            : 'text-green-50 hover:bg-green-600/70'}`}
              >
                Soil Analysis
              </Link>
              
              <Link 
                to="/step1"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                          ${location.pathname.includes('/step') 
                            ? 'bg-green-600 text-white' 
                            : 'text-green-50 hover:bg-green-600/70'}`}
              >
                Calculator
              </Link>
            </div>

            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="px-2 py-1 rounded-md bg-green-600 text-white text-sm font-medium
                        border border-green-500 focus:outline-none focus:ring-2 
                        focus:ring-green-400 focus:border-green-400
                        hover:bg-green-600/90 transition-colors cursor-pointer"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code} className="bg-white text-gray-800">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      <div className="h-0.5 bg-gradient-to-r from-green-500 to-green-400"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;