import { getTranslator } from 'next-intl/server';

export type LanguageLocale = 'he' | 'en' | 'ar';

export interface Language {
  locale: LanguageLocale;
  key: string;
  dir: 'ltr' | 'rtl';
}

export type Languages = { [key in LanguageLocale]: Language };

export const languages: Languages = {
  he: {
    locale: 'he',
    key: 'עברית',
    dir: 'rtl',
  },
  en: {
    locale: 'en',
    key: 'אנגלית',
    dir: 'ltr',
  },
  ar: {
    locale: 'ar',
    key: 'ערבית',
    dir: 'rtl',
  },
};

const gStore = {
  language: languages.he,
};

export function setLanguage(language: Language): void {
  gStore.language = language;
}

export function getLanguage(): Language {
  return gStore.language;
}

export function getLanguages(): Language[] {
  return Object.values(languages) as Language[];
}

export async function getTranslation() {
  return (await getTranslator(gStore.language.locale)).rich;
}

export function getTextDirection(text: string): 'ltr' | 'rtl' | null {
  if (/[\u0590-\u05FF]/.test(text)) {
    return languages.he.dir;
  }

  if (/[A-Z]/.test(text) || /[a-z]/.test(text)) {
    return languages.en.dir;
  }

  if (/[\u0600-\u06FF]/.test(text) || /[\u0750-\u077F]/.test(text)) {
    return languages.ar.dir;
  }

  return null;
}
