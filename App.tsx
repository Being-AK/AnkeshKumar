import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseMe from './components/WhyChooseMe';
import Experience from './components/Experience';
import Process from './components/Process';
import Services from './components/Services';
import ComplianceHub from './components/ComplianceHub';
import { ComplianceSuite } from './components/ComplianceSuite';
import PdfToolkit from './components/pdfToolkit/PdfToolkit';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Testimonials from './components/Testimonials';
import { CursorTrail, BackgroundParticles } from './components/FinanceElements';
import { HandGestureExperience } from './components/HandGestureExperience';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const [isPdfWorkspaceOpen, setIsPdfWorkspaceOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col bg-light text-navy dark:bg-darkBg dark:text-darkText transition-colors duration-300 relative">
        <BackgroundParticles /> {/* Global Ambient Background */}
        <CursorTrail /> {/* Interactive Trail */}
        
        {!isPdfWorkspaceOpen && (
          <Header 
              darkMode={darkMode} 
              toggleTheme={toggleTheme} 
              onOpenMagic={() => setShowMagic(true)} 
          />
        )}
        
        <main className="flex-grow z-10">
          <Hero />
          <About />
          <WhyChooseMe />
          <Experience />
          <Process />
          <Services />
          <ComplianceHub />
          <ComplianceSuite />
          <PdfToolkit onWorkspaceStateChange={setIsPdfWorkspaceOpen} />
          <Skills />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        
        {!isPdfWorkspaceOpen && <ChatWidget />}

        {/* Full Screen AI Experience Modal */}
        {showMagic && (
            <HandGestureExperience onClose={() => setShowMagic(false)} />
        )}
      </div>
    </div>
  );
}