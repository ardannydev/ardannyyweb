import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { HeroAnimationProvider } from './contexts/HeroAnimationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // cleanup any leftover initial loader
    const el = document.getElementById('initial-loader');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <HeroAnimationProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          </Router>
        </HeroAnimationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
