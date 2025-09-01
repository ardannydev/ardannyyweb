import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeroAnimationContextType {
  isHeroAnimationComplete: boolean;
  setHeroAnimationComplete: (complete: boolean) => void;
}

const HeroAnimationContext = createContext<HeroAnimationContextType | undefined>(undefined);

export const HeroAnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);

  const setHeroAnimationComplete = (complete: boolean) => {
    setIsHeroAnimationComplete(complete);
  };

  return (
    <HeroAnimationContext.Provider value={{
      isHeroAnimationComplete,
      setHeroAnimationComplete
    }}>
      {children}
    </HeroAnimationContext.Provider>
  );
};

export const useHeroAnimation = () => {
  const context = useContext(HeroAnimationContext);
  if (context === undefined) {
    throw new Error('useHeroAnimation must be used within a HeroAnimationProvider');
  }
  return context;
};