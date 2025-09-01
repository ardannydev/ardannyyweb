import { createContext } from 'react';

export interface HeroAnimationContextType {
  isHeroAnimationComplete: boolean;
  setHeroAnimationComplete: (complete: boolean) => void;
}

// This module only exports the context and its type. Keeping this file
// free of React components avoids the fast-refresh ESLint warning.
export const HeroAnimationContext = createContext<HeroAnimationContextType | undefined>(undefined);
