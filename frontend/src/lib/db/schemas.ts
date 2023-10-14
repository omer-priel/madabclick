interface ContentBase {
  index: number;
  language: string;
  domain: string;
  ageLevel: string;
  duration: string;
  name: string;
  link: string;
}

interface ContentOther extends ContentBase {
  contentType: 'other';
}

interface ContentYouTube extends ContentBase {
  contentType: 'youtube';
  videoID: string | null;
  playlistID: string | null;
}

export type Content = ContentOther | ContentYouTube;

export interface ContentsSchema {
  currentLanguage: string;

  domains: string[];
  ageLevels: string[];
  durations: string[];
  languages: string[];

  contents: Content[];
}
