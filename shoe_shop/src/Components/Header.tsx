import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button"
import Logo from "../Img/logo.svg"
import Comunication from "../Img/comunication.svg"
import Favorite from "../Img/favorite.svg"
import Bag from "../Img/bag.svg"

export default function Header() {
    const [activeButton, setActiveButton] = useState("Main");
    const [isOpenHeader, setIsOpenHeader] = useState(false);


    const navigation = [
        { name: "Home", id: "Main", to: "/" },
        { name: "Sneakers", id: "Sneakers", to: "/sneakers" },
        { name: "Slip On", id: "SlipOn", to: "/slip-on" },
        { name: "Sandals", id: "Sandals", to: "/sandals" },
        { name: "Other", id: "Other", to: "/other" },
    ];

    return (
        <div>
            <section className="bg-gray-100">
                <ul className="flex justify-end py-4 px-10 text-sm text-gray-500 sm:px-20 lg:px-30 xl:px-40">
                    <li><a>Help</a></li>
                    <li>|</li>
                    <li><a>Store</a></li>
                </ul>
            </section>
            <header className={` px-10 py-6 flex justify-between items-center sm:px-20 lg:px-30 xl:px-40`}>
                <img src={Logo} alt="logo" className="w-15 md:w-20 lg:w-32"/>
                <button className="flex flex-col justify-center items-center w-10 h-10 bg-blue-900 rounded-xl lg:hidden group relative"
                    onClick={() => setIsOpenHeader(!isOpenHeader)}>
                    <span className={`block w-5 h-1 bg-white transition-all duration-500 ease-out rounded-sm 
                        ${isOpenHeader ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`}>
                    </span>
                    <span className={`block w-5 h-1 bg-white transition-all duration-500 ease-out rounded-sm my-0.5 
                        ${isOpenHeader ? 'opacity-0' : 'opacity-100'}`}>
                    </span>
                    <span className={`block w-5 h-1 bg-white transition-all duration-500 ease-out rounded-sm 
                        ${isOpenHeader ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'}`}>
                    </span>
                </button>
                <nav className={`${isOpenHeader ? 'flex flex-col bg-blue-900 absolute top-34 right-10 sm:right-20 z-10 rounded-xl py-4 px-8' : 'hidden'}  gap-10 items-center lg:flex`}>
                    <ul className={`${isOpenHeader ? `flex-col items-start` : `flex-row`} text-sm text-gray-500 flex gap-7`}>
                        {navigation.map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.to}
                                    onClick={() => {
                                        setActiveButton(item.id);
                                        setIsOpenHeader(false);
                                    }}
                                    className={() => {
                                        const isActive = activeButton === item.id;
                                        return `transition-colors ${isActive
                                            ? "text-yellow-400"
                                            : isOpenHeader ? "text-white" : "text-gray-500"
                                            }`;
                                    }}>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className={`${isOpenHeader ? "hidden" : "flex"} gap-5`}>
                        <li><a href=""><img src={Comunication} alt="comunication" /></a></li>
                        <li><a href=""><img src={Favorite} alt="comunication" /></a></li>
                        <li><a href=""><img src={Bag} alt="comunication" /></a></li>
                    </ul>
                    <ul className={`${isOpenHeader ? "gap-0" : "gap-4"}flex`}>
                        <li>
                            <Button
                                text="Sign Up"
                                active={true}
                                customClass={`${isOpenHeader ? "text-blue-900 bg-white" : "text-white bg-blue-900"} px-3 py-1`} />
                        </li>
                        <li>
                            <Button
                                text='Sing In'
                                active={false}
                                customClass={`${isOpenHeader ? "text-blue-900 bg-white" : "text-white bg-blue-900"} px-3 py-1`} />
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}