import { useState } from "react";
import Search from "../Img/Search.svg"
import Dropdown from "../Components/DropdownList";
import raw from "../data.json";
import { Product } from "../types/types"

export default function SneakersPage() {

    const data = raw as Product[];

    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState(data);



  const manSnikers = filterData.filter((item) => item.audience === "man");
  const womenSnikers = filterData.filter((item) => item.audience === "woman");
  const kidSnikers = filterData.filter((item) => item.audience === "kid");

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilterData(data);
      return;
    }

    const results = data.filter((item) =>
      [item.name, item.brand, item.model, item.audience].some((field) =>
        field?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilterData(results);
  };


    return (
        <>
            <section className="pt-7 mx-auto flex justify-center">
                <div className="relative w-121 h-14">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full h-full px-[30px] bg-gray-100 rounded-full placeholder-gray-500 focus:ring-2 focus:ring-blue-800 outline-none text-gray-500" placeholder="Search..." />
                    <button onClick={() => handleSearch()} className="absolute bottom-[13px] right-[25px] p-1 hover:scale-110 transition-transform">
                        <img src={Search} alt="search" className="w-5 h-5 hover:cursor-pointer" />
                    </button>
                </div>
            </section>
            <section className="pt-15">
                <Dropdown audience="Man`s" data={manSnikers} />
                <Dropdown audience="Woman`s" data={womenSnikers} />
                <Dropdown audience="Kid`s" data={kidSnikers} />
            </section>
        </>
    );
}