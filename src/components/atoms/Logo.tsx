import { ReactComponent as YoutubeLogo } from "../../assets/svg/YoutubeLogo.svg";

interface styleProps {
  style?: string;
}
export default function Logo({ style }: styleProps) {
  return <YoutubeLogo className={style} />;
}
