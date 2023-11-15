import { Fragment, ReactNode } from 'react';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function multiFontText(text: string): ReactNode[] {
  const parts = [];
  let lastPart = '';
  let lastIsAssistant = false;

  // change font of 0123456789|?!# to font-assistant
  text.split('').forEach((char, index) => {
    const isAssistant = /^\d$/.test(char) || '|?!#'.includes(char);
    if (isAssistant === lastIsAssistant) {
      lastPart += char;
    } else if (lastPart.length == 0) {
      lastPart = char;
      lastIsAssistant = true;
    } else {
      if (lastIsAssistant) {
        parts.push(
          <span key={index} className='font-assistant'>
            {lastPart}
          </span>
        );
      } else {
        parts.push(<Fragment key={index}>{lastPart}</Fragment>);
      }
      lastPart = char;
      lastIsAssistant = isAssistant;
    }
  });

  if (lastPart.length > 0) {
    if (lastIsAssistant) {
      parts.push(
        <span key={lastPart.length} className='font-assistant'>
          {lastPart}
        </span>
      );
    } else {
      parts.push(<Fragment key={lastPart.length}>{lastPart}</Fragment>);
    }
  }

  return parts;
}
