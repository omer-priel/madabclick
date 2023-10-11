'use client';

import { Content } from '@/lib/db/schemas';

interface Props {
  content: Content;
}

export default function ContentCard({ content }: Props) {
  let iframeSrc = content.link;

  if (content.contentType == 'youtube') {
    const videoID = content.link.match(/(?<=v=|\/embed\/|youtu.be\/|\/v\/|\/e\/|watch\?v=)([^#\&\?]+)/)?.[0];
    iframeSrc = 'https://www.youtube.com/embed/' + videoID;
  }

  return (
    <div className='bg-white border rounded-lg shadow-md p-4'>
      <h2 className='text-xl text-center font-semibold'>{content.name}</h2>
      <p className='text-gray-600 text-center'>{content.domain}</p>
      <p className='text-gray-600 text-center'>
        {content.ageLevel} - {content.language}
      </p>
      <p>{content.description}</p>
      <div className='flex items-center justify-center'>
        <a href={content.link} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
          קישור לאתר
        </a>
      </div>
      <div className='relative h-48'>
        {content.contentType == 'youtube' && (
          <iframe title={content.name} src={iframeSrc} className='absolute inset-0 w-full h-full' allowFullScreen></iframe>
        )}
      </div>
    </div>
  );
}
