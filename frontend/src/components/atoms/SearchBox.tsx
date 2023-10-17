'use client';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ label, value, onChange }: Props) {
  return (
    <div className="absolute top-[1223px] left-[calc(50%_-_238px)] w-[476px] h-[55px] text-right text-gray-300">
      <div className="absolute top-[4px] left-[calc(50%_-_238px)] rounded-[50px] bg-gray-200 box-border w-[476px] h-12 border-[1px] border-solid border-gray-300" />
      <div className="absolute top-[15px] left-[325px] font-light inline-block w-12 h-[26px]">{`חיפוש `}</div>
      <img
        className="absolute top-[0px] left-[calc(50%_+_159px)] w-[55px] h-[55px] overflow-hidden"
        alt=""
        src="/vaadinglasses.svg"
      />
    </div>
  );
}
