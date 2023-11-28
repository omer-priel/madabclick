'use client';

import { useTranslations } from 'next-intl';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { multiFontText } from '@/lib/styling';

interface Props {
  content: Content;
}

export default function ContentCardMobile({ content }: Props) {
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
      <div className='w-[280px] h-[155px]'>
        {contentType == 1 && <YouTubeVideo playerId={content.index} content={content} width={280} height={155} />}
      </div>
      <div className='mt-[14px] text-white text-[12px]/[18px] text-right font-normal'>
        <div className='mx-auto w-fit max-w-[280px]'>{multiFontText(content.title)}</div>
      </div>
    </>
  );
}
