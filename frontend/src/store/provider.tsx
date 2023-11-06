'use client';

import { ReactNode } from 'react';

import { Provider } from 'react-redux';

import { store } from '@/store/store';

export interface Props {
  children: ReactNode;
}

export function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
