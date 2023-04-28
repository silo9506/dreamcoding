import { useState } from "react";
import useISOSstring from "../../hooks/useISOSstring";
interface PlayVideoProps {
  id: string;
  item: { [key: string]: any };
  isLoading: boolean;
}

export default function PlayVideo({ item, id, isLoading }: PlayVideoProps) {
  const [moreDescription, setMoreDescription] = useState(false);

  const Counter = (str: string) => {
    if (str === undefined) return;
    let result = str;
    if (result.length > 4) {
      result = result.slice(0, -4) + "만";
    }
    if (result.length > 3) {
      result = result.slice(0, -3) + "천";
    }
    return result;
  };
  const publishedAt = useISOSstring(item.snippet.publishedAt);
  return (
    <div className="flex-1">
      <iframe
        key={id}
        className="w-full h-80 sm:h-[560px] mb-4"
        width="560"
        height="315"
        src={`//www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <h3 className="overflow-hidden font-medium break-all line-clamp-1 sm:line-clamp-2">
        {item.snippet.title}
      </h3>
      <div className="flex py-4">
        <h1>{item.snippet.channelTitle}</h1>
      </div>
      <div className="bg-[#ffffff1a] p-4 border rounded border-transparent">
        <h3>
          조회수 {Counter(item.statistics.viewCount)}회&nbsp;
          {publishedAt}
        </h3>
        <h5
          className={[
            "overflow-hidden",
            "text-sm",
            "break-all",
            moreDescription ? "" : "line-clamp-2",
          ].join(" ")}
        >
          {item.snippet.description}
        </h5>
        <h5
          onClick={() => setMoreDescription((prev) => !prev)}
          className="cursor-pointer,pt-2 text-sm text-gray-500"
        >
          {!moreDescription ? "더보기" : "간략히"}
        </h5>
      </div>
    </div>
  );
}
