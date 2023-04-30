import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface useAxiosProps {
  params: {
    url: string;
    queryKey: string;
    params: { [key: string]: any };
    q?: string;
    id?: string;
    fields?: string;
  };
  pageToken?: null | string;
  q?: string | undefined;
  getExtra?: boolean;
}

interface useAxiosReturn {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export default function useAxios({
  params,
  pageToken,
  q,
}: useAxiosProps): useAxiosReturn {
  const fetchVideos = async () => {
    //컴포넌트에서 필요한 url과 params를 받아와 결과를 가져옴
    const videoResponse = await axios.get(params.url, {
      params: {
        ...params.params,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        pageToken: pageToken,
      },
    });

    // 채널id를 얻기위해 비디오의 채널아이디를 객채로 가져옴
    const ids = videoResponse.data.items.map((item: any) => {
      return item.snippet.channelId;
    });

    // 유튜브 채널리스트 api의 id에 ids객체를 ,로 구분된 스트링으로 전달하여 채널 정보 획득(썸네일 재생목록 등)
    const ChannelResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,contentDetails",
          id: ids.join(","),
          maxResults: 50,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }
    );
    // 비디오 데이터에 채널데이터를 병합
    const response = videoResponse.data.items.map((item: any) => {
      const channel = ChannelResponse.data.items.find((channelItem: any) => {
        return item.snippet.channelId === channelItem.id;
      });

      return {
        ...item,
        channel: channel ? channel : null,
      };
    });
    console.log("API호출됨");
    // fetchVideos의 리턴으로 필요한 값을 지정하면 useQuery의 data에서 해당값을 사용하게된다.
    return { items: response, nextPageToken: videoResponse.data.nextPageToken };
  };

  // 키, 함수 , 옵션,
  const { isLoading, isError, data } = useQuery(
    [params.queryKey, q && q, params.id && params.id, pageToken && pageToken],
    fetchVideos,
    {
      refetchOnWindowFocus: true,
      staleTime: 60 * 3000,
      cacheTime: 60 * 5000,
    }
  );

  return { data, isLoading, isError };
}
