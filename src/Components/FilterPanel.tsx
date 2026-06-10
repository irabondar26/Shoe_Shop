import { useState } from "react";
import ArrowBlack from "../Img/arrowBlack.svg";
import {FilterProps } from "../types/types";

export default function FilterPanel({ setIsFilterOpen,setAppliedFilterData, data, appliedFilterData }: FilterProps) {
    // Стани для відкриття/закриття аккордеонів
    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isColorOpen, setIsColorOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);


    // Тимчасові стани, які ініціалізуються поточними активними фільтрами
    const [selectedBrands, setSelectedBrands] = useState<string[]>(appliedFilterData.brands);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(appliedFilterData.categories);
    const [maxPrice, setMaxPrice] = useState(appliedFilterData.maxPrice);
    const [selectedColor, setSelectedColor] = useState<string>(appliedFilterData.color);


    // Генерація унікальних значень з даних
    const brands = [...new Set(data.map(item => item.brand))];
    const categories = [...new Set(data.map(item => item.category))];
    const uniqueColors = [...new Set(data.map(item => item.color))];

    const colors = [
        { name: "none", colorValue: "transparent", isSpecial: true },
        ...uniqueColors.map(color => ({ name: color, colorValue: color, isSpecial: false }))
    ]


    // Функція для додавання/видалення брендів
    const handleBrandChange = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand))
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    }


    // Функція для додавання/видалення категорій
    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category))
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    // Скидання всіх фільтрів до початкового стану
    const handleClearAll = () => {
        setSelectedBrands([]);
        setSelectedCategories([]);
        setSelectedColor("none");
        setMaxPrice(5000);
    }


    // Застосування фільтрів: передаємо накопичені стани наверх і закриваємо модалку
    const handleApplyFilters = () => {
        setAppliedFilterData({
            brands: selectedBrands,
            categories: selectedCategories,
            color: selectedColor,
            maxPrice: maxPrice
        });
        setIsFilterOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-60"
                onClick={() => setIsFilterOpen(false)}>
                <aside className="max-h-[calc(100vh-10%)] max-w-[240px] sm:max-w-none sm:w-115 sm:h-auto bg-gray-100 rounded-4xl inline-block py-3 px-5 sm:py-5 sm:px-8 z-10"
                    onClick={(e) => e.stopPropagation()}>
                    < div className="flex justify-around sm:justify-between items-center mb-2 sm:mb-6 pb-1 sm:pb-4 border-b border-gray-200">
                        <h2 className="text-lg sm:text-2xl font-bold text-blue-900">Filters</h2>
                        <button className="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                            onClick={handleClearAll}>Clear All</button>
                    </div>

                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pb-2 sm:gap-10 sm:pb-6">
                            {/* --- Бренд --- */}
                            <div className="w-full">
                                <button
                                    onClick={() => setIsBrandOpen(!isBrandOpen)}
                                    className="w-full flex justify-start sm:justify-between items-center text-lg text-black mb-2 sm:mb-4 gap-2 sm:gap-0 cursor-pointer"
                                >
                                    <p className=" text-base sm:text-lg text-gray-800">Brand</p>
                                    <span className={`transform transition-transform duration-500 ${isBrandOpen ? "rotate-90" : "rotate-[-90deg]"}`}>
                                        <img src={ArrowBlack} alt="arrow" className="w-4 h-4" />
                                    </span>
                                </button>

                                <div className={`transition-all duration-500 overflow-hidden ${isBrandOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id={`brand-${brand}`}
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandChange(brand)}
                                                className="w-5 h-5 rounded border-gray-500 accent-blue-900 cursor-pointer"
                                            />
                                            <label htmlFor={`brand-${brand}`} className="text-base text-gray-700 cursor-pointer select-none capitalize">
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- Категорія --- */}
                            <div className="w-full">
                                <button
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="w-full flex justify-start sm:justify-between items-center text-lg text-black mb-2 sm:mb-4 gap-2 sm:gap-0 cursor-pointer"
                                >
                                    <p className="text-base sm:text-lg text-gray-800">Category</p>
                                    <span className={`transform transition-transform duration-500 ${isCategoryOpen ? "rotate-90" : "rotate-[-90deg]"}`}>
                                        <img src={ArrowBlack} alt="arrow" className="w-4 h-4" />
                                    </span>
                                </button>

                                <div className={`transition-all duration-500 overflow-hidden ${isCategoryOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id={`category-${category}`}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="w-5 h-5 rounded border-gray-500 accent-blue-900 cursor-pointer"
                                            />
                                            <label htmlFor={`category-${category}`} className="text-base text-gray-700 cursor-pointer select-none capitalize">
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* --- Колір (Кастомні кружечки) --- */}
                        <div className="pb-0 sm:pb-6">
                            <button
                                onClick={() => setIsColorOpen(!isColorOpen)}
                                className="w-full flex justify-start sm:justify-between items-center text-lg text-black mb-0 sm:mb-4 gap-2 sm:gap-0 cursor-pointer"
                            >
                                <p className="text-base sm:text-lg text-gray-800">Color</p>
                                <span className={`transform transition-transform duration-500 ${isColorOpen ? "rotate-90" : "rotate-[-90deg]"}`}>
                                    <img src={ArrowBlack} alt="arrow" className="w-4 h-4" />
                                </span>
                            </button>
                            <div className={`flex flex-wrap justify-center items-center gap-4 transition-all duration-500 overflow-hidden ${isColorOpen ? "max-h-60 opacity-100 py-4 px-2" : "max-h-0 opacity-0"
                                }`}>
                                {colors.map((color) => {
                                    const isSelected = selectedColor === color.name;
                                    return (
                                        <div key={color.name} className="flex flex-col items-center gap-2">
                                            <button
                                                type="button"
                                                key={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                                title={color.name}
                                                className={`w-8 h-8 rounded-full transition-all duration-500 relative hover:scale-110 cursor-pointer
                                                ${isSelected
                                                        ? "ring-2 ring-blue-900 ring-offset-2 scale-110"
                                                        : "ring-0 ring-offset-0"}`}
                                                style={{ backgroundColor: color.isSpecial ? 'white' : color.colorValue.toLowerCase() }}>
                                                {color.name === "none" && (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                                                        <span className="w-full h-[2px] bg-red-500 rotate-45 transform"></span>
                                                    </span>
                                                )}
                                            </button>
                                            <p className={`text-xs capitalize transition-colors duration-300 ${isSelected ? "text-blue-900 font-bold" : "text-gray-500"
                                                }`}>
                                                {color.name}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* --- Ціна --- */}
                        <div className="">
                            <button
                                onClick={() => setIsPriceOpen(!isPriceOpen)}
                                className="w-full flex justify-start sm:justify-between items-center text-lg text-black mb-0 sm:mb-4 gap-2 sm:gap-0 cursor-pointer"
                            >
                                <p className="text-base sm:text-lg text-gray-800">Price Range</p>
                                <span className={`transform transition-transform duration-500 ${isPriceOpen ? "rotate-90" : "rotate-[-90deg]"}`}>
                                    <img src={ArrowBlack} alt="arrow" className="w-4 h-4" />
                                </span>
                            </button>
                            <div className={` transition-all duration-500 ${isPriceOpen ? "max-h-60 opacity-100 py-2 sm:py-4 px-2" : "max-h-0 opacity-0"}`}>
                                <input
                                    type="range"
                                    min="500"
                                    max="5000"
                                    step="100"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="h-3 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                                />
                                <div className="flex justify-between items-center mt-3 text-sm font-medium text-gray-700">
                                    <p className="text-gray-500">500 Kč</p>
                                    <p className="text-base font-bold text-blue-900 ">{maxPrice} Kč</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl mt-2 sm:mt-8 hover:bg-blue-800 transition-colors shadow-md shadow-blue-100 cursor-pointer" onClick={handleApplyFilters}>
                            Apply Filters
                        </button>
                    </div>
                </aside >
            </div >

        </>
    )
}