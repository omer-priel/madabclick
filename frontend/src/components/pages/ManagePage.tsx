'use client';

import Footer from '@/components/blocks/Footer';
import Header from '@/components/blocks/Header';
import ManageView from '@/components/blocks/ManageView';

export default function ManagePage() {
  return (
    <div
      className='w-full mx-auto overflow-x-hidden overflow-y-hidden bg-whitesmoke text-base text-black
    rtl:text-right ltr:text-left'
    >
      <Header className='h-[105px]' />
      <ManageView />
      <Footer className='h-[100px]' />
    </div>
  );
}
