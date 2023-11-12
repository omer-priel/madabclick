import Image from 'next/image';

import Link from '@/components/atoms/Link';

import chooseLanguageIcon from '@/public/choose-language.svg';
import fullLogoIcon from '@/public/full-logo.svg';
import { useStore } from '@/store';
import { getTranslation } from '@/translation';

export default async function Header() {
  const language = useStore.getState().language;
  const t = await getTranslation(language.locale);

  return (
    <div className='relative w-full h-[8.22vw]'>
      <div className='absolute w-fit h-fit top-[45px] right-[62px]'>
        <div className='flex ltr:flex-row-reverse'>
          <Image className='w-[35px] h-[35px] ml-[36px]' alt={t('choose-language')} src={chooseLanguageIcon} width='35' height='35' />
          <div className='h-[24px] ml-[36px] my-auto text-right text-[16px]/[24px] font-normal'>
            <Link href='/he' label='עברית' hardReload active={language.locale == 'he'} />
          </div>
          <div className='h-[24px] ml-[36px] my-auto text-right text-[16px]/[24px] font-normal'>
            <Link href='/en' label='English' hardReload active={language.locale == 'en'} />
          </div>
          <div className='h-[24px] my-auto text-right text-[16px]/[24px] font-normal'>
            <Link href='/ar' label='عربي' hardReload active={language.locale == 'ar'} />
          </div>
        </div>
      </div>
      <div className='absolute w-[10.781vw] h-[3.75vw] right-[calc(50%_-_7.29vw)] top-[2.03vw]'>
        <Image alt='' src={fullLogoIcon} fill />
      </div>
    </div>
  );
}
