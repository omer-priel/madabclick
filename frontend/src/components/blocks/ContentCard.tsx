'use client';

import { useTranslations } from 'next-intl';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { multiFontText } from '@/lib/styling';

interface Props {
  content: Content;
}

export default function ContentCard({ content }: Props) {
  const t = useTranslations();

  const links: string[][] = [];

  if (content.youtube) {
    links.push([t('link-to-youtube-video'), content.link]);

    if (content.youtube.playlist) {
      links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.youtube.playlist.id}`]);
    }
  } else {
    links.push([t('link-to-website'), content.link]);
  }

  let contentType = 0;
  if (content.youtube) {
    contentType = 1;
  }

  return (
    <>
      <div className='w-[395px] h-[220px]'>
        {contentType == 1 && (
          <YouTubeVideo playerId={content.index} content={content} width='395px' height='220px' innerClassName='rounded-[10px]' />
        )}
      </div>
      <div className='mt-[14px] text-white text-[16px]/[24px] text-right font-black'>{multiFontText(content.title)}</div>
    </>
  );
}
