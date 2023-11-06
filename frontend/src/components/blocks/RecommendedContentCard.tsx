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
    <div className='w-fit h-fit'>
      <div className='w-[732px] h-[406px]'>{contentType == 1 && <YouTubeVideo playerId={-1} content={content} width={732} height={406} />}</div>
      <div className='w-[732px] h-[36px] mt-[30px] text-white text-[24px]/[36px] text-right font-black'>{content.title}</div>
    </div>
  );
}
