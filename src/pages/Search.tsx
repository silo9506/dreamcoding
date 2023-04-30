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
        maxResults: 25,
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
  console.log(data);

  useEffect(() => {
    // 로딩이 끝나면 번들데이터를 채운다
    if (!isLoading) {
      addBundleDate();
    }
  }, [isLoading, data]);

  useEffect(() => {
    // 검색어가 변경될 경우 번들데이터를 비우고 useQuery에서 받아온 데이터를 사용하여 다시 채운다
    clearBundleData();
  }, [q]);

  const addBundleDate = () => {
    // 검색어 변경이 없는 한 새로운 데이터를 계속 추가한다.
    setBundleData((prev) => {
      // new Set을 통해 중복을 제거
      const uniqueItems = new Set([...prev, ...data.items]);
      // jsx map을 위해 배열형식으로 리턴한다.
      return Array.from(uniqueItems);
    });
  };

  const clearBundleData = () => {
    // 검색어 변경시 번들데이터를 비우고 다음페이지를 초기화한다.
    window.scrollTo(0, 0);
    setBundleData([]);
    setNextPage(null);
    if (!isLoading) {
      //로딩이 끝나면 빈 번들데이터를 useQuery에서 가져온 데이터로 채운다.
      addBundleDate();
    }
  };

  const lastVideo = useCallback(
    (node: any) => {
      if (isLoading) return;
      // 감시 대상이 있다면 감시를 중지한다
      if (observer.current) observer.current.disconnect();
      // observer.current는 마지막 VideoCard이며 컴포넌트 렌더링시 observer.current를 감시한다.
      observer.current = new IntersectionObserver((entris) => {
        // isIntersecting 은 화면에 요소가 보여지게되면 true가 된다.
        if (entris[0].isIntersecting) {
          // 화면에 요소가 보이게되면 커스텀 훅에 새로운 pageToken을 보내 새로운 데이터를 받아온다.
          console.log("무한스크롤 실행");
          setNextPage(data.nextPageToken);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, data]
  );

  return (
    <div className="flex flex-col w-full max-w-[1000px] gap-4 mx-auto sm:gap-4 border-t-2 py-2 my-2">
      {bundleData.map((item: item, index: number) => {
        if (bundleData.length === index + 1) {
          return (
            <div
              key={(item.id as { [key: string]: any }).videoId + index}
              ref={lastVideo}
            >
              <VideoCard
                id={(item.id as { kind: string; videoId: string }).videoId}
                isflex={true}
                item={item}
              ></VideoCard>
            </div>
          );
        } else
          return (
            <VideoCard
              id={(item.id as { kind: string; videoId: string }).videoId}
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
