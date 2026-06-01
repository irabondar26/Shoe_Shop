import { useParams } from "react-router-dom";
import raw from "../data.json";
import { Product } from "../types/types"

export default function ProductDetailsPage() {

    const { id } = useParams<{ id: string }>()

    const data = raw as Product[];

    const product = data.find((product) => String(product.id) === id)

    if (!product) return (
        <div className="p-14"><h2 className="bg-gray-100 rounded-full py-7 px-10 text-3xl text-blue-900 font-medium">No products found</h2></div>
    )
    return (
        <>
        </>
    )
}