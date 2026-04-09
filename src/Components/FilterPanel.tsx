import { useState } from "react";
import ArrowBlack from "../Img/arrowBlack.svg";
import { Product } from "../types/types";

type FilterProps = {
    setIsFilterOpen: (value: boolean) => void;
    data: Product[];
}


export default function FilterPanel({ setIsFilterOpen, data }: FilterProps) {

    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [isColorOpen, setIsColorOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState<string | null>("none");

    const brands = [...new Set(data.map(item => item.brand))];
    const colors = [
        { name: "none", class: "bg-white border border-gray-300 relative overflow-hidden" },
        { name: "Black", class: "bg-black" },
        { name: "White", class: "bg-white border border-gray-300" },
        { name: "Blue", class: "bg-blue-600" },
        { name: "Red", class: "bg-red-500" },
    ];

    return (
        <>
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center"
                onClick={() => setIsFilterOpen(false)}>
                <aside className="min-w-80 bg-gray-100 rounded-4xl inline-block py-5 px-8 z-10"
                    onClick={(e) => e.stopPropagation()}>
                    < div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-blue-900">Filters</h2>
                        <button className="text-sm text-gray-500 hover:text-red-500 transition-colors">Clear All</button>
                    </div>

                    <div>
                        <div className="pb-6">
                            <button
                                onClick={() => setIsBrandOpen(!isBrandOpen)}
                                className="w-full flex justify-between items-center text-lg text-black mb-4"
                            >
                                <p className="text-lg text-gray-800">Brand</p>
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
                                            className="w-5 h-5 rounded border-gray-500 accent-blue-900 cursor-pointer"
                                        />
                                        <label htmlFor={`brand-${brand}`} className="text-base text-gray-700 cursor-pointer select-none capitalize">
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pb-6 ">
                            <h3 className="text-lg text-left text-gray-800 mb-4">Price Range</h3>
                            <div>
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

                        {/* --- Фільтр №4: Колір (Кастомні кружечки) --- */}
                        <div>
                            <button
                                onClick={() => setIsColorOpen(!isColorOpen)}
                                className="w-full flex justify-between items-center text-lg text-black mb-4"
                            >
                                <p className="text-lg text-gray-800">Color</p>
                                <span className={`transform transition-transform duration-500 ${isColorOpen ? "rotate-90" : "rotate-[-90deg]"}`}>
                                    <img src={ArrowBlack} alt="arrow" className="w-4 h-4" />
                                </span>
                            </button>
                            <div className={` flex justify-between transition-all duration-500 overflow-hidden ${isColorOpen ? "max-h-60 opacity-100 py-4 px-2" : "max-h-0 opacity-0"}`}>
                                {colors.map((color) => {
                                    const isSelected = selectedColor === color.name;

                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded-full ${color.class} transition-all duration-500 relative hover:scale-110
                                                ${isSelected
                                                    ? "ring-2 ring-blue-900 ring-offset-2 scale-110"
                                                    : "ring-0 ring-offset-0"}`}>
                                            {color.name === "none" && (
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <span className="w-full h-[2px] bg-red-500 rotate-45 transform"></span>
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Кнопка застосування (опціонально, якщо фільтрація не "на льоту") */}
                        <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl mt-8 hover:bg-blue-800 transition-colors shadow-md shadow-blue-100">
                            Apply Filters
                        </button>
                    </div>
                </aside >
            </div >

        </>
    )
}