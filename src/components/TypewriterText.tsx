import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Update text directly when language changes without resetting animation
  useEffect(() => {
    if (isComplete) {
      setDisplayText(text);
    }
  }, [text, isComplete]);

  useEffect(() => {
    // On mobile devices, skip the typing animation and render immediately
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      // set full text and mark complete
      setDisplayText(text);
      setCurrentIndex(text.length);
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, speed, isComplete, onComplete]);

  return (
    <div className={className}>
      <span>{displayText}</span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-6 bg-electric-cyan ml-1"
        />
      )}
    </div>
  );
};

export default TypewriterText;