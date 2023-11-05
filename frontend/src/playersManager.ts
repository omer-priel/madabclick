import { YouTubePlayer } from 'react-youtube';

interface GStore {
  activePlayer: YouTubePlayer | null;
  activeContentIndex: number | null;
}

export const gStore: GStore = {
  activePlayer: null,
  activeContentIndex: null,
};

export function getActive(): GStore {
  return gStore;
}

export function clearActive() {
  gStore.activePlayer = null;
  gStore.activeContentIndex = null;
}

export function setActive(player: YouTubePlayer, activeContentIndex: number) {
  gStore.activePlayer = player;
  gStore.activeContentIndex = activeContentIndex;
}
