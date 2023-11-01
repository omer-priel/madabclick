interface Thumbnail {
  url: string;
  width: number | null;
  height: number | null;
}

export interface Content {
  index: number;

  language: string;
  domain: string;
  ageLevel: string;
  duration: string;
  name: string; // from db
  link: string;
  recommended: boolean;

  title: string; // will be displayed

  youtubeVideo: {
    id: string;
    title: string | null;
    description: string | null;

    thumbnail: Thumbnail;
  } | null;
  youtubePlaylist: {
    id: string;
    title: string | null;
    description: string | null;

    thumbnail: Thumbnail | null;
  } | null;
}

export interface ContentsSchema {
  currentLanguage: string;

  domains: string[];
  ageLevels: string[];
  durations: string[];
  languages: string[];

  contentsTotal: number;

  recommendedContent: Content | null;
  contents: Content[];
}
