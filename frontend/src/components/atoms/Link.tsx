'use client';

import Link from 'next/link';

interface Props {
  href: string;
  label: string;
  hardReload?: boolean;
  active?: boolean;
}

export default function LabelLink({ href, label, active, hardReload }: Props) {
  return hardReload ? (
    <a
      href={href}
      className={(active ? 'text-[#FFB636]' : 'text-black') + ' hover:text-[#FFB636]'}
      onClick={() => {
        window.location.href = href;
      }}
    >
      {label}
    </a>
  ) : (
    <Link href={href} className={(active ? 'text-[#FFB636]' : 'text-black') + ' hover:text-[#FFB636]'}>
      {label}
    </Link>
  );
}
