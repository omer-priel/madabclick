'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
}

export default function YouTubePlaylist({ content }: Props) {
  const [show, setShow] = useState(false);

  if (!content.youtubePlaylist) {
    return <></>;
  }

  return (
    <>
      {!show && !!content.youtubePlaylist.thumbnail ? (
        <button type='button' onClick={() => setShow(true)}>
          <Image className='absolute inset-0 w-full h-full' src={content.youtubePlaylist.thumbnail.url} alt={content.title} fill />
          {content.youtubePlaylist.thumbnail.width && content.youtubePlaylist.thumbnail.height && (
            <Image
              className='absolute inset-0 w-full h-full'
              src={content.youtubePlaylist.thumbnail.url}
              width={content.youtubePlaylist.thumbnail.width}
              height={content.youtubePlaylist.thumbnail.height}
              alt={content.title}
            />
          )}
        </button>
      ) : (
        <iframe
          title={content.title}
          src={`https://www.youtube.com/embed/videoseries?amp;list=${content.youtubePlaylist.id}` + (!!content.youtubePlaylist.thumbnail ? '&autoplay=1' : '')}
          className='absolute inset-0 w-full h-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
