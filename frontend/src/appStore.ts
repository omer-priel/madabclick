import { AppStore } from '@/global';

function createAppStore(): AppStore {
  return {
    activeYouTubeContent: null,
  };
}

export function getAppStore(): AppStore {
  if (typeof window.appStore === 'undefined') {
    window.appStore = createAppStore();
  }

  return window.appStore;
}
