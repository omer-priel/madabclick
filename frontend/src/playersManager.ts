import { YouTubePlayer } from 'react-youtube';

interface GStore {
  activePlayer: null | YouTubePlayer;
}

export const gStore: GStore = {
  activePlayer: null,
};

export function getActivePlayer(): null | YouTubePlayer {
  return gStore.activePlayer;
}

export function setActivePlayer(player: null | YouTubePlayer) {
  gStore.activePlayer = player;
}
