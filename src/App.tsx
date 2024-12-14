import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
}

export default App;