import React, { useCallback, useRef, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import VideoCard, {
  VideoCardskeleton,
} from "../components/molecules/VideoCard";
import { item } from "./Home";
import { useLocation, useParams } from "react-router-dom";
export default function Search() {
  const queryKey = "Search";
  const observer = useRef<IntersectionObserver>();
  const [nextPage, setNextPage] = useState<null | string | undefined>(null);
  const [bundleData, setBundleData] = useState<any[]>([]);
  const { q } = useParams();
  const { data, isLoading, isError } = useAxios({
    params: {
      url: "https://www.googleapis.com/youtube/v3/search",
      queryKey: queryKey,
      params: {
        part: "snippet",
        maxResults: 50,
        q,
        regionCode: "Kr",
        type: "video",
        fields:
          "nextPageToken,items(id(videoId),snippet(channelTitle,channelId,description,thumbnails(medium),title,publishedAt))",
      },
    },
    pageToken: nextPage,
    q,
  });

  useEffect(() => {
    if (!isLoading) {
      addBundleDate();
    }
  }, [isLoading, data]);

  useEffect(() => {
    clearBundleData();
  }, [q]);

  const addBundleDate = () => {
    setBundleData((prev) => {
      const uniqueItems = new Set([...prev, ...data.items]);
      console.log("데이터채우기");
      console.log(bundleData);
      console.log(data);
      return Array.from(uniqueItems);
    });
  };

  const clearBundleData = () => {
    window.scrollTo(0, 0);
    setBundleData([]);
    setNextPage(null);
    if (!isLoading) {
      addBundleDate();
    }
    console.log("클리어");
  };

  console.log(data);
  console.log(data?.nextPageToken);
  const lastVideo = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entris) => {
        if (entris[0].isIntersecting) {
          console.log("무한스크롤 실행");
          setNextPage(data.nextPageToken);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, data]
  );

  console.log(data?.nextPageToken);
  console.log(data);
  return (
    <div className="flex flex-col w-full max-w-[1000px] gap-4 mx-auto sm:gap-4 border-t-2 py-2 my-2">
      {bundleData.map((item: item, index: number) => {
        if (bundleData.length === index + 1) {
          return (
            <div
              key={(item.id as { [key: string]: any }).videoId + index}
              ref={lastVideo}
            >
              <VideoCard isflex={true} item={item}></VideoCard>
            </div>
          );
        } else
          return (
            <VideoCard
              key={(item.id as { [key: string]: any }).videoId + index}
              isflex={true}
              item={item}
            ></VideoCard>
          );
      })}
      {isLoading &&
        [...Array(12)].map((_, index) => (
          <VideoCardskeleton flex={true} key={index} />
        ))}
    </div>
  );
}
