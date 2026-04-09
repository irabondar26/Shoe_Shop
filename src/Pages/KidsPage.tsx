import { useState } from "react";
import Dropdown from "../Components/DropdownList";
import raw from "../data.json";
import { Product } from "../types/types";
import Search from "../Img/Search.svg";
import Filter from "../Img/filter.svg";
import FilterPanel from "../Components/FilterPanel";


export default function KidsPage() {

    const data = raw as Product[];

    const [searchText, setSearchText] = useState("");
    const [filterData, setFilterData] = useState(data);
    const [isFilterOpen, setIsFilterOpen] = useState(false);



    // const allShoes = filterData.filter((item) => item.audience === "kid");
    const running = filterData.filter((item) => item.audience === "kid" && item.category === "running");
    const lifestile = filterData.filter((item) => item.audience === "kid" && item.category === "lifestile");
    const sandals = filterData.filter((item) => item.audience === "kid" && item.category === "sandals");
    const slipOn = filterData.filter((item) => item.audience === "kid" && item.category === "slipOn");

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
            <div className="">
                <section className="pt-7 mx-auto flex justify-center gap-x-5 mb-10">
                    <div className="relative w-121 h-14">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full h-full px-8 bg-gray-100 rounded-full placeholder-blue-900 focus:ring-2 focus:ring-blue-900 outline-none text-gray-500" placeholder="Search..." />
                        <button onClick={() => handleSearch()} className="absolute bottom-3.5 right-6 p-1 hover:scale-110 transition-transform">
                            <img src={Search} alt="search" className="w-5 h-5 hover:cursor-pointer" />
                        </button>
                    </div>
                    <button className="px-3 bg-gray-100 rounded-full"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <img src={Filter} alt="filter" className="w-8 h-8" />
                    </button>
                </section>
                <section className="pt-15">
                    <Dropdown category="Lifestile" data={lifestile} />
                    <Dropdown category="Running" data={running} />
                    <Dropdown category="Sandals" data={sandals} />
                    <Dropdown category="Slip On" data={slipOn} />
                </section>
                {isFilterOpen ?
                    <FilterPanel setIsFilterOpen={setIsFilterOpen} data={filterData} />
                    : null}
            </div>
        </>
    );
}