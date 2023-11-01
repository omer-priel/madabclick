'use client';

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

export default function LabelLink({ href, label, active }: Props) {
  return (
    <a href={href} className={(active ? 'text-[#04C2FF]' : 'text-black') + ' hover:text-[#04C2FF]'}>
      {label}
    </a>
  );
}
