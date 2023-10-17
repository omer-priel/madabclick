import { ContentsSchema } from "@/lib/api/schemas";

interface Props {
  data: ContentsSchema;
}

export default function ContentListV2({ data } : Props) {

  return (
    <>
      <div className="absolute top-[1450px] left-[1468px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1450px] left-[998px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1450px] left-[528px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[1450px] left-[58px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[1468px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[998px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[528px] bg-gainsboro w-[400px] h-[400px]" />
      <div className="absolute top-[2018px] left-[58px] bg-gainsboro w-[400px] h-[400px]" />
    </>
  );
}
