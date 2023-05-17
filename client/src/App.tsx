import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { NavigationBar } from './components/bars/NavigationBar';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/bars/Footer';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PricingPage } from './pages/PricingPage';
import { FeaturePage } from './pages/FeaturePage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="features" element={<FeaturePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
