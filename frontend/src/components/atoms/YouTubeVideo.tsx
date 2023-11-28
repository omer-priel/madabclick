'use client';

import Image from 'next/image';
import YouTube from 'react-youtube';

import { getAppStore } from '@/appStore';
import { Content } from '@/lib/api/schemas';
import { cn } from '@/lib/styling';
import playIcon from '@/public/play.svg';
import { useStore } from '@/store';

interface Props {
  playerId: number;
  content: Content;
  width: number;
  height: number;
  innerClassName?: string;
  playButtonSize?: number;
}

export default function YouTubeVideo({ playerId, content, width, height, innerClassName, playButtonSize }: Props) {
  const active = useStore((state) => state.activePlayer === playerId);
  const activatePlayer = useStore((state) => state.activatePlayer);
  const deactivatePlayer = useStore((state) => state.deactivatePlayer);

  const onActive = () => {
    activatePlayer(playerId);
  };

  const onClose = () => {
    deactivatePlayer();
  };

  if (!content.youtube) {
    return <></>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerVars: any = {
    width,
    height,
    enablejsapi: 1,
    origin: null,
    modestbranding: 1,
  };

  if (content.youtube.playlist) {
    playerVars.list = content.youtube.playlist.id;
  }

  return (
    <div className='relative' style={{ width: `${width}px`, height: `${height}px` }}>
      <button className='absolute w-full h-full top-0 right-0 bg-transparent' type='button' onClick={() => onActive()}>
        {content.youtube.thumbnail.width && content.youtube.thumbnail.height ? (
          <Image
            className={cn('w-full h-full', innerClassName)}
            src={content.youtube.thumbnail.url}
            alt={content.title}
            width={content.youtube.thumbnail.width}
            height={content.youtube.thumbnail.height}
          />
        ) : (
          <Image
            className={cn('absolute w-full h-full top-0 right-0', innerClassName)}
            src={content.youtube.thumbnail.url}
            alt={content.title}
            fill
          />
        )}
        {playButtonSize && (
          <div className='absolute w-full h-full top-0 right-0 z-2'>
            <Image
              className='mx-auto'
              style={{
                width: `${playButtonSize}px`,
                height: `${playButtonSize}px`,
                marginTop: `${(height - playButtonSize) / 2}px`,
              }}
              alt=''
              src={playIcon}
              width={playButtonSize}
              height={playButtonSize}
            />
          </div>
        )}
      </button>
      {active && (
        <YouTube
          className={cn('absolute w-full h-full top-0 right-0 bg-transparent', innerClassName)}
          iframeClassName={cn('w-full h-full', innerClassName)}
          title={content.title}
          videoId={content.youtube.id}
          opts={{ playerVars }}
          onReady={(e) => {
            e.target.playVideo();
          }}
          onEnd={() => {
            onClose();
          }}
          onStateChange={(e) => {
            const lastActive = getAppStore().activeYouTubeContent;
            if (lastActive && lastActive.playerId != playerId) {
              lastActive.player.pauseVideo();
            }

            getAppStore().activeYouTubeContent = {
              playerId: playerId,
              player: e.target,
            };

            if (e.data === 1) {
              // playing
              if (e.target.getVideoData().video_id == content.youtube?.id) {
                return;
              }

              if (e.target.getPlaylistId() == content.youtube?.playlist?.id) {
                return;
              }

              e.target.stopVideo();

              getAppStore().activeYouTubeContent = null;

              onClose();
            }
          }}
        />
      )}
    </div>
  );
}
