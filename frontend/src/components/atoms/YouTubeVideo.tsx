'use client';

import { useState } from 'react';

import Image from 'next/image';
import YouTube from 'react-youtube';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
  overlayText?: string | null;
}

export default function YouTubeVideo({ content, overlayText }: Props) {
  const [show, setShow] = useState(false);

  if (!content.youtube) {
    return <></>;
  }

  return (
    <>
      {!show ? (
        <button type='button' onClick={() => setShow(true)}>
          {content.youtube.thumbnail.width && content.youtube.thumbnail.height ? (
            <Image
              className='absolute inset-0 w-full h-full rounded-[10px]'
              src={content.youtube.thumbnail.url}
              alt={content.title}
              width={content.youtube.thumbnail.width}
              height={content.youtube.thumbnail.height}
            />
          ) : (
            <Image className='absolute inset-0 w-full h-full rounded-[10px]' src={content.youtube.thumbnail.url} alt={content.title} fill />
          )}
          {!!overlayText && (
            <div className='absolute w-full h-[5.52vw] bottom-0 left-0 bg-[#04090E]/[.70]'>
              <div className='flex w-full h-full'>
                <p className='w-fit h-[1.25vw] mx-auto my-auto text-white text-[16px]/[24px] font-black'>{overlayText}</p>
              </div>
            </div>
          )}
        </button>
      ) : content.youtube.playlist ? (
        <YouTube
          iframeClassName='absolute inset-0 w-full h-full rounded-[10px]'
          title={content.title}
          videoId={content.youtube.id}
          opts={{ playerVars: { autoplay: 1, list: content.youtube.playlist.id } }}
        />
      ) : (
        <YouTube
          iframeClassName='absolute inset-0 w-full h-full rounded-[10px]'
          title={content.title}
          videoId={content.youtube.id}
          opts={{ playerVars: { autoplay: 1 } }}
        />
      )}
    </>
  );
}
