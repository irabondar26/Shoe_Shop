import ArrowBlue from "../Img/arrowBlue.svg"
import Facebook from "../Img/facebook.svg"
import Tiktok from "../Img/tiktok.svg"
import Instagram from "../Img/instagram.svg"

export default function Footer() {
    return (
        <>
            <section className="bg-blue-800 px-10 py-10 md:py-20 sm:px-20 lg:px-30 xl:px-40">
                <div className="flex flex-col justify-between gap-y-5 items-center mb-5 sm:flex-row sm:gap-0">
                    <h2 className="font-[Pacifico] text-3xl text-white">vantela</h2>
                    <button className="bg-gray-100 text-gray-500 w-full sm:w-90 rounded-full flex justify-between items-center py-5 px-7 gap-x-3 cursor-pointer">
                        <p>Subscribe to our newsletter ...</p>
                        <img src={ArrowBlue} alt="ArrowBlue" className="h-4" />
                    </button>
                </div>
                <div className=" flex flex-col items-start gap-y-5 sm:grid sm:grid-cols-2 sm:items-start sm:justify-items-start sm:gap-y-8 lg:flex lg:flex-row lg:justify-between lg:items-start">
                    <ul className="mt-[21px] text-white flex flex-col gap-4 items-start">
                        <li>
                            <h3 className="text-2xl">Company</h3>
                        </li>
                        <li>
                            <a href="#" className="text-lg underline">Our store</a>
                        </li>
                    </ul>
                    <ul className="mt-[21px] text-white flex flex-col gap-4 items-start">
                        <li>
                            <h3 className="text-2xl">Help</h3>
                        </li>
                        <li>
                            <a href="#" className="text-lg underline">Help</a>
                        </li>
                    </ul>
                    <ul className="mt-[21px] text-white flex flex-col gap-4 items-start">
                        <li>
                            <h3 className="text-2xl">Social media</h3>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/" className="text-lg underline flex justify-start gap-2" target="_blank">
                                <img src={Facebook} alt="" className="w-7" />
                                <p>Facebook</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/" className="text-lg underline flex justify-start gap-2" target="_blank">
                                <img src={Tiktok} alt="" className="w-7" />
                                <p>Tiktok</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" className="text-lg underline flex justify-start gap-2" target="_blank">
                                <img src={Instagram} alt="" className="w-7" />
                                <p>Instagram</p>
                            </a>
                        </li>
                    </ul>
                    <ul className="mt-[21px] text-white flex flex-col gap-4 items-start">
                        <li>
                            <h3 className="text-2xl">Contact</h3>
                        </li>
                        <li>
                            <a href="https://goo.gl/maps/example"
                                rel="noopener noreferrer"
                                className="text-lg underline"
                                target="_blank">
                                City, Country</a>
                        </li>
                        <li>
                            <a href="tel:+000000000000" className="text-lg underline whitespace-nowrap">Phone: +000 000 000 000</a>
                        </li>
                        <li>
                            <a href="mailto:support@example.com" className="text-lg underline">
                                Email: hello@irynity.dev
                            </a>
                        </li>
                    </ul>
                </div>

            </section>
            <section className="flex flex-col sm:flex-row justify-between items-center bg-blue-900 py-7 px-10 gap-4 text-sm sm:px-20 lg:px-30 xl:px-40">
                <p className="text-white/50 ">
                    Copyright © {new Date().getFullYear()} <span className="text-white font-medium">Vantela</span>. All Rights Reserved.
                </p>
                <p className="text-white/50">Developed by Irynity</p>
            </section>
        </>

    )
}