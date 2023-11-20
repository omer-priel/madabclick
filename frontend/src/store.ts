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
  pathname: string;
  device: Device;
  language: Language;

  activePlayer: number | null;

  activatePlayer: (playerId: number) => void;
  deactivatePlayer: () => void;
};

export const useStore = create<StoreState>((set) => ({
  pathname: '',
  device: 'desktop',
  language: languages.he,

  activePlayer: null,

  activatePlayer: (playerId) => set((state) => ({ activePlayer: (state.activePlayer = playerId) })),
  deactivatePlayer: () => set((state) => ({ activePlayer: (state.activePlayer = null) })),
}));
