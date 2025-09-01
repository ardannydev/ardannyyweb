import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import TypewriterText from './TypewriterText';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useHeroAnimation } from '../contexts/HeroAnimationContext';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const { t, currentLanguage } = useLanguage();
  const { setHeroAnimationComplete } = useHeroAnimation();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleDescriptionComplete = () => {
    setHeroAnimationComplete(true);
  };

  const handleTitleComplete = () => {
    setShowSubtitle(true);
  };

  const handleSubtitleComplete = () => {
    setShowDescription(true);
  };

  return (
    <section className="relative h-screen flex items-start justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      {/* Particle Background */}
      <ParticleBackground 
        density={60} 
        color={theme === 'dark' ? '#00D9FF' : '#8B5CF6'} 
        speed={0.3} 
      />
      

      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${window.matchMedia('(max-width: 768px)').matches ? 'backdrop-blur-sm' : 'backdrop-blur-md'} bg-white/10 dark:bg-space-blue/20 rounded-2xl sm:rounded-3xl border border-white/20 dark:border-electric-cyan/30 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl mx-4 sm:mx-0`}
          style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
        >
          {/* Floating Icon */}
          <motion.div
            animate={{ 
              y: window.matchMedia('(max-width: 768px)').matches ? [-5, 5, -5] : [-10, 10, -10],
              rotate: window.matchMedia('(max-width: 768px)').matches ? [0, 2, -2, 0] : [0, 5, -5, 0]
            }}
            transition={{ 
              duration: window.matchMedia('(max-width: 768px)').matches ? 6 : 4, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="inline-block mb-6"
            style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 border border-electric-cyan/30">
              <Sparkles className="w-8 h-8 text-electric-cyan" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-orbitron bg-gradient-to-r from-electric-cyan via-white to-neon-purple bg-clip-text text-transparent leading-tight">
              <TypewriterText
                text={t.heroTitle}
                delay={500}
                speed={100}
                onComplete={handleTitleComplete}
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white dark:text-gray-200 font-inter">
                <TypewriterText
                  text={t.heroSubtitle}
                  delay={200}
                  speed={80}
                  onComplete={handleSubtitleComplete}
                />
              </h2>
            </motion.div>
          )}

          {/* Description */}
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-base sm:text-lg md:text-xl text-white dark:text-gray-200 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                <TypewriterText
                  text={t.heroDescription}
                  delay={200}
                  speed={30}
                  onComplete={handleDescriptionComplete}
                />
              </p>
            </motion.div>
          )}
        </motion.div>


      </div>

      {/* Floating Elements - Optimized for mobile performance */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: window.matchMedia('(max-width: 768px)').matches ? 30 : 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className={`hidden sm:block absolute top-20 left-4 sm:left-10 w-3 sm:w-4 h-3 sm:h-4 bg-electric-cyan/30 rounded-full ${window.matchMedia('(max-width: 768px)').matches ? 'blur-[1px]' : 'blur-sm'}`}
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: window.matchMedia('(max-width: 768px)').matches ? 25 : 15,
          repeat: Infinity,
          ease: 'linear'
        }}
        className={`hidden sm:block absolute bottom-32 right-4 sm:right-16 w-4 sm:w-6 h-4 sm:h-6 bg-neon-purple/30 rounded-full ${window.matchMedia('(max-width: 768px)').matches ? 'blur-[1px]' : 'blur-sm'}`}
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      />
    </section>
  );
};

export default HeroSection;