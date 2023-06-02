import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import 'draft-js/dist/Draft.css';
import 'quill/dist/quill.snow.css'; // Import Quill's CSS styles

import { NavigationBar } from './components/bars/NavigationBar';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/bars/Footer';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PricingPage } from './pages/PricingPage';
import { FeaturePage } from './pages/FeaturePage';
import { AboutPage } from './pages/AboutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NoteTopBar } from './components/bars/NoteTopBar';
import { ProjectPage } from './pages/ProjectPage';
import { NewProjectModal } from './components/projects/NewProjectModal';
import { ViewProjectModal } from './components/projects/ViewProjectModal';
import { RenameProjectModal } from './components/projects/RenameProjectModal';
import { DeleteConfirmProjectModal } from './components/projects/DeleteConfirmProjectModal';
import { NoteTakingPage } from './pages/NoteTakingPage';
import { NoteModal } from './components/notes/NoteModal';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkIfLoggedIn, selectIsLoggedIn, selectUserData, selectUserDataStatus } from './store/slices/authSlice';

function App() {

  const dispatch = useAppDispatch()
  const isLoggedInState = useAppSelector(selectIsLoggedIn)
  const userDataStatusState = useAppSelector(selectUserDataStatus)
  const userDataState = useAppSelector(selectUserData)
  const navigate = useNavigate();
  
  // if (userDataStatusState === "succeeded") {
  //   dispatch(checkIfLoggedIn())
  // }
  // dispatch(checkIfLoggedIn())
  // const SiteLayout = () => {
  //   return (
  //     <>
  //       <NavigationBar />
  //       <Outlet />
  //       <Footer />
  //     </>
  //   )
  // }
  useEffect(() => {
    dispatch(checkIfLoggedIn())
},[])

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
          <Route path="/" element={<LoginPage />} />
          <Route path="/" element={<NoteAppLayout/>}>
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/notes/:projectId" element={<NoteTakingPage />} /> 
          </Route>
          
      </Routes>
      <NewProjectModal />
      <ViewProjectModal />
      <RenameProjectModal />
      <DeleteConfirmProjectModal />
      <NoteModal />
    </div>
  );
}

export default App;
