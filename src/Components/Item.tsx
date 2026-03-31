import { useState } from "react";
import starRate from "../Img/starRate.svg"
import Button from "./Button"

type ItemProps = {
    name: string;
    price: number;
    photo: string;
    rating: number;
    popularity: number,
    onSale: boolean,
    newPrice: number
}



export default function Item({ name, price, photo, rating, onSale, newPrice }: ItemProps) {

    const [active, setActive] = useState(false);
    return (
        <div className="mx-auto max-w-[240px] sm:max-w-full h-97 pt-2.5 pb-4 px-2.5 hover:bg-gray-100 transition-colors duration-500 text-black rounded-2.5 flex flex-col justify-start items-start relative border border-gray-100"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}>
            <img src={photo} alt="snicers" className="rounded-2.5 h-auto block" />
            {onSale && <p className="px-3 py-1.5 bg-amber-400 rounded-2xl text-sm absolute top-5 right-5 font-bold">Disc {Math.round(100 - ((newPrice * 100) / price))} %</p>}
            <div className="flex flex-col justify-between items-start mt-2.5 w-full h-full">
                <h3 className="text-start font-bold" >{name}</h3>
                {onSale === true && price !== newPrice ?
                    <div className=" text-left sm:flex gap-4 sm:items-center">
                        <p className="line-through">{price} Kč</p>
                        <p className="text-red-600 font-bold text-xl">{newPrice} Kč</p>
                    </div>
                    : <p>{price} Kč</p>}
                <div className="w-full pr-4 flex flex-wrap justify-between items-end gap-y-3">
                    <div className="flex gap-2 items-end pr-4">
                        <img src={starRate} alt="arrow" className="w-7" />
                        <p>{rating}/5</p>
                    </div>
                    <div className={`transition-all duration-300 ease-in-out ${(active || window.innerWidth < 1024) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                        }`}>
                        <Button
                            text="Shop Now"
                            active={true}
                            customClass="text-white bg-blue-900 px-3 py-1 rounded-full whitespace-nowrap"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}