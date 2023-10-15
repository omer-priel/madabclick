import { getTranslator } from 'next-intl/server';

const gStore = {
  locale: 'he',
};

export function setLocale(locale: string): void {
  gStore.locale = locale;
}

export async function getTranslation() {
  return (await getTranslator(gStore.locale)).rich;
}

export function hasHE(text: string): boolean {
  return (/[\u0590-\u05FF]/).test(text);
}
export function hasEN(text: string): boolean {
  return (/[A-Z]/).test(text) || (/[a-z]/).test(text);
}

export function hasAR(text: string): boolean {
  return (/[\u0600-\u06FF]/).test(text) || (/[\u0750-\u077F]/).test(text);
}
