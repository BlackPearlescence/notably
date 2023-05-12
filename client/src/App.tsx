import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { NavigationBar } from './components/bars/NavigationBar';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/bars/Footer';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
