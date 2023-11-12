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

export function getLanguages(): Languages {
  return languages;
}

export function findLanguage(locale: string): Language | null {
  const language = Object.values(languages).find((value) => value.locale === locale);

  if (language) {
    return language;
  }

  return null;
}

export async function getTranslation(locale: LanguageLocale) {
  return (await getTranslator(locale)).rich;
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
