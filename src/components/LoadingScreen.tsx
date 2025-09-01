import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    // minimal visible time to avoid flicker
    const minShow = 600;
    const t0 = Date.now();
    const handle = () => {
      const dt = Date.now() - t0;
      const wait = Math.max(0, minShow - dt);
      setTimeout(() => onFinish?.(), wait);
    };

    if (document.readyState === 'complete') {
      handle();
    } else {
      window.addEventListener('load', handle);
      return () => window.removeEventListener('load', handle);
    }
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-gradient-to-br from-space-blue via-deep-purple to-space-blue">
      <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="mb-4 flex items-center justify-center">
          <div className="p-3 rounded-full bg-gradient-to-r from-electric-cyan/20 to-neon-purple/20 border border-electric-cyan/30">
            <Sparkles className="w-8 h-8 text-electric-cyan" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
        <p className="text-sm text-white/80 mt-2">Please wait</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
