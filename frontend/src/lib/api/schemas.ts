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

  allowed: boolean;
  notAllowedReason: string;

  youtube: {
    id: string;
    loaded: boolean;
    channelId: string | null;
    title: string | null;
    description: string | null;

    thumbnail: Thumbnail;

    playlist: {
      id: string;
      loaded: boolean;
      title: string | null;
      description: string | null;

      thumbnail: Thumbnail | null;
    } | null;
  } | null;
}

export interface ContentsSchema {
  currentLanguageValue: string;

  domains: string[];
  ageLevels: string[];
  durations: string[];
  languages: string[];

  contentsFromDBTotal: number;
  contentsTotal: number;
  notAllowedContentsTotal: number;

  recommendedContent: Content | null;
  contents: Content[];

  notAllowedContents: Content[];
}
