import Header from "../components/molecules/Header";
import { ReactComponent as NotYoutube } from "../assets/svg/Youtube404.svg";

export default function NotFound() {
  return (
    <div className="relative pt-[40px] sm:pt-[80px] px-4 text-white bg-black sm:px-8 min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <NotYoutube className="w-[250px] h-[250px] max-w-[500px] max-h-[500px] sm:w-full sm:h-full min-w-0 min-h-0" />
        <h1 className="text-md sm:text-xl">
          길을 잃어버리셨군요 다시 검색해보세요!!
        </h1>
      </div>
    </div>
  );
}
