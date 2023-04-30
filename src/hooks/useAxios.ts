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
    const videoResponse = await axios.get(params.url, {
      params: {
        ...params.params,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        pageToken: pageToken,
      },
    });

    const ids = videoResponse.data.items.map((item: any) => {
      return item.snippet.channelId;
    });

    const ChannelResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: ids.join(","),
          maxResults: 50,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }
    );

    const response = videoResponse.data.items.map((item: any) => {
      const channel = ChannelResponse.data.items.find((channelItem: any) => {
        return item.snippet.channelId === channelItem.id;
      });
      return {
        ...item,
        channel: channel ? channel.snippet : null,
      };
    });
    console.log(videoResponse.data.nextPageToken);
    console.log("API호출됨");
    return { items: response, nextPageToken: videoResponse.data.nextPageToken };
  };

  const { isLoading, isError, data } = useQuery(
    [params.queryKey, q && q, params.id && params.id, pageToken && pageToken],
    fetchVideos,
    {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 100000,
    }
  );

  return { data, isLoading, isError };
}
