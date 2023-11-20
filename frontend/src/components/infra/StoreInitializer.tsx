'use client';

import { useRef } from 'react';

import { Device, useStore } from '@/store';
import { Language } from '@/translation';

interface Props {
  pathname: string;
  language: Language;
  device: Device;
}

export default function StoreInitializer(props: Props) {
  const initialized = useRef<boolean>(false);

  if (!initialized.current) {
    // init client store
    useStore.setState(props);
    initialized.current = true;
  }

  return <></>;
}
