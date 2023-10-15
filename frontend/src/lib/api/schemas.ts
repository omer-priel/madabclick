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
    playlistId: string | null;
    title: string | null;
    description: string | null;

    thumbnail: {
      url: string;
      width: number | null;
      height: number | null;
    };
  } | null;
  youtubePlaylist: {
    id: string;
    title: string | null;
    description: string | null;

    thumbnail: {
      url: string;
      width: number | null;
      height: number | null;
    } | null;
  } | null;
}

export interface ContentsSchema {
  currentLanguage: string;

  domains: string[];
  ageLevels: string[];
  durations: string[];
  languages: string[];

  recommendedContent: Content | null;

  contents: Content[];
}
