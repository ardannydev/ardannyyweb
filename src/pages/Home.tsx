import React from 'react';
import HeroSection from '../components/HeroSection';
import SocialGrid from '../components/SocialGrid';

import { useLanguage } from '../contexts/LanguageContext';

function Home(): JSX.Element {
  const { currentLanguage } = useLanguage();
  
  return (
    <div 
      key={`home-${currentLanguage.code}`}
      className="relative min-h-screen bg-gradient-to-br from-space-blue via-deep-purple to-space-blue pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20"
      style={{ 
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      <HeroSection />
      <SocialGrid />
      

    </div>
  );
};

export default Home;
