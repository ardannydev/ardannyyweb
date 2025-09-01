import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, ChevronUp } from 'lucide-react';

interface MusicSelectorProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  isOpen: externalIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        {/* Music Controls Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-0 mb-2 min-w-[200px] sm:min-w-[220px]"
            >
              {/* Enhanced futuristic background */}
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/30 via-neon-purple/30 to-electric-cyan/30 rounded-2xl blur opacity-40" />
                
                <div className="relative bg-gradient-to-br from-white/15 via-electric-cyan/10 to-space-blue/20 dark:from-space-blue/40 dark:via-electric-cyan/15 dark:to-neon-purple/25 backdrop-blur-xl border border-white/25 dark:border-electric-cyan/40 rounded-xl overflow-hidden shadow-2xl shadow-electric-cyan/10 transition-all duration-300">
                  
                  <div className="relative p-3">
                    {/* Play/Pause Control */}
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        onTogglePlay();
                        setInternalIsOpen(false);
                      }}
                      className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40 mb-2"
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Play/Pause Icon */}
                      <div className="relative z-10">
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-electric-cyan" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </div>
                      
                      {/* Control Label */}
                      <span className="relative z-10 font-medium text-sm">
                        {isPlaying ? 'Pause Music' : 'Play Music'}
                      </span>
                      
                      {/* Status Indicator */}
                      {isPlaying && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50 animate-pulse"
                        />
                      )}
                    </motion.button>

                    {/* Volume Control */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/25 dark:hover:border-electric-cyan/40"
                      onMouseEnter={showVolumeControl}
                      onMouseLeave={hideVolumeControl}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Volume Icon */}
                      <button
                        onClick={onToggleMute}
                        className="relative z-10 flex items-center gap-2"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-red-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                        <span className="font-medium text-sm">
                          {isMuted ? 'Unmute' : 'Volume'}
                        </span>
                      </button>
                      
                      {/* Volume Percentage */}
                      <span className="relative z-10 ml-auto text-xs font-medium text-white dark:text-electric-cyan bg-white/10 dark:bg-electric-cyan/10 px-2 py-1 rounded-md">
                        {Math.round(volume * 100)}%
                      </span>
                      
                      {/* Volume Slider */}
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ 
                          opacity: showVolumeSlider ? 1 : 0,
                          scaleX: showVolumeSlider ? 1 : 0
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute left-0 right-0 top-full mt-2 ${showVolumeSlider ? 'pointer-events-auto' : 'pointer-events-none'}`}
                        onMouseEnter={keepVolumeControlVisible}
                        onMouseLeave={hideVolumeControl}
                      >
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-white/15 via-electric-cyan/8 to-space-blue/15 dark:from-space-blue/25 dark:via-electric-cyan/15 dark:to-neon-purple/20 
                                       border border-white/25 dark:border-electric-cyan/40 hover:border-white/35 dark:hover:border-electric-cyan/60 backdrop-blur-lg shadow-xl shadow-electric-cyan/10 transition-all duration-300">
                          
                          {/* Volume Slider */}
                          <div className="relative flex-1 h-2">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              aria-label="Volume control"
                            />
                            
                            {/* Custom Slider Track */}
                            <div className="absolute inset-0 bg-white/30 dark:bg-space-blue/70 rounded-full border border-white/50 dark:border-electric-cyan/60 shadow-inner" />
                            
                            {/* Volume Fill */}
                            <div 
                              className="absolute left-0 top-0 h-full bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan rounded-full 
                                         shadow-lg shadow-electric-cyan/40 transition-all duration-200 animate-pulse"
                              style={{ width: `${volume * 100}%` }}
                            />
                            
                            {/* Volume Thumb */}
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-white via-electric-cyan to-neon-purple 
                                         rounded-full border-2 border-white/60 dark:border-electric-cyan/60 shadow-xl shadow-electric-cyan/60
                                         transition-all duration-200 hover:scale-125 hover:border-white dark:hover:border-electric-cyan cursor-pointer"
                              style={{ left: `calc(${volume * 100}% - 8px)` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Music Button */}
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
          aria-label="Music Controls"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 via-neon-purple/20 to-electric-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-center gap-1.5">
            {/* Music Icon with State */}
            <div className="flex items-center">
              <Music className={`w-4 h-4 text-white/70 dark:text-electric-cyan/70 group-hover:text-white dark:group-hover:text-electric-cyan transition-all duration-300 ${isPlaying ? 'animate-pulse text-electric-cyan' : ''}`} />
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

export default MusicSelector;