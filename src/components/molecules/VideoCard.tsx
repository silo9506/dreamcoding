import { item } from "../../pages/Home";
import useISOSstring from "../../hooks/useISOSstring";
import { useNavigate } from "react-router-dom";
interface VideoCardProps {
  item: item;
  isflex?: boolean;
  ismini?: boolean;
  skeleton?: boolean;
  ref?: any;
}
export default function VideoCard({ item, isflex, ismini }: VideoCardProps) {
  const data = useISOSstring(item.snippet.publishedAt);
  const navigate = useNavigate();
  const ID = typeof item.id === "string" ? item.id : item.id.videoId;

  const onClick = () => {
    navigate(`/detail/${ID}`, {
      state: {
        id: ID,
        item: item,
      },
    });
  };

  if (isflex) {
    return (
      <div className="flex w-full cursor-pointer" onClick={onClick}>
        <img
          className="min-w-0 max-h-[210px] max-w-[360px] min-h-[94px] basis-6/12"
          src={
            item.snippet.thumbnails.maxres
              ? item.snippet.thumbnails.maxres.url
              : item.snippet.thumbnails.medium.url
          }
        />
        <div className="px-3 py-1 basis-8/12">
          <h3 className="overflow-hidden font-medium break-all line-clamp-1 sm:line-clamp-2">
            {item.snippet.title}
          </h3>
          <h5 className="overflow-hidden text-sm text-gray-400 break-all ">
            {data}
          </h5>
          <div className="flex items-center">
            {!ismini && (
              <img
                className="border w-[36px] h-[36px] mr-2 border-transparent rounded-full"
                src={item.channel.thumbnails.default.url}
              />
            )}
            <h5 className="overflow-hidden text-sm text-gray-400 break-all ">
              {item.snippet.channelTitle}
            </h5>
          </div>
          {!ismini && (
            <h5 className="overflow-hidden text-sm text-gray-400 break-all line-clamp-1 sm:line-clamp-2 ">
              {item.snippet.description}
            </h5>
          )}
        </div>
      </div>
    );
  } else
    return (
      <div
        className="border rounded cursor-pointer border-slate-900"
        onClick={onClick}
      >
        <img
          className="w-full border border-transparent rounded "
          src={
            item.snippet.thumbnails.maxres
              ? item.snippet.thumbnails.maxres.url
              : item.snippet.thumbnails.high.url
          }
        />
        <div className="flex py-2">
          <div className="flex-shrink-0 mr-[12px]">
            <img
              className="border w-[36px] h-[36px] border-transparent rounded-full"
              src={item.channel.thumbnails.default.url}
            />
          </div>
          <div className="">
            <h3 className="overflow-hidden font-medium line-clamp-2 sm:line-clamp-1">
              {item.snippet.title}
            </h3>

            <h5 className="overflow-hidden text-sm text-gray-400 truncate">
              {item.snippet.channelTitle}
            </h5>
            <h5 className="overflow-hidden text-sm text-gray-400 truncate">
              {data}
            </h5>
          </div>
        </div>
      </div>
    );
}

interface VideoCardskeletonProps {
  flex?: boolean;
  ismini?: boolean;
}

export const VideoCardskeleton = ({ flex, ismini }: VideoCardskeletonProps) => {
  if (flex) {
    return (
      <div className="flex h-full">
        <div className="min-w-0 max-h-[210px] max-w-[360px] min-h-[94px] h-full basis-6/12 bg-gray-300 rounded animate-pulse" />
        <div className="basis-8/12">
          <div className="w-full h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-2/6 h-4 mb-1 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-1/6 h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
          {!ismini && (
            <>
              <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-2/4 h-4 bg-gray-300 rounded animate-pulse"></div>
            </>
          )}
        </div>
      </div>
    );
  } else
    return (
      <div className="p-4 border border-gray-900 rounded cursor-pointer">
        <div className="w-full min-h-[80px] m-h-[210px] h-full my-1 bg-gray-300 rounded animate-pulse"></div>
        <div>
          <div className="w-full h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-2/6 h-4 mb-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-1/6 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
};
