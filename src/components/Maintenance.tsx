import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Clock, 
  Wrench, 
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MaintenanceProps {
  pageTitle: string;
  pageType: 'about' | 'contact';
}

const Maintenance: React.FC<MaintenanceProps> = ({ 
  pageTitle, 
  pageType
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const iconVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-blue via-deep-purple to-space-blue dark:from-gray-900 dark:via-space-blue dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Main Icon with Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
          style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
        >
          <div className="relative">
            {/* Outer Glow Ring */}
            <motion.div
              animate={{ scale: window.matchMedia('(max-width: 768px)').matches ? [1, 1.1, 1] : [1, 1.2, 1] }}
              transition={{ duration: window.matchMedia('(max-width: 768px)').matches ? 3 : 2, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-0 w-32 h-32 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full ${window.matchMedia('(max-width: 768px)').matches ? 'blur-lg' : 'blur-xl'} opacity-30`}
              style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
            />
            
            {/* Main Icon Container */}
            <div className={`relative w-32 h-32 bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 rounded-full flex items-center justify-center border border-electric-cyan/30 ${window.matchMedia('(max-width: 768px)').matches ? 'backdrop-blur-sm' : 'backdrop-blur-md'}`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: window.matchMedia('(max-width: 768px)').matches ? 3 : 2, repeat: Infinity, ease: 'linear' }}
                className="text-electric-cyan"
                style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
              >
                <Settings className="w-16 h-16" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-orbitron bg-gradient-to-r from-electric-cyan via-white to-neon-purple bg-clip-text text-transparent mb-4">
            Halaman Dalam Maintenance
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-2">
            {pageTitle}
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-6">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-lg font-medium">Sedang dalam perbaikan</span>
          </div>
          <div className="bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 rounded-lg p-4 border border-electric-cyan/30">
            <p className="text-white text-lg mb-2">Akan kembali ke beranda dalam:</p>
            <div className="text-3xl font-bold text-electric-cyan">
              {countdown} detik
            </div>
          </div>
        </motion.div>







        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Terakhir diperbarui: 1 September 2025 pukul 14.55
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Halaman akan kembali normal setelah maintenance selesai
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Maintenance;