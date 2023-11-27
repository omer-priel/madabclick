import HomeMobilePage from '@/components/pages/HomeMobilePage';
import HomePage from '@/components/pages/HomePage';

import { getConfig } from '@/config';
import { getContentsInfo } from '@/lib/api/requests';
import { Content } from '@/lib/api/schemas';
import { useStore } from '@/store';
import { findLanguage } from '@/translation';

export const revalidate = getConfig().APP_REVALIDATE;

async function randomVideosOrder(contents: Content[], currentLanguageValue: string): Promise<Content[]> {
  const buckets: { [key: string]: Content[] } = {};

  contents.forEach((content) => {
    if (Object.keys(buckets).includes(content.domain)) {
      buckets[content.domain].push(content);
    } else {
      buckets[content.domain] = [content];
    }
  });

  const newContents: Content[] = [];

  Object.values(buckets).forEach((bucketsContents) => {
    const ITERS = 30;

    let minCountSame = bucketsContents.length;
    let minOrder = [...bucketsContents];

    for (let iter = 0; iter < ITERS; iter++) {
      let countSame = 0;
      let lastChannelId = '';

      for (let index = 0; index < bucketsContents.length; index++) {
        const content = bucketsContents[index];
        if (content.language === currentLanguageValue) {
          if (!content.youtube?.channelId) {
            lastChannelId = '';
          } else if (lastChannelId === content.youtube.channelId) {
            countSame += 1;
          } else {
            lastChannelId = content.youtube.channelId;
          }
        }
      }

      if (countSame < minCountSame) {
        minCountSame = countSame;
        minOrder = [...bucketsContents];
      }

      bucketsContents.sort(() => Math.random() - 0.5);
    }

    newContents.push(...minOrder);
  });

  return newContents;
}

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

  const isMobile = useStore.getState().device === 'mobile';

  const data = await getContentsInfo(language);
  data.contents = await randomVideosOrder(data.contents, data.currentLanguageValue);

  if (isMobile || true) {
    return <HomeMobilePage data={data} />;
  }

  return <HomePage data={data} />;
}
