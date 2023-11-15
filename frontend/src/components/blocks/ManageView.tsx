'use client';

import Button from '@/components/ui/Button';

import { useStore } from '@/store';

export default function ManageView() {
  const device = useStore((state) => state.device);

  return (
    <div className='inline-block w-full h-fit bg-[#00b2ca]'>
      <div className='w-[1190px] h-[690px] mx-auto my-[20px] p-[10px] bg-white rounded-lg shadow-sm'>
        <div className='flex justify-between h-[50px]'>
          <Button>defualt</Button>
          <Button variant='primary'>primary</Button>
          <Button variant='secondary'>secondary</Button>
          <Button variant='error'>error</Button>
          <Button variant='warning'>warrning</Button>
          <Button variant='success'>success</Button>
        </div>
        <div className='w-fit mx-auto'>{device}</div>
      </div>
    </div>
  );
}
