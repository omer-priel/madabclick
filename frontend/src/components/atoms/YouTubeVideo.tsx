'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
  overlayText?: string | null;
}

export default function YouTubeVideo({ content, overlayText }: Props) {
  const [show, setShow] = useState(false);

  if (!content.youtubeVideo) {
    return <></>;
  }

  return (
    <>
      {!show ? (
        <button type='button' onClick={() => setShow(true)}>
          {content.youtubeVideo.thumbnail.width && content.youtubeVideo.thumbnail.height ? (
            <Image
              className='absolute inset-0 w-full h-full'
              src={content.youtubeVideo.thumbnail.url}
              alt={content.title}
              width={content.youtubeVideo.thumbnail.width}
              height={content.youtubeVideo.thumbnail.height}
            />
          ) : (
            <Image className='absolute inset-0 w-full h-full' src={content.youtubeVideo.thumbnail.url} alt={content.title} fill />
          )}
          {!!overlayText && (
            <div className='absolute w-full h-[5.52vw] bottom-0 left-0 bg-[#04090E]/[.70]'>
              <div className='flex w-full h-full'>
                <p className='w-fit h-[1.25vw] mx-auto my-auto text-white text-[0.833vw]/[1.25vw] font-black'>{overlayText}</p>
              </div>
            </div>
          )}
        </button>
      ) : (
        <iframe
          className='absolute inset-0 w-full h-full'
          title={content.title}
          src={`https://www.youtube.com/embed/${content.youtubeVideo.id}?autoplay=1`}
          allow='autoplay'
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
