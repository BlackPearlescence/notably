import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { NavigationBar } from './components/bars/NavigationBar';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/bars/Footer';
import { LoginModal } from './components/authentication/LoginModal';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
