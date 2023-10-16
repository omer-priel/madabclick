'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
}

export default function YouTubeVideo({ content }: Props) {
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
