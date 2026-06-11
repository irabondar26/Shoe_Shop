import { ProductRatingProps } from "../types/types"
import StarRateDimmed from "../Img/starRateDimmed.svg"
import StarRateYellow from "../Img/starRateYellow.svg"

export default function ProductRating({ rating }: ProductRatingProps) {
    const totalStars = 5;

    return (
        <div className="flex items-center gap-0.5 sm:gap-1.5">
            <p className="text-base font-bold text-gray-800 mr-0.5 sm:mr-1" >{rating.toFixed(1)}</p>
            <div className="flex items-center gap-0.25">
                {[...Array(totalStars)].map((_, i) => {
                    const starIndex = i + 1;
                    let fillPercentage = 0;

                    if (rating >= starIndex) {
                        fillPercentage = 100;
                    } else if (rating > starIndex - 1) {
                        fillPercentage = (rating - (starIndex - 1)) * 100
                    }

                    return (
                        <div key={i} className="relative w-4 sm:w-5 h-4 sm:h-5 text-gray-300">
                            <img src={StarRateDimmed} alt="" className="w-full h-full fill-current" />
                            <div className="absolute top-0 left-0 h-full overflow-hidden text-amber-400"
                                style={{ width: `${fillPercentage}%` }}>
                                <img src={StarRateYellow} className="w-4 sm:w-5 h-4 sm:h-5 max-w-none" alt="" />
                            </div>
                        </div>

                    );
                })}
            </div>
        </div>
    )
}