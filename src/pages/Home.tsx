import VideoCard, {
  VideoCardskeleton,
} from "../components/molecules/VideoCard";
import useAxios from "../hooks/useAxios";

export interface item {
  contentDetails: { [key: string]: any };
  id: { kind: string; videoId: string } | string;
  kind: string;
  snippet: { [key: string]: any };
  channel: { [key: string]: any };
}

export default function Home() {
  const queryKey = "Popular";

  const { data, isLoading, isError } = useAxios({
    params: {
      url: "https://www.googleapis.com/youtube/v3/videos",
      queryKey: queryKey,
      params: {
        part: "snippet",
        maxResults: 30,
        regionCode: "Kr",
        chart: "mostPopular",
        fields:
          "items(id,snippet(categoryId,channelTitle,channelId,thumbnails(high,maxres),publishedAt,title))",
      },
    },
  });

  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-3 lg:grid-cols-4 ">
      {isLoading &&
        [...Array(30)].map((_, index) => <VideoCardskeleton key={index} />)}
      {!isLoading &&
        data?.items.map((item: item) => {
          return (
            <VideoCard
              key={item.id as string}
              id={item.id as string}
              item={item}
            ></VideoCard>
          );
        })}
    </div>
  );
}
