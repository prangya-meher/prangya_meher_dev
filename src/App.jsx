import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import BackgroundAnimation from './components/BackgroundAnimation';
import IntroScreen from './components/IntroScreen';
import InteractivePointer from './components/InteractivePointer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <ThemeProvider>
      <InteractivePointer />
      <AnimatePresence mode="wait">
        {loading ? (
          <IntroScreen key="intro" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', minHeight: '100vh', position: 'relative' }}
          >
            <BackgroundAnimation />
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />}>
                  <Route path=":id" element={<ProjectDetail />} />
                </Route>
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
