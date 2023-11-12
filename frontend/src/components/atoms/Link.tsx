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
      className={(active ? 'text-[#04C2FF]' : 'text-black') + ' hover:text-[#04C2FF]'}
      onClick={() => {
        window.location.href = href;
      }}
    >
      {label}
    </a>
  ) : (
    <Link href={href} className={(active ? 'text-[#04C2FF]' : 'text-black') + ' hover:text-[#04C2FF]'}>
      {label}
    </Link>
  );
}
