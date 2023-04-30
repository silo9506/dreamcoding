import React from "react";
import useAxios from "../../hooks/useAxios";
import VideoCard, { VideoCardskeleton } from "./VideoCard";
import { item } from "../../pages/Home";

interface ExtraVideosProps {
  playListId: string;
}
export default function ExtraVideos({ playListId }: ExtraVideosProps) {
  const {
    data: extraVideosData,
    isLoading: extraVideosLoading,
    isError: extraVideosError,
  } = useAxios({
    params: {
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      queryKey: `Extra ${playListId}`,
      params: {
        playlistId: playListId,
        part: "snippet",
        maxResults: 10,
      },
    },
  });

  console.log(extraVideosData);
  return (
    <div className="md:w-[30%] flex flex-col p-2 gap-2">
      {extraVideosLoading &&
        [...Array(20)].map((_, index) => (
          <VideoCardskeleton ismini={true} flex={true} key={index} />
        ))}
      {!extraVideosLoading &&
        extraVideosData?.items.map((item: item) => (
          <VideoCard
            id={item.snippet.resourceId.videoId}
            key={item.id as string}
            item={item}
            isflex={true}
            ismini={true}
          />
        ))}
    </div>
  );
}
