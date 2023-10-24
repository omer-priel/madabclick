import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';

interface Props {
  locale: string;
}

export default function LoadingPage({ locale }: Props) {
  return (
    <div className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins'>
      <Header locale={locale} />
      <Section1 />
      <div className='w-full'>
        <div
          className='w-fit h-fit mx-auto mt-[0.5vw] text-black text-[2.08vw]/[3.125vw] text-left font-black'
          style={{ direction: 'ltr' }}
        >
          Loading...
          <div className='w-[3.125vw] h-[0.416vw] bg-[#81B826]' />
        </div>
      </div>
      <div className='w-full h-[5.208vw]' />
    </div>
  );
}
