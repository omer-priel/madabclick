import { create } from 'zustand';

import { Language, languages } from './translation';

export type StoreState = {
  language: Language;

  activePlayer: number | null;

  setLanguage: (language: Language) => void;

  activatePlayer: (playerId: number) => void;
  deactivatePlayer: () => void;
};

export const useStore = create<StoreState>((set) => ({
  language: languages.he,

  activePlayer: null,

  setLanguage: (language) => set((state) => ({ language: (state.language = language) })),

  activatePlayer: (playerId) => set((state) => ({ activePlayer: (state.activePlayer = playerId) })),
  deactivatePlayer: () => set((state) => ({ activePlayer: (state.activePlayer = null) })),
}));
