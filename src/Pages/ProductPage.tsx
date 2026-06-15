import { useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
import raw from "../data.json";
import { Product, FilterData } from "../types/types";
import Search from "../Img/Search.svg";
import Filter from "../Img/filter.svg";
import FilterPanel from "../Components/FilterPanel";

const formatCategoryName = (text: string) => {
    return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

const CATEGORY_ORDER = ["lifestile", "running", "sandals", "slipOn"];


export default function ProductPage({ category, audience }: { category: string, audience: string }) {

    const data = raw.shoes as Product[];

    const [searchText, setSearchText] = useState("");

    const filteredByAudience = data.filter(item => item.audience === audience);
    const [filterData, setFilterData] = useState(filteredByAudience);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedFilterData, setAppliedFilterData] = useState<FilterData>({
        brands: [],
        categories: [],
        color: "none",
        maxPrice: 5000
    });

    useEffect(() => {
        setFilterData(data.filter(item => item.audience === audience));
        setSearchText("");
        setAppliedFilterData({
            brands: [],
            categories: [],
            color: "none",
            maxPrice: 5000
        });
    }, [audience, category, data]);


    const handleSearch = () => {
        if (!searchText.trim()) {
            setFilterData(filteredByAudience);
            return;
        }

        const results = filteredByAudience.filter((item) =>
            [item.name, item.brand, item.model, item.audience].some((field) =>
                field?.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilterData(results);
    }

    const finalFilteredData = filterData.filter((item) => {
        // Перевірка бренду
        const matchesBrand = appliedFilterData.brands.length === 0 ||
            appliedFilterData.brands.includes(item.brand);

        // Перевірка категорії
        const matchesCategory = appliedFilterData.categories.length === 0 || appliedFilterData.categories.includes(item.category);

        // Перевірка кольору
        const matchesColor = appliedFilterData.color === "none" || item.color === appliedFilterData.color;

        // Перевірка ціни
        const matchesPrice = item.price <= appliedFilterData.maxPrice;

        return matchesBrand && matchesCategory && matchesColor && matchesPrice;
    })

    return (
        <div className=" px-10 sm:px-20 lg:px-30 xl:px-40">
            <section className="pt-7 mx-auto flex justify-center gap-x-2 md:gap-x-5 mb-10">
                <div className="relative w-121 h-14">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full h-full px-8 bg-gray-100 rounded-full placeholder-blue-900 focus:ring-2 focus:ring-blue-900 outline-none text-gray-500" placeholder="Search..." />
                    <button onClick={() => handleSearch()} className="absolute bottom-3.5 right-6 p-1 hover:scale-110 transition-transform cursor-pointer">
                        <img src={Search} alt="search" className="w-5 h-5 hover:cursor-pointer" />
                    </button>
                </div>
                <button className="px-3 bg-gray-100 rounded-full cursor-pointer"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    <img src={Filter} alt="filter" className="w-8 h-8" />
                </button>
            </section>
            <section className="pt-15">
                {finalFilteredData.length === 0 ? (
                    <h3 className="mb-14 bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium w-full font-[Pacifico]">
                        Products not found
                    </h3>
                ) : (category === "allshoes" ? (
                    CATEGORY_ORDER.map(category => {
                        const categoryData = finalFilteredData.filter(item => item.category === category);

                        return (
                            <Dropdown
                                key={category}
                                category={formatCategoryName(category)}
                                data={categoryData}
                            />
                        );
                    }))
                    : (
                        filterData.filter(item => item.category === category).length === 0 ? (
                            <div className="pb-14"><h2 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium">No products found</h2></div>
                        ) : (
                            <Dropdown
                                category={formatCategoryName(category)}
                                data={finalFilteredData.filter(item => item.category === category)}
                            />
                        )
                    ))}
            </section>
            {isFilterOpen && (
                <FilterPanel setIsFilterOpen={setIsFilterOpen} data={filteredByAudience} appliedFilterData={appliedFilterData} setAppliedFilterData={setAppliedFilterData} />)}
        </div>
    );
}