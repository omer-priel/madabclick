import { useTranslations } from 'next-intl';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
}

export default function RecommendedContentCard({ content }: Props) {
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
    <div className='relative w-[38.125vw] h-[24.583vw]'>
      <div className='absolute w-[38.125vw] h-[21.145vw] right-0 top-0'>{contentType == 1 && <YouTubeVideo content={content} />}</div>
      <div className='absolute w-[38.125vw] h-[36px] right-0 bottom-0 text-white text-[24px]/[36px] text-right font-black'>
        {content.title}
      </div>
    </div>
  );
}
