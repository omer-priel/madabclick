import Footer from '@/components/blocks/Footer';
import Header from '@/components/blocks/Header';
import Section1 from '@/components/blocks/Section1';

export default function LoadingPage() {
  return (
    <div
      className='relative w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black font-poppins
    rtl:text-right ltr:text-left'
    >
      <Header />
      <Section1 />
      <div className='w-full'>
        <div className='w-fit h-fit mx-auto mt-[0.5vw] text-black text-[40px]/[60px] text-left font-black' style={{ direction: 'ltr' }}>
          Loading...
          <div className='w-[3.125vw] h-[0.416vw] bg-[#81B826]' />
        </div>
      </div>
      <div className='w-full h-[100px]' />
      <Footer />
    </div>
  );
}
