interface ContentBase {
  language: string;
  domain: string;
  ageLevel: string;
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
  languages: string[];
  domains: string[];
  ageLevels: string[];

  contents: Content[];
}

export function getContent(language: string, domain: string, ageLevel: string, name: string, description: string, link: string): Content {
  const content = {
    language: language ? language : '',
    name: name ? name : '',
    domain: domain ? domain : '',
    ageLevel: ageLevel ? ageLevel : '',
    description: description ? description : '',
    link: link ? link : '',
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
