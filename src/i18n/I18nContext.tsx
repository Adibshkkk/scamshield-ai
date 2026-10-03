import React, { createContext, useContext, useEffect, useState } from 'react';
import { SupportedLanguage } from '../types/user';
import { StorageService } from '../services/storageService';
import { en } from './translations/en';
import { hi } from './translations/hi';
import { mr } from './translations/mr';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  supportedLanguages: { code: SupportedLanguage; label: string; nativeLabel: string }[];
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en,
  hi,
  mr,
};

const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
];

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const profile = StorageService.getUserProfile();
      if (profile && ['en', 'hi', 'mr'].includes(profile.preferredLanguage)) {
        return profile.preferredLanguage;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    StorageService.updateLanguagePreference(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const currentDict = translations[language];
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }
    // Fallback to English
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    // Ultimate fallback
    return fallback !== undefined ? fallback : key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
