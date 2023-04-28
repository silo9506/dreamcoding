import { useLocation, useParams } from "react-router-dom";
import PlayVideo from "../components/molecules/PlayVideo";
import useAxios from "../hooks/useAxios";
import { VideoCardskeleton } from "../components/molecules/VideoCard";
import VideoCard from "../components/molecules/VideoCard";
import { ReactComponent as Loading } from "../assets/svg/Loading.svg";
import { item } from "./Home";

export default function Detail() {
  const location = useLocation();
  const params = useParams();
  const {
    data: playVideoData,
    isLoading: playVideoLoading,
    isError: playVideoError,
  } = useAxios({
    params: {
      url: "https://www.googleapis.com/youtube/v3/videos",
      queryKey: "Detail",
      id: location.state ? location.state.id : params.id,
      params: {
        part: "snippet,statistics",
        maxResults: 15,
        regionCode: "Kr",
        id: location.state ? location.state.id : params.id,
        fields:
          "items(snippet(channelTitle,description,publishedAt,title),statistics(viewCount,likeCount))",
      },
    },
  });
  console.log("플레이비디오 데이타");
  console.log(playVideoData);
  const {
    data: extraVideosData,
    isLoading: extraVideosLoading,
    isError: extraVideosError,
  } = useAxios({
    params: {
      url: "https://www.googleapis.com/youtube/v3/search",
      queryKey: "Extra",
      id: location.state ? location.state.id : params.id,
      params: {
        part: "snippet",
        relatedToVideoId: location.state ? location.state.id : params.id,
        maxResults: 15,
        regionCode: "Kr",
        type: "video",
        fields:
          "items(id,snippet(channelTitle,thumbnails(medium,maxres),publishedAt,title))",
      },
    },
  });

  console.log("엑스트라비디오 데이타");
  console.log(extraVideosData);

  return (
    <div className="flex flex-col gap-4 sm:flex-col md:flex-row">
      {playVideoLoading && (
        <div className="flex items-center justify-center w-full h-screen">
          <Loading className="w-40 h-40 fill-red-900 animate-spin" />
        </div>
      )}
      {!playVideoLoading && (
        <PlayVideo
          isLoading={playVideoLoading}
          item={playVideoData.items[0]}
          id={location.state ? location.state.id : params.id}
        />
      )}

      <div className="md:w-[30%] flex flex-col p-2 gap-2">
        {extraVideosLoading &&
          [...Array(12)].map((_, index) => (
            <VideoCardskeleton ismini={true} flex={true} key={index} />
          ))}
        {!extraVideosLoading &&
          extraVideosData?.items.map((item: item) => (
            <VideoCard
              key={
                (
                  item.id as {
                    kind: string;
                    videoId: string;
                  }
                ).videoId
              }
              item={item}
              isflex={true}
              ismini={true}
            />
          ))}
      </div>
    </div>
  );
}
