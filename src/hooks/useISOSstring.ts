import { useEffect, useState } from "react";

export default function useISOSstring(isos: string) {
  const [date, setDate] = useState<null | string>(null);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date(isos);
    const elapsedTime = now.getTime() - targetDate.getTime();

    const seconds = Math.floor(elapsedTime / 1000); // 초 단위 경과 시간 계산
    const minutes = Math.floor(seconds / 60); // 분 단위 경과 시간 계산
    const hours = Math.floor(minutes / 60); // 시간 단위 경과 시간 계산
    const days = Math.floor(hours / 24); // 일 단위 경과 시간 계산

    if (days > 365) {
      return setDate(`${Math.floor(days / 365)}년 전`);
    }
    if (days > 30) {
      return setDate(`${Math.floor(days / 30)}개월 전`);
    }
    if (hours === 0) {
      return setDate("방금전");
    }
    if (hours < 24) {
      return setDate(`${hours}시간 전`);
    }
    if (hours > 24) {
      return setDate(`${days}일 전`);
    }
    return setDate(isos);
  }, [isos]);

  return date;
}
