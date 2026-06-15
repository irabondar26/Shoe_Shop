import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import raw from "../data.json";
import { Product } from "../types/types"
import formatDate from "../utilities/utilities"
import ProductRating from "../Components/ProductRating";
import Button from "../Components/Button";
import Dropdown from "../Components/DropdownList";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { addToCart } from "../redux-toolkit/cart/cartSlice";
import EmptyHeart from "../Img/emptyHeart.svg"
import FullHeart from "../Img/fullHeart.svg"
import Share from "../Img/share.svg"

type TabType = 'details' | 'review' | 'similar';

export default function ProductDetailsPage() {

    const { id } = useParams<{ id: string }>()
    const data = raw.shoes as Product[];
    const product = data.find((product) => String(product.id) === id)

    const [clickFavouriteBtn, setClickFavouriteBtn] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number>();
    const [isSelectedSize, setIsSelectedSize] = useState<boolean>();

    const [actibeTab, setActiveTab] = useState<TabType>("details");

    const productImages = Array.isArray(product?.photo) ? product.photo : [product?.photo];

    const similarProducts = data.filter((el) =>
        el.audience === product?.audience &&
        el.model === product?.model &&
        el.id !== product?.id
    )

    async function handleShare() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Vantela", // Назва, яка підтягнеться у повідомлення
                    text: "Look at these cool shoes.!", // Короткий опис
                    url: window.location.href, // Автоматично бере поточне посилання на цю сторінку
                });
                console.log("Користувач успішно поділився!");
            } catch (error) {
                console.log("Користувач скасував поширення або виникла помилка:", error);
            }

        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Посилання на товар скопійовано в буфер обміну!");
        }
    }

    const dispatch = useAppDispatch();

    if (!product) return (
        <div className="p-14"><h2 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium">No products found</h2></div>
    )
    return (
        <div className="w-full py-5 sm:py-10 px-10 sm:px-20 lg:px-30 xl:px-40 text-black">
            <section className="flex flex-col lg:flex-row justify-start items-center lg:items-start mb-10 sm:mb-20 gap-y-5 sm:gap-y-10 lg:gap-0">
                <div className="w-full lg:w-3/5  border border-gray-100 rounded-lg overflow-hidden max-w-[500px] relative">
                    <style>{`
                        /* Стиль для круглого білого тла кнопок */
                        .swiper-button-next, 
                        .swiper-button-prev {
                            background-color: rgba(255, 255, 255, 0.9) !important;
                            width: 40px !important;
                            height: 40px !important;
                            border-radius: 50% !important;
                            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            transition: all 0.2s ease-in-out !important;
                        }

                        .swiper-button-next *, 
                        .swiper-button-prev *,
                        .swiper-button-next::after, 
                        .swiper-button-prev::after {
                            display: none !important;
                            opacity: 0 !important;
                            font-size: 0 !important;
                        }

                        .swiper-button-next::before,
                        .swiper-button-prev::before {
                            content: '' !important;
                            display: block !important;
                            width: 12px !important;
                            height: 12px !important;
                            border-top: 2.5px solid #FFCA28 !important;
                            border-right: 2.5px solid #FFCA28 !important;
                        }

                        .swiper-button-next::before {
                            transform: rotate(45deg) !important;
                            margin-right: 2px !important; 
                        }

                        .swiper-button-prev::before {
                            transform: rotate(-135deg) !important;
                            margin-left: 2px !important;
                        }

                        /* Ефект ховеру */
                        .swiper-button-next:hover, 
                        .swiper-button-prev:hover {
                            background-color: #ffffff !important;
                            transform: scale(1.08) !important;
                        }
                    `}</style>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        style={{
                            // @ts-expect-error: CSS custom properties are not fully typed in Swiper React styles
                            '--swiper-theme-color': '#FFCA28',
                        }}
                        className="w-full h-full text-blue-900"
                    >
                        {productImages.map((imgSrc, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center bg-white">
                                <img
                                    className="w-full h-auto object-contain max-h-[500px]"
                                    src={imgSrc}
                                    alt={`Product photo ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <article className="lg:pl-11 pt-5 w-full lg:w-3/5 2xl:w-2/5 flex flex-col justify-start items-start">
                    {product.onSale && <p className="px-4 py-2 bg-amber-400 rounded-4xl text-xl font-bold italic mb-3 sm:mb-6">Disc {Math.round(100 - ((product.newPrice * 100) / product.price))} %</p>}
                    <div className={`w-full flex justify-between items-start mb-3 sm:mb-6`}>
                        <h2 className="text-xl sm:text-4xl font-bold">{product.name}</h2>
                        <div className="flex gap-4 items-center">
                            <button className="cursor-pointer" onClick={() => setClickFavouriteBtn(el => !el)}>
                                <img className="w-7 sm:w-8" src={clickFavouriteBtn ? FullHeart : EmptyHeart} alt="Favorite icon" />
                            </button>
                            <button className="cursor-pointer" onClick={() => handleShare()}>
                                <img className="w-7 sm:w-8" src={Share} alt="Share icon" />
                            </button>
                        </div>
                    </div>

                    <button className="cursor-pointer inline-block"
                        onClick={() => {
                            setActiveTab("review");
                            setTimeout(() => {
                                const tabsElement = document.getElementById("tabs-section");
                                if (tabsElement) {
                                    tabsElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }
                            }, 100);
                        }}>
                        <ProductRating rating={product.rating} />
                    </button>
                    <div className={`${product.onSale ? "flex flex-col justify-between items-start gap-5" : "block"} my-3 sm:my-6 `}>
                        {product.onSale && <p className="text-[#858585] text-lg sm:text-xl line-through">{product.price} Kč</p>}
                        <p className="font-bold text-blue-900 text-4xl">{product.onSale ? product.newPrice : product.price} Kč</p>
                    </div>
                    <div className="flex flex-col justify-start items-start mb-5 sm:mb-6">
                        <p className="text-base mb-2">Select a size</p>
                        <p className={`${isSelectedSize ? "" : "hidden"} text-xl font-bold text-red-600 mb-4`}>Please, select a size!</p>
                        <div className="flex justify-start items-center gap-1 sm:gap-1.5">
                            {product.sizes.map(el =>
                                <button key={el.value} className={`${el.isAvailable
                                    ? "text-black border-black cursor-pointer"
                                    : "text-[#858585] border-[#858585] bg-gray-100 cursor-not-allowed"
                                    }
                                    ${selectedSize === el.value ? "bg-amber-400" : ""} 
                                    py-1 sm:py-2 px-1.5 sm:px-2.5 border rounded-sm`}
                                    onClick={() => {
                                        if (!el.isAvailable) return;
                                        setSelectedSize(el.value);
                                    }}>
                                    {el.value}</button>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center gap-2">
                        <Button text="+ Add to cart" active={true} customClass="w-full border border-2 border-blue-900 text-blue-900 font-bold  [@media(max-width:380px)]:text-xs py-2 sm:py-4 px-4 sm:px-8 rounded-full"
                            onClick={() => {
                                if (!selectedSize) {
                                    setIsSelectedSize(true);
                                } else {
                                    setIsSelectedSize(false);
                                    dispatch(addToCart({
                                        product,
                                        size: selectedSize
                                    }));
                                }
                            }} />
                        <Button text="Buy now" active={true} customClass="w-full bg-blue-900 text-white font-bold  [@media(max-width:380px)]:text-xs py-2 sm:py-4 px-4 sm:px-8 rounded-full"
                            onClick={() => {
                                if (!selectedSize) {
                                    setIsSelectedSize(true);
                                } else {
                                    setIsSelectedSize(false);
                                }
                            }} />
                    </div>
                </article>
            </section>
            <section className="w-full pb-8" id="tabs-section">
                <div className="w-full bg-gray-100 rounded-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between lg:justify-start items-center gap-0 lg:gap-5 text-gray-500 [@media(max-width:380px)]:text-xs text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-5 sm:mb-9">
                    <button className={`${actibeTab === "details" ? "bg-blue-900 text-white rounded-full" : ""} cursor-pointer px-2 sm:px-5 md:px-10 py-2 md:py-4.5`}
                        onClick={() => setActiveTab("details")}>
                        Details</button>
                    <button className={`${actibeTab === "review" ? "bg-blue-900 text-white rounded-full" : ""} cursor-pointer px-2 sm:px-5 md:px-10 py-2 md:py-4.5`}
                        onClick={() => setActiveTab("review")}>
                        Review</button>
                    <button className={`${actibeTab === "similar" ? "bg-blue-900 text-white rounded-full" : ""} cursor-pointer px-2 sm:px-5 md:px-10 py-2 md:py-4.5`}
                        onClick={() => setActiveTab("similar")}>
                        Similar products</button>
                </div>
                <div key={actibeTab} className="w-full px-5 sm:px-10">
                    {actibeTab === "details" && (product.addInfo ?
                        (<ul className="w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 justify-start items-start gap-y-2 sm:gap-3 md:gap-6 animate-fadeIn">
                            {product.addInfo?.map((det, i) =>
                                <li key={i} className="justify-self-start flex items-start gap-3 text-gray-700 text-base text-start">
                                    <span className="w-1.5 h-1.5 bg-blue-900 rounded-full mt-2 shrink-0"></span>
                                    {det}</li>
                            )}
                        </ul>)
                        : (<h3 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium w-full font-[Pacifico]">
                            No information
                        </h3>))}
                    {actibeTab === "review" && (product.reviews ?
                        (<ul className="grid grid-cols-1 xl:grid-cols-2 auto-rows-fr gap-y-8 xl:gap-x-10 gap- xl:gap-y-15 animate-fadeIn">
                            {product.reviews?.map((rev, i) =>
                                <li key={i} className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8 border-b-2 border-b-gray-300 pb-5 sm:px-5 sm:py-3">
                                    <ProductRating rating={rev.userRating} />
                                    <div className="text-start">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-bold">{rev.userName}</h4>
                                            <p>{formatDate(rev.date)}</p>
                                        </div>
                                        <p>{rev.comment}</p>
                                    </div>
                                </li>)}
                        </ul>)
                        : (<h3 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium w-full font-[Pacifico]">
                            No reviews
                        </h3>))}
                    {actibeTab === "similar" && (similarProducts.length !== 0 ?
                        (<Dropdown data={similarProducts} />)
                        : (<h3 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium w-full font-[Pacifico]">
                            Not found similar products
                        </h3>))}
                </div>
            </section >
        </div >
    )
}