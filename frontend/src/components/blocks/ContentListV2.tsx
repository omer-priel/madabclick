import { ContentsSchema } from "@/lib/api/schemas";

interface Props {
  data: ContentsSchema;
}

export default function ContentListV2({ data } : Props) {

  return (
    <div className='grid grid-cols-4 w-[1820px] px-[58px] gap-x-[70px] gap-y-[168px]'>
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
      <div className="bg-gainsboro w-[400px] h-[400px]" />
    </div>
  );
}
