import { Content } from "@/lib/api/schemas";
import ContentCard from "./ContentCard";

interface Props {
  contents: Content[];
  showContentCard: (content: Content) => boolean;
}

export default function ContentListV2({ contents, showContentCard } : Props) {
  return (
    <div className='grid grid-cols-4 w-[1820px] px-[58px] gap-x-[70px] gap-y-[168px]'>
      {contents.map((content) => (
        <div key={content.index} className={"bg-gainsboro w-[400px] h-[400px]" + (showContentCard(content) ? "" : "hidden")}>
          <ContentCard content={content} title={content.title} />
        </div>
      ))}
    </div>
  );
}
