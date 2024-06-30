import { CDN_URL } from "../utils/Constants";

const ResturantCard = (props) => {
    const { resData } = props;

    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        sla,
    } = resData?.info ;   // (?. is optional chaining) 
    return (
        <div className="res-card">
            <img className="res-logo"
            src=
                {CDN_URL + cloudinaryImageId }
              alt="Biryani" />

            <h3>{name}</h3>
            <h4>{cuisines.join(', ')}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.slaString}</h4>
        </div>
    );
};

export default ResturantCard;