'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ContentYouTube } from '@/lib/api/schemas';

interface Props {
  content: ContentYouTube;
}

export default function YouTubeVideo({ content }: Props) {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show ? (
        <button type='button' onClick={() => setShow(true)}>
          <Image className='absolute inset-0 w-full h-full' src={content.thumbnail.url} alt={content.title} fill />
          {content.thumbnail.width && content.thumbnail.height && (
            <Image
              className='absolute inset-0 w-full h-full'
              src={content.thumbnail.url}
              width={content.thumbnail.width}
              height={content.thumbnail.height}
              alt={content.title}
            />
          )}
        </button>
      ) : (
        <iframe
          className='absolute inset-0 w-full h-full'
          title={content.title}
          src={`https://www.youtube.com/embed/${content.videoID}?autoplay=1`}
          allow='autoplay'
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
