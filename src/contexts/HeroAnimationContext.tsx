import React, { useState, ReactNode } from 'react';
import { HeroAnimationContext } from './HeroAnimationContextValue';

export const HeroAnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Keep animation state in-memory only. This ensures the typewriter runs
  // on full page reload / open, while SPA client-side navigation will keep
  // this provider mounted so the animation won't re-run during route changes.
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState<boolean>(false);

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

// internal: use the hook from `useHeroAnimation.ts`