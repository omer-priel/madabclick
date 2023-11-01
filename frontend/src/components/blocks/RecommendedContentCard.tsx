import { useTranslations } from 'next-intl';

import YouTubePlaylist from '@/components/atoms/YouTubePlaylist';
import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
}

export default function RecommendedContentCard({ content }: Props) {
  const t = useTranslations();

  const links: string[][] = [];

  if (content.youtubeVideo || content.youtubePlaylist) {
    if (content.youtubeVideo) {
      links.push([t('link-to-youtube-video'), content.link]);
    }

    if (content.youtubePlaylist) {
      links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.youtubePlaylist.id}`]);
    }
  } else {
    links.push([t('link-to-website'), content.link]);
  }

  let contentType = 0;
  if (content.youtubeVideo) {
    contentType = 1;
  } else if (content.youtubePlaylist) {
    contentType = 2;
  }

  return (
    <div className='relative w-[37.5vw] h-[25vw]'>
      {contentType == 1 && <YouTubeVideo content={content} overlayText={t('recommended') + ' ' + content.title} />}
      {contentType == 2 && <YouTubePlaylist content={content} overlayText={t('recommended') + ' ' + content.title} />}
    </div>
  );
}
