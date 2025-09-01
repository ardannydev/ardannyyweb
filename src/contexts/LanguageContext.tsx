import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Translations } from '../translations';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  t: Translations;
  translate: (key: keyof Translations) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        const parsed = JSON.parse(savedLanguage);
        return languages.find(lang => lang.code === parsed.code) || languages[0];
      }
    } catch (error) {
      // If parsing fails, clear the invalid data and use default
      localStorage.removeItem('selectedLanguage');
    }
    return languages[0];
  });

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
  };

  const t = translations[currentLanguage.code] || translations.en;
  
  const translate = (key: keyof Translations): string => {
    return t[key] || translations.en[key] || key;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    languages,
    t,
    translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};