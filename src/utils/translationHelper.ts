import { useI18n } from '../contexts/I18nContext';

// Translation helper function with fallback
export function useTranslationWithFallback() {
  const { t } = useI18n();
  
  const translate = (key: string, fallback: string): string => {
    try {
      const translation = t(key);
      // If translation exists and is different from key, return it
      if (translation && translation !== key) {
        return translation;
      }
      return fallback;
    } catch {
      return fallback;
    }
  };
  
  return { translate, t };
}

