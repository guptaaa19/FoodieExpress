import useResturantMenu from "../utils/useResturantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResturantCategory from "./ResturantCategory";
import { useState } from "react";
import RestaurantMenuOverview from "./ResturantMenuOverview";

const ResturantMenu = () => {
    const { resId } = useParams() ;
      // Fetch restaurant information using the custom hook
    const resInfo = useResturantMenu(resId);

    const [ showIndex, setShowIndex ] = useState( null );

    if(resInfo === null)
        return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};

    const itemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[3]?.card?.card?.itemCards || [];
    console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") || [];

    console.log(categories);


    return (
    //     // <div className="menu">
    //     //     <h1>{name}</h1>
    //     //     <h2>{cuisines?.join(", ")}</h2>
    //     //     <h2>{costForTwoMessage}</h2>
    //     <div className="menu flex flex-col items-center w-full justify-center min-h-screen bg-gray-100 p-4 ">
    // {/* Restaurant details container */}
    // <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
    //   <h1 className="text-3xl font-bold mb-4 text-gray-800">{name}</h1>
    //   <h2 className="text-xl text-gray-600 mb-2">{cuisines?.join(", ")}</h2>
    //   <h2 className="text-lg text-gray-500">{costForTwoMessage}</h2>
    // </div>

    <div className="menu flex flex-col items-center w-full justify-center min-h-screen bg-gray-100 p-4">
    {/* Restaurant details with overview */}
    <RestaurantMenuOverview resData={resInfo?.cards?.[2]?.card?.card} />
            
    <div className="w-full mt-8">
            {/* categories accordian */}
            { categories.map(( category, index ) => (
                // controlled component
                <ResturantCategory 
                key = {category?.card?.title}
                data = {category?.card?.card}
                // showItems={ index === 1 ? true : false } 
                showItems = { index === showIndex ? true : false }
                setShowIndex = { () => setShowIndex(index) }
                />
                ))}
        </div>
        </div>
    );
};

export default ResturantMenu;
