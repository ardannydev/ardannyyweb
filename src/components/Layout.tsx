import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useHeroAnimation } from '../contexts/useHeroAnimation';
import ToolboxSelector from './ToolboxSelector';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { isHeroAnimationComplete } = useHeroAnimation();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  // Intentionally do not react to scroll to avoid layout shifts when user scrolls.
  // Header visibility and menu state remain stable during scroll.

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Audio player functions
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Ensure audio is loaded
        if (audio.readyState < 2) {
          audio.load();
        }
        
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      // Reset playing state if there's an error
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    audio.volume = clampedVolume;
    localStorage.setItem('audioVolume', clampedVolume.toString());
    
    // Auto unmute if volume is increased
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };





  // Initialize audio
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial audio properties
    audio.volume = volume;
    audio.loop = true;
    audio.preload = 'metadata';

    const handleEnded = () => setIsPlaying(false);
    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleLoadedData = () => {
      console.log('Audio loaded successfully');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [volume]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-blue/20 via-electric-cyan/10 to-space-blue/30 dark:from-space-blue dark:via-space-blue/90 dark:to-deep-purple/20 relative transition-colors duration-300" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {/* Futuristic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Floating Header Container */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: (isHeaderVisible && (!isHomePage || isHeroAnimationComplete)) ? 0 : -100, 
            opacity: (isHeaderVisible && (!isHomePage || isHeroAnimationComplete)) ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative mx-4 mt-4 md:mx-8 md:mt-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Simplified Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-transparent to-neon-purple/10 rounded-2xl"></div>
          
          {/* Main Header */}
          <div className="relative backdrop-blur-xl bg-white/10 dark:bg-space-blue/20 border border-white/20 dark:border-electric-cyan/30 rounded-2xl shadow-xl">
            
            <div className="relative px-6 py-4 md:px-8 md:py-5">
              <div className="flex items-center justify-between">
                {/* Logo with Particles Effect */}
                <Link 
                  to="/" 
                  className="block"
                  aria-label="Go to Home Page"
                >
                  <div className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-electric-cyan via-white to-neon-purple bg-clip-text text-transparent">
                    ARD
                  </div>
                </Link>

                {/* Desktop Navigation - Diagonal Layout */}
                <div className="hidden md:flex items-center">
                  <div className="flex items-center space-x-1 transform -skew-x-12 bg-white/5 dark:bg-space-blue/20 rounded-xl p-2 backdrop-blur-sm border border-white/10">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="transform skew-x-12"
                      >
                        <Link
                          to={item.path}
                          className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                            location.pathname === item.path
                              ? 'text-gray-900 dark:text-electric-cyan bg-electric-cyan/10 dark:bg-electric-cyan/10'
                              : 'text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {/* Hover Glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                          
                          <span className="relative z-10">{item.label}</span>
                          
                          {/* Active Indicator */}
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-electric-cyan rounded-full"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Controls - Floating Style */}
                <div className="flex items-center space-x-3">
                  {/* Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    className="relative w-12 h-12 rounded-full bg-gradient-to-br from-electric-cyan/20 to-space-blue/20 backdrop-blur-sm border border-electric-cyan/30 text-electric-cyan hover:text-white transition-all duration-300 group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <AnimatePresence mode="wait">
                        {theme === 'dark' ? (
                          <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Sun className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Moon className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-electric-cyan/10 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
                  </motion.button>

                  {/* Mobile Menu Button */}
                  <motion.button
                    onClick={toggleMenu}
                    className="md:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-space-blue/20 backdrop-blur-sm border border-electric-cyan/30 text-electric-cyan hover:text-white transition-all duration-300 group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle mobile menu"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <AnimatePresence mode="wait">
                        {isMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Menu className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-electric-cyan/10 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Futuristic Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && isHeaderVisible && (!isHomePage || isHeroAnimationComplete) && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="md:hidden fixed top-32 sm:top-36 md:top-40 left-2 right-2 sm:left-3 sm:right-3 md:left-4 md:right-4 z-20 max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] overflow-y-auto"
                style={{ willChange: 'transform, opacity' }}
              >
              {/* Mobile Menu Container */}
              <div className="relative touch-manipulation">
                {/* Background with blur and gradient - Consistent with header */}
                <div className="absolute inset-0 bg-white/10 dark:bg-space-blue/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 dark:border-electric-cyan/40"></div>
                
                {/* Animated border glow - Matching header style */}
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/30 via-neon-purple/30 to-electric-cyan/30 rounded-2xl sm:rounded-3xl blur opacity-30 hover:opacity-50 transition-opacity duration-300"></div>
                
                {/* Main Menu - Consistent styling */}
                 <div className={`relative ${window.matchMedia('(max-width: 768px)').matches ? 'backdrop-blur-md' : 'backdrop-blur-xl'} bg-white/5 dark:bg-space-blue/10 border border-white/20 dark:border-electric-cyan/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden`}>
                   
                   <div className="relative p-4 sm:p-6 md:p-8">
                    {/* Menu Items */}
                    <div className="space-y-2 sm:space-y-3">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -30, rotateY: -90 }}
                          animate={{ opacity: 1, x: 0, rotateY: 0 }}
                          transition={{ 
                            delay: index * 0.15,
                            duration: 0.5,
                            ease: "easeOut"
                          }}
                          className="transform-gpu"
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`group relative px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 rounded-xl text-base sm:text-lg md:text-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] min-h-[48px] sm:min-h-[56px] md:min-h-[64px] flex items-center ${
                              location.pathname === item.path
                                ? 'text-white dark:text-electric-cyan bg-electric-cyan/20 border border-electric-cyan/40 shadow-lg shadow-electric-cyan/20'
                                : 'text-white dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-white/15 border border-transparent hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
                            }`}
                          >
                            {/* Enhanced Interactive Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 via-neon-purple/20 to-electric-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-75 transition-all duration-300 blur-sm scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-50 transition-all duration-300"></div>
                            <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 flex items-center justify-between w-full">
                              <span className="font-semibold tracking-wide">{item.label}</span>
                              
                              {/* Enhanced Active Indicator */}
                              {location.pathname === item.path && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  whileHover={{ scale: 1.2, rotate: 180 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                  className="w-3 h-3 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50 ring-2 ring-electric-cyan/30"
                                />
                              )}
                              
                              {/* Interactive Hover Arrow */}
                              <motion.div
                                initial={{ x: -20, opacity: 0, scale: 0.8 }}
                                whileHover={{ x: 0, opacity: 1, scale: 1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="w-2 h-2 bg-gradient-to-r from-white to-electric-cyan rounded-full shadow-md shadow-white/20"
                              />
                            </div>
                            
                            {/* Interactive Bottom Glow Line */}
                             <motion.div
                               initial={{ scaleX: 0, opacity: 0 }}
                               whileHover={{ scaleX: 1, opacity: 1 }}
                               whileTap={{ scaleX: 0.8 }}
                               transition={{ type: "spring", stiffness: 300, damping: 30 }}
                               className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent origin-center shadow-lg shadow-electric-cyan/50"
                             />
                             {/* Pulse effect on active */}
                             {location.pathname === item.path && (
                               <motion.div
                                 animate={{ opacity: [0.3, 0.8, 0.3] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric-cyan to-transparent"
                               />
                             )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex justify-center space-x-4">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                            className="w-1 h-1 bg-electric-cyan rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan bg-clip-text text-transparent">
              {title}
            </h1>
          </motion.div>
        )}
        {children}
      </main>
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

        {/* Toolbox Controls */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          animate="visible"
          /* Use fixed so toolbox is not clipped by any scrolling containers on mobile */
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 touch-auto"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
          >
            <ToolboxSelector
              isOpen={isToolboxOpen}
              onToggle={setIsToolboxOpen}
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
            />
          </motion.div>
        </motion.div>
    </div>
  );
};

export default Layout;