import { getTranslator } from 'next-intl/server';

export interface Language {
  locale: 'he' | 'en' | 'ar';
  key: string;
  dir: 'ltr' | 'rtl';
  has: (text: string) => boolean;
}

export const LANGUAGES: Language[] = [
  {
    locale: 'he',
    key: 'עברית',
    dir: 'rtl',
    has: (text: string): boolean => {
      return /[\u0590-\u05FF]/.test(text);
    },
  },
  {
    locale: 'en',
    key: 'אנגלית',
    dir: 'ltr',
    has: (text: string): boolean => {
      return /[A-Z]/.test(text) || /[a-z]/.test(text);
    },
  },
  {
    locale: 'ar',
    key: 'ערבית',
    dir: 'rtl',
    has: (text: string): boolean => {
      return /[\u0600-\u06FF]/.test(text) || /[\u0750-\u077F]/.test(text);
    },
  },
];

const gStore = {
  locale: 'he',
};

export function setLocale(locale: string): void {
  gStore.locale = locale;
}

export async function getTranslation() {
  return (await getTranslator(gStore.locale)).rich;
}

export function getTextDirection(text: string): 'ltr' | 'rtl' | null {
  const dir = LANGUAGES.find((language) => language.has(text))?.dir;
  if (dir) {
    return dir;
  }

  return null;
}
