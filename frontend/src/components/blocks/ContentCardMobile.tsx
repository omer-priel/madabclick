'use client';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { multiFontText } from '@/lib/styling';

interface Props {
  content: Content;
}

export default function ContentCardMobile({ content }: Props) {
  let contentType = 0;
  if (content.youtube) {
    contentType = 1;
  }

  return (
    <>
      <div className='w-[67.632vw] h-[37.439vw]'>
        {contentType == 1 && <YouTubeVideo playerId={content.index} content={content} width='67.632vw' height='37.439vw' />}
      </div>
      <div className='mt-[14px] text-white text-[12px]/[18px] font-normal'>
        <div className='max-w-[67.632vw]'>{multiFontText(content.title)}</div>
      </div>
    </>
  );
}
