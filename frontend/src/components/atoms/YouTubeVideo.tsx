'use client';

import Image from 'next/image';
import YouTube from 'react-youtube';

import { getAppStore } from '@/appStore';
import { Content } from '@/lib/api/schemas';
import { useAppDispatch, useAppSelector } from '@/store';
import { activatePlayer, deactivatePlayer } from '@/store/features/playersSlice';

interface Props {
  playerId: number;
  content: Content;
  width: number;
  height: number;
}

export default function YouTubeVideo({ playerId, content, width, height }: Props) {
  const dispatch = useAppDispatch();

  const active = useAppSelector((state) => state.players.active === playerId);

  const onActive = () => {
    dispatch(
      activatePlayer({
        playerId,
      })
    );
  };

  const onClose = () => {
    dispatch(deactivatePlayer());
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
              className='w-full h-full rounded-[10px]'
              src={content.youtube.thumbnail.url}
              alt={content.title}
              width={content.youtube.thumbnail.width}
              height={content.youtube.thumbnail.height}
            />
          ) : (
            <Image className='absolute w-full h-full top-0 right-0 rounded-[10px]' src={content.youtube.thumbnail.url} alt={content.title} fill />
          )}
        </button>
        { active && (
        <YouTube
          className='absolute w-full h-full top-0 right-0 rounded-[10px] bg-transparent'
          iframeClassName='w-full h-full rounded-[10px]'
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
