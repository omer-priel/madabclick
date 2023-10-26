'use client';

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

export default function LabelLink({ href, label, active }: Props) {
  return (
    <a href={href} className={'text-black hover:text-yellowgreen-200' + (active ? ' text-yellowgreen-200' : '')}>
      {label}
    </a>
  );
}
