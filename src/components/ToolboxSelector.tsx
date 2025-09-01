import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronUp, Play, Pause, Volume2, VolumeX, Music, Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface ToolboxSelectorProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  // Music props
  isPlaying?: boolean;
  isMuted?: boolean;
  volume?: number;
  onTogglePlay?: () => void;
  onToggleMute?: () => void;
  onVolumeChange?: (volume: number) => void;
}

const ToolboxSelector: React.FC<ToolboxSelectorProps> = ({
  isOpen: externalIsOpen,
  onToggle,
  isPlaying = false,
  isMuted = false,
  volume = 0.5,
  onTogglePlay = () => {},
  onToggleMute = () => {},
  onVolumeChange = () => {}
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const { currentLanguage, setLanguage, languages } = useLanguage();

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const showVolumeControl = () => {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const hideVolumeControl = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 300);
  };

  const keepVolumeControlVisible = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-10">
      <div className="relative">
        {/* Toolbox Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Desktop / larger screens: original popover */}
              <motion.div
                key="popover"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="hidden sm:block absolute bottom-full left-0 mb-2 min-w-[240px] sm:min-w-[260px]"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/30 via-neon-purple/30 to-electric-cyan/30 rounded-2xl blur opacity-40" />

                  <div className="relative bg-gradient-to-br from-white/15 via-electric-cyan/10 to-space-blue/20 dark:from-space-blue/40 dark:via-electric-cyan/15 dark:to-neon-purple/25 backdrop-blur-xl border border-white/25 dark:border-electric-cyan/40 rounded-xl overflow-hidden shadow-2xl shadow-electric-cyan/10">
                    <div className="relative p-3">
                      {/* Language Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Globe className="w-4 h-4 text-electric-cyan" />
                          <span className="text-xs font-semibold text-white/80 dark:text-electric-cyan/80 uppercase tracking-wider">Bahasa</span>
                        </div>

                        <div className="space-y-1">
                          {languages.map((language, index) => (
                            <motion.button
                              key={language.code}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleLanguageChange(language)}
                              className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                                currentLanguage.code === language.code
                                  ? 'bg-gradient-to-r from-electric-cyan/20 to-neon-purple/15 text-electric-cyan border border-electric-cyan/40 shadow-lg shadow-electric-cyan/20'
                                  : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/20 dark:hover:border-electric-cyan/30'
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span className="relative z-10 text-base">{language.flag}</span>
                              <span className="relative z-10 font-medium text-xs">{language.name}</span>
                              {currentLanguage.code === language.code && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 dark:via-electric-cyan/30 to-transparent mb-4" />

                      <div>
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Music className="w-4 h-4 text-electric-cyan" />
                          <span className="text-xs font-semibold text-white/80 dark:text-electric-cyan/80 uppercase tracking-wider">Musik</span>
                        </div>

                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => {
                            onTogglePlay();
                            if (onToggle) {
                              onToggle(false);
                            } else {
                              setInternalIsOpen(false);
                            }
                          }}
                          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40 mb-2"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            {isPlaying ? <Pause className="w-4 h-4 text-electric-cyan" /> : <Play className="w-4 h-4" />}
                          </div>
                          <span className="relative z-10 font-medium text-sm">{isPlaying ? 'Pause Music' : 'Play Music'}</span>
                          {isPlaying && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50 animate-pulse" />}
                        </motion.button>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40"
                          onMouseEnter={showVolumeControl}
                          onMouseLeave={hideVolumeControl}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <button onClick={onToggleMute} className="relative z-10 flex items-center gap-2">
                            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                            <span className="font-medium text-sm">{isMuted ? 'Unmute' : 'Volume'}</span>
                          </button>
                          <span className="relative z-10 ml-auto text-xs font-medium text-white/70 dark:text-electric-cyan/70">{Math.round(volume * 100)}%</span>
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: showVolumeSlider ? 1 : 0, scaleX: showVolumeSlider ? 1 : 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={`absolute left-0 right-0 top-full mt-2 ${showVolumeSlider ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            onMouseEnter={keepVolumeControlVisible}
                            onMouseLeave={hideVolumeControl}
                          >
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-white/15 via-electric-cyan/8 to-space-blue/15 dark:from-space-blue/25 dark:via-electric-cyan/15 dark:to-neon-purple/20 border border-white/25 dark:border-electric-cyan/40 hover:border-white/35 dark:hover:border-electric-cyan/60 backdrop-blur-lg shadow-xl shadow-electric-cyan/30 transition-all duration-300">
                              <div className="relative flex-1 h-2">
                                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(parseFloat(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" aria-label="Volume control" />
                                <div className="absolute inset-0 bg-white/25 dark:bg-space-blue/60 rounded-full border border-white/40 dark:border-electric-cyan/50" />
                                <motion.div className="absolute left-0 top-0 h-full bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full shadow-lg shadow-electric-cyan/30 transition-all duration-150" style={{ width: `${volume * 100}%` }} animate={{ scale: showVolumeSlider ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.3 }} />
                                <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-electric-cyan to-neon-purple rounded-full border-2 border-white/30 dark:border-electric-cyan/30 shadow-lg shadow-electric-cyan/50 transition-all duration-150 hover:scale-110 hover:border-white/50 dark:hover:border-electric-cyan/60" style={{ left: `calc(${volume * 100}% - 8px)` }} animate={{ scale: showVolumeSlider ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile: fixed bottom sheet to avoid clipping and awkward popover placement */}
              <motion.div
                key="mobile-sheet"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="block sm:hidden fixed bottom-16 left-3 right-3 z-50"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/30 via-neon-purple/30 to-electric-cyan/30 rounded-2xl blur opacity-40" />

                  <div className="relative bg-gradient-to-br from-white/15 via-electric-cyan/10 to-space-blue/20 dark:from-space-blue/40 dark:via-electric-cyan/15 dark:to-neon-purple/25 backdrop-blur-xl border border-white/25 dark:border-electric-cyan/40 rounded-xl overflow-hidden shadow-2xl shadow-electric-cyan/10 max-h-[65vh] overflow-y-auto">
                    <div className="relative p-3">
                      {/* Language Section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Globe className="w-4 h-4 text-electric-cyan" />
                          <span className="text-xs font-semibold text-white/80 dark:text-electric-cyan/80 uppercase tracking-wider">Bahasa</span>
                        </div>

                        <div className="space-y-1">
                          {languages.map((language, index) => (
                            <motion.button
                              key={language.code}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleLanguageChange(language)}
                              className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                                currentLanguage.code === language.code
                                  ? 'bg-gradient-to-r from-electric-cyan/20 to-neon-purple/15 text-electric-cyan border border-electric-cyan/40 shadow-lg shadow-electric-cyan/20'
                                  : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/20 dark:hover:border-electric-cyan/30'
                              }`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span className="relative z-10 text-base">{language.flag}</span>
                              <span className="relative z-10 font-medium text-xs">{language.name}</span>
                              {currentLanguage.code === language.code && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 dark:via-electric-cyan/30 to-transparent mb-4" />

                      <div>
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Music className="w-4 h-4 text-electric-cyan" />
                          <span className="text-xs font-semibold text-white/80 dark:text-electric-cyan/80 uppercase tracking-wider">Musik</span>
                        </div>

                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => {
                            onTogglePlay();
                            if (onToggle) {
                              onToggle(false);
                            } else {
                              setInternalIsOpen(false);
                            }
                          }}
                          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40 mb-2"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            {isPlaying ? <Pause className="w-4 h-4 text-electric-cyan" /> : <Play className="w-4 h-4" />}
                          </div>
                          <span className="relative z-10 font-medium text-sm">{isPlaying ? 'Pause Music' : 'Play Music'}</span>
                          {isPlaying && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50 animate-pulse" />}
                        </motion.button>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 }}
                          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40"
                          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <button onClick={(e) => { e.stopPropagation(); onToggleMute(); }} className="relative z-10 flex items-center gap-2">
                            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                            <span className="font-medium text-sm">{isMuted ? 'Unmute' : 'Volume'}</span>
                          </button>
                          <span className="relative z-10 ml-auto text-xs font-medium text-white/70 dark:text-electric-cyan/70">{Math.round(volume * 100)}%</span>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: showVolumeSlider ? 1 : 0, height: showVolumeSlider ? 'auto' : 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 overflow-hidden"
                        >
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-white/15 via-electric-cyan/8 to-space-blue/15 dark:from-space-blue/25 dark:via-electric-cyan/15 dark:to-neon-purple/20 border border-white/25 dark:border-electric-cyan/40 hover:border-white/35 dark:hover:border-electric-cyan/60 backdrop-blur-lg shadow-xl shadow-electric-cyan/30 transition-all duration-300">
                            <div className="relative flex-1 h-2">
                              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolumeChange(parseFloat(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" aria-label="Volume control" />
                              <div className="absolute inset-0 bg-white/25 dark:bg-space-blue/60 rounded-full border border-white/40 dark:border-electric-cyan/50" />
                              <motion.div className="absolute left-0 top-0 h-full bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full shadow-lg shadow-electric-cyan/30 transition-all duration-150" style={{ width: `${volume * 100}%` }} animate={{ scale: showVolumeSlider ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.3 }} />
                              <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-electric-cyan to-neon-purple rounded-full border-2 border-white/30 dark:border-electric-cyan/30 shadow-lg shadow-electric-cyan/50 transition-all duration-150 hover:scale-110 hover:border-white/50 dark:hover:border-electric-cyan/60" style={{ left: `calc(${volume * 100}% - 8px)` }} animate={{ scale: showVolumeSlider ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Toolbox Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const newState = !isOpen;
            if (onToggle) {
              onToggle(newState);
            } else {
              setInternalIsOpen(newState);
            }
          }}
          className="group relative p-2 sm:p-3 bg-gradient-to-br from-white/10 via-electric-cyan/5 to-space-blue/10 dark:from-space-blue/20 dark:via-electric-cyan/10 dark:to-neon-purple/15 backdrop-blur-md border border-white/20 dark:border-electric-cyan/30 hover:border-electric-cyan/50 dark:hover:border-electric-cyan/60 rounded-lg sm:rounded-xl transition-all duration-300 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center shadow-lg hover:shadow-electric-cyan/20"
          aria-label="Toolbox Controls"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 via-neon-purple/20 to-electric-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-center gap-1.5">
            {/* Toolbox Icon with State */}
            <div className="flex items-center">
              <Settings className={`w-4 h-4 text-white/70 dark:text-electric-cyan/70 group-hover:text-white dark:group-hover:text-electric-cyan transition-all duration-300 ${isPlaying ? 'animate-pulse text-electric-cyan' : ''}`} />
              {isPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 w-1 h-1 bg-electric-cyan rounded-full"
                />
              )}
            </div>
            
            {/* Expand Arrow */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-3 h-3 text-white/70 dark:text-electric-cyan/70 group-hover:text-white dark:group-hover:text-electric-cyan transition-all duration-300" />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default ToolboxSelector;