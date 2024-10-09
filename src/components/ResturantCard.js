import { useContext } from "react";
import { CDN_URL } from "../utils/Constants";
import UserContext from "../utils/UserContext";


const ResturantCard = (props) => {
    const { resData } = props;
    const { loggInUser } = useContext(UserContext);

    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        sla,
    } = resData?.info ;   // (?. is optional chaining) 
    return (
        <div className="m-4 p-4 w-[260px] h-[465px] bg-gray-100 rounded-lg hover:bg-yellow-300 flex flex-col justify-between">
            <img className="rounded-md"
            src=
                {CDN_URL + cloudinaryImageId }
              alt="Biryani" />

            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(', ')}</h4>
            <h4>🌟 {avgRating} stars</h4>
            <h4>🤑 {costForTwo}</h4>
            <h4>🛵 {sla?.slaString}</h4>
        </div>
    );
};

export default ResturantCard;