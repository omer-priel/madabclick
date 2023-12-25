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

  let charKey = 0;

  // change font of 0123456789|?!# to font-assistant
  text.split('').forEach((char) => {
    const isAssistant = /^\d$/.test(char) || '|?!#'.includes(char);
    if (isAssistant === lastIsAssistant) {
      lastPart += char;
    } else if (lastPart.length == 0) {
      lastPart = char;
      lastIsAssistant = true;
    } else {
      if (lastIsAssistant) {
        parts.push(
          <span key={charKey} className='font-assistant'>
            {lastPart}
          </span>
        );
        charKey += 1;
      } else {
        parts.push(<Fragment key={charKey}>{lastPart}</Fragment>);
        charKey += 1;
      }
      lastPart = char;
      lastIsAssistant = isAssistant;
    }
  });

  if (lastPart.length > 0) {
    if (lastIsAssistant) {
      parts.push(
        <span key={charKey} className='font-assistant'>
          {lastPart}
        </span>
      );
    } else {
      parts.push(<Fragment key={charKey}>{lastPart}</Fragment>);
    }
  }

  return parts;
}
