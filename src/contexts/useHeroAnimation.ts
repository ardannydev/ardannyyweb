import { useContext } from 'react';
import { HeroAnimationContext } from './HeroAnimationContextValue';

export type HeroAnimationHook = {
  isHeroAnimationComplete: boolean;
  setHeroAnimationComplete: (c: boolean) => void;
};

export const useHeroAnimation = (): HeroAnimationHook => {
  const context = useContext(HeroAnimationContext);
  if (context === undefined) {
    throw new Error('useHeroAnimation must be used within a HeroAnimationProvider');
  }
  return context;
};

export default useHeroAnimation;
