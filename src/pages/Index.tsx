import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header";

export default function Index() {
  return (
    <div className="relative pt-[40px] sm:pt-[80px] px-4 text-white bg-black sm:px-8 ">
      <Header />
      <Outlet />
    </div>
  );
}
