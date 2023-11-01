import { useTranslations } from 'next-intl';

import YouTubePlaylist from '@/components/atoms/YouTubePlaylist';
import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
}

export default function ContentCard({ content }: Props) {
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

  let contentType = 0;
  if (content.youtubeVideo) {
    contentType = 1;
  } else if (content.youtubePlaylist) {
    contentType = 2;
  }

  return (
    <div className='w-[20.833vw]'>
      <div className='relative w-[20.833vw] h-[14.6875vw]'>
        {contentType == 1 && <YouTubeVideo content={content} />}
        {contentType == 2 && <YouTubePlaylist content={content} />}
      </div>
      <div className='mt-[0.781vw] text-black text-[16px]/[24px] text-right font-black'>{content.title}</div>
    </div>
  );
}
