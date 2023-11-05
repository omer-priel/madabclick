import { getTranslation } from '@/translation';

export default async function Footer() {
  const t = await getTranslation();

  return (
    <div className='flex w-full h-[8.125vw]'>
      <div className='mx-auto my-auto pb-[30px] text-black text-right text-[20px]/[30px] font-normal align-middle'>
        {t('footer-copyright')} ©
      </div>
    </div>
  );
}
