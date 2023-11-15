import Image from 'next/image';

import Link from '@/components/atoms/Link';

import { cn } from '@/lib/styling';
import chooseLanguageIcon from '@/public/choose-language.svg';
import fullLogoIcon from '@/public/full-logo.svg';
import { useStore } from '@/store';
import { getTranslation } from '@/translation';

interface Props {
  className?: string;
}

export default async function Header({ className }: Props) {
  const language = useStore.getState().language;
  const t = await getTranslation(language.locale);

  return (
    <div className={cn('relative w-full h-[140px] bg-[#00b2ca]', className)}>
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
      <div className='absolute w-[207px] h-[72px] right-[calc(50%_-_103px)] top-[39px]'>
        <Image alt='' src={fullLogoIcon} width='207' height='72' />
      </div>
    </div>
  );
}
