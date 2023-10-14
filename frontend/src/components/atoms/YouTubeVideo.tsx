interface Props {
  videoID: string;
  title: string;
}

export default function YouTubeVideo({ videoID, title }: Props) {
  return (
    <iframe
      title={title}
      src={`https://www.youtube.com/embed/${videoID}`}
      className='absolute inset-0 w-full h-full'
      allowFullScreen
    ></iframe>
  );
}
