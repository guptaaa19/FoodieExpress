import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/Constants";


const ResturantMenu = () => {
    const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();
    console.log(resId);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId );
        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
    };

    if(resInfo === null)
        return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};

    const itemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[3]?.card?.card?.itemCards || [];

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{cuisines?.join(", ")}</h2>
            <h2>{costForTwoMessage}</h2>
            <ul>
                {itemCards.length > 0 ? (
                    itemCards.map((item) => (
                        <li key={item.card.info.id}>
                            {item.card.info.name} - Rs.{item.card.info.price / 100}
                        </li>
                    ))
                ) : (
                    <li>No items available</li>
                )}
            </ul>
        </div>
    );
};

export default ResturantMenu;
