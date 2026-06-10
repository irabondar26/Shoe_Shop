import { NavLink } from "react-router-dom";
import { ItemProps } from "../types/types";
import ProductRating from "./ProductRating";

export default function Item({ id, name, price, photo, rating, onSale, newPrice }: ItemProps) {

    const productImages = Array.isArray(photo) ? photo : [photo];

    return (
        <NavLink to={`/product/${id}`} className="w-full h-full pt-2.5 pb-4 px-2.5 hover:bg-gray-100 transition-colors duration-500 text-black rounded-2.5 flex flex-col justify-start items-start relative border border-gray-100"
        >
            <div className="w-full overflow-hidden rounded-2.5 flex-shrink-1">
                <img src={productImages[0]} alt="sneakers" className="w-full h-full object-cover block" />
            </div>
            {onSale && <p className="px-3 py-1.5 bg-amber-400 rounded-2xl text-sm absolute top-5 right-5 font-bold">Disc {Math.round(100 - ((newPrice * 100) / price))} %</p>}
            <div className="flex flex-col justify-between items-start mt-2.5 w-full flex-grow gap-8">
                <h3 className="text-start font-bold w-full break-words line-clamp-2" >{name}</h3>
                {onSale === true && price !== newPrice ?
                    <div className=" text-left sm:flex gap-4 sm:items-center">
                        <p className="line-through">{price} Kč</p>
                        <p className="text-red-600 font-bold text-xl">{newPrice} Kč</p>
                    </div>
                    : <p>{price} Kč</p>}
                <ProductRating rating={rating} />
            </div>
        </NavLink>
    )
}