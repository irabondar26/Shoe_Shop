import raw from "../data.json";
import { NavLink } from "react-router-dom";
import { Product } from "../types/types"
import Button from "../Components/Button"
import SliderShoes from "../Components/SliderShoes"
import MainImg from "../Img/MainImg.svg"
import SeconMainImg from "../Img/SecondMainImg.png"
import Arrowwhite from "../Img/arrowWhite.svg";

function MainPage() {

    const data = raw as Product[];

    const mostPopular: Product[] = data.filter((item) => item.popularity >= 5);
    const onSale: Product[] = data.filter((item) => item.onSale === true);
    return (
        <>
            <section className="relative ">
                <img src={MainImg} alt="MainImg" className=" w-full" />
                <article className="absolute top-[15%] sm:top-10 md:top-[5%] lg:top-20 pl-[10%] flex flex-col items-start gap-6 sm:pl-20 lg:pl-30 xl:pl-40">
                    <h1 className="font-[Pacifico] text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-blue-900">vantela</h1>
                    <h2 className="hidden sm:block text-yellow-400 text-base md:text-lg lg:text-2xl xl:text-3xl font-bold">PUBLIC HIGH<span className="font-light"> GUM NATURAL</span></h2>
                    <p className="text-xs text-stone-700 text-start hidden md:block md:w-[39%] lg:w-xs xl:w-sm 2xl:w-md ">It was popularised in the 1960s with the release of Letraset sheets containing. Lorem Ipsum passages, and more recently with desktop publishing</p>
                    <Button text='Shop Now' active={true} customClass="text-white bg-blue-900 px-4 py-2 sm:px-6 sm:py-3" />
                </article>
            </section>
            <SliderShoes title="Most Popular" data={mostPopular} />
            <SliderShoes title="On sale" data={onSale} />
            <section className="relative flex justify-center items-center px-5 pb-5 md:pb-10 lg:px-0">
                <img src={SeconMainImg} alt="Junior Shoes" className="max-h-[90vh] w-auto" />
                <NavLink
                    className="rounded-full flex items-center justify-center gap-2 absolute bottom-15 bg-yellow-400 px-4 py-2 sm:px-6 sm:py-3 font-bold"
                    to="/kids/allshoes">
                    See more
                    <img src={Arrowwhite} className="w-5 h-5" />
                </NavLink>
            </section>
        </>
    )
}

export default MainPage