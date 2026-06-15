import raw from "../data.json";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux-toolkit/hooks";
import { removeFromCart, updateQuantity } from "../redux-toolkit/cart/cartSlice";
import { NavLink } from "react-router";
import Button from "../Components/Button";
import TrashCanBlue from "../Img/trashCanBlue.svg";
import TrashCanRed from "../Img/trashCanRed.svg";

function CartPage() {

    const [promoCode, setPromoCode] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState<{ text: string, isError: boolean } | null>(null)

    const cartItems = useAppSelector((state) => state.cart.items);

    const handleApplyPromo = () => {
        const cleanCode = promoCode.trim().toUpperCase();
        if (!cleanCode) {
            setPromoMessage({ text: "Please enter promo code!", isError: true });
            return;
        }
        const foundPromo = raw.promoCodes.find((p => p.code === cleanCode));

        if (foundPromo && foundPromo.isActive) {
            setAppliedDiscount(foundPromo.discountPercent);
            setPromoMessage({
                text: `Successful! Discount ${foundPromo.discountPercent} applied`,
                isError: false
            });
        } else if (foundPromo && !foundPromo.isActive) {
            setAppliedDiscount(0);
            setPromoMessage({
                text: "This promo code is no longer valid.",
                isError: true
            });
        } else {
            setAppliedDiscount(0);
            setPromoMessage({
                text: "No such promo code exists.",
                isError: true
            });
        };
    };

    const subtotalOrderSum = cartItems.reduce((sum, item) => {
        const price = item.onSale ? item.newPrice : item.price;
        return sum + price * item.quantity
    }, 0)

    const discountAmount = Math.round((subtotalOrderSum * appliedDiscount) / 100);

    const finalTotal = subtotalOrderSum - discountAmount;

    const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    const dispatch = useAppDispatch();

    return (
        <section className="text-black text-start px-10 sm:px-20 lg:px-30 xl:px-40 py-9 xs:py-18">
            <h2 className="w-full border-b-2 border-b-gray-300 text-xl sm:text-4xl pb-5 xs:pb-10">Shopping Cart</h2>
            {cartItems.length !== 0 ?
                <div className="w-full flex flex-col xl:flex-row gap-10 justify-between items-center xl:items-start">
                    <ul className="w-full xl:w-2/3">
                        {cartItems.map(el =>
                            <li key={el.id} className="py-4 xs:py-8 flex justify-between  items-start border-b-2 border-b-gray-300">
                                <NavLink to={`/product/${el.id}`} className="flex [@media(max-width:500px)]:flex-col flex-row justify-start [@media(max-width:500px)]:items-start items-center sm:items-start gap-4 sm:gap-8">
                                    <img className="w-20 h-20 rounded-lg" src={(Array.isArray(el.photo) ? el.photo : [el.photo])[0]} alt="photo product" />
                                    <div className="py-1">
                                        <div className="flex  flex-col-reverse sm:flex-row sm:justify-start items-start gap-4 mb-3">
                                            <h4 className="text-lg sm:text-xl">{el.name}</h4>
                                            {el.onSale && <p className="px-1.5 xs:px-3 py-1 xs:py-2 bg-amber-400 rounded-4xl text-xs">Disc {Math.round(100 - ((el.newPrice * 100) / el.price))} %</p>}
                                        </div>
                                        {el.onSale === true && el.price !== el.newPrice ?
                                            <div className="flex gap-4 items-center">
                                                <p className="line-through text-[#858585] text-sm">{el.price} Kč</p>
                                                <p className="text-blue-900 font-bold text-lg">{el.newPrice} Kč</p>
                                            </div>
                                            : <p className=" text-blue-900 font-bold text-lg">{el.price} Kč</p>}
                                    </div>
                                </NavLink>

                                <div className="flex flex-col justify-between items-end h-full min-h-20">
                                    <div className="flex justify-start items-center font-bold text-blue-900 gap-4">
                                        <button onClick={() => dispatch(updateQuantity({ id: el.id, size: el.selectedSize, quantity: el.quantity - 1 }))}
                                            className="rounded-full border-2 cursor-pointer">
                                            <svg className="w-4 h-4 stroke-blue-900 group-hover:stroke-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        </button>
                                        <p>{el.quantity}</p>
                                        <button onClick={() => dispatch(updateQuantity({ id: el.id, size: el.selectedSize, quantity: el.quantity + 1 }))}
                                            className="rounded-full border-2 cursor-pointer">
                                            <svg className="w-4 h-4 stroke-blue-900 group-hover:stroke-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button onClick={() => dispatch(removeFromCart({ id: el.id, size: el.selectedSize }))}
                                        className="w-6 h-6 relative cursor-pointer group">
                                        <img className="w-full h-full object-contain block group-hover:hidden" src={TrashCanBlue} alt="Trash Can Blue" />
                                        <img className="w-full h-full object-contain hidden group-hover:block" src={TrashCanRed} alt="Trash Can Red" />
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="w-full md:w-1/2 xl:w-1/3 [@media(max-width:500px)]:p-4 p-8 mt-0 xl:mt-8 rounded-lg border-2 border-gray-300">
                        <h4 className="w-full border-b-2 border-b-gray-300 text-2xl pb-5 xs:pb-10">Order Summary</h4>
                        <div className=" py-3 xs:py-7 flex flex-col gap-3 border-b-2 border-b-gray-300">
                            <label className="text-blue-900 text-xs font-bold pl-2" htmlFor="promo">Promo Code</label>
                            <div className="relative">
                                <input className="w-full py-5 px-4 rounded-lg bg-gray-100 text-xs text-blue-900 placeholder-blue-900 placeholder:text-xs focus:outline-hidden focus:ring-0"
                                    id="promo"
                                    placeholder="Enter promo code..." type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)} />
                                <Button text="Apply"
                                    active={true}
                                    onClick={handleApplyPromo}
                                    customClass="absolute top-3 right-4 px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-lg" />
                            </div>
                            {promoMessage && (
                                <p className={`text-xs pl-2 font-bold ${promoMessage.isError ? "text-red-500" : "text-blue-900"}`}>{promoMessage.text}</p>
                            )}
                        </div>
                        <div className="py-3 xs:py-5 border-b-2 border-b-gray-300 text-blue-900 font-bold flex justify-between items-center">
                            <p className="text-sm">Item: {totalItemsCount}</p>
                            <p>{subtotalOrderSum} Kč</p>
                        </div>
                        <div className="pt-2 xs:pt-4 pb-4 xs:pb-8">
                            <div className=" text-blue-900 text-xs flex justify-between items-center mb-2">
                                <p className="">Subtotal</p>
                                <p>{subtotalOrderSum} Kč</p>
                            </div>
                            <div className=" text-blue-900 text-xs flex justify-between items-center mb-5">
                                <p className="">Promo</p>
                                <p>{discountAmount > 0 ? `-${discountAmount} Kč` : "-"}</p>
                            </div>
                            <div className="text-blue-900 font-bold flex justify-between items-center">
                                <p className="text-sm">Total:</p>
                                <p>{finalTotal} Kč</p>
                            </div>
                        </div>
                        <Button text="Check out" active={true} customClass="w-full py-2 xs:py-4 bg-blue-900 text-lg xs:text-xl text-white font-bold rounded-lg " />
                    </div>
                </div>
                : (<h3 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-center text-blue-900 font-medium w-full font-[Pacifico] mt-10">
                    Not found products
                </h3>)}

        </section>
    )
}

export default CartPage