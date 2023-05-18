import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { NavigationBar } from './components/bars/NavigationBar';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/bars/Footer';
import { Route, Routes, Outlet } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PricingPage } from './pages/PricingPage';
import { FeaturePage } from './pages/FeaturePage';
import { AboutPage } from './pages/AboutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NoteTopBar } from './components/bars/NoteTopBar';
import { ProjectPage } from './pages/ProjectPage';

function App() {

  const SiteLayout = () => {
    return (
      <>
        <NavigationBar />
        <Outlet />
        <Footer />
      </>
    )
  }

  const NoteAppLayout = () => {
    return (
      <>
        <NoteTopBar />
        <Outlet />
      </>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="features" element={<FeaturePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="thanks" element={<ThankYouPage />} />
        </Route>
        <Route path="/" element={<NoteAppLayout />}>
          <Route path="projects" element={<ProjectPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
