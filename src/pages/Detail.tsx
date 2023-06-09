import { useLocation, useParams } from "react-router-dom";
import PlayVideo from "../components/molecules/PlayVideo";
import useAxios from "../hooks/useAxios";
import { VideoCardskeleton } from "../components/molecules/VideoCard";
import VideoCard from "../components/molecules/VideoCard";
import { ReactComponent as Loading } from "../assets/svg/Loading.svg";
import { item } from "./Home";
import { useState } from "react";
import ExtraVideos from "../components/molecules/ExtraVideos";
import { useEffect } from "react";

export default function Detail() {
  const location = useLocation();
  const params = useParams();
  const [playListId, setPlayListId] = useState<string | null>(null);
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
          "items(snippet(channelTitle,channelId,description,publishedAt,title),statistics(viewCount,likeCount))",
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const {
  //   data: extraVideosData,
  //   isLoading: extraVideosLoading,
  //   isError: extraVideosError,
  // } = useAxios({
  //   params: {
  //     url: "https://www.googleapis.com/youtube/v3/search",
  //     queryKey: "Extra",
  //     id: location.state ? location.state.id : params.id,
  //     params: {
  //       part: "snippet",
  //       relatedToVideoId: location.state ? location.state.id : params.id,
  //       maxResults: 25,
  //       regionCode: "Kr",
  //       type: "video",
  //       fields:
  //         "items(id,snippet(channelTitle,channelId,thumbnails(medium,maxres),publishedAt,title))",
  //     },
  //   },
  // });

  // console.log("엑스트라비디오 데이타");
  // console.log(extraVideosData);
  console.log(playVideoData);

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
      {playVideoLoading ? (
        [...Array(20)].map((_, index) => (
          <VideoCardskeleton ismini={true} flex={true} key={index} />
        ))
      ) : (
        <ExtraVideos
          playListId={
            playVideoData.items[0].channel.contentDetails.relatedPlaylists
              .uploads
          }
        />
      )}
      {/* <div className="md:w-[30%] flex flex-col p-2 gap-2">
        {extraVideosLoading &&
          [...Array(20)].map((_, index) => (
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
      </div> */}

      {/* <div className="md:w-[30%] flex flex-col p-2 gap-2">
        {extraVideosLoading &&
          [...Array(20)].map((_, index) => (
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
      </div> */}
    </div>
  );
}
