import { useTranslations } from 'next-intl';

import YouTubePlaylist from '@/components/atoms/YouTubePlaylist';
import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { getTextDirection } from '@/translation';

interface Props {
  content: Content;
  title: string;
  hidden?: boolean;
}

export default function ContentCard({ content, title, hidden }: Props) {
  const t = useTranslations();

  const links: string[][] = [];

  if (content.youtubeVideo) {
    links.push([t('link-to-youtube-video'), content.link]);

    if (content.youtubeVideo.playlistId) {
      links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.youtubeVideo.playlistId}`]);
    }
  } else if (content.youtubePlaylist) {
    links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.youtubePlaylist.id}`]);
  } else {
    links.push([t('link-to-website'), content.link]);
  }

  const titleDirection = getTextDirection(title);

  return (
    <div className={'bg-white border rounded-lg shadow-md p-4' + (hidden ? ' hidden' : '')}>
      <h2 className='text-xl text-center font-semibold'>
        <a href={content.link} target='_blank' rel='noopener noreferrer' className={'text-gray-900'}>
          <span style={titleDirection ? { direction: titleDirection } : {}}>{title}</span>
        </a>
      </h2>
      <p className='text-gray-600 text-center'>{content.domain}</p>
      <p className='text-gray-600 text-center'>
        {content.ageLevel} - {content.duration} - {content.language}
      </p>
      <div className='flex items-center justify-center'>
        {links.map((link) => (
          <a key={link[1]} href={link[1]} target='_blank' rel='noopener noreferrer' className='text-blue-500 mx-3'>
            {link[0]}
          </a>
        ))}
      </div>
      <div className='relative h-48'>
        {content.youtubeVideo && <YouTubeVideo content={content} />}
        {content.youtubePlaylist && <YouTubePlaylist content={content} />}
      </div>
    </div>
  );
}
