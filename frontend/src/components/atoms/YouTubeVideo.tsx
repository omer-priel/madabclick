'use client';

import { useState } from 'react';

import Image from 'next/image';
import YouTube from 'react-youtube';

import { Content } from '@/lib/api/schemas';
import { clearActive, getActive, setActive } from '@/playersManager';

interface Props {
  content: Content;
  width: number;
  height: number;
}

export default function YouTubeVideo({ content, width, height }: Props) {
  const [show, setShow] = useState(false);

  if (!content.youtube) {
    return <></>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerVars: any = {
    width,
    height,
    enablejsapi: 1,
    origin: null,
  };

  if (content.youtube.playlist) {
    playerVars.list = content.youtube.playlist.id;
  }

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      {!show ? (
        <button className='w-full h-full bg-transparent' type='button' onClick={() => setShow(true)}>
          {content.youtube.thumbnail.width && content.youtube.thumbnail.height ? (
            <Image
              className='w-full h-full rounded-[10px]'
              src={content.youtube.thumbnail.url}
              alt={content.title}
              width={content.youtube.thumbnail.width}
              height={content.youtube.thumbnail.height}
            />
          ) : (
            <Image className='w-full h-full rounded-[10px]' src={content.youtube.thumbnail.url} alt={content.title} fill />
          )}
        </button>
      ) : (
        <YouTube
          className='w-full h-full rounded-[10px] bg-transparent'
          iframeClassName='w-full h-full rounded-[10px]'
          title={content.title}
          videoId={content.youtube.id}
          opts={{ playerVars }}
          onReady={(e) => {
            console.log('onReady', e);
            e.target.playVideo();
          }}
          onPlay={(e) => {
            console.log('onPlay', e);
            const last = getActive();
            if (last.activePlayer && last.activeContentIndex != content.index) {
              last.activePlayer.stopVideo();
            }

            setActive(e.target, content.index);
          }}
          onPause={(e) => {
            console.log('onPause', e);
            clearActive();
          }}
          onEnd={(e) => {
            console.log('onEnd', e);
            setShow(false);
          }}
          onStateChange={(e) => {
            console.log('onStateChange', e);

            // start new video
            if (e.data === 1) {
              if (e.target.getVideoData().video_id == content.youtube?.id) {
                return;
              }
              if (e.target.getPlaylistId() == content.youtube?.playlist?.id) {
                return;
              }

              e.target.stopVideo();
              clearActive();
              setShow(false);
            }
          }}
        />
      )}
    </div>
  );
}
