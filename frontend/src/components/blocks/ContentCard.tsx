import { useTranslations } from 'next-intl';

import { Content, getTranslatedTextByKey } from '@/lib/db/schemas';

interface Props {
  content: Content;
  locale: string;
  hidden: boolean;
}

export default function ContentCard({ content, locale, hidden }: Props) {
  const t = useTranslations();

  const links: string[][] = [];

  if (content.contentType == 'youtube') {
    if (content.videoID) {
      links.push([t('link-to-youtube-video'), content.link]);
    }

    if (content.playlistID) {
      links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.playlistID}`]);
    }
  } else if (content.contentType == 'other') {
    links.push([t('link-to-website'), content.link]);
  }

  return (
    <div className={'bg-white border rounded-lg shadow-md p-4' + (hidden ? ' hidden' : '')}>
      <h2 className='text-xl text-center font-semibold'>
        <a href={content.link} target='_blank' rel='noopener noreferrer' className='text-gray-900'>
          {content.name ? content.name : <br />}
        </a>
      </h2>
      <p className='text-gray-600 text-center'>{getTranslatedTextByKey(content.domain, locale)}</p>
      <p className='text-gray-600 text-center'>
        {getTranslatedTextByKey(content.ageLevel, locale)} - {getTranslatedTextByKey(content.duration, locale)} - {content.language.label}
      </p>
      <div className='flex items-center justify-center'>
        {links.map((link) => (
          <a key={link[1]} href={link[1]} target='_blank' rel='noopener noreferrer' className='text-blue-500 mx-3'>
            {link[0]}
          </a>
        ))}
      </div>
      <div className='relative h-48'>
        {content.contentType == 'youtube' && content.videoID && (
          <iframe
            title={content.name}
            src={`https://www.youtube.com/embed/${content.videoID}`}
            className='absolute inset-0 w-full h-full'
            allowFullScreen
          ></iframe>
        )}
        {content.contentType == 'youtube' && !content.videoID && content.playlistID && (
          <iframe
            title={content.name}
            src={`https://www.youtube.com/embed/videoseries?amp;list=${content.playlistID}`}
            className='absolute inset-0 w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
