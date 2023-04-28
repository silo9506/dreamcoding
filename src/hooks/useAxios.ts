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
  // nextPageToken: string;
}

export default function useAxios({
  params,
  pageToken,
  q,
}: useAxiosProps): useAxiosReturn {
  const fetchVideos = async () => {
    const response = await axios.get(params.url, {
      params: {
        ...params.params,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        pageToken: pageToken,
      },
    });
    console.log("API호출됨");
    return response.data;
  };

  console.log(params.params.maxResults);
  const { isLoading, isError, data } = useQuery(
    [params.queryKey, q && q, params.id && params.id, pageToken && pageToken],
    fetchVideos,
    {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 100000,
    }
  );

  // const promises = params.map((param) => fetchVideos(param.url));

  // const { isLoading, isError, data } = useQuery(
  //   params.map((param) => param.queryKey),
  //   async () => {
  //     const PromiseAll = await Promise.all(promises);

  //     const data = PromiseAll?.reduce((prev, curr, index) => {
  //       const key = params[index].queryKey;

  //       return { ...prev, [key]: curr };
  //     }, {});

  //     return data;
  //   }
  // );

  return { data, isLoading, isError };
}
