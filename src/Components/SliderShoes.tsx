import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import arrowBlue from "../Img/arrowBlue.svg"
import Item from "./Item";
import { Product } from "../types/types";

type SliderProps = {
    title: string;
    data: Product[];
}


export default function SliderShoes({ title, data }: SliderProps) {

    const swiperRef = useRef<SwiperType | null>(null);

    const newTitle = ((text: string) => {
        return text.split(" ");
    })(title);

    return (
        <section className="py-5 md:py-10 px-4 sm:px-10 md:px-20 lg:px-30 xl:px-40 w-full overflow-hidden">
            <div className="bg-gray-100 rounded-full py-7 px-10 flex justify-between items-center">
                <h3 className="text-xl lg:text-3xl text-blue-900 font-medium"><span className="font-[Pacifico]">{newTitle[0]}</span> {newTitle[1]}</h3>
                <div className="flex gap-6">
                    <button onClick={() => swiperRef.current?.slidePrev()}>
                        <img src={arrowBlue} alt="prev" className="w-4 sm:w-6 rotate-180" />
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()}>
                        <img src={arrowBlue} alt="next" className="w-4 sm:w-6" />
                    </button>
                </div>
            </div>
            <div className="mt-8 relative">
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={5}
                    slidesPerView={1}
                    breakpoints={{
                        420: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                    }}
                    className="w-full h-full"
                >
                    {data.map((el) => (
                        <SwiperSlide key={el.id} className="py-2 flex !h-auto">
                            <Item {...el} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
