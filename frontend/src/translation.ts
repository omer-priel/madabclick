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
