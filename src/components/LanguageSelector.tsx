import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen: externalIsOpen, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const { currentLanguage, setLanguage, languages } = useLanguage();

  const handleLanguageChange = (language: any) => {
    setLanguage(language);
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <div className="relative z-10">
      <div className="relative">
        {/* Language Options Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-0 mb-2 min-w-[160px] sm:min-w-[180px]"
            >
              {/* Enhanced futuristic background */}
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan/30 via-neon-purple/30 to-electric-cyan/30 rounded-2xl blur opacity-40" />
                
                <div className="relative bg-gradient-to-br from-white/15 via-electric-cyan/10 to-space-blue/20 dark:from-space-blue/40 dark:via-electric-cyan/15 dark:to-neon-purple/25 backdrop-blur-xl border border-white/25 dark:border-electric-cyan/40 rounded-xl overflow-hidden shadow-2xl shadow-electric-cyan/10">
                  
                  <div className="relative p-2">
                    {languages.map((language, index) => (
                      <motion.button
                        key={language.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleLanguageChange(language)}
                        className={`group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                          currentLanguage.code === language.code
                            ? 'bg-gradient-to-r from-electric-cyan/20 to-neon-purple/15 text-electric-cyan border border-electric-cyan/40 shadow-lg shadow-electric-cyan/20'
                            : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:to-electric-cyan/5 border border-transparent hover:border-white/20 dark:hover:border-electric-cyan/30'
                        }`}
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Flag */}
                        <span className="relative z-10 text-base">{language.flag}</span>
                        
                        {/* Language Name */}
                        <span className="relative z-10 font-medium text-xs">{language.name}</span>
                        
                        {/* Active Indicator */}
                        {currentLanguage.code === language.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative z-10 ml-auto w-2 h-2 bg-electric-cyan rounded-full shadow-lg shadow-electric-cyan/50"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Language Button */}
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
          aria-label="Select Language"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 via-neon-purple/20 to-electric-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/10 via-neon-purple/10 to-electric-cyan/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-center gap-1.5">
            {/* Globe Icon or Flag */}
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-white/70 dark:text-electric-cyan/70 group-hover:text-white dark:group-hover:text-electric-cyan transition-all duration-300" />
              <span className="ml-1 text-xs text-white/70 dark:text-electric-cyan/70 group-hover:text-white dark:group-hover:text-electric-cyan transition-all duration-300">{currentLanguage.flag}</span>
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

export default LanguageSelector;