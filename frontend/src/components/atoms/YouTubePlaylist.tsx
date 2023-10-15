import { ContentYouTube } from '@/lib/api/schemas';

interface Props {
  content: ContentYouTube;
}

export default function YouTubePlaylist({ content }: Props) {
  return (
    <iframe
      title={content.title}
      src={`https://www.youtube.com/embed/videoseries?amp;list=${content.playlistID}`}
      className='absolute inset-0 w-full h-full'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    ></iframe>
  );
}
