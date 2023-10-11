import ContentList from '@/components/blocks/ContentList';

import { ContentsSchema } from '@/lib/db/schemas';

interface Props {
  data: ContentsSchema;
}

export default function MainPage({ data }: Props) {
  return (
    <div className='p-4' style={{ direction: 'rtl', textAlign: 'right' }}>
      <h1 className='text-2xl font-bold'>תוכן איכותי לילדים</h1>
      <p className='text-gray-600'>כותרת שנייה</p>
      <ContentList data={data} />
    </div>
  );
}
