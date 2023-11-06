import { YouTubePlayer } from 'react-youtube';

declare global {
  interface Window {
    appStore?: AppStore;
  }
}

interface AppStore {
  activeYouTubeContent: {
    playerId: number;
    player: YouTubePlayer;
  } | null;
}
