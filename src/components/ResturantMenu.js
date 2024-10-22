import useResturantMenu from "../utils/useResturantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResturantCategory from "./ResturantCategory";
import { useState } from "react";
import RestaurantMenuOverview from "./ResturantMenuOverview";

const ResturantMenu = () => {
    const { resId } = useParams();
    // Fetch restaurant information using the custom hook
    const resInfo = useResturantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if (resInfo === null)
        return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};

    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) =>
        c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

    console.log(categories);

    return (
        <div className="menu flex flex-col items-center w-full justify-center min-h-screen bg-gray-100 p-4">
            {/* Restaurant details with overview */}
            <RestaurantMenuOverview resData={resInfo?.cards?.[2]?.card?.card} />

            <div className="w-full mt-8">
                {/* Categories accordion */}
                {categories.map((category, index) => (
                    // Controlled component
                    <ResturantCategory
                        key={category?.card?.title}
                        data={category?.card?.card}
                        showItems={index === showIndex}
                        setShowIndex={() => setShowIndex(index === showIndex ? null : index)} // Toggles visibility
                    />
                ))}
            </div>
        </div>
    );
};

export default ResturantMenu;
