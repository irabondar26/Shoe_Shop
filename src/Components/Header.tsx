import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {NavigationItem} from "../types/types"
import Button from "./Button"
import Logo from "../Img/logo.svg"
import Comunication from "../Img/comunication.svg"
import Favorite from "../Img/favorite.svg"
import Bag from "../Img/bag.svg"
import arrowYellow from "../Img/arrowYellow.svg"

const getActiveFromPath = (path: string) => {
    if (path.includes("/men")) return "Men";
    if (path.includes("/women")) return "Women";
    if (path.includes("/kids")) return "Kids";
    if (path.includes("/other")) return "Other";
    return "Home";
};

export default function Header() {
    const location = useLocation();

    const [activeButton, setActiveButton] = useState<string>(() => getActiveFromPath(location.pathname));
    const [isOpenHeader, setIsOpenHeader] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<NavigationItem | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setActiveSubmenu(null);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const newActive = getActiveFromPath(location.pathname);
        setActiveButton(newActive);
        setIsOpenHeader(false);
    }, [location.pathname])

    useEffect(() => {
        const controlHeader = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    setIsVisible(false);
                    setIsOpenHeader(false)
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);


    const navigation = [
        { name: "Home", id: "Home", to: "/" },
        {
            name: "Men",
            id: "Men",
            to: "/men",
            defaultTo: "/men/allshoes",
            submenu: ["All Shoes", "Lifestile", "Running", "Sandals", "Slip Ons"]
        },
        {
            name: "Women",
            id: "Women",
            to: "/women",
            defaultTo: "/women/allshoes",
            submenu: ["All Shoes", "Lifestile", "Running", "Sandals", "Slip Ons"]
        },
        {
            name: "Kids",
            id: "Kids",
            to: "/kids",
            defaultTo: "/kids/allshoes",
            submenu: ["All Shoes", "Lifestile", "Running", "Sandals", "Slip Ons"]
        },
        {
            name: "Other",
            id: "Other",
            to: "/other",
        },
    ];

    return (
        <div className={`bg-white fixed top-0 left-0 w-full z-50 transition-transform duration-500 shadow-md 
            ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <section className="bg-gray-100">
                <ul className="flex justify-end py-4 px-10 text-sm text-gray-500 sm:px-20 lg:px-30 xl:px-40">
                    <li><a>Help</a></li>
                    <li>|</li>
                    <li><a>Store</a></li>
                </ul>
            </section>
            <header className={`px-10 py-6 flex justify-between items-center sm:px-20 lg:px-30 xl:px-40`}>
                <NavLink to="/">
                    <img src={Logo} alt="logo" className="w-15 md:w-20 lg:w-32" />
                </NavLink>
                <button className="flex flex-col justify-center items-center w-10 h-10 bg-blue-900 rounded-xl lg:hidden group relative cursor-pointer"
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
                <nav className={`${isOpenHeader ? 'flex flex-col items-start bg-blue-900 absolute top-34 right-10 sm:right-20 z-10 rounded-xl py-4 px-8' : 'hidden'}  gap-10 items-center lg:flex`}>
                    <ul className={`flex ${isOpenHeader ? 'flex-col w-full items-start' : 'flex-row'} gap-7 text-sm`}>

                        {/* mobile menu */}
                        {isOpenHeader && activeSubmenu ? (
                            <>
                                <li onClick={() => setActiveSubmenu(null)} className="text-yellow-400 cursor-pointer flex justify-start items-center gap-2 ">
                                    <img src={arrowYellow} alt="arrow" className="w-3 h-3 rotate-180" />
                                    Back
                                </li>
                                {activeSubmenu?.submenu?.map((sub: string) => (
                                    <li key={sub}>
                                        <NavLink
                                            to={`${activeSubmenu.to}/${sub.toLowerCase().replace(" ", "")}`}
                                            className="text-white hover:text-yellow-400"
                                            onClick={() => {
                                                setIsOpenHeader(false);
                                                setActiveSubmenu(null);
                                            }}
                                        >
                                            {sub}
                                        </NavLink>
                                    </li>
                                ))}
                            </>
                        ) : (
                            /* main menu */
                            navigation.map((item) => (
                                <li className="group relative" key={item.id}>
                                    <NavLink
                                        to={!isMobile && item.defaultTo ? item.defaultTo : item.to}
                                        onClick={(e) => {
                                            if (isMobile && item.submenu) {
                                                e.preventDefault();
                                                setActiveSubmenu(item);
                                                setActiveButton(item.id);
                                            } else {
                                                setIsOpenHeader(false);
                                                setActiveButton(item.id);
                                            }
                                        }}
                                        className={({ isActive }) => `transition-colors ${isActive || activeButton === item.id ? "text-yellow-400" : (isOpenHeader ? "text-white" : "text-gray-500")
                                            }`}
                                    >
                                        {item.name}
                                    </NavLink>

                                    {/* desktop menu */}
                                    {item.submenu && !isMobile && (
                                        <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex gap-6 bg-white/95 backdrop-blur-sm border border-gray-200 py-2 px-8 rounded-full shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            {item.submenu.map((sub) => (
                                                <li key={sub}>
                                                    <NavLink
                                                        to={`${item.to}/${sub.toLowerCase().replace(" ", "")}`}
                                                        className="text-gray-600 hover:text-blue-900 text-nowrap">
                                                        {sub}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                    <ul className={`${isOpenHeader ? "hidden" : "flex"} gap-5`}>
                        <li><a href=""><img src={Comunication} alt="comunication" /></a></li>
                        <li><a href=""><img src={Favorite} alt="comunication" /></a></li>
                        <li><a href=""><img src={Bag} alt="comunication" /></a></li>
                    </ul>
                    <ul className={`${isOpenHeader ? "flex-col" : "flex-row "} gap-4  justify-center items-center flex`}>
                        <li>
                            <Button
                                text="Sign Up"
                                active={true}
                                customClass={`${isOpenHeader ? "text-blue-900 bg-white" : "text-white bg-blue-900 border-2 border-white hover:border-blue-900 hover:text-blue-900 hover:bg-white transition-colors duration-500"} px-3 py-1`} />
                        </li>
                        <li>
                            <Button
                                text='Sign In'
                                active={true}
                                customClass={`${isOpenHeader ? "text-blue-900 bg-white" : "border-2 border-blue-900 bg-white text-blue-900 hover:bg-blue-900 hover:text-white transition-colors duration-500"} px-3 py-1`} />
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}