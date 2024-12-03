import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Step1Category from './pages/Step1Category';
import Step2Crop from './pages/Step2Crop';
import Step3Details from './pages/Step3Details';
import Results from './pages/Results';
import Home from './pages/Home';
import SoilAnalysis from './pages/SoilAnalysis';
import Logo from './pages/Logo';
import Login from './pages/Login';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [showLogo, setShowLogo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogoFinish = () => {
    setShowLogo(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (showLogo) {
    return <Logo onFinish={handleLogoFinish} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route path="/step1" element={<Step1Category />} />
            <Route path="/step2/:category" element={<Step2Crop />} />
            <Route path="/step3/:cropId" element={<Step3Details />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;