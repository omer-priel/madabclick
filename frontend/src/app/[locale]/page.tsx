import HomePage from '@/components/pages/HomePage';

import { getConfig } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { findLanguage } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

interface Props {
  params: {
    locale: string;
  };
}

export default async function Page({ params }: Props) {
  const language = findLanguage(params.locale);

  if (!language) {
    return <></>;
  }

  const data = await getContentsInfo(language);

  return <HomePage data={data} />;
}
