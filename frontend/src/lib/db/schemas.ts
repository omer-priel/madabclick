import { LANGUAGES } from '@/config';

interface Language {
  id: string;
  label: string;
}

interface ContentBase {
  index: number;
  language: Language;
  domain: string;
  ageLevel: string;
  duration: string;
  name: string;
  description: string;
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
  languages: Language[];
  domains: string[];
  ageLevels: string[];
  durations: string[];

  contents: Content[];
}

export function mapIDToLanguage(id: string): Language {
  const found = LANGUAGES.filter((language) => language.id === id);

  if (found.length == 0) {
    return {
      id: 'he',
      label: 'עברית',
    };
  }

  return found[0];
}

export function mapLabelToLanguage(label: string): Language {
  const found = LANGUAGES.filter((language) => language.label === label);

  if (found.length == 0) {
    return {
      id: 'he',
      label: 'עברית',
    };
  }

  return found[0];
}

export function getContent(
  index: number,
  language: string,
  domain: string,
  ageLevel: string,
  name: string,
  description: string,
  link: string,
  duration: string
): Content {
  const content = {
    index,
    language: mapLabelToLanguage(language),
    domain,
    ageLevel,
    duration,
    name,
    description,
    link,
  };

  if (link.startsWith('https://www.youtube.com/')) {
    let videoID = null;
    let playlistID = null;

    if (link.startsWith('https://www.youtube.com/watch?')) {
      if (content.link.includes('?v=')) {
        videoID = content.link.split('?v=')[1].split('&')[0];
      } else {
        videoID = content.link.split('&v=')[1].split('&')[0];
      }
    }

    if (content.link.includes('?list=')) {
      playlistID = content.link.split('?list=')[1].split('&')[0];
    } else if (content.link.includes('&list=')) {
      playlistID = content.link.split('&list=')[1].split('&')[0];
    }

    return {
      ...content,
      contentType: 'youtube',
      videoID: videoID,
      playlistID: playlistID,
    };
  }

  return {
    ...content,
    contentType: 'other',
  };
}
