import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Settings } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc?: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, // Remove default value to handle it differently
  autoPlay = false // Changed to false to prevent browser autoplay blocking
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load audio source
  useEffect(() => {
    if (audioSrc) {
      setAudioSource(audioSrc);
    } else {
      // Set default audio path directly without fetch check
      setAudioSource('/audio/background-music.mp3');
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSource) return;

    audio.volume = volume;
    audio.loop = true;

    const handleCanPlay = () => {
      if (autoPlay) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Auto-play was prevented:', error);
          // Auto-play was prevented, user needs to interact first
        });
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (error: Event) => {
      console.warn('Audio playback error:', error);
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [autoPlay, volume, audioSource]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Play was prevented:', error);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    if (!isMuted) {
      audio.volume = newVolume;
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      {audioSource && (
        <audio
          ref={audioRef}
          src={audioSource}
          preload="none"
          onError={(e) => {
            console.warn('Audio loading error:', e);
            // Handle audio loading errors gracefully
          }}
        />
      )}

      {/* Floating Audio Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Main Control Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowControls(!showControls)}
          className="w-12 h-12 bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-electric-cyan/25 transition-all duration-300"
        >
          <Music className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </motion.button>

        {/* Expanded Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[200px]"
            >
              {/* Play/Pause & Mute Controls */}
              <div className="flex items-center gap-3 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-8 h-8 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center text-white text-sm font-semibold"
                >
                  {isPlaying ? '⏸' : '▶'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>

                <span className="text-xs text-gray-300 ml-auto">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>

              {/* Volume Slider */}
              <div className="space-y-2">
                <label className="text-xs text-gray-300 flex items-center gap-2">
                  <Settings className="w-3 h-3" />
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Status Indicator */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-xs text-gray-400">
                    Background Music
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00D9FF, #8B5CF6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00D9FF, #8B5CF6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .slider::-moz-range-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;