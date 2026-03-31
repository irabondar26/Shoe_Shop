import { useRef } from "react";
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowBlue from "../Img/arrowBlue.svg"
import Item from "./Item";
import { Product } from "../types/types";

type SliderProps = {
    title: string;
    data: Product[];
}


export default function SliderShoes({ title, data }: SliderProps) {

    const sliderRef = useRef<SliderSlick>(null);

    const newTitle = ((text: string) => {
        return text.split(" ");
    })(title);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 420, settings: { slidesToShow: 1 } },
        ]
    };

    return (
        <section className="py-5 md:py-10 px-10 sm:px-20 lg:px-30 xl:px-40">
            <div className="bg-gray-100 rounded-full py-7 px-10 flex justify-between items-center">
                <h3 className="text-xl lg:text-3xl text-blue-900 font-medium"><span className="font-[Pacifico]">{newTitle[0]}</span> {newTitle[1]}</h3>
                <div className="flex gap-6">
                    <button onClick={() => sliderRef.current?.slickPrev()}>
                        <img src={arrowBlue} alt="prev" className="w-4 sm:w-6 rotate-180" />
                    </button>
                    <button onClick={() => sliderRef.current?.slickNext()}>
                        <img src={arrowBlue} alt="next" className="w-4 sm:w-6" />
                    </button>
                </div>
            </div>
            <div className="mt-8 relative">
                <SliderSlick ref={sliderRef} {...settings}>
                    {
                        data.map((el) => (
                            <div key={el.id} className="px-1 sm:px-3 focus:outline-none">
                                <Item
                                    key={el.id}
                                    name={el.name}
                                    price={el.price}
                                    photo={el.photo}
                                    rating={el.rating}
                                    popularity={el.popularity}
                                    onSale={el.onSale}
                                    newPrice={el.newPrice}
                                />
                            </div>

                        ))
                    }
                </SliderSlick>
            </div>
        </section>
    )
}
