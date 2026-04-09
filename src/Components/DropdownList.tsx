import { useState } from "react";
import { Product } from "../types/types";
import Item from "./Item";
import arrowWhite from "../Img/arrowWhite.svg"

type DropdownProps = {
    category: string;
    data: Product[];
}

export default function Dropdown({ category, data }: DropdownProps) {
    const [visibleCount, setVisibleCount] = useState(8);
    const visibleData = data.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return data.length !== 0
        ? (<div className="pb-15 flex flex-col items-center">
            <h3 className="mb-14 bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium w-full font-[Pacifico]">{category}</h3>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4">
                {visibleData.map((el) =>
                    <div
                        key={el.id}
                        className="animate-fadeIn"
                    >
                        <Item
                            name={el.name}
                            price={el.price}
                            photo={el.photo}
                            rating={el.rating}
                            popularity={el.popularity}
                            onSale={el.onSale}
                            newPrice={el.newPrice}
                        />
                    </div>
                )}
            </div>
            {visibleCount < data.length &&
                <button
                    onClick={handleLoadMore}
                    className="mt-8 bg-blue-900 text-white rounded-full text-sm font-bold flex justify-between items-center gap-2 px-6 py-3.5 hover:bg-blue-800 active:scale-95 transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:shadow-blue-500/40">
                    <p className="transition-transform duration-300 hover:translate-x-1">
                        See more
                    </p>
                    <img src={arrowWhite} alt="arrow" className="w-4 h-4 rotate-90" />
                </button>
            }
        </div>)
        :null;
}