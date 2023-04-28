import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header";

export default function Index() {
  return (
    <div className="px-4 sm:px-8">
      <Header />
      <Outlet />
    </div>
  );
}
