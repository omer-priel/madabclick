import { create } from 'zustand';

import { Language, languages } from './translation';

export type Device = 'desktop' | 'mobile' | 'googlebot' | 'whatsapp' | 'twitterbot';

export function findDevice(userAgent: string | null): Device {
  if (!userAgent) {
    return 'desktop';
  }

  if (userAgent.includes('Googlebot')) {
    return 'googlebot';
  }

  if (userAgent.includes('WhatsApp')) {
    return 'whatsapp';
  }

  if (userAgent.includes('Twitterbot')) {
    return 'twitterbot';
  }

  if (userAgent.includes('Android') || userAgent.includes('iOS') || userAgent.includes('Mobile')) {
    return 'mobile';
  }

  return 'desktop';
}

export type StoreState = {
  language: Language;
  device: Device;

  activePlayer: number | null;

  setLanguage: (language: Language) => void;
  setDevice: (device: Device) => void;

  activatePlayer: (playerId: number) => void;
  deactivatePlayer: () => void;
};

export const useStore = create<StoreState>((set) => ({
  language: languages.he,
  device: 'desktop',

  activePlayer: null,

  setLanguage: (language) => set((state) => ({ language: (state.language = language) })),
  setDevice: (device) => set((state) => ({ device: (state.device = device) })),

  activatePlayer: (playerId) => set((state) => ({ activePlayer: (state.activePlayer = playerId) })),
  deactivatePlayer: () => set((state) => ({ activePlayer: (state.activePlayer = null) })),
}));
