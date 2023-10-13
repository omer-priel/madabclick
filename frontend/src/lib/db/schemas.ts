export interface Language {
  id: string;
  label: string;
}

export interface TranslatedText {
  key: string;
  orderIndex: number;
  he: string;
  en: string;
  ar: string;
}

interface ContentBase {
  index: number;
  language: Language;
  domain: TranslatedText;
  ageLevel: TranslatedText;
  duration: TranslatedText;
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

export interface ContentsMetadata {
  languages: Language[];
  domains: { [key: string]: TranslatedText };
  ageLevels: { [key: string]: TranslatedText };
  durations: { [key: string]: TranslatedText };
}

export interface ContentsSchema extends ContentsMetadata {
  contents: Content[];
}

export function getTranslatedTextByKey(text: TranslatedText, key: string) {
  switch (key) {
    case 'he':
      return text.he;
    case 'en':
      return text.en;
    case 'ar':
      return text.ar;
    default:
      return text.he;
  }
}
