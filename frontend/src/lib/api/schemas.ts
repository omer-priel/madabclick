interface ContentBase {
  index: number;

  language: string;
  domain: string;
  ageLevel: string;
  duration: string;
  name: string; // from db
  link: string;
  recommended: boolean;

  title: string; // will be displayed
}

export interface ContentOther extends ContentBase {
  contentType: 'other';
}

export interface ContentYouTube extends ContentBase {
  contentType: 'youtube';
  videoID: string | null;
  playlistID: string | null;
  youtube: {
    title: string;
    description: string;
  } | null;
  thumbnail: {
    url: string;
    width: number | null;
    height: number | null;
  };
}

export type Content = ContentOther | ContentYouTube;

export interface ContentsSchema {
  currentLanguage: string;

  domains: string[];
  ageLevels: string[];
  durations: string[];
  languages: string[];

  recommendedContent: Content | null;

  contents: Content[];
}
