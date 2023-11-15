import ManagePage from '@/components/pages/ManagePage';

import { findLanguage } from '@/translation';

export const revalidate = 0;

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

  return <ManagePage />;
}
