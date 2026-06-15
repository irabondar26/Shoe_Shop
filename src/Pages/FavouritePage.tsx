import { useAppSelector } from "../redux-toolkit/hooks";
import Dropdown from "../Components/Dropdown";

export default function FavouritePage() {

    const favouriteItems = useAppSelector(state => state.favourite.items)

    return (
        <section className="text-black text-start px-10 sm:px-20 lg:px-30 xl:px-40 py-9 xs:py-18">
            <h2 className="w-full border-b-2 border-b-gray-300 text-xl sm:text-4xl pb-5 xs:pb-10">Favourite products</h2>
            <div className="pt-5 xs:pt-10">
                {favouriteItems.length !== 0 ?
                    <Dropdown data={favouriteItems} />
                    : (<h3 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-center text-blue-900 font-medium w-full font-[Pacifico] mt-10">
                        Not found products
                    </h3>)}
            </div>
        </section>
    )
}