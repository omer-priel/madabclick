'use client';

import { useState } from 'react';

import Image from 'next/image';

interface Props {
  videoID: string;
  title: string;
}

export default function YouTubeVideo({ videoID, title }: Props) {
  const [show, setShow] = useState(false);
  const [imageSrc, setImageSrc] = useState(`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`);

  return (
    <>
      {!show ? (
        <button type='button' onClick={() => setShow(true)}>
          <Image
            className='absolute inset-0 w-full h-full'
            src={imageSrc}
            alt={title}
            fill
            loading='lazy'
            onError={() => {
              console.log(imageSrc);
              setImageSrc(`https://img.youtube.com/vi/${videoID}/hqdefault.jpg`);
            }}
          />
        </button>
      ) : (
        <iframe
          className='absolute inset-0 w-full h-full'
          title={title}
          src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
          allow='autoplay'
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
