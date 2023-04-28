import React, { useState } from "react";
import Logo from "../atoms/Logo";
import { ReactComponent as Search } from "../../assets/svg/Search.svg";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${query}`);
    setQuery("");
    window.scrollTo(0, 0);
  };

  return (
    <div className="sticky top-0 z-10 flex items-center bg-black ">
      <div
        className="flex items-center mr-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Logo style="h-[40px] w-fit sm:h-[60px] " />
        <h1 className="text-white sm:text-2xl">Youtube</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center ml-auto min-w-0 max-w-[70ch] flex-1  "
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-1 text-black border-transparent rounded-l-lg outline-none sm:p-2"
          placeholder="Search..."
        />
        <button className="flex p-1 bg-gray-700 rounded-r-lg sm:p-2">
          <Search className="fill-white" />
        </button>
      </form>
    </div>
  );
}
