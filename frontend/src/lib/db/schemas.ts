export type ContentType = 'youtube' | 'other';

export interface Content {
  language: string;
  domain: string;
  ageLevel: string;
  name: string;
  description: string;
  link: string;

  contentType: ContentType;
}
