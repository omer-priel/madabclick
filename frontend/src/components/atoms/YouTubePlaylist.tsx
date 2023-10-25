'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Content } from '@/lib/api/schemas';

interface Props {
  content: Content;
  overlayText?: string | null;
}

export default function YouTubePlaylist({ content, overlayText }: Props) {
  const [show, setShow] = useState(false);

  if (!content.youtubePlaylist) {
    return <></>;
  }

  return (
    <>
      {!show && !!content.youtubePlaylist.thumbnail ? (
        <button type='button' onClick={() => setShow(true)}>
          {content.youtubePlaylist.thumbnail.width && content.youtubePlaylist.thumbnail.height ? (
            <Image
              className='absolute inset-0 w-full h-full'
              src={content.youtubePlaylist.thumbnail.url}
              alt={content.title}
              width={content.youtubePlaylist.thumbnail.width}
              height={content.youtubePlaylist.thumbnail.height}
            />
          ) : (
            <Image className='absolute inset-0 w-full h-full' src={content.youtubePlaylist.thumbnail.url} alt={content.title} fill />
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
          title={content.title}
          src={
            `https://www.youtube.com/embed/videoseries?amp;list=${content.youtubePlaylist.id}` +
            (!!content.youtubePlaylist.thumbnail ? '&autoplay=1' : '')
          }
          className='absolute inset-0 w-full h-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
