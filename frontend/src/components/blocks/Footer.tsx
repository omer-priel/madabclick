import Image from 'next/image';

import cCircleIcon from '@/public/c-circle.svg';
import { useStore } from '@/store';
import { getTranslation } from '@/translation';

export default async function Footer() {
  const language = useStore.getState().language;

  const t = await getTranslation(language.locale);

  return (
    <div className='flex w-full h-[8.125vw] bg-[#FFD469]'>
      <div
        className='flex justify-center items-center mx-auto my-auto pb-[30px]
      text-black text-right text-[20px]/[30px] font-normal align-middle'
      >
        {t('footer-copyright')}
        <Image className='w-[25px] h-[25px] mx-[10px] mt-[4px]' alt='©' src={cCircleIcon} width='25' height='25' />
      </div>
    </div>
  );
}
