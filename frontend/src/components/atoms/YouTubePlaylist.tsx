interface Props {
  playlistID: string;
  title: string;
}

export default function YouTubePlaylist({ playlistID, title }: Props) {
  return (
    <iframe
      title={title}
      src={`https://www.youtube.com/embed/videoseries?amp;list=${playlistID}`}
      className='absolute inset-0 w-full h-full'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    ></iframe>
  );
}
